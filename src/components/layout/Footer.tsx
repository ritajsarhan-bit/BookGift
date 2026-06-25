import Link from "next/link";
import { Container } from "@/components/ui/Container";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/books", label: "All Books" },
      { href: "/books?category=Fiction", label: "Fiction" },
      { href: "/books?category=Children", label: "Children" },
      { href: "/gift", label: "Gift Wrapping" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Sign In" },
      { href: "/signup", label: "Create Account" },
      { href: "/cart", label: "Cart" },
      { href: "/admin", label: "Admin" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Contact" },
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/8 bg-cream/60">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-paper font-serif font-bold">
                B
              </span>
              <span className="font-serif text-xl font-semibold text-ink">
                Book<span className="text-brand-500">Gift</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm text-ink-soft">
              Hand-picked books, beautifully wrapped. Give a story worth
              remembering.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-ink">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft transition-colors hover:text-brand-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-ink/8 pt-6 text-xs text-ink-muted sm:flex-row">
          <p>© {new Date().getFullYear()} BookGift. All rights reserved.</p>
          <p>Crafted with care · Demo build (no live database)</p>
        </div>
      </Container>
    </footer>
  );
}
