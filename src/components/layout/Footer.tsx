'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-xl mb-3">📚 BookGift</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your online destination for books in English and Hebrew.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/books" className="hover:text-white transition-colors">All Books</Link></li>
              <li><Link href="/books?lang=he" className="hover:text-white transition-colors">Hebrew Books</Link></li>
              <li><Link href="/books?category=programming" className="hover:text-white transition-colors">Programming</Link></li>
              <li><Link href="/books?category=fiction" className="hover:text-white transition-colors">Fiction</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-white font-semibold mb-3">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">Register</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">My Orders</Link></li>
              <li><Link href="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
            </ul>
          </div>

          {/* Language */}
          <div>
            <h4 className="text-white font-semibold mb-3">Language / שפה</h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={`text-sm text-left px-3 py-2 rounded-lg transition-colors ${language === 'en' ? 'bg-blue-700 text-white' : 'hover:bg-gray-800'}`}
              >
                🇺🇸 English
              </button>
              <button
                onClick={() => setLanguage('he')}
                className={`text-sm text-left px-3 py-2 rounded-lg transition-colors ${language === 'he' ? 'bg-blue-700 text-white' : 'hover:bg-gray-800'}`}
              >
                🇮🇱 עברית
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} BookGift. All rights reserved. | Payments secured by Stripe.
        </div>
      </div>
    </footer>
  );
}
