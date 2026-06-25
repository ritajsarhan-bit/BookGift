'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice, discountPercent } from '@/lib/utils';

export interface Book {
  id: string;
  title: string;
  titleHe?: string | null;
  author: string;
  price: number;
  discountPrice?: number | null;
  priceILS?: number | null;
  coverImage?: string | null;
  rating: number;
  reviewCount: number;
  language: string;
  stock: number;
  category?: { name: string; nameHe?: string | null } | null;
}

interface Props {
  book: Book;
}

export default function BookCard({ book }: Props) {
  const { addItem } = useCart();
  const { t, language } = useLanguage();

  const displayTitle = language === 'he' && book.titleHe ? book.titleHe : book.title;
  // Show ₪ price in Hebrew mode if available, otherwise fall back to USD
  const isHebrew = language === 'he';
  const displayPrice = isHebrew && book.priceILS ? book.priceILS : (book.discountPrice ?? book.price);
  const hasDiscount = !isHebrew && book.discountPrice && book.discountPrice < book.price;
  const formatDisplayPrice = (p: number) =>
    isHebrew && book.priceILS ? `₪${p.toFixed(2)}` : formatPrice(p);
  const isOutOfStock = book.stock === 0;

  return (
    <div className="card group flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      {/* Book cover */}
      <Link href={`/books/${book.id}`} className="relative block overflow-hidden">
        <div className="relative w-full pt-[140%] bg-gray-100">
          {book.coverImage ? (
            <Image
              src={book.coverImage}
              alt={displayTitle}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
              <span className="text-5xl">📖</span>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hasDiscount && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              -{discountPercent(book.price, book.discountPrice!)}%
            </span>
          )}
          {book.language === 'he' && (
            <span className="bg-blue-700 text-white text-xs font-bold px-2 py-0.5 rounded-full">עברית</span>
          )}
        </div>

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">
              {t.book.out_of_stock}
            </span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/books/${book.id}`}>
          <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2 hover:text-blue-700 transition-colors mb-1">
            {displayTitle}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mb-2">{book.author}</p>

        {/* Star rating */}
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar
              key={star}
              size={14}
              className={star <= Math.round(book.rating) ? 'star-filled fill-current' : 'star-empty'}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">({book.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4 mt-auto">
          <span className="text-lg font-bold text-blue-800">{formatDisplayPrice(displayPrice)}</span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(book.price)}</span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={() => addItem({
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
            discountPrice: book.discountPrice,
            coverImage: book.coverImage,
            stock: book.stock,
          })}
          disabled={isOutOfStock}
          className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
        >
          <FiShoppingCart size={16} />
          {isOutOfStock ? t.book.out_of_stock : t.book.add_to_cart}
        </button>
      </div>
    </div>
  );
}
