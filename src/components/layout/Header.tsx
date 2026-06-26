'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiHeart, FiLogOut } from 'react-icons/fi';
import SearchBar from '@/components/ui/SearchBar';

export default function Header() {
  const { data: session } = useSession();
  const { totalItems } = useCart();
  const { t, language, setLanguage, isRTL } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isAdmin = (session?.user as any)?.role === 'ADMIN';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-blue-800">
            📚 BookGift
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-blue-700 transition-colors">{t.nav.home}</Link>
            <Link href="/books" className="hover:text-blue-700 transition-colors">{t.nav.books}</Link>
            <Link href="/books?lang=he" className="hover:text-blue-700 transition-colors">
              ספרים בעברית
            </Link>
            {isAdmin && (
              <Link href="/admin" className="hover:text-blue-700 transition-colors text-amber-600 font-semibold">
                {t.nav.admin}
              </Link>
            )}
          </nav>

          {/* Right-side actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-600 hover:text-blue-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>

            {/* Language switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-sm font-medium border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            >
              {language === 'en' ? '🇮🇱 עברית' : '🇺🇸 English'}
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-600 hover:text-blue-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Cart"
            >
              <FiShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            {/* User menu */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 text-gray-600 hover:text-blue-700 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiUser size={20} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{session.user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                    </div>
                    <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setUserMenuOpen(false)}>
                      <FiUser size={16} /> {t.nav.profile}
                    </Link>
                    <Link href="/orders" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setUserMenuOpen(false)}>
                      📦 {t.nav.orders}
                    </Link>
                    <Link href="/wishlist" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setUserMenuOpen(false)}>
                      <FiHeart size={16} /> {t.nav.wishlist}
                    </Link>
                    {isAdmin && (
                      <Link href="/admin" className="flex items-center gap-2 px-4 py-2 text-sm text-amber-600 font-semibold hover:bg-amber-50" onClick={() => setUserMenuOpen(false)}>
                        ⚙️ {t.nav.admin}
                      </Link>
                    )}
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={() => { signOut({ callbackUrl: '/' }); setUserMenuOpen(false); }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <FiLogOut size={16} /> {t.nav.logout}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors px-3 py-2">
                  {t.nav.login}
                </Link>
                <Link href="/register" className="btn-primary text-sm py-2 px-4">
                  {t.nav.register}
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
            <nav className="flex flex-col gap-3 text-sm font-medium">
              <Link href="/" className="py-2 text-gray-700 hover:text-blue-700" onClick={() => setMobileOpen(false)}>{t.nav.home}</Link>
              <Link href="/books" className="py-2 text-gray-700 hover:text-blue-700" onClick={() => setMobileOpen(false)}>{t.nav.books}</Link>
              <Link href="/cart" className="py-2 text-gray-700 hover:text-blue-700" onClick={() => setMobileOpen(false)}>{t.nav.cart} ({totalItems})</Link>
              {!session && (
                <>
                  <Link href="/login" className="py-2 text-gray-700 hover:text-blue-700" onClick={() => setMobileOpen(false)}>{t.nav.login}</Link>
                  <Link href="/register" className="py-2 text-gray-700 hover:text-blue-700" onClick={() => setMobileOpen(false)}>{t.nav.register}</Link>
                </>
              )}
              <button
                onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
                className="text-left py-2 text-gray-700"
              >
                {language === 'en' ? '🇮🇱 Switch to Hebrew' : '🇺🇸 Switch to English'}
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Search overlay */}
      {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
