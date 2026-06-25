'use client';

import { useEffect, useState } from 'react';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

interface Stats {
  totalBooks: number;
  totalUsers: number;
  totalOrders: number;
  revenue: number;
  recentOrders: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1,2,3,4].map((i) => (
          <div key={i} className="card p-6 animate-pulse h-28">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  const STAT_CARDS = [
    { label: 'Total Books', value: stats?.totalBooks ?? 0, icon: '📚', color: 'bg-blue-50 text-blue-700', link: '/admin/books' },
    { label: 'Total Users', value: stats?.totalUsers ?? 0, icon: '👥', color: 'bg-green-50 text-green-700', link: '/admin/users' },
    { label: 'Total Orders', value: stats?.totalOrders ?? 0, icon: '📦', color: 'bg-purple-50 text-purple-700', link: '/admin/orders' },
    { label: 'Revenue', value: formatPrice(stats?.revenue ?? 0), icon: '💰', color: 'bg-amber-50 text-amber-700' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {STAT_CARDS.map((s) => (
          <div key={s.label} className={`card p-6 ${s.link ? 'hover:shadow-md transition-shadow cursor-pointer' : ''}`}>
            {s.link ? (
              <Link href={s.link} className="block">
                <StatCard {...s} />
              </Link>
            ) : (
              <StatCard {...s} />
            )}
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 mb-8">
        <Link href="/admin/books?action=add" className="btn-primary">+ Add Book</Link>
        <Link href="/admin/categories" className="btn-secondary">Manage Categories</Link>
      </div>

      {/* Recent orders */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-blue-600 hover:underline">View all</Link>
        </div>
        {stats?.recentOrders && stats.recentOrders.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Order</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Customer</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Status</th>
                <th className="text-right px-6 py-3 text-gray-500 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order: any) => (
                <tr key={order.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-3 font-mono text-gray-500">#{order.id.slice(-6).toUpperCase()}</td>
                  <td className="px-6 py-3 text-gray-700">{order.user?.name ?? 'Unknown'}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      order.status === 'PAID' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{order.status}</span>
                  </td>
                  <td className="px-6 py-3 text-right font-semibold">{formatPrice(order.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="px-6 py-8 text-center text-gray-400">No orders yet</p>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: string | number; icon: string; color: string }) {
  return (
    <>
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${color} text-xl mb-3`}>
        {icon}
      </div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </>
  );
}
