'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { t } = useLanguage();

  return (
    <div className="section text-center py-20">
      <div className="max-w-md mx-auto">
        <div className="text-7xl mb-6 animate-bounce">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Order Confirmed!</h1>
        <p className="text-gray-600 mb-2">
          Thank you for your purchase. Your books are on their way!
        </p>
        {orderId && (
          <p className="text-sm text-gray-400 mb-8">
            Order ID: <span className="font-mono font-medium text-gray-600">{orderId}</span>
          </p>
        )}

        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8 text-left">
          <h3 className="font-semibold text-green-800 mb-2">What happens next?</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>✓ You will receive a confirmation email shortly</li>
            <li>✓ Your order will be processed within 1-2 business days</li>
            <li>✓ Digital books will be available for download immediately</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/orders" className="btn-primary">
            View My Orders
          </Link>
          <Link href="/books" className="btn-secondary">
            Continue Shopping
          </Link>
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
