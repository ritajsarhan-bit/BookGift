import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, SectionHeading } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { BookGrid } from "@/components/books/BookGrid";
import { BookActions } from "@/components/books/BookActions";
import { formatPrice } from "@/lib/utils";
import {
  getAllBooks,
  getBookBySlug,
  getRelatedBooks,
} from "@/lib/data/books";

export function generateStaticParams() {
  return getAllBooks().map((book) => ({ slug: book.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const book = getBookBySlug(params.slug);
  if (!book) return { title: "Book not found" };
  return {
    title: book.title,
    description: book.description,
  };
}

function Spec({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-cream/70 px-4 py-3">
      <dt className="text-xs uppercase tracking-wide text-ink-muted">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}

export default function BookDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const book = getBookBySlug(params.slug);
  if (!book) notFound();

  const related = getRelatedBooks(book);

  return (
    <Container className="py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-ink-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span>/</span>
        <Link href="/books" className="hover:text-ink">
          Books
        </Link>
        <span>/</span>
        <span className="text-ink-soft">{book.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[440px_1fr]">
        {/* Cover */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-cream shadow-lift">
            <Image
              src={book.coverImage}
              alt={`Cover of ${book.title}`}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 440px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge tone="brand">{book.genre}</Badge>
            {book.bestseller && <Badge tone="ribbon">Bestseller</Badge>}
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
              {book.title}
            </h1>
            <p className="text-lg text-ink-soft">by {book.author}</p>
          </div>

          <Rating value={book.rating} reviewCount={book.reviewCount} />

          <p className="font-serif text-3xl font-semibold text-ink">
            {formatPrice(book.price)}
          </p>

          <p className="max-w-prose leading-relaxed text-ink-soft">
            {book.description}
          </p>

          <BookActions book={book} />

          <dl className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
            <Spec label="Pages" value={book.pages} />
            <Spec label="Published" value={book.publishedYear} />
            <Spec label="Language" value={book.language} />
            <Spec label="Format" value="Paperback" />
          </dl>

          <div className="flex flex-wrap gap-6 rounded-2xl border border-ink/8 bg-white p-5 text-sm text-ink-soft shadow-card">
            <span className="flex items-center gap-2">🚚 Free shipping over $35</span>
            <span className="flex items-center gap-2">🎁 Gift wrapping available</span>
            <span className="flex items-center gap-2">↩️ 30-day returns</span>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20 space-y-6">
          <SectionHeading title="You might also like" />
          <BookGrid books={related} />
        </section>
      )}
    </Container>
  );
}
