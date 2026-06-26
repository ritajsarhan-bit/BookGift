import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about BookGift - your destination for gifting books in English and Hebrew.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="text-6xl">📚</span>
        <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-4">About BookGift</h1>
        <p className="text-xl text-gray-500">Gift the perfect book, beautifully wrapped.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            BookGift was created to make giving books as a gift simple, personal, and meaningful.
            We believe that the right book can change someone&apos;s life — and we are here to help
            you find it.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What We Offer</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">✓</span> Thousands of books in English and Hebrew</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">✓</span> AI-powered book recommendations</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">✓</span> Beautiful gift wrapping options</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">✓</span> Fast and secure checkout</li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Start Gifting Today</h2>
        <p className="text-gray-500 mb-6">Find the perfect book for someone special.</p>
        <Link href="/books" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-xl transition-colors inline-block">
          Browse Books
        </Link>
      </div>
    </div>
  );
}
