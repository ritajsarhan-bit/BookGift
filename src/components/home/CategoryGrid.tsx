'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

interface Category {
  id: string;
  name: string;
  nameHe?: string | null;
  slug: string;
  image?: string | null;
  _count: { books: number };
}

interface Props {
  categories: Category[];
}

export default function CategoryGrid({ categories }: Props) {
  const { t, language } = useLanguage();

  return (
    <section className="bg-gray-50 py-16">
      <div className="section py-0">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          📂 {t.home.categories_title}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/books?category=${cat.slug}`}
              className="group card p-4 text-center hover:shadow-md hover:border-blue-200 transition-all duration-200"
            >
              {/* Category image or emoji */}
              <div className="relative w-full pt-[75%] rounded-lg overflow-hidden bg-blue-50 mb-3">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-3xl">
                    📚
                  </div>
                )}
              </div>

              <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">
                {language === 'he' && cat.nameHe ? cat.nameHe : cat.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1">{cat._count.books} books</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
