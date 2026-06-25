# BookGift 🎁📚

A full-stack **personalized book gifting platform**. Buy hand-picked books and
customize the gift wrapping — choose paper, ribbon, a keepsake box, and add a
personal note.

> **Status:** UI-complete demo build. The database is **not connected yet** —
> all data is mocked in-memory and Supabase clients are scaffolded but inactive.

## Tech stack

| Layer    | Choice                          |
| -------- | ------------------------------- |
| Framework| Next.js 14 (App Router) + TypeScript |
| Styling  | Tailwind CSS                    |
| Backend  | Supabase (scaffolded, not wired)|
| Hosting  | Railway                         |
| Source   | GitHub                          |

## Pages

| Route             | Page                         |
| ----------------- | ---------------------------- |
| `/`               | Homepage                     |
| `/books`          | Books listing (search/filter/sort) |
| `/books/[slug]`   | Book details                 |
| `/gift`           | Gift studio — pick a book    |
| `/gift/[slug]`    | Gift customization + live preview |
| `/cart`           | Cart                         |
| `/checkout`       | Checkout (demo, no payment)  |
| `/login`          | Login                        |
| `/signup`         | Signup                       |
| `/admin`          | Admin dashboard (placeholder)|

An **AI chatbot placeholder** ("Margin") is mounted globally as a floating
widget.

## Architecture

```
src/
├── app/                 # App Router pages
├── components/
│   ├── auth/            # AuthForm (login/signup)
│   ├── books/           # BookCard, BookGrid, BooksBrowser, BookActions
│   ├── cart/            # CartView, OrderSummary
│   ├── checkout/        # CheckoutForm
│   ├── chat/            # ChatbotWidget (AI placeholder)
│   ├── gift/            # GiftCustomizer
│   ├── home/            # Hero, CategoryStrip, GiftBanner
│   ├── layout/          # Header, Footer
│   └── ui/              # Button, Badge, Input, Rating, Container
├── context/             # CartContext (state + localStorage)
└── lib/
    ├── data/            # Mock books / gift wraps (swap for Supabase later)
    ├── supabase/        # Client + server scaffolds (inactive)
    ├── types.ts         # Domain types
    └── utils.ts         # cn(), formatPrice(), makeId()
```

The cart persists to `localStorage` and is shared app-wide via React Context.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build / production:

```bash
npm run build
npm run start
```

## Environment

Copy `.env.example` to `.env.local`. Supabase variables are placeholders —
clients return `null` until they're filled in, so the app runs without them.

## Connecting the database (next step)

1. Create a Supabase project and add the keys to `.env.local`.
2. Create `books`, `gift_wraps`, and `orders` tables matching `src/lib/types.ts`.
3. Replace the accessor function bodies in `src/lib/data/books.ts` with
   Supabase queries (the function signatures already match the UI).
4. Wire `AuthForm` and `Header` to Supabase Auth.

## Deploying to Railway

The repo includes `railway.json` (Nixpacks). Railway runs `npm run build` then
`npm run start`, which binds to `$PORT`. Add your env vars in the Railway
dashboard.
```bash
# or via CLI
railway up
```
