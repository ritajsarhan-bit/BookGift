"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, lineTotal } from "@/context/CartContext";
import { giftWraps, ribbonColors } from "@/lib/data/books";
import { formatPrice } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";
import { OrderSummary } from "./OrderSummary";

export function CartView() {
  const { items, removeItem, setQuantity, clear } = useCart();

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
        {items.map((item) => {
          const wrap = giftWraps.find((w) => w.id === item.gift?.wrapId);
          const ribbon = ribbonColors.find(
            (r) => r.id === item.gift?.ribbonColor
          );
          return (
            <div
              key={item.id}
              className="flex gap-4 rounded-2xl border border-ink/8 bg-white p-4 shadow-card"
            >
              <Link
                href={`/books/${item.book.slug}`}
                className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-cream"
              >
                <Image
                  src={item.book.coverImage}
                  alt={item.book.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/books/${item.book.slug}`}
                      className="font-serif font-semibold text-ink hover:text-brand-600"
                    >
                      {item.book.title}
                    </Link>
                    <p className="text-sm text-ink-soft">{item.book.author}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-ink-muted hover:text-ribbon"
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </div>

                {/* Gift details */}
                {item.gift && (
                  <div className="mt-2 rounded-xl bg-ribbon/5 px-3 py-2 text-xs text-ink-soft">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="flex items-center gap-1.5">
                        🎁 {wrap?.name ?? "Wrapped"}
                      </span>
                      {ribbon && (
                        <span className="flex items-center gap-1.5">
                          <span
                            className="h-3 w-3 rounded-full ring-1 ring-black/10"
                            style={{ backgroundColor: ribbon.color }}
                          />
                          {ribbon.name} ribbon
                        </span>
                      )}
                      {item.gift.giftBox && <span>+ keepsake box</span>}
                    </div>
                    {item.gift.message && (
                      <p className="mt-1 italic">“{item.gift.message}”</p>
                    )}
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-full border border-ink/15">
                    <button
                      onClick={() =>
                        setQuantity(item.id, item.quantity - 1)
                      }
                      className="grid h-9 w-9 place-items-center text-ink-soft hover:text-ink"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-7 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(item.id, item.quantity + 1)
                      }
                      className="grid h-9 w-9 place-items-center text-ink-soft hover:text-ink"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-serif font-semibold text-ink">
                    {formatPrice(lineTotal(item))}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex justify-between pt-2">
          <ButtonLink href="/books" variant="ghost" size="sm">
            ← Continue shopping
          </ButtonLink>
          <Button variant="ghost" size="sm" onClick={clear}>
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
