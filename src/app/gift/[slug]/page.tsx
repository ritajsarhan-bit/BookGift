import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { GiftCustomizer } from "@/components/gift/GiftCustomizer";
import { getAllBooks, getBookBySlug } from "@/lib/data/books";

export function generateStaticParams() {
  return getAllBooks().map((book) => ({ slug: book.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const book = getBookBySlug(params.slug);
  return { title: book ? `Gift · ${book.title}` : "Gift Studio" };
}

export default function GiftCustomizePage({
  params,
}: {
  params: { slug: string };
}) {
  const book = getBookBySlug(params.slug);
  if (!book) notFound();

  return (
    <Container className="py-12">
      <nav className="mb-6 flex items-center gap-2 text-sm text-ink-muted">
        <Link href="/gift" className="hover:text-ink">
          Gift studio
        </Link>
        <span>/</span>
        <span className="text-ink-soft">{book.title}</span>
      </nav>

      <div className="mb-10 max-w-2xl space-y-3">
        <Badge tone="ribbon">🎁 Step 2 of 2</Badge>
        <h1 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
          Wrap it your way
        </h1>
        <p className="text-ink-soft">
          Personalize the wrapping for <strong>{book.title}</strong>. Watch your
          gift come together in the live preview.
        </p>
      </div>

      <GiftCustomizer book={book} />
    </Container>
  );
}
