"use client";

import { useMemo, useState } from "react";
import type { Book, Genre } from "@/lib/types";
import { genres } from "@/lib/data/books";
import { cn } from "@/lib/utils";
import { BookGrid } from "./BookGrid";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "title";

const sortLabels: Record<SortKey, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Top Rated",
  title: "Title A–Z",
};

export function BooksBrowser({
  books,
  initialGenre,
}: {
  books: Book[];
  initialGenre?: Genre;
}) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<Genre | "All">(initialGenre ?? "All");
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    let result = [...books];

    if (genre !== "All") {
      result = result.filter((b) => b.genre === genre);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        result.sort(
          (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false)
        );
    }

    return result;
  }, [books, genre, query, sort]);

  const chips: (Genre | "All")[] = ["All", ...genres];

  return (
    <div className="space-y-6">
      {/* Search + sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="M14 14l4 4" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles or authors…"
            className="w-full rounded-full border border-ink/15 bg-white py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-muted shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-ink-soft">
          <span className="hidden sm:inline">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-ink/15 bg-white py-2 pl-3 pr-8 text-sm text-ink shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            {Object.entries(sortLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Genre chips */}
      <div className="flex flex-wrap gap-2">
        {chips.map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              genre === g
                ? "border-brand-500 bg-brand-500 text-white"
                : "border-ink/15 bg-white text-ink-soft hover:border-brand-300 hover:text-brand-600"
            )}
          >
            {g}
          </button>
        ))}
      </div>

      <p className="text-sm text-ink-muted">
        {filtered.length} {filtered.length === 1 ? "book" : "books"}
      </p>

      <BookGrid books={filtered} />
    </div>
  );
}
