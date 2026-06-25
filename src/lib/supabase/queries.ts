// Data-access helpers that read from Supabase when configured and otherwise fall
// back to the in-memory mock catalog. This lets the UI migrate to real data one
// call site at a time without breaking a fresh checkout.

import type { Book, Genre } from "@/lib/types";
import type { BookRow } from "./database.types";
import { getAllBooks, getBookBySlug as getMockBookBySlug } from "@/lib/data/books";
import { slugify } from "@/lib/utils";
import { getSupabaseServerClient } from "./server";

const GENRES: Genre[] = [
  "Fiction",
  "Non-Fiction",
  "Children",
  "Poetry",
  "Mystery",
  "Romance",
  "Science",
  "Biography",
];

function toGenre(category: string | null): Genre {
  return GENRES.includes(category as Genre) ? (category as Genre) : "Fiction";
}

/** Map a database row to the app's Book domain type used throughout the UI. */
export function mapBookRow(row: BookRow): Book {
  return {
    id: row.id,
    slug: slugify(row.title),
    title: row.title,
    author: row.author,
    price: Number(row.price),
    coverImage: row.image_url ?? `https://picsum.photos/seed/${row.id}/480/640`,
    genre: toGenre(row.category),
    rating: 4.5,
    reviewCount: 0,
    pages: 0,
    publishedYear: new Date(row.created_at).getFullYear(),
    language: row.language,
    description: row.description ?? "",
    stock: 10,
  };
}

/** Fetch the catalog from Supabase, falling back to mock books. */
export async function fetchBooks(): Promise<Book[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return getAllBooks();

  const { data, error } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: true });

  if (error || !data || data.length === 0) return getAllBooks();
  return data.map(mapBookRow);
}

/** Fetch a single book by its slug, falling back to mock books. */
export async function fetchBookBySlug(slug: string): Promise<Book | undefined> {
  const books = await fetchBooks();
  return books.find((b) => b.slug === slug) ?? getMockBookBySlug(slug);
}
