"use client";

import type { ReactNode } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 4.99;

export function OrderSummary({ children }: { children?: ReactNode }) {
  const { totalPrice, totalItems } = useCart();
  const subtotal = totalPrice;
  const count = totalItems;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const freeShippingThreshold = FREE_SHIPPING_THRESHOLD;

  const remaining = Math.max(0, freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="rounded-2xl border border-ink/8 bg-white p-6 shadow-card">
      <h2 className="font-serif text-lg font-semibold text-ink">
        Order summary
      </h2>

      {/* Free shipping nudge */}
      {subtotal > 0 && (
        <div className="mt-4 rounded-xl bg-cream/70 p-3">
          {remaining > 0 ? (
            <p className="text-xs text-ink-soft">
              Add <strong>{formatPrice(remaining)}</strong> for free shipping
            </p>
          ) : (
            <p className="text-xs font-medium text-sage">
              🎉 You've unlocked free shipping!
            </p>
          )}
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
            <div
              className="h-full rounded-full bg-brand-400 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <dl className="mt-4 space-y-2.5 text-sm">
        <div className="flex justify-between text-ink-soft">
          <dt>Subtotal ({count} items)</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-ink-soft">
          <dt>Shipping</dt>
          <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-semibold text-ink">
          <dt className="font-serif">Total</dt>
          <dd className="font-serif">{formatPrice(total)}</dd>
        </div>
      </dl>

      {children}

      <p className="mt-3 text-center text-xs text-ink-muted">
        Taxes calculated at checkout
      </p>
    </div>
  );
}
