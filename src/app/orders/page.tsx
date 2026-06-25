'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  items: {
    id: string;
    quantity: number;
    price: number;
    book: { id: string; title: string; coverImage?: string | null };
  }[];
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  PAID: 'bg-blue-100 text-blue-700',
  SHIPPED: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    fetch('/api/orders')
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []))
      .finally(() => setLoading(false));
  }, [session]);

  if (!session) {
    return (
      <div className="section text-center py-20">
        <h2 className="text-xl font-bold mb-4">Please sign in to view your orders</h2>
        <Link href="/login" className="btn-primary">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map((i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📦</p>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6">Your orders will appear here after you make a purchase.</p>
          <Link href="/books" className="btn-primary">Shop Now</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-400 font-mono">#{order.id.slice(-8).toUpperCase()}</p>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {order.status}
                  </span>
                  <span className="font-bold text-blue-800">{formatPrice(order.total)}</span>
                </div>
              </div>

              {/* Book thumbnails */}
              <div className="flex gap-3 flex-wrap">
                {order.items.map((item) => (
                  <Link key={item.id} href={`/books/${item.book.id}`} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors">
                    <div className="relative w-8 h-10 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                      {item.book.coverImage && (
                        <Image src={item.book.coverImage} alt={item.book.title} fill className="object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-800 max-w-[120px] truncate">{item.book.title}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
