import type { Book, Category, GiftWrap, Genre } from "@/lib/types";

// ---------------------------------------------------------------------------
// MOCK DATA
// The database is not wired up yet. These in-memory collections mimic the shape
// of future Supabase tables so the UI is fully functional today. Swap the
// accessor functions at the bottom for real queries when the DB is ready.
// ---------------------------------------------------------------------------

const cover = (id: string) =>
  `https://picsum.photos/seed/bookgift-${id}/480/640`;

export const books: Book[] = [
  {
    id: "1",
    slug: "the-midnight-library",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 18.99,
    coverImage: cover("1"),
    genre: "Fiction",
    rating: 4.6,
    reviewCount: 2841,
    pages: 304,
    publishedYear: 2020,
    language: "English",
    description:
      "Between life and death there is a library, and within it, infinite books offering the chance to try another life. A luminous novel about regret, hope, and the lives we could have lived.",
    featured: true,
    bestseller: true,
  },
  {
    id: "2",
    slug: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    price: 21.0,
    coverImage: cover("2"),
    genre: "Non-Fiction",
    rating: 4.8,
    reviewCount: 9120,
    pages: 320,
    publishedYear: 2018,
    language: "English",
    description:
      "An easy and proven way to build good habits and break bad ones. Tiny changes, remarkable results — a practical framework for improving every day.",
    featured: true,
    bestseller: true,
  },
  {
    id: "3",
    slug: "where-the-crawdads-sing",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: 16.5,
    coverImage: cover("3"),
    genre: "Mystery",
    rating: 4.7,
    reviewCount: 5403,
    pages: 384,
    publishedYear: 2018,
    language: "English",
    description:
      "A painfully beautiful coming-of-age story and a surprising tale of possible murder, set against the marshes of the North Carolina coast.",
    featured: true,
  },
  {
    id: "4",
    slug: "the-song-of-achilles",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    price: 17.25,
    coverImage: cover("4"),
    genre: "Romance",
    rating: 4.5,
    reviewCount: 3120,
    pages: 416,
    publishedYear: 2011,
    language: "English",
    description:
      "A tale of gods, kings, immortal fame, and the human heart. Madeline Miller reimagines Homer's Iliad through a luminous love story.",
    bestseller: true,
  },
  {
    id: "5",
    slug: "sapiens",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    price: 24.99,
    coverImage: cover("5"),
    genre: "Science",
    rating: 4.6,
    reviewCount: 7805,
    pages: 464,
    publishedYear: 2011,
    language: "English",
    description:
      "From the Stone Age to the Silicon Age, a sweeping exploration of how Homo sapiens came to rule the world.",
    featured: true,
  },
  {
    id: "6",
    slug: "the-very-hungry-caterpillar",
    title: "The Very Hungry Caterpillar",
    author: "Eric Carle",
    price: 9.99,
    coverImage: cover("6"),
    genre: "Children",
    rating: 4.9,
    reviewCount: 12010,
    pages: 26,
    publishedYear: 1969,
    language: "English",
    description:
      "A beloved picture book following one very hungry caterpillar as it eats its way to a beautiful transformation. A perfect first gift.",
  },
  {
    id: "7",
    slug: "milk-and-honey",
    title: "Milk and Honey",
    author: "Rupi Kaur",
    price: 14.0,
    coverImage: cover("7"),
    genre: "Poetry",
    rating: 4.3,
    reviewCount: 4209,
    pages: 208,
    publishedYear: 2014,
    language: "English",
    description:
      "A collection of poetry and prose about survival, the experience of violence, abuse, love, loss, and femininity.",
  },
  {
    id: "8",
    slug: "becoming",
    title: "Becoming",
    author: "Michelle Obama",
    price: 22.5,
    coverImage: cover("8"),
    genre: "Biography",
    rating: 4.8,
    reviewCount: 8650,
    pages: 448,
    publishedYear: 2018,
    language: "English",
    description:
      "An intimate, powerful, and inspiring memoir by the former First Lady of the United States.",
    bestseller: true,
  },
  {
    id: "9",
    slug: "project-hail-mary",
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 19.99,
    coverImage: cover("9"),
    genre: "Science",
    rating: 4.7,
    reviewCount: 6011,
    pages: 496,
    publishedYear: 2021,
    language: "English",
    description:
      "A lone astronaut must save the earth from disaster in this cinematic, science-packed thriller from the author of The Martian.",
    featured: true,
  },
  {
    id: "10",
    slug: "the-seven-husbands-of-evelyn-hugo",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    price: 16.99,
    coverImage: cover("10"),
    genre: "Romance",
    rating: 4.8,
    reviewCount: 9980,
    pages: 400,
    publishedYear: 2017,
    language: "English",
    description:
      "Aging Hollywood icon Evelyn Hugo finally tells the truth about her glamorous and scandalous life — and the seven marriages along the way.",
    bestseller: true,
  },
  {
    id: "11",
    slug: "educated",
    title: "Educated",
    author: "Tara Westover",
    price: 18.0,
    coverImage: cover("11"),
    genre: "Biography",
    rating: 4.7,
    reviewCount: 7321,
    pages: 352,
    publishedYear: 2018,
    language: "English",
    description:
      "A memoir about a young woman who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
  },
  {
    id: "12",
    slug: "the-hobbit",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 15.75,
    coverImage: cover("12"),
    genre: "Fiction",
    rating: 4.8,
    reviewCount: 15230,
    pages: 310,
    publishedYear: 1937,
    language: "English",
    description:
      "Bilbo Baggins is swept into an epic quest to reclaim a treasure guarded by a dragon. The timeless prelude to The Lord of the Rings.",
  },
];

