-- ============================================================================
-- BookGift — seed data
-- ============================================================================
-- Mirrors src/lib/data/books.ts so a fresh database matches the mock catalog.
-- Idempotent: re-running updates existing rows matched on (title, author).
-- Apply via `supabase db reset` (runs automatically) or run manually after the
-- schema migration.
-- ============================================================================

insert into public.books (title, author, price, stock, category, language, image_url, description)
values
  ('The Midnight Library', 'Matt Haig', 18.99, 40, 'Fiction', 'English',
   'https://picsum.photos/seed/bookgift-1/480/640',
   'Between life and death there is a library, and within it, infinite books offering the chance to try another life. A luminous novel about regret, hope, and the lives we could have lived.'),
  ('Atomic Habits', 'James Clear', 21.00, 60, 'Non-Fiction', 'English',
   'https://picsum.photos/seed/bookgift-2/480/640',
   'An easy and proven way to build good habits and break bad ones. Tiny changes, remarkable results — a practical framework for improving every day.'),
  ('Where the Crawdads Sing', 'Delia Owens', 16.50, 35, 'Mystery', 'English',
   'https://picsum.photos/seed/bookgift-3/480/640',
   'A painfully beautiful coming-of-age story and a surprising tale of possible murder, set against the marshes of the North Carolina coast.'),
  ('The Song of Achilles', 'Madeline Miller', 17.25, 28, 'Romance', 'English',
   'https://picsum.photos/seed/bookgift-4/480/640',
   'A tale of gods, kings, immortal fame, and the human heart. Madeline Miller reimagines Homer''s Iliad through a luminous love story.'),
  ('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 24.99, 50, 'Science', 'English',
   'https://picsum.photos/seed/bookgift-5/480/640',
   'From the Stone Age to the Silicon Age, a sweeping exploration of how Homo sapiens came to rule the world.'),
  ('The Very Hungry Caterpillar', 'Eric Carle', 9.99, 80, 'Children', 'English',
   'https://picsum.photos/seed/bookgift-6/480/640',
   'A beloved picture book following one very hungry caterpillar as it eats its way to a beautiful transformation. A perfect first gift.'),
  ('Milk and Honey', 'Rupi Kaur', 14.00, 45, 'Poetry', 'English',
   'https://picsum.photos/seed/bookgift-7/480/640',
   'A collection of poetry and prose about survival, the experience of violence, abuse, love, loss, and femininity.'),
  ('Becoming', 'Michelle Obama', 22.50, 38, 'Biography', 'English',
   'https://picsum.photos/seed/bookgift-8/480/640',
   'An intimate, powerful, and inspiring memoir by the former First Lady of the United States.'),
  ('Project Hail Mary', 'Andy Weir', 19.99, 42, 'Science', 'English',
   'https://picsum.photos/seed/bookgift-9/480/640',
   'A lone astronaut must save the earth from disaster in this cinematic, science-packed thriller from the author of The Martian.'),
  ('The Seven Husbands of Evelyn Hugo', 'Taylor Jenkins Reid', 16.99, 55, 'Romance', 'English',
   'https://picsum.photos/seed/bookgift-10/480/640',
   'Aging Hollywood icon Evelyn Hugo finally tells the truth about her glamorous and scandalous life — and the seven marriages along the way.'),
  ('Educated', 'Tara Westover', 18.00, 33, 'Biography', 'English',
   'https://picsum.photos/seed/bookgift-11/480/640',
   'A memoir about a young woman who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.'),
  ('The Hobbit', 'J.R.R. Tolkien', 15.75, 70, 'Fiction', 'English',
   'https://picsum.photos/seed/bookgift-12/480/640',
   'Bilbo Baggins is swept into an epic quest to reclaim a treasure guarded by a dragon. The timeless prelude to The Lord of the Rings.')
on conflict do nothing;
