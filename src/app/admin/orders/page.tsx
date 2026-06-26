'use client';

import { useEffect, useState } from 'react';
import { formatPrice } from '@/lib/utils';

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  is_gift: boolean;
  gift_wrapping: boolean;
  gift_message?: string;
  wrapping_style?: string;
  wrapping_color?: string;
  ribbon_color?: string;
  gift_card_design?: string;
  user: { name?: string; email: string };
  items: { book: { title: string }; quantity: number; price: number }[];
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  PAID: 'bg-blue-100 text-blue-700',
  SHIPPED: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

function GiftSummary({ order }: { order: Order }) {
  if (!order.is_gift) return null;
  const parts = [];
  if (order.gift_wrapping && order.wrapping_style) parts.push(order.wrapping_style);
  if (order.wrapping_color) parts.push(`${order.wrapping_color} wrap`);
  if (order.ribbon_color) parts.push(`${order.ribbon_color} ribbon`);
  return (
    <div className="mt-1">
      <span className="inline-flex items-center gap-1 bg-pink-100 text-pink-700 text-xs font-semibold px-2 py-0.5 rounded-full">
        🎁 Gift
      </span>
      {parts.length > 0 && (
        <p className="text-xs text-gray-400 mt-0.5">Gift wrap: {parts.join(', ')}</p>
      )}
    </div>
  );
}

function GiftDetails({ order }: { order: Order }) {
  if (!order.is_gift) return null;
  return (
    <div className="mt-3 p-3 bg-pink-50 border border-pink-100 rounded-lg text-xs text-pink-800 space-y-1">
      <p className="font-semibold">🎁 Gift Order Details</p>
      <p><span className="font-medium">Gift Wrapping:</span> {order.gift_wrapping ? 'Yes' : 'No'}</p>
      {order.wrapping_style && <p><span className="font-medium">Style:</span> {order.wrapping_style}</p>}
      {order.wrapping_color && <p><span className="font-medium">Wrap Color:</span> {order.wrapping_color}</p>}
      {order.ribbon_color && <p><span className="font-medium">Ribbon:</span> {order.ribbon_color}</p>}
      {order.gift_card_design && <p><span className="font-medium">Card Design:</span> {order.gift_card_design}</p>}
      {order.gift_message && <p><span className="font-medium">Message:</span> "{order.gift_message}"</p>}
    </div>
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/orders')
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Orders ({orders.length})</h1>

      {loading ? (
        <p className="text-gray-500">Loading orders…</p>
      ) : orders.length === 0 ? (
        <div className="card p-12 text-center text-gray-400">No orders yet</div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Order</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium hidden md:table-cell">Customer</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium hidden sm:table-cell">Date</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Status</th>
                <th className="text-right px-5 py-3 text-gray-500 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <>
                  <tr
                    key={order.id}
                    className="border-t border-gray-50 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                  >
                    <td className="px-5 py-3">
                      <p className="font-mono font-medium">#{order.id.slice(-8).toUpperCase()}</p>
                      <p className="text-xs text-gray-400">{order.items.length} item(s)</p>
                      <GiftSummary order={order} />
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <p className="font-medium text-gray-800">{order.user?.name || 'Unknown'}</p>
                      <p className="text-xs text-gray-400">{order.user?.email}</p>
                    </td>
                    <td className="px-5 py-3 text-gray-500 hidden sm:table-cell text-xs">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-bold">{formatPrice(order.total)}</td>
                  </tr>
                  {expanded === order.id && (
                    <tr key={`${order.id}-detail`} className="bg-gray-50 border-t border-gray-100">
                      <td colSpan={5} className="px-5 py-3">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-semibold text-gray-500 mb-1">Items</p>
                            {order.items.map((item, i) => (
                              <p key={i} className="text-xs text-gray-700">
                                {item.book.title} × {item.quantity} — {formatPrice(item.price * item.quantity)}
                              </p>
                            ))}
                          </div>
                          <div>
                            <GiftDetails order={order} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
