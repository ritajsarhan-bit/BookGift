'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { FiStar, FiThumbsUp } from 'react-icons/fi';
import { formatRelativeTime, getInitials } from '@/lib/utils/formatting';
import { ProgressBar } from '@/components/ui/Animations';

interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user: { name?: string; image?: string };
}

interface Props {
  bookId: string;
  reviews: Review[];
  averageRating?: number;
  reviewCount?: number;
}

function StarInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="text-2xl transition-transform hover:scale-110"
        >
          <FiStar
            className={`${star <= (hover || value) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        </button>
      ))}
    </div>
  );
}

function RatingBreakdown({ reviews }: { reviews: Review[] }) {
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));
  const total = reviews.length;

  return (
    <div className="space-y-1.5">
      {counts.map(({ star, count }) => (
        <div key={star} className="flex items-center gap-2 text-sm">
          <span className="w-4 text-right text-gray-600">{star}</span>
          <FiStar size={12} className="text-yellow-400 fill-yellow-400" />
          <div className="flex-1">
            <ProgressBar
              value={count}
              max={Math.max(total, 1)}
              color="bg-yellow-400"
              showPercent={false}
            />
          </div>
          <span className="w-6 text-right text-gray-400 text-xs">{count}</span>
        </div>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [helpful, setHelpful] = useState(false);
  const [helpCount, setHelpCount] = useState(Math.floor(Math.random() * 10));

  return (
    <div className="card p-5">
      <div className="flex items-start gap-3 mb-3">
        {review.user.image ? (
          <img src={review.user.image} alt={review.user.name || ''} className="w-9 h-9 rounded-full" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 text-sm font-bold flex items-center justify-center flex-shrink-0">
            {getInitials(review.user.name || 'A')}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium text-gray-900 text-sm">{review.user.name || 'Anonymous'}</p>
            <span className="text-xs text-gray-400">{formatRelativeTime(review.createdAt)}</span>
          </div>
          <div className="flex gap-0.5 mt-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <FiStar key={s} size={12} className={s <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
            ))}
          </div>
        </div>
      </div>

      {review.comment && (
        <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
      )}

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
        <button
          onClick={() => { setHelpful(!helpful); setHelpCount((n) => n + (helpful ? -1 : 1)); }}
          className={`flex items-center gap-1.5 text-xs ${helpful ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
        >
          <FiThumbsUp size={12} />
          Helpful ({helpCount})
        </button>
      </div>
    </div>
  );
}

export default function BookReviews({ bookId, reviews, averageRating = 0, reviewCount = 0 }: Props) {
  const { data: session } = useSession();
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [localReviews, setLocalReviews] = useState<Review[]>(reviews);
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest'>('newest');

  const sortedReviews = [...localReviews].sort((a, b) => {
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) { toast.error('Please select a rating'); return; }

    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId, rating, comment }),
      });
      if (!res.ok) throw new Error('Failed to submit review');
      const newReview: Review = {
        id: Date.now().toString(),
        rating,
        comment,
        createdAt: new Date().toISOString(),
        user: { name: session?.user?.name || 'You' },
      };
      setLocalReviews((prev) => [newReview, ...prev]);
      setShowForm(false);
      setRating(0);
      setComment('');
      toast.success('Review submitted!');
    } catch {
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const displayRating = averageRating || (localReviews.length > 0
    ? localReviews.reduce((s, r) => s + r.rating, 0) / localReviews.length
    : 0);

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

      {/* Rating summary */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="text-center">
            <p className="text-5xl font-bold text-gray-900">{displayRating.toFixed(1)}</p>
            <div className="flex justify-center gap-0.5 my-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <FiStar key={s} size={16} className={s <= Math.round(displayRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
              ))}
            </div>
            <p className="text-sm text-gray-500">{reviewCount || localReviews.length} reviews</p>
          </div>
          <div className="flex-1">
            <RatingBreakdown reviews={localReviews} />
          </div>
        </div>
      </div>

      {/* Write review */}
      {session && !showForm && (
        <button onClick={() => setShowForm(true)} className="btn-primary mb-6">
          Write a Review
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="card p-6 mb-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Your Review</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
            <StarInput value={rating} onChange={setRating} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comment (optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Share your thoughts about this book..."
              className="input resize-none"
              maxLength={1000}
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{comment.length}/1000</p>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={submitting} className="btn-primary">
              {submitting ? 'Submitting…' : 'Submit Review'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Sort */}
      {localReviews.length > 1 && (
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-gray-500">Sort by:</span>
          {(['newest', 'highest', 'lowest'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                sortBy === s ? 'bg-blue-700 text-white border-blue-700' : 'text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Review list */}
      {sortedReviews.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <p className="text-4xl mb-3">💬</p>
          <p className="font-medium">No reviews yet</p>
          <p className="text-sm">Be the first to review this book!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </section>
  );
}
