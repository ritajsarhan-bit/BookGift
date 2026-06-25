"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button, ButtonLink } from "@/components/ui/Button";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { useCart } from "@/context/CartContext";

type PayMethod = "card" | "paypal";

export function CheckoutForm() {
  const router = useRouter();
  const { items, clearCart: clear } = useCart();
  const [method, setMethod] = useState<PayMethod>("card");
  const [placed, setPlaced] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // No backend yet — simulate a successful order.
    setPlaced(true);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-ink/8 bg-white p-10 text-center shadow-card">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-sage/15 text-3xl">
          ✓
        </div>
        <h2 className="font-serif text-2xl font-semibold text-ink">
          Order placed!
        </h2>
        <p className="mt-2 text-ink-soft">
          Thank you for your order. This is a demo checkout — no payment was
          processed and no email was sent.
        </p>
        <p className="mt-1 text-sm text-ink-muted">
          Order #BG-{Math.floor(100000 + Math.random() * 900000)}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <ButtonLink href="/books">Continue shopping</ButtonLink>
          <ButtonLink href="/" variant="outline">
            Back home
          </ButtonLink>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/15 bg-white py-16 text-center">
        <p className="font-serif text-lg text-ink">Nothing to check out</p>
        <p className="mt-1 text-sm text-ink-soft">Your cart is empty.</p>
        <ButtonLink href="/books" className="mt-6">
          Browse books
        </ButtonLink>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-8 lg:grid-cols-[1fr_360px]"
    >
      <div className="space-y-8">
        {/* Contact */}
        <section className="rounded-2xl border border-ink/8 bg-white p-6 shadow-card">
          <h2 className="mb-4 font-serif text-lg font-semibold text-ink">
            Contact
          </h2>
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            required
          />
        </section>

        {/* Shipping */}
        <section className="rounded-2xl border border-ink/8 bg-white p-6 shadow-card">
          <h2 className="mb-4 font-serif text-lg font-semibold text-ink">
            Shipping address
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input id="first" label="First name" required />
            <Input id="last" label="Last name" required />
            <div className="sm:col-span-2">
              <Input id="address" label="Address" required />
            </div>
            <Input id="city" label="City" required />
            <Input id="zip" label="ZIP / Postal code" required />
            <Input id="country" label="Country" defaultValue="United States" required />
            <Input id="phone" label="Phone" type="tel" />
          </div>
        </section>

        {/* Payment */}
        <section className="rounded-2xl border border-ink/8 bg-white p-6 shadow-card">
          <h2 className="mb-4 font-serif text-lg font-semibold text-ink">
            Payment
          </h2>

          <div className="mb-4 flex gap-3">
            {(["card", "paypal"] as PayMethod[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                className={
                  "flex-1 rounded-xl border px-4 py-3 text-sm font-medium capitalize transition-colors " +
                  (method === m
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-ink/15 text-ink-soft hover:border-ink/30")
                }
              >
                {m === "card" ? "Credit card" : "PayPal"}
              </button>
            ))}
          </div>

          {method === "card" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Input
                  id="card"
                  label="Card number"
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                  required
                />
              </div>
              <Input id="exp" label="Expiry" placeholder="MM / YY" required />
              <Input id="cvc" label="CVC" placeholder="123" required />
            </div>
          ) : (
            <p className="rounded-xl bg-cream/70 p-4 text-sm text-ink-soft">
              You'll be redirected to PayPal to complete your purchase. (Demo —
              not actually wired up.)
            </p>
          )}

          <p className="mt-4 text-xs text-ink-muted">
            🔒 This is a demo. Do not enter real card details — no payment is
            processed.
          </p>
        </section>
      </div>

      {/* Summary */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <OrderSummary>
          <Button type="submit" className="mt-4 w-full">
            Place order
          </Button>
        </OrderSummary>
      </div>
    </form>
  );
}
