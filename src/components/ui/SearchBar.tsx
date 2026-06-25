'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiX } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

interface SearchResult {
  id: string;
  title: string;
  author: string;
  price: number;
  discountPrice?: number | null;
  coverImage?: string | null;
}

interface Props {
  onClose: () => void;
}

export default function SearchBar({ onClose }: Props) {
  const { t } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when the search overlay opens
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Search as user types (debounced)
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/books?search=${encodeURIComponent(query)}&limit=5`);
        const data = await res.json();
        setResults(data.books || []);
      } catch {
        // ignore errors in search autocomplete
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/books?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    // Full-screen overlay
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Search input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-3 p-4 border-b border-gray-100">
          <FiSearch className="text-gray-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.home.search_placeholder}
            className="flex-1 text-lg outline-none text-gray-900 placeholder-gray-400"
          />
          {loading && <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />}
          <button type="button" onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
            <FiX size={20} />
          </button>
        </form>

        {/* Results dropdown */}
        {results.length > 0 && (
          <ul className="py-2 max-h-80 overflow-y-auto">
            {results.map((book) => (
              <li key={book.id}>
                <Link
                  href={`/books/${book.id}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  onClick={onClose}
                >
                  <div className="relative w-10 h-14 flex-shrink-0 bg-gray-100 rounded">
                    {book.coverImage && (
                      <Image src={book.coverImage} alt={book.title} fill className="object-cover rounded" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{book.title}</p>
                    <p className="text-sm text-gray-500">{book.author}</p>
                  </div>
                  <span className="text-sm font-semibold text-blue-700">
                    {formatPrice(book.discountPrice ?? book.price)}
                  </span>
                </Link>
              </li>
            ))}
            <li className="px-4 py-2 border-t border-gray-100">
              <button
                onClick={handleSubmit as any}
                className="text-sm text-blue-700 hover:underline font-medium"
              >
                See all results for &quot;{query}&quot; →
              </button>
            </li>
          </ul>
        )}

        {query.length >= 2 && results.length === 0 && !loading && (
          <p className="px-4 py-6 text-center text-gray-500 text-sm">No books found for &quot;{query}&quot;</p>
        )}
      </div>
    </div>
  );
}
