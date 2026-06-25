import type { Book } from "@/lib/types";
import { BookCard } from "./BookCard";

export function BookGrid({ books }: { books: Book[] }) {
  if (books.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/15 bg-white/50 py-16 text-center">
        <p className="font-serif text-lg text-ink">No books found</p>
        <p className="mt-1 text-sm text-ink-soft">
          Try a different category or search term.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
