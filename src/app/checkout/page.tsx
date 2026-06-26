'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import GiftOptions, { GiftData, defaultGiftData } from '@/components/checkout/GiftOptions';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [giftData, setGiftData] = useState<GiftData>(defaultGiftData);
  const [giftErrors, setGiftErrors] = useState<{ wrappingStyle?: string; wrappingColor?: string; giftMessage?: string }>({});
  const [address, setAddress] = useState({
    fullName: session?.user?.name || '',
    address: '',
    city: '',
    country: '',
    zip: '',
  });

  if (!session) {
    return (
      <div className="section text-center py-20">
        <p className="text-5xl mb-4">🔒</p>
        <h2 className="text-xl font-bold mb-4">Please sign in to checkout</h2>
        <Link href="/login" className="btn-primary">Sign In</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="section text-center py-20">
        <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
        <Link href="/books" className="btn-primary">Browse Books</Link>
      </div>
    );
  }

  const validateGift = (): boolean => {
    const errs: typeof giftErrors = {};
    if (giftData.giftMessage.length > 300) {
      errs.giftMessage = 'Message cannot exceed 300 characters.';
    }
    if (giftData.giftWrapping) {
      if (!giftData.wrappingStyle) errs.wrappingStyle = 'Please select a wrapping style.';
      if (!giftData.wrappingColor) errs.wrappingColor = 'Please select a wrapping color.';
    }
    setGiftErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address.address || !address.city || !address.country) {
      toast.error('Please fill in all shipping fields');
      return;
    }

    if (!validateGift()) {
      toast.error('Please complete the gift options.');
      return;
    }

    setLoading(true);
    try {
      const piRes = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(totalPrice * 100) }),
      });

      if (!piRes.ok) {
        toast.error('Payment initialization failed.');
        return;
      }

      const mockPaymentId = 'demo_pi_' + Date.now();

      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            bookId: i.book.id,
            quantity: i.quantity,
            price: i.book.discountPrice ?? i.book.price,
          })),
          total: totalPrice,
          stripePaymentId: mockPaymentId,
          shippingAddress: address,
          isGift: giftData.isGift,
          giftWrapping: giftData.giftWrapping,
          giftMessage: giftData.giftMessage || null,
          wrappingStyle: giftData.wrappingStyle || null,
          wrappingColor: giftData.wrappingColor || null,
          ribbonColor: giftData.ribbonColor || null,
          giftCardDesign: giftData.giftCardDesign || null,
        }),
      });

      if (!orderRes.ok) {
        toast.error('Failed to place order. Please try again.');
        return;
      }

      const { order } = await orderRes.json();
      clearCart();
      router.push(`/order-confirmation?orderId=${order.id}`);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{t.checkout.title}</h1>

      <form onSubmit={handleOrder} className="grid md:grid-cols-2 gap-8">
        {/* Left: Shipping + Gift */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">📦 {t.checkout.shipping}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.checkout.full_name}</label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.checkout.address}</label>
                <input
                  type="text"
                  required
                  value={address.address}
                  onChange={(e) => setAddress({ ...address, address: e.target.value })}
                  className="input"
                  placeholder="123 Main Street"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.checkout.city}</label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.checkout.zip}</label>
                  <input
                    type="text"
                    value={address.zip}
                    onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                    className="input"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.checkout.country}</label>
                <select
                  required
                  value={address.country}
                  onChange={(e) => setAddress({ ...address, country: e.target.value })}
                  className="input"
                >
                  <option value="">Select country</option>
                  <option value="US">United States</option>
                  <option value="IL">Israel</option>
                  <option value="GB">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                </select>
              </div>
            </div>
          </div>

          {/* Gift Options */}
          <GiftOptions value={giftData} onChange={setGiftData} errors={giftErrors} />

          {/* Payment */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">💳 {t.checkout.payment}</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
              <strong>Demo mode:</strong> This is a demo checkout. No real charge will be made.
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div>
          <div className="card p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t.checkout.order_summary}</h2>

            <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
              {items.map(({ book, quantity }) => (
                <div key={book.id} className="flex items-center gap-3">
                  <div className="relative w-10 h-14 flex-shrink-0 bg-gray-100 rounded">
                    {book.coverImage && (
                      <Image src={book.coverImage} alt={book.title} fill className="object-cover rounded" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{book.title}</p>
                    <p className="text-xs text-gray-500">Qty: {quantity}</p>
                  </div>
                  <span className="text-sm font-semibold">
                    {formatPrice((book.discountPrice ?? book.price) * quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Gift summary in order sidebar */}
            {giftData.isGift && (
              <div className="bg-pink-50 border border-pink-100 rounded-lg p-3 mb-4 text-xs text-pink-700 space-y-0.5">
                <p className="font-semibold">🎁 Gift Order</p>
                {giftData.giftWrapping && giftData.wrappingStyle && (
                  <p>Wrap: {giftData.wrappingStyle}{giftData.wrappingColor ? `, ${giftData.wrappingColor}` : ''}{giftData.ribbonColor ? ` + ${giftData.ribbonColor} ribbon` : ''}</p>
                )}
                {giftData.giftMessage && <p className="italic">"{giftData.giftMessage.slice(0, 50)}{giftData.giftMessage.length > 50 ? '…' : ''}"</p>}
              </div>
            )}

            <div className="border-t border-gray-100 pt-4 space-y-2 mb-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-lg border-t border-gray-100 pt-2">
                <span>{t.cart.total}</span>
                <span className="text-blue-800">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full text-center text-base">
              {loading ? 'Processing…' : `${t.checkout.place_order} — ${formatPrice(totalPrice)}`}
            </button>

            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
              <span>🔒</span>
              <span>Secured by Stripe</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
