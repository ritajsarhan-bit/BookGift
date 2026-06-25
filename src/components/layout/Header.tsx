"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/books", label: "Books" },
  { href: "/books?category=Children", label: "For Kids" },
  { href: "/gift", label: "Gift Wrapping" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/8 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-paper">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M4 4.5A2.5 2.5 0 016.5 2H20v17H6.5A2.5 2.5 0 004 21.5v-17z" opacity="0.35" />
              <path d="M20 19H6.5A2.5 2.5 0 004 21.5V5a2 2 0 012-2h14v16z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight text-ink">
            Book<span className="text-brand-500">Gift</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href.split("?")[0];
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-brand-600"
                    : "text-ink-soft hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <Link
            href="/login"
            className="hidden rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:block"
          >
            Sign in
          </Link>

          <Link
            href="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5"
            aria-label={`Cart with ${count} items`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M3 4h2l2.4 12.3a1 1 0 001 .7h8.7a1 1 0 001-.8L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="18" cy="20" r="1.4" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-ribbon px-1 text-[11px] font-semibold text-white">
                {count}
              </span>
            )}
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-ink/5 md:hidden"
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-ink/8 bg-paper px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-ink/5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-ink/5"
            >
              Sign in
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
