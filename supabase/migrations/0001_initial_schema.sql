-- ============================================================================
-- BookGift — initial schema
-- ============================================================================
-- Run order: this file creates enums, tables, indexes, triggers, and Row Level
-- Security policies. Apply via `supabase db push`, the Supabase SQL editor, or
-- `psql < supabase/migrations/0001_initial_schema.sql`.
-- ============================================================================

create extension if not exists "pgcrypto"; -- for gen_random_uuid()

-- ----------------------------------------------------------------------------
-- Enums
-- ----------------------------------------------------------------------------
do $$ begin
  create type public.order_status as enum (
    'pending', 'paid', 'fulfilled', 'shipped', 'delivered', 'cancelled', 'refunded'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.wrapping_style as enum (
    'classic', 'rustic', 'elegant', 'festive', 'minimal'
  );
exception when duplicate_object then null; end $$;

-- ----------------------------------------------------------------------------
-- updated_at trigger helper
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ----------------------------------------------------------------------------
-- profiles  (1:1 with auth.users)
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  avatar_url  text,
  phone       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create a profile when a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- books
-- ----------------------------------------------------------------------------
create table if not exists public.books (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  author      text not null,
  description text,
  price       numeric(10, 2) not null check (price >= 0),
  stock       integer not null default 0 check (stock >= 0),
  category    text,
  language    text not null default 'English',
  image_url   text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists books_category_idx on public.books (category);
create index if not exists books_author_idx on public.books (author);

drop trigger if exists books_set_updated_at on public.books;
create trigger books_set_updated_at
  before update on public.books
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- cart_items  (one row per book per user; quantity tracked inline)
-- ----------------------------------------------------------------------------
create table if not exists public.cart_items (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles (id) on delete cascade,
  book_id     uuid not null references public.books (id) on delete cascade,
  quantity    integer not null default 1 check (quantity > 0),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (user_id, book_id)
);

create index if not exists cart_items_user_idx on public.cart_items (user_id);

drop trigger if exists cart_items_set_updated_at on public.cart_items;
create trigger cart_items_set_updated_at
  before update on public.cart_items
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- orders  (gift fields live here per spec)
-- ----------------------------------------------------------------------------
create table if not exists public.orders (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid references public.profiles (id) on delete set null,
  status              public.order_status not null default 'pending',
  subtotal            numeric(10, 2) not null check (subtotal >= 0),
  shipping            numeric(10, 2) not null default 0 check (shipping >= 0),
  total               numeric(10, 2) not null check (total >= 0),
  -- shipping address snapshot
  shipping_name       text,
  shipping_email      text,
  shipping_address    text,
  shipping_city       text,
  shipping_postal_code text,
  shipping_country    text,
  -- gift fields
  is_gift             boolean not null default false,
  gift_message        text,
  wrapping_style      public.wrapping_style,
  wrapping_color      text,
  ribbon_color        text,
  gift_card_design    text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists orders_user_idx on public.orders (user_id);
create index if not exists orders_status_idx on public.orders (status);

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- order_items  (line snapshot — title/price copied so history is immutable)
-- ----------------------------------------------------------------------------
create table if not exists public.order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references public.orders (id) on delete cascade,
  book_id     uuid references public.books (id) on delete set null,
  title       text not null,
  author      text not null,
  unit_price  numeric(10, 2) not null check (unit_price >= 0),
  quantity    integer not null default 1 check (quantity > 0),
  created_at  timestamptz not null default now()
);

create index if not exists order_items_order_idx on public.order_items (order_id);

-- ----------------------------------------------------------------------------
-- gift_customizations  (per line-item gift details)
-- ----------------------------------------------------------------------------
create table if not exists public.gift_customizations (
  id                uuid primary key default gen_random_uuid(),
  order_item_id     uuid not null references public.order_items (id) on delete cascade,
  recipient_name    text,
  message           text,
  wrapping_style    public.wrapping_style,
  wrapping_color    text,
  ribbon_color      text,
  gift_card_design  text,
  gift_box          boolean not null default false,
  created_at        timestamptz not null default now()
);

create index if not exists gift_customizations_item_idx
  on public.gift_customizations (order_item_id);

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.profiles            enable row level security;
alter table public.books               enable row level security;
alter table public.cart_items          enable row level security;
alter table public.orders              enable row level security;
alter table public.order_items         enable row level security;
alter table public.gift_customizations enable row level security;

-- profiles: a user can see and edit only their own profile.
drop policy if exists "Profiles are viewable by owner" on public.profiles;
create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- books: public catalog — readable by everyone, writable only via service role.
drop policy if exists "Books are publicly readable" on public.books;
create policy "Books are publicly readable"
  on public.books for select
  using (true);

-- cart_items: fully owned by the user.
drop policy if exists "Users manage their own cart" on public.cart_items;
create policy "Users manage their own cart"
  on public.cart_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- orders: a user can read and create their own orders.
drop policy if exists "Users can view own orders" on public.orders;
create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

drop policy if exists "Users can create own orders" on public.orders;
create policy "Users can create own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- order_items: visible / insertable when the parent order belongs to the user.
drop policy if exists "Users can view own order items" on public.order_items;
create policy "Users can view own order items"
  on public.order_items for select
  using (exists (
    select 1 from public.orders o
    where o.id = order_items.order_id and o.user_id = auth.uid()
  ));

drop policy if exists "Users can insert own order items" on public.order_items;
create policy "Users can insert own order items"
  on public.order_items for insert
  with check (exists (
    select 1 from public.orders o
    where o.id = order_items.order_id and o.user_id = auth.uid()
  ));

-- gift_customizations: gated through the owning order item -> order -> user.
drop policy if exists "Users can view own gift customizations" on public.gift_customizations;
create policy "Users can view own gift customizations"
  on public.gift_customizations for select
  using (exists (
    select 1
    from public.order_items oi
    join public.orders o on o.id = oi.order_id
    where oi.id = gift_customizations.order_item_id and o.user_id = auth.uid()
  ));

drop policy if exists "Users can insert own gift customizations" on public.gift_customizations;
create policy "Users can insert own gift customizations"
  on public.gift_customizations for insert
  with check (exists (
    select 1
    from public.order_items oi
    join public.orders o on o.id = oi.order_id
    where oi.id = gift_customizations.order_item_id and o.user_id = auth.uid()
  ));
