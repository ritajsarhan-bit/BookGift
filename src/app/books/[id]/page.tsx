export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BookDetail from '@/components/books/BookDetail';

interface Props {
  params: { id: string };
}

// Generate SEO metadata for each book
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await prisma.book.findUnique({
    where: { id: params.id },
    select: { title: true, author: true, description: true, coverImage: true },
  });
  if (!book) return { title: 'Book Not Found' };
  return {
    title: `${book.title} by ${book.author}`,
    description: book.description.slice(0, 160),
    openGraph: {
      images: book.coverImage ? [book.coverImage] : [],
    },
  };
}

export default async function BookPage({ params }: Props) {
  const book = await prisma.book.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      reviews: {
        include: { user: { select: { id: true, name: true, image: true } } },
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
    },
  });

  if (!book) notFound();

  // Related books — same category, not this book
  const relatedBooks = await prisma.book.findMany({
    where: {
      categoryId: book.categoryId,
      id: { not: book.id },
      published: true,
    },
    include: { category: true },
    take: 4,
  });

  return <BookDetail book={book} relatedBooks={relatedBooks} />;
}
