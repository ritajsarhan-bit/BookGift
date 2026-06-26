// BookGift Home Page Additional Sections
// Newsletter signup, testimonials, stats, and promotional banners

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMail, FiCheck, FiStar, FiBook, FiUsers, FiPackage, FiAward, FiArrowRight } from 'react-icons/fi';

// ─── NEWSLETTER SECTION ───────────────────────────────────────────────────────

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-800 py-16">
      <div className="max-w-3xl mx-auto px-4 text-center text-white">
        <div className="text-4xl mb-4">📬</div>
        <h2 className="text-3xl font-bold mb-3">Stay in the Loop</h2>
        <p className="text-blue-200 mb-8 text-lg">
          Get weekly book recommendations, new arrivals, and exclusive deals — straight to your inbox.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 bg-white/10 rounded-2xl p-5">
            <div className="bg-green-400 rounded-full p-1">
              <FiCheck className="text-white" size={20} />
            </div>
            <p className="text-lg font-medium">You are subscribed! Thank you.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-lg mx-auto">
            <div className="flex-1 flex items-center bg-white rounded-xl px-4 gap-2">
              <FiMail className="text-gray-400 flex-shrink-0" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 py-3 text-gray-900 text-sm outline-none placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold px-6 py-3 rounded-xl transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}

        <p className="text-blue-300 text-xs mt-4">No spam ever. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

// ─── STATS SECTION ────────────────────────────────────────────────────────────

