"use client";

import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { useCart } from "@/context/CartContext";

export function BookCard({ book }: { book: Book }) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-lift">
      <Link
        href={`/books/${book.slug}`}
        className="relative block aspect-[3/4] overflow-hidden bg-cream"
      >
        <Image
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {book.bestseller && <Badge tone="ribbon">Bestseller</Badge>}
          {book.featured && !book.bestseller && (
            <Badge tone="brand">Featured</Badge>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
          {book.genre}
        </p>
        <Link href={`/books/${book.slug}`}>
          <h3 className="mt-1 line-clamp-2 font-serif text-base font-semibold text-ink group-hover:text-brand-600">
            {book.title}
          </h3>
        </Link>
        <p className="mt-0.5 text-sm text-ink-soft">{book.author}</p>

        <div className="mt-2">
          <Rating value={book.rating} reviewCount={book.reviewCount} />
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-serif text-lg font-semibold text-ink">
            {formatPrice(book.price)}
          </span>
          <button
            onClick={() => addItem(book)}
            className="rounded-full bg-brand-50 px-3.5 py-1.5 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-500 hover:text-white"
            aria-label={`Add ${book.title} to cart`}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
