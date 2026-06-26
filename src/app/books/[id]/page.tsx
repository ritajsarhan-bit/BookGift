export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BookDetail from '@/components/books/BookDetail';

interface Props {
  params: { id: string };
}

async function getBook(id: string) {
  try {
    const safeId = id.replace(/'/g, "''");
    const books = await prisma.$queryRawUnsafe(
      `SELECT id, title, author, description, price, stock, category, language, image_url FROM books WHERE id = '${safeId}'::uuid LIMIT 1`
    ) as any[];
    return books[0] || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await getBook(params.id);
  if (!book) return { title: 'Book Not Found' };
  return {
    title: `${book.title} by ${book.author}`,
    description: book.description?.slice(0, 160),
  };
}

export default async function BookPage({ params }: Props) {
  const raw = await getBook(params.id);
  if (!raw) notFound();

  const book = {
    id: raw.id,
    title: raw.title,
    titleHe: null,
    author: raw.author,
    description: raw.description,
    price: Number(raw.price),
    discountPrice: null,
    priceILS: null,
    coverImage: raw.image_url || null,
    stock: raw.stock ?? 10,
    rating: 4.5,
    reviewCount: 0,
    language: raw.language || 'en',
    pages: null,
    publisher: null,
    publishedAt: null,
    isbn: null,
    category: raw.category ? { name: raw.category, nameHe: null, slug: raw.category.toLowerCase().replace(/\s+/g, '-') } : null,
    reviews: [],
  };

  return <BookDetail book={book as any} relatedBooks={[]} />;
}
