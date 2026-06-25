"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, lineTotal } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";
import { OrderSummary } from "./OrderSummary";

export function CartView() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/15 bg-white py-20 text-center">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-cream text-3xl">
          🛒
        </div>
        <h2 className="font-serif text-xl font-semibold text-ink">
          Your cart is empty
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          Find a story worth gifting.
        </p>
        <ButtonLink href="/books" className="mt-6">
          Browse books
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      {/* Line items */}
      <div className="space-y-4">
        {items.map((item) => (
            <div
              key={item.book.id}
              className=”flex gap-4 rounded-2xl border border-ink/8 bg-white p-4 shadow-card”
            >
              <Link
                href={`/books/${item.book.id}`}
                className=”relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-cream”
              >
                {item.book.coverImage && (
                  <Image
                    src={item.book.coverImage}
                    alt={item.book.title}
                    fill
                    sizes=”80px”
                    className=”object-cover”
                  />
                )}
              </Link>

              <div className=”flex flex-1 flex-col”>
                <div className=”flex items-start justify-between gap-3”>
                  <div>
                    <Link
                      href={`/books/${item.book.id}`}
                      className=”font-serif font-semibold text-ink hover:text-brand-600”
                    >
                      {item.book.title}
                    </Link>
                    <p className=”text-sm text-ink-soft”>{item.book.author}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.book.id)}
                    className=”text-sm text-ink-muted hover:text-ribbon”
                    aria-label=”Remove item”
                  >
                    Remove
                  </button>
                </div>

                <div className=”mt-auto flex items-center justify-between pt-3”>
                  <div className=”flex items-center rounded-full border border-ink/15”>
                    <button
                      onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                      className=”grid h-9 w-9 place-items-center text-ink-soft hover:text-ink”
                      aria-label=”Decrease quantity”
                    >
                      −
                    </button>
                    <span className=”w-7 text-center text-sm font-medium”>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                      className=”grid h-9 w-9 place-items-center text-ink-soft hover:text-ink”
                      aria-label=”Increase quantity”
                    >
                      +
                    </button>
                  </div>
                  <span className=”font-serif font-semibold text-ink”>
                    {formatPrice(lineTotal(item))}
                  </span>
                </div>
              </div>
            </div>
          ))}

        <div className="flex justify-between pt-2">
          <ButtonLink href="/books" variant="ghost" size="sm">
            ← Continue shopping
          </ButtonLink>
          <Button variant="ghost" size="sm" onClick={clearCart}>
            Clear cart
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <OrderSummary>
          <ButtonLink href="/checkout" className="mt-4 w-full">
            Proceed to checkout
          </ButtonLink>
        </OrderSummary>
      </div>
    </div>
  );
}
