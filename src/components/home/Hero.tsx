import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  return (
    <section className="bg-hero-gradient">
      <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div className="space-y-6">
          <Badge tone="ribbon">🎁 Gift wrapping included</Badge>
          <h1 className="font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
            Give a story,
            <br />
            <span className="text-brand-500">beautifully wrapped.</span>
          </h1>
          <p className="max-w-md text-lg text-ink-soft">
            Hand-picked books for every reader. Choose the perfect title,
            customize the wrapping, and add a heartfelt note — we'll handle the
            rest.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/books" size="lg">
              Browse books
            </ButtonLink>
            <ButtonLink href="/gift" size="lg" variant="outline">
              Start a gift
            </ButtonLink>
          </div>
          <div className="flex items-center gap-6 pt-2 text-sm text-ink-soft">
            <span className="flex items-center gap-2">
              <Dot /> Free shipping over $35
            </span>
            <span className="flex items-center gap-2">
              <Dot /> Handwritten cards
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl shadow-lift">
            <Image
              src="https://picsum.photos/seed/bookgift-hero/800/1000"
              alt="A beautifully wrapped book gift"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white p-4 shadow-lift sm:block">
            <p className="text-xs text-ink-muted">Trusted by</p>
            <p className="font-serif text-2xl font-semibold text-ink">
              12,000+
            </p>
            <p className="text-xs text-ink-soft">happy gift-givers</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />;
}
