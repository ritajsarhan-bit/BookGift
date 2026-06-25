import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { BooksBrowser } from "@/components/books/BooksBrowser";
import { getAllBooks, genres } from "@/lib/data/books";
import type { Genre } from "@/lib/types";

export const metadata: Metadata = {
  title: "All Books",
  description: "Browse our full collection of hand-picked books.",
};

export default function BooksPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const books = getAllBooks();
  const category = searchParams.category as Genre | undefined;
  const initialGenre =
    category && genres.includes(category) ? category : undefined;

  return (
    <Container className="py-12">
      <div className="mb-8 space-y-2">
        <h1 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
          The Collection
        </h1>
        <p className="text-ink-soft">
          {books.length} hand-picked titles, ready to gift.
        </p>
      </div>

      <BooksBrowser books={books} initialGenre={initialGenre} />
    </Container>
  );
}
