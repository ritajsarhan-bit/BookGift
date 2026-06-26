'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface OrderDetails {
  id: string;
  is_gift: boolean;
  gift_wrapping: boolean;
  gift_message?: string;
  wrapping_style?: string;
  wrapping_color?: string;
  ribbon_color?: string;
  gift_card_design?: string;
}

function GiftConfirmation({ order }: { order: OrderDetails }) {
  if (!order.is_gift) return null;
  return (
    <div className="bg-pink-50 border border-pink-200 rounded-xl p-5 mb-6 text-left">
      <h3 className="font-semibold text-pink-800 mb-3">🎁 Gift Details</h3>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-pink-700">
        <div><span className="font-medium">Gift Order:</span> Yes</div>
        <div><span className="font-medium">Gift Wrapping:</span> {order.gift_wrapping ? 'Yes' : 'No'}</div>
        {order.wrapping_style && (
          <div><span className="font-medium">Style:</span> {order.wrapping_style}</div>
        )}
        {order.wrapping_color && (
          <div><span className="font-medium">Wrap Color:</span> {order.wrapping_color}</div>
        )}
        {order.ribbon_color && (
          <div><span className="font-medium">Ribbon:</span> {order.ribbon_color}</div>
        )}
        {order.gift_card_design && (
          <div><span className="font-medium">Card Design:</span> {order.gift_card_design}</div>
        )}
      </div>
      {order.gift_message && (
        <div className="mt-3 pt-3 border-t border-pink-200">
          <p className="text-sm font-medium text-pink-800 mb-1">Gift Message:</p>
          <p className="text-sm text-pink-700 italic">"{order.gift_message}"</p>
        </div>
      )}
    </div>
  );
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { t } = useLanguage();
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    if (!orderId) return;
    fetch('/api/orders')
      .then((r) => r.json())
      .then((d) => {
        const found = (d.orders || []).find((o: any) => o.id === orderId);
        if (found) setOrder(found);
      })
      .catch(() => {});
  }, [orderId]);

  return (
    <div className="section text-center py-20">
      <div className="max-w-md mx-auto">
        <div className="text-7xl mb-6 animate-bounce">{order?.is_gift ? '🎁' : '🎉'}</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Order Confirmed!</h1>
        <p className="text-gray-600 mb-2">
          Thank you for your purchase. Your books are on their way!
        </p>
        {orderId && (
          <p className="text-sm text-gray-400 mb-6">
            Order ID: <span className="font-mono font-medium text-gray-600">{orderId}</span>
          </p>
        )}

        {order && <GiftConfirmation order={order} />}

        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8 text-left">
          <h3 className="font-semibold text-green-800 mb-2">What happens next?</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>✓ You will receive a confirmation email shortly</li>
            <li>✓ Your order will be processed within 1-2 business days</li>
            {order?.is_gift && order?.gift_wrapping && (
              <li>✓ Your gift will be beautifully wrapped and ready to delight</li>
            )}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/orders" className="btn-primary">View My Orders</Link>
          <Link href="/books" className="btn-secondary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="section text-center py-20">Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
