'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/books', label: 'Books', icon: '📚' },
  { href: '/admin/orders', label: 'Orders', icon: '📦' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
  { href: '/admin/categories', label: 'Categories', icon: '🏷️' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      router.replace('/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (!session || (session.user as any)?.role !== 'ADMIN') return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-900 text-gray-300 flex flex-col fixed h-full top-0 left-0 z-40">
        <div className="px-5 py-6 border-b border-gray-800">
          <Link href="/" className="text-white font-bold text-lg">📚 BookStore</Link>
          <p className="text-xs text-gray-500 mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-blue-700 text-white'
                  : 'hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-gray-800">
          <Link href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* Main content (offset by sidebar width) */}
      <main className="ml-56 flex-1 p-8">{children}</main>
    </div>
  );
}
