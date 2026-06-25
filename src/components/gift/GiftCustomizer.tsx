"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Book, GiftOptions } from "@/lib/types";
import { giftWraps, ribbonColors } from "@/lib/data/books";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { useCart } from "@/context/CartContext";

const GIFT_BOX_PRICE = 6.0;
const MESSAGE_MAX = 200;

export function GiftCustomizer({ book }: { book: Book }) {
  const router = useRouter();
  const { addItem } = useCart();

  const [wrapId, setWrapId] = useState<string>(giftWraps[0].id);
  const [ribbon, setRibbon] = useState<string>(ribbonColors[0].id);
  const [giftBox, setGiftBox] = useState(false);
  const [message, setMessage] = useState("");
  const [recipientName, setRecipientName] = useState("");

  const selectedWrap = giftWraps.find((w) => w.id === wrapId)!;
  const selectedRibbon = ribbonColors.find((r) => r.id === ribbon)!;

  const giftTotal = useMemo(
    () => selectedWrap.price + (giftBox ? GIFT_BOX_PRICE : 0),
    [selectedWrap, giftBox]
  );

  function handleAdd(goToCart: boolean) {
    const gift: GiftOptions = {
      wrapId,
      ribbonColor: ribbon,
      message: message.trim(),
      giftBox,
      recipientName: recipientName.trim() || undefined,
    };
    addItem(book, 1, gift);
    if (goToCart) router.push("/cart");
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
      {/* Live preview */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="relative overflow-hidden rounded-2xl bg-cream p-8 shadow-card">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-500">
            Live Preview
          </p>

          <div
            className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-lg shadow-lift"
            style={{ backgroundColor: selectedWrap.color }}
          >
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              sizes="280px"
              className="object-cover opacity-90 mix-blend-luminosity"
            />
            {/* Ribbon overlay */}
            <div
              className="absolute inset-y-0 left-1/2 w-7 -translate-x-1/2"
              style={{ backgroundColor: selectedRibbon.color, opacity: 0.92 }}
            />
            <div
              className="absolute inset-x-0 top-1/2 h-7 -translate-y-1/2"
              style={{ backgroundColor: selectedRibbon.color, opacity: 0.92 }}
            />
            <div
              className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-sm"
              style={{ backgroundColor: selectedRibbon.color }}
            />
          </div>

          <div className="mt-6 text-center">
            <p className="font-serif text-lg font-semibold text-ink">
              {book.title}
            </p>
            <p className="text-sm text-ink-soft">{selectedWrap.name} wrap</p>
            {message && (
              <div className="mx-auto mt-4 max-w-xs rounded-xl border border-dashed border-ink/20 bg-white/70 px-4 py-3">
                <p className="font-serif text-sm italic text-ink-soft">
                  “{message}”
                </p>
                {recipientName && (
                  <p className="mt-1 text-xs text-ink-muted">
                    — for {recipientName}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-8">
        {/* Wrap */}
        <section>
          <h3 className="font-serif text-lg font-semibold text-ink">
            1 · Choose wrapping paper
          </h3>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-3">
            {giftWraps.map((wrap) => (
              <button
                key={wrap.id}
                onClick={() => setWrapId(wrap.id)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border p-3 transition-all",
                  wrapId === wrap.id
                    ? "border-brand-500 ring-2 ring-brand-100"
                    : "border-ink/10 hover:border-ink/25"
                )}
              >
                <span
                  className="h-12 w-full rounded-lg shadow-inner"
                  style={{ backgroundColor: wrap.color }}
                />
                <span className="text-xs font-medium text-ink">{wrap.name}</span>
                <span className="text-xs text-ink-muted">
                  +{formatPrice(wrap.price)}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Ribbon */}
        <section>
          <h3 className="font-serif text-lg font-semibold text-ink">
            2 · Pick a ribbon
          </h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {ribbonColors.map((r) => (
              <button
                key={r.id}
                onClick={() => setRibbon(r.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-colors",
                  ribbon === r.id
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-ink/15 text-ink-soft hover:border-ink/30"
                )}
              >
                <span
                  className="h-4 w-4 rounded-full ring-1 ring-black/10"
                  style={{ backgroundColor: r.color }}
                />
                {r.name}
              </button>
            ))}
          </div>
        </section>

        {/* Gift box */}
        <section>
          <h3 className="font-serif text-lg font-semibold text-ink">
            3 · Add a keepsake box?
          </h3>
          <button
            onClick={() => setGiftBox((v) => !v)}
            className={cn(
              "mt-4 flex w-full items-center justify-between rounded-xl border p-4 text-left transition-colors",
              giftBox
                ? "border-brand-500 bg-brand-50"
                : "border-ink/15 hover:border-ink/30"
            )}
          >
            <div>
              <p className="text-sm font-medium text-ink">
                Premium keepsake gift box
              </p>
              <p className="text-xs text-ink-soft">
                Rigid magnetic box with tissue paper
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-ink">
                +{formatPrice(GIFT_BOX_PRICE)}
              </span>
              <span
                className={cn(
                  "grid h-6 w-6 place-items-center rounded-full border",
                  giftBox
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-ink/30"
                )}
              >
                {giftBox && (
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 10l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </div>
          </button>
        </section>

        {/* Message */}
        <section>
          <h3 className="font-serif text-lg font-semibold text-ink">
            4 · Personal note
          </h3>
          <div className="mt-4 space-y-4">
            <input
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Recipient's name (optional)"
              className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
            <Textarea
              value={message}
              maxLength={MESSAGE_MAX}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a heartfelt message that we'll print on a card…"
              hint={`${message.length}/${MESSAGE_MAX} characters`}
            />
          </div>
        </section>

        {/* Summary + actions */}
        <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between text-sm text-ink-soft">
            <span>Book</span>
            <span>{formatPrice(book.price)}</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-sm text-ink-soft">
            <span>Gift wrapping</span>
            <span>{formatPrice(giftTotal)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-3">
            <span className="font-serif text-lg font-semibold text-ink">
              Total
            </span>
            <span className="font-serif text-lg font-semibold text-ink">
              {formatPrice(book.price + giftTotal)}
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <Button
              variant="ribbon"
              className="flex-1"
              onClick={() => handleAdd(true)}
            >
              Add gift to cart
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleAdd(false)}
            >
              Keep shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
