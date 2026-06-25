'use client';

import { useSession } from 'next-auth/react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session } = useSession();
  const { language, setLanguage } = useLanguage();

  if (!session) {
    return (
      <div className="section text-center py-20">
        <Link href="/login" className="btn-primary">Sign In</Link>
      </div>
    );
  }

  const user = session.user as any;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      <div className="card p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-2xl">
            {user.name?.[0] ?? '?'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${user.role === 'ADMIN' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
              {user.role}
            </span>
          </div>
        </div>

        {/* Language preference */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Preferred Language</h3>
          <div className="flex gap-3">
            <button
              onClick={() => setLanguage('en')}
              className={`flex-1 py-2 rounded-lg border-2 font-medium text-sm transition-colors ${language === 'en' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
            >
              🇺🇸 English
            </button>
            <button
              onClick={() => setLanguage('he')}
              className={`flex-1 py-2 rounded-lg border-2 font-medium text-sm transition-colors ${language === 'he' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
            >
              🇮🇱 עברית
            </button>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { href: '/orders', icon: '📦', label: 'My Orders' },
          { href: '/wishlist', icon: '❤️', label: 'Wishlist' },
          { href: '/cart', icon: '🛒', label: 'Cart' },
          ...(user.role === 'ADMIN' ? [{ href: '/admin', icon: '⚙️', label: 'Admin Panel' }] : []),
        ].map((link) => (
          <Link key={link.href} href={link.href} className="card p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
            <span className="text-2xl">{link.icon}</span>
            <span className="font-medium text-gray-800">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
