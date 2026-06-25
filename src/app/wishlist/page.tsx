'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import BookCard, { Book } from '@/components/books/BookCard';
import { useLanguage } from '@/context/LanguageContext';

export default function WishlistPage() {
  const { data: session } = useSession();
  const { t } = useLanguage();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    fetch('/api/wishlist')
      .then((r) => r.json())
      .then((d) => setBooks(d.wishlist?.map((w: any) => w.book) || []))
      .finally(() => setLoading(false));
  }, [session]);

  if (!session) {
    return (
      <div className="section text-center py-20">
        <h2 className="text-xl font-bold mb-4">Please sign in to view your wishlist</h2>
        <Link href="/login" className="btn-primary">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        ❤️ {t.nav.wishlist} ({books.length})
      </h1>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="w-full pt-[140%] bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">💔</p>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-6">Save books you love for later.</p>
          <Link href="/books" className="btn-primary">Browse Books</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {books.map((book) => <BookCard key={book.id} book={book} />)}
        </div>
      )}
    </div>
  );
}