const STATS = [
  { icon: <FiBook size={28} />, value: '10,000+', label: 'Books Available', labelHe: 'ספרים זמינים' },
  { icon: <FiUsers size={28} />, value: '5,000+', label: 'Happy Customers', labelHe: 'לקוחות מרוצים' },
  { icon: <FiPackage size={28} />, value: '15,000+', label: 'Orders Delivered', labelHe: 'הזמנות שנמסרו' },
  { icon: <FiAward size={28} />, value: '4.8★', label: 'Average Rating', labelHe: 'דירוג ממוצע' },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-blue-600 flex justify-center mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: 'Sarah Cohen',
    role: 'Book Club Organizer',
    avatar: '👩',
    rating: 5,
    text: 'BookGift is my go-to for finding unique books for our monthly book club. The AI recommendations are surprisingly accurate and the gift wrapping is beautiful!',
  },
  {
    name: 'David Levi',
    role: 'Software Engineer',
    avatar: '👨‍💻',
    rating: 5,
    text: 'I have been buying programming books here for over a year. The selection is excellent and delivery is always fast. Highly recommend the tech books section.',
  },
  {
    name: 'Miriam Shapiro',
    role: 'Teacher',
    avatar: '👩‍🏫',
    rating: 5,
    text: 'As a Hebrew teacher I love that BookGift has such a great selection of Hebrew books. It makes gifting books to my students so much easier and more personal.',
  },
  {
    name: 'Yosef Goldstein',
    role: 'Parent',
    avatar: '👨',
    rating: 4,
    text: 'Ordered a gift-wrapped children book set for my son birthday. The wrapping was gorgeous and the books arrived in perfect condition. Will order again!',
  },
  {
    name: 'Rachel Ben-David',
    role: 'University Student',
    avatar: '👩‍🎓',
    rating: 5,
    text: 'Found all my course textbooks here at better prices than the university bookstore. The chatbot helped me find the exact editions I needed for my CS degree.',
  },
  {
    name: 'Amit Kaufman',
    role: 'Entrepreneur',
    avatar: '🧑‍💼',
    rating: 5,
    text: 'The business books collection is fantastic. I regularly buy books for my team as gifts and the bulk ordering process is smooth. Great customer service too.',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">What Our Readers Say</h2>
          <p className="text-gray-500 text-lg">Trusted by thousands of book lovers across Israel and beyond</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <FiStar
                    key={j}
                    size={16}
                    className={j < t.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="text-3xl">{t.avatar}</div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROMOTIONAL BANNER ───────────────────────────────────────────────────────

export function PromoBanner() {
  return (
    <section className="py-10 bg-amber-50 border-y border-amber-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🎁</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Free Shipping on Orders Over $50</h3>
              <p className="text-gray-600 text-sm mt-1">Plus free gift wrapping on your first order — use code <span className="font-bold text-blue-700">FIRSTGIFT</span></p>
            </div>
          </div>
          <Link
            href="/books"
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
          >
            Shop Now <FiArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── CATEGORY SHOWCASE ────────────────────────────────────────────────────────

const CATEGORY_SHOWCASE = [
  { emoji: '💻', name: 'Programming', slug: 'programming', books: 55, color: 'from-blue-500 to-blue-600', description: 'JavaScript, Python, algorithms and more' },
  { emoji: '📖', name: 'Fiction', slug: 'fiction', books: 43, color: 'from-purple-500 to-purple-600', description: 'Novels, thrillers and classics' },
  { emoji: '🔬', name: 'Science', slug: 'science', books: 22, color: 'from-green-500 to-green-600', description: 'Physics, biology and cosmos' },
  { emoji: '🧸', name: 'Children', slug: 'children', books: 18, color: 'from-yellow-500 to-yellow-600', description: 'Picture books and young readers' },
  { emoji: '🌱', name: 'Self Help', slug: 'self-help', books: 31, color: 'from-teal-500 to-teal-600', description: 'Habits, mindset and success' },
  { emoji: '✡️', name: 'Hebrew Books', slug: 'hebrew-literature', books: 24, color: 'from-indigo-500 to-indigo-600', description: 'Literature in Hebrew' },
  { emoji: '🏛️', name: 'History', slug: 'history', books: 19, color: 'from-orange-500 to-orange-600', description: 'Ancient and modern history' },
  { emoji: '💼', name: 'Business', slug: 'business', books: 27, color: 'from-gray-600 to-gray-700', description: 'Startups, finance and leadership' },
];

export function CategoryShowcase() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Browse by Category</h2>
          <p className="text-gray-500 text-lg">Find exactly what you are looking for</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORY_SHOWCASE.map((cat) => (
            <Link
              key={cat.slug}
              href={`/books?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl p-5 text-white hover:scale-105 transition-all duration-300 shadow-sm"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color}`} />
              <div className="relative">
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <h3 className="font-bold text-lg mb-1">{cat.name}</h3>
                <p className="text-white/80 text-xs mb-2">{cat.description}</p>
                <p className="text-white/60 text-xs">{cat.books} books</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GIFT IDEA SECTION ────────────────────────────────────────────────────────

const GIFT_IDEAS = [
  { emoji: '👨', label: 'For Dad', query: 'history biography leadership' },
  { emoji: '👩', label: 'For Mom', query: 'fiction self-help cooking' },
  { emoji: '🧒', label: 'For Kids', query: 'children picture books' },
  { emoji: '👨‍💻', label: 'For Developers', query: 'programming javascript python' },
  { emoji: '🎓', label: 'For Graduates', query: 'self-help business career' },
  { emoji: '❤️', label: 'For Your Love', query: 'romance fiction poetry' },
  { emoji: '👴', label: 'For Grandparents', query: 'history memoir biography' },
  { emoji: '🌍', label: 'For Travelers', query: 'travel geography adventure' },
];

export function GiftIdeasSection() {
  return (
    <section className="py-14 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Gift Ideas for Everyone</h2>
          <p className="text-gray-500 text-lg">Not sure what to buy? We have got you covered.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {GIFT_IDEAS.map((idea) => (
            <Link
              key={idea.label}
              href={`/books?search=${encodeURIComponent(idea.query)}`}
              className="bg-white hover:bg-blue-700 hover:text-white rounded-2xl p-5 text-center transition-all duration-200 border border-blue-100 hover:border-blue-700 group shadow-sm"
            >
              <div className="text-4xl mb-3">{idea.emoji}</div>
              <p className="font-semibold text-sm group-hover:text-white">{idea.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
