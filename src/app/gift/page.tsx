import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { getAllBooks } from "@/lib/data/books";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gift Wrapping",
  description: "Choose a book to wrap as a personalized gift.",
};

export default function GiftIndexPage() {
  const books = getAllBooks();

  return (
    <Container className="py-12">
      <div className="mb-10 max-w-2xl space-y-3">
        <Badge tone="ribbon">🎁 Step 1 of 2</Badge>
        <h1 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
          Choose a book to gift
        </h1>
        <p className="text-ink-soft">
          Pick a title and we'll take you to the gift studio, where you can
          choose wrapping paper, a ribbon, and add a personal note.
        </p>
      </div>

      <SectionHeading title="Pick your book" className="mb-6" />

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <Link
            key={book.id}
            href={`/gift/${book.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-lift"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-cream">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                sizes="(max-width: 640px) 50vw, 240px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                <span className="m-3 rounded-full bg-ribbon px-3 py-1.5 text-xs font-medium text-white">
                  Wrap this →
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="line-clamp-1 font-serif text-base font-semibold text-ink">
                {book.title}
              </h3>
              <p className="text-sm text-ink-soft">{book.author}</p>
              <p className="mt-1 text-sm font-medium text-ink">
                {formatPrice(book.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
