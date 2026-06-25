'use client';

import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="section text-center py-32">
        <p className="text-7xl mb-6">🛒</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{t.cart.empty}</h1>
        <p className="text-gray-500 mb-8">Looks like you haven&apos;t added any books yet.</p>
        <Link href="/books" className="btn-primary inline-flex items-center gap-2">
          <FiShoppingBag size={18} />
          {t.cart.empty_cta}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        {t.cart.title} ({totalItems})
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ book, quantity }) => (
            <div key={book.id} className="card p-4 flex items-center gap-4">
              {/* Cover */}
              <Link href={`/books/${book.id}`} className="relative w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                {book.coverImage ? (
                  <Image src={book.coverImage} alt={book.title} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">📖</div>
                )}
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link href={`/books/${book.id}`} className="font-semibold text-gray-900 hover:text-blue-700 line-clamp-2">
                  {book.title}
                </Link>
                <p className="text-sm text-gray-500 mt-0.5">{book.author}</p>
                <p className="text-blue-700 font-bold mt-1">
                  {formatPrice(book.discountPrice ?? book.price)}
                </p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(book.id, quantity - 1)}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <FiMinus size={14} />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(book.id, quantity + 1)}
                  disabled={quantity >= book.stock}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40"
                >
                  <FiPlus size={14} />
                </button>
              </div>

              {/* Item total */}
              <p className="text-gray-900 font-semibold w-20 text-right hidden sm:block">
                {formatPrice((book.discountPrice ?? book.price) * quantity)}
              </p>

              {/* Remove */}
              <button
                onClick={() => removeItem(book.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t.checkout.order_summary}</h2>

            <div className="space-y-3 mb-4">
              {items.map(({ book, quantity }) => (
                <div key={book.id} className="flex justify-between text-sm text-gray-600">
                  <span className="truncate pr-2">{book.title} × {quantity}</span>
                  <span className="flex-shrink-0">{formatPrice((book.discountPrice ?? book.price) * quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between font-bold text-gray-900 text-lg">
                <span>{t.cart.total}</span>
                <span className="text-blue-800">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Shipping calculated at checkout</p>
            </div>

            <Link href="/checkout" className="btn-primary w-full text-center block">
              {t.cart.checkout}
            </Link>

            <Link href="/books" className="block text-center text-sm text-blue-700 hover:underline mt-4">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