export const giftWraps: GiftWrap[] = [
  { id: "kraft", name: "Classic Kraft", price: 3.5, color: "#C2A47E" },
  { id: "rose", name: "Rose Blush", price: 4.0, color: "#E8B4C2" },
  { id: "forest", name: "Forest Green", price: 4.0, color: "#5B6B4E" },
  { id: "midnight", name: "Midnight Stars", price: 4.5, color: "#27304A" },
  { id: "gold", name: "Gilded Gold", price: 5.0, color: "#C9A24B" },
  { id: "linen", name: "Ivory Linen", price: 4.5, color: "#EDE6D6" },
];

export const ribbonColors: { id: string; name: string; color: string }[] = [
  { id: "burgundy", name: "Burgundy", color: "#8E2D52" },
  { id: "gold", name: "Gold", color: "#C9A24B" },
  { id: "sage", name: "Sage", color: "#5B6B4E" },
  { id: "navy", name: "Navy", color: "#27304A" },
  { id: "blush", name: "Blush", color: "#E8B4C2" },
];

export const categories: Category[] = [
  { name: "Fiction", description: "Stories that stay with you", icon: "📖" },
  { name: "Non-Fiction", description: "Ideas worth knowing", icon: "💡" },
  { name: "Children", description: "First favorites", icon: "🧸" },
  { name: "Poetry", description: "Words that linger", icon: "🕊️" },
  { name: "Mystery", description: "Page-turning suspense", icon: "🔍" },
  { name: "Romance", description: "Love in every chapter", icon: "💌" },
  { name: "Science", description: "Wonder, explained", icon: "🔬" },
  { name: "Biography", description: "Lives well told", icon: "🎙️" },
];

// ---------------------------------------------------------------------------
// Accessors — replace internals with Supabase queries later.
// ---------------------------------------------------------------------------

export function getAllBooks(): Book[] {
  return books;
}

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export function getBookById(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}

export function getFeaturedBooks(): Book[] {
  return books.filter((b) => b.featured);
}

export function getBestsellers(): Book[] {
  return books.filter((b) => b.bestseller);
}

export function getBooksByGenre(genre: Genre): Book[] {
  return books.filter((b) => b.genre === genre);
}

export function getRelatedBooks(book: Book, limit = 4): Book[] {
  return books
    .filter((b) => b.id !== book.id && b.genre === book.genre)
    .slice(0, limit);
}

export const genres: Genre[] = [
  "Fiction",
  "Non-Fiction",
  "Children",
  "Poetry",
  "Mystery",
  "Romance",
  "Science",
  "Biography",
];
