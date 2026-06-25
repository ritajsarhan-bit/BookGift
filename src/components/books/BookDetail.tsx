'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice, discountPercent } from '@/lib/utils';
import BookCard, { Book } from '@/components/books/BookCard';
import { FiStar, FiHeart, FiShoppingCart, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: Date;
  user: { id: string; name?: string | null; image?: string | null };
}

interface FullBook extends Book {
  priceILS?: number | null;
  description: string;
  descriptionHe?: string | null;
  pages?: number | null;
  publisher?: string | null;
  language: string;
  publishedAt?: Date | null;
  category: { name: string; nameHe?: string | null; slug: string };
  reviews: Review[];
}

interface Props {
  book: FullBook;
  relatedBooks: Book[];
}

export default function BookDetail({ book, relatedBooks }: Props) {
  const { addItem } = useCart();
  const { data: session } = useSession();
  const { t, language } = useLanguage();
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(book.reviews);

  const displayTitle = language === 'he' && book.titleHe ? book.titleHe : book.title;
  const displayDesc = language === 'he' && book.descriptionHe ? book.descriptionHe : book.description;
  const isHebrew = language === 'he';
  const displayPrice = isHebrew && book.priceILS ? book.priceILS : (book.discountPrice ?? book.price);
  const hasDiscount = !isHebrew && book.discountPrice && book.discountPrice < book.price;
  const formatDisplayPrice = (p: number) =>
    isHebrew && book.priceILS ? `₪${p.toFixed(2)}` : formatPrice(p);
  const isOutOfStock = book.stock === 0;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        discountPrice: book.discountPrice,
        coverImage: book.coverImage,
        stock: book.stock,
      });
    }
  };

  const toggleWishlist = async () => {
    if (!session) { toast.error('Please sign in to save to wishlist'); return; }
    const res = await fetch('/api/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId: book.id }),
    });
    const data = await res.json();
    setWishlisted(data.added);
    toast.success(data.added ? 'Added to wishlist' : 'Removed from wishlist');
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) { toast.error('Please sign in to write a review'); return; }
    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId: book.id, rating: reviewRating, comment: reviewComment }),
      });
      if (res.ok) {
        toast.success('Review submitted!');
        setReviewComment('');
        // Refresh reviews
        const updated = await fetch(`/api/books/${book.id}`).then((r) => r.json());
        setReviews(updated.book.reviews || []);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-700">Home</Link> /
        <Link href="/books" className="hover:text-blue-700">{t.nav.books}</Link> /
        <Link href={`/books?category=${book.category.slug}`} className="hover:text-blue-700">
          {language === 'he' && book.category.nameHe ? book.category.nameHe : book.category.name}
        </Link> /
        <span className="text-gray-900 truncate max-w-xs">{displayTitle}</span>
      </nav>

      {/* Main product section */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Cover image */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
            {book.coverImage ? (
              <Image src={book.coverImage} alt={displayTitle} fill className="object-contain" priority />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-8xl bg-gradient-to-br from-blue-100 to-blue-200">📖</div>
            )}
          </div>
        </div>

        {/* Book info */}
        <div className="flex flex-col">
          {/* Language badge */}
          {book.language === 'he' && (
            <span className="self-start bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">עברית</span>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">{displayTitle}</h1>
          <p className="text-lg text-gray-500 mb-4">{t.book.description.includes(':') ? 'by' : 'by'} <span className="font-medium text-gray-700">{book.author}</span></p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1,2,3,4,5].map((s) => (
                <FiStar key={s} size={18} className={s <= Math.round(book.rating) ? 'star-filled fill-current' : 'star-empty'} />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{book.rating.toFixed(1)}</span>
            <span className="text-sm text-gray-400">({book.reviewCount} {t.book.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-blue-800">{formatDisplayPrice(displayPrice)}</span>
            {hasDiscount && (
              <>
                <span className="text-xl text-gray-400 line-through">{formatPrice(book.price)}</span>
                <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded-full">
                  -{discountPercent(book.price, book.discountPrice!)}%
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <p className={`text-sm font-medium mb-5 ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
            {isOutOfStock ? (
              `✗ ${t.book.out_of_stock}`
            ) : (
              `✓ ${t.book.in_stock} (${book.stock} left)`
            )}
          </p>

          {/* Quantity + Add to cart */}
          {!isOutOfStock && (
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-50 text-lg font-bold">−</button>
                <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{qty}</span>
                <button onClick={() => setQty(q => Math.min(book.stock, q + 1))} className="px-3 py-2 hover:bg-gray-50 text-lg font-bold">+</button>
              </div>
              <button onClick={handleAddToCart} className="btn-primary flex items-center gap-2 flex-1 justify-center">
                <FiShoppingCart size={18} />
                {t.book.add_to_cart}
              </button>
            </div>
          )}

          <button
            onClick={toggleWishlist}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 font-medium text-sm transition-colors w-fit ${
              wishlisted ? 'border-red-400 text-red-600 bg-red-50' : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            <FiHeart size={16} className={wishlisted ? 'fill-current' : ''} />
            {wishlisted ? t.book.remove_from_wishlist : t.book.add_to_wishlist}
          </button>

          {/* Book metadata */}
          <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 gap-3 text-sm">
            {book.pages && (
              <div><span className="text-gray-400">{t.book.pages}: </span><span className="font-medium">{book.pages}</span></div>
            )}
            {book.publisher && (
              <div><span className="text-gray-400">{t.book.publisher}: </span><span className="font-medium">{book.publisher}</span></div>
            )}
            <div>
              <span className="text-gray-400">{t.book.language}: </span>
              <span className="font-medium">{book.language === 'he' ? 'Hebrew' : 'English'}</span>
            </div>
            <div>
              <span className="text-gray-400">Category: </span>
              <Link href={`/books?category=${book.category.slug}`} className="font-medium text-blue-700 hover:underline">
                {language === 'he' && book.category.nameHe ? book.category.nameHe : book.category.name}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t.book.description}</h2>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{displayDesc}</p>
      </div>

      {/* Reviews */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{t.book.reviews} ({reviews.length})</h2>

        {/* Write a review */}
        {session && (
          <form onSubmit={submitReview} className="card p-5 mb-6">
            <h3 className="font-semibold mb-3">{t.book.write_review}</h3>
            <div className="flex gap-1 mb-3">
              {[1,2,3,4,5].map((s) => (
                <button key={s} type="button" onClick={() => setReviewRating(s)}>
                  <FiStar size={24} className={s <= reviewRating ? 'star-filled fill-current' : 'star-empty'} />
                </button>
              ))}
            </div>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Share your thoughts about this book..."
              rows={3}
              className="input mb-3"
            />
            <button type="submit" disabled={submitting} className="btn-primary">
              {submitting ? 'Submitting…' : 'Submit Review'}
            </button>
          </form>
        )}

        {/* Review list */}
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">{t.book.no_reviews}</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                      {review.user.name?.[0] ?? '?'}
                    </div>
                    <span className="font-medium text-sm text-gray-900">{review.user.name ?? 'Anonymous'}</span>
                  </div>
                  <div className="flex">
                    {[1,2,3,4,5].map((s) => (
                      <FiStar key={s} size={14} className={s <= review.rating ? 'star-filled fill-current' : 'star-empty'} />
                    ))}
                  </div>
                </div>
                {review.comment && <p className="text-gray-600 text-sm">{review.comment}</p>}
                <p className="text-xs text-gray-400 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related books */}
      {relatedBooks.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">{t.book.related_books}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedBooks.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        </div>
      )}
    </div>
  );
}
