'use client';

import BookCard, { Book } from '@/components/books/BookCard';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

interface Props {
  books: Book[];
}

export default function FeaturedBooks({ books }: Props) {
  const { t } = useLanguage();

  if (books.length === 0) return null;

  return (
    <section className="section">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          ⭐ {t.home.featured_title}
        </h2>
        <Link href="/books" className="text-blue-700 hover:text-blue-800 font-medium text-sm">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
