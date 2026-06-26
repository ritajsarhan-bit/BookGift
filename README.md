# 📚 BookGift - Full-Stack Online Bookstore:

A production-ready online bookstore with English & Hebrew support, AI chatbot, Stripe payments, and an admin dashboard.

---

## 🚀 Quick Start (Step-by-Step for Beginners)

### Step 1 — Install Node.js
If you don't have Node.js, download and install it from: https://nodejs.org (choose the LTS version)

### Step 2 — Install PostgreSQL
Download from: https://www.postgresql.org/download/
- During setup, remember your password for the `postgres` user.
- Keep the default port: **5432**

### Step 3 — Create the database
Open "SQL Shell (psql)" from your Start menu and run:
```sql
CREATE DATABASE bookstore;
```
Then type `\q` to exit.

### Step 4 — Copy the environment file
```bash
# In the BookStore folder, run:
copy .env.example .env
```
Then open `.env` and fill in your values:
- `DATABASE_URL` — replace `password` with your PostgreSQL password
- `NEXTAUTH_SECRET` — any long random string (e.g., `mysecretkey12345`)
- `STRIPE_SECRET_KEY` — from https://dashboard.stripe.com (use test keys)
- `ANTHROPIC_API_KEY` — from https://console.anthropic.com (for the AI chatbot)

### Step 5 — Install dependencies
```bash
npm install
```

### Step 6 — Set up the database
```bash
# Create the database tables
npx prisma migrate dev --name init

# Fill the database with sample books and users
npm run db:seed
```

### Step 7 — Start the development server
```bash
npm run dev
```

Open your browser at: **http://localhost:3000**

---

## 🔑 Demo Login Credentials

| Role  | Email                   | Password  |
|-------|-------------------------|-----------|
| User  | user@example.com        | user123   |
| Admin | admin@bookstore.com     | admin123  |

---

## 📁 Project Structure

```
BookStore/
├── prisma/
│   ├── schema.prisma       ← Database structure (tables & relationships)
│   └── seed.ts             ← Sample data (books, users, categories)
│
├── src/
│   ├── app/                ← All pages (Next.js App Router)
│   │   ├── page.tsx            ← Homepage
│   │   ├── books/              ← Book catalog + detail pages
│   │   ├── cart/               ← Shopping cart
│   │   ├── checkout/           ← Checkout + Stripe payment
│   │   ├── login/ register/    ← Authentication
│   │   ├── orders/             ← Order history
│   │   ├── wishlist/           ← Saved books
│   │   ├── profile/            ← User profile
│   │   ├── admin/              ← Admin dashboard
│   │   └── api/                ← Backend API routes
│   │
│   ├── components/
│   │   ├── layout/         ← Header, Footer
│   │   ├── home/           ← Hero, Featured Books, Category Grid
│   │   ├── books/          ← BookCard, BookDetail, Filters
│   │   ├── chatbot/        ← AI floating chat
│   │   └── ui/             ← Search bar, reusable components
│   │
│   ├── context/
│   │   ├── CartContext.tsx     ← Cart state (add/remove/quantity)
│   │   └── LanguageContext.tsx ← EN/HE language switching + RTL
│   │
│   ├── lib/
│   │   ├── prisma.ts       ← Database client
│   │   ├── auth.ts         ← NextAuth configuration
│   │   └── stripe.ts       ← Stripe client
│   │
│   └── i18n/
│       ├── en.json         ← English translations
│       └── he.json         ← Hebrew translations
│
├── .env.example            ← Environment variable template
├── package.json            ← Dependencies
├── tailwind.config.ts      ← Styling config
└── README.md               ← This file
```

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 🏠 Homepage | Hero, featured books, category grid, search |
| 📚 Book Catalog | Filters by category/language/price, search, pagination, sort |
| 📖 Book Detail | Cover, description, reviews/ratings, related books |
| 🛒 Shopping Cart | Add/remove/update quantity, persistent (localStorage) |
| 💳 Checkout | Stripe payment integration, order confirmation |
| 👤 Auth | Register, login, logout with NextAuth |
| 📦 Order History | View past orders with status |
| ❤️ Wishlist | Save favorite books |
| 🤖 AI Chatbot | Claude-powered floating chatbot (EN + HE) |
| 🌐 Multilingual | Full English + Hebrew with RTL support |
| ⚙️ Admin Panel | Manage books, orders, users, categories |
| 📱 Responsive | Mobile-first design with Tailwind CSS |

---

## 🔧 Useful Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Run production build

npx prisma studio    # Open visual database browser
npx prisma migrate dev --name <name>  # Create a new migration after schema change
npm run db:seed      # Re-seed sample data
```

---

## 🔐 Environment Variables Explained

| Variable | Where to get it | Required? |
|----------|----------------|-----------|
| `DATABASE_URL` | Your local PostgreSQL | ✅ Yes |
| `NEXTAUTH_SECRET` | Any random string | ✅ Yes |
| `NEXTAUTH_URL` | Leave as `http://localhost:3000` in dev | ✅ Yes |
| `STRIPE_SECRET_KEY` | dashboard.stripe.com → API keys | ✅ For payments |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Same as above (publishable) | ✅ For payments |
| `ANTHROPIC_API_KEY` | console.anthropic.com | ✅ For AI chatbot |

---

## 📦 Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes (serverless)
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js (credentials)
- **Payments:** Stripe
- **AI:** Claude (Anthropic SDK)
- **State:** React Context API + Zustand-ready
