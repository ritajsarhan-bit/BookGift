# Supabase

Database schema, seed data, and setup notes for BookGift.

## Files

- `migrations/0001_initial_schema.sql` — enums, tables, indexes, triggers, and
  Row Level Security policies.
- `seed.sql` — sample catalog mirroring `src/lib/data/books.ts`.

## Tables

| Table                 | Purpose                                              |
| --------------------- | ---------------------------------------------------- |
| `profiles`            | 1:1 with `auth.users`; auto-created on signup.       |
| `books`               | Public catalog (publicly readable).                  |
| `cart_items`          | Per-user cart (one row per book, quantity inline).   |
| `orders`              | Orders + gift fields (`is_gift`, wrapping, ribbon…). |
| `order_items`         | Line-item snapshots (title/price copied).            |
| `gift_customizations` | Per line-item gift details.                          |

## Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env.local` and fill in the URL + keys
   (Project Settings → API).
3. Apply the schema. Either:

   **SQL editor:** paste `migrations/0001_initial_schema.sql`, then `seed.sql`.

   **Supabase CLI:**

   ```bash
   supabase link --project-ref <your-ref>
   supabase db push          # applies migrations
   psql "$DATABASE_URL" -f supabase/seed.sql   # optional seed
   ```

4. (Optional) Enable Google OAuth under Authentication → Providers, and add
   `http://localhost:3000/auth/callback` to the redirect URLs.

## Regenerating types

After schema changes, keep `src/lib/supabase/database.types.ts` in sync:

```bash
npx supabase gen types typescript --project-id <id> > src/lib/supabase/database.types.ts
```
