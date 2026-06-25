import { Container, SectionHeading } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { BookGrid } from "@/components/books/BookGrid";
import { Hero } from "@/components/home/Hero";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { GiftBanner } from "@/components/home/GiftBanner";
import { getFeaturedBooks, getBestsellers } from "@/lib/data/books";

export default function HomePage() {
  const featured = getFeaturedBooks();
  const bestsellers = getBestsellers();

  return (
    <>
      <Hero />

      <Container className="space-y-20 py-16">
        {/* Categories */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Browse"
            title="Shop by category"
            subtitle="From bedtime classics to weekend page-turners."
          />
          <CategoryStrip />
        </section>

        {/* Featured */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Curated"
            title="Featured this season"
            action={
              <ButtonLink href="/books" variant="outline" size="sm">
                View all
              </ButtonLink>
            }
          />
          <BookGrid books={featured} />
        </section>

        {/* Gift banner */}
        <GiftBanner />

        {/* Bestsellers */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Loved by readers"
            title="Bestsellers"
            action={
              <ButtonLink href="/books" variant="outline" size="sm">
                View all
              </ButtonLink>
            }
          />
          <BookGrid books={bestsellers} />
        </section>
      </Container>
    </>
  );
}
