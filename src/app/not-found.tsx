import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-6xl font-semibold text-brand-500">404</p>
      <h1 className="mt-4 font-serif text-2xl font-semibold text-ink">
        This page wandered off the shelf
      </h1>
      <p className="mt-2 max-w-sm text-ink-soft">
        We couldn't find the page you were looking for. Let's get you back to
        the good books.
      </p>
      <div className="mt-6 flex gap-3">
        <ButtonLink href="/">Back home</ButtonLink>
        <ButtonLink href="/books" variant="outline">
          Browse books
        </ButtonLink>
      </div>
    </Container>
  );
}
