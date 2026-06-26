'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiGift } from 'react-icons/fi';

export default function HeroSection() {
  const { t } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/books?search=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/30 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 bg-amber-400 text-amber-900 text-sm font-bold px-4 py-1.5 rounded-full mb-6">
            <FiGift size={16} />
            Gift Books with Love
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {t.home.hero_title}
          </h1>

          <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
            {t.home.hero_subtitle}
          </p>

          <form onSubmit={handleSearch} className="flex gap-2 mb-8 max-w-lg">
            <div className="flex-1 flex items-center bg-white rounded-xl px-4 py-3 gap-2">
              <FiSearch className="text-gray-400 flex-shrink-0" size={20} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.home.search_placeholder}
                className="flex-1 text-gray-900 outline-none placeholder-gray-400"
              />
            </div>
            <button type="submit" className="bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold px-6 py-3 rounded-xl transition-colors">
              {t.home.hero_cta}
            </button>
          </form>

          <div className="flex flex-wrap gap-3">
            {['Programming', 'Fiction', 'Science', 'Hebrew Books', 'Children'].map((tag) => (
              <Link
                key={tag}
                href={`/books?search=${encodeURIComponent(tag)}`}
                className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-full transition-colors backdrop-blur-sm"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
