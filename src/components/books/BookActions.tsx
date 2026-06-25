"use client";

import { useState } from "react";
import Link from "next/link";
import type { Book } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

export function BookActions({ book }: { book: Book }) {
  const { addItem, updateQuantity } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(book);
    if (qty > 1) updateQuantity(book.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full border border-ink/15 bg-white">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-11 w-11 place-items-center rounded-full text-ink-soft hover:text-ink"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center font-medium text-ink">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="grid h-11 w-11 place-items-center rounded-full text-ink-soft hover:text-ink"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <Button className="flex-1" onClick={handleAdd}>
          {added ? "Added ✓" : "Add to cart"}
        </Button>
      </div>

      <Link
        href={`/gift/${book.slug}`}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-ribbon bg-ribbon/5 px-5 py-3 text-sm font-medium text-ribbon transition-colors hover:bg-ribbon hover:text-white"
      >
        🎁 Gift this book
      </Link>
    </div>
  );
}
