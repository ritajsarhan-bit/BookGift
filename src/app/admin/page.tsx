import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { getAllBooks } from "@/lib/data/books";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const stats = [
  { label: "Revenue (30d)", value: "$12,480", delta: "+18%" },
  { label: "Orders", value: "342", delta: "+9%" },
  { label: "Gift orders", value: "128", delta: "+24%" },
  { label: "Avg. order value", value: "$36.50", delta: "+3%" },
];

const recentOrders = [
  { id: "BG-849201", customer: "Jane R.", total: 42.49, status: "Wrapped" },
  { id: "BG-849200", customer: "Mark T.", total: 18.99, status: "Shipped" },
  { id: "BG-849199", customer: "Aisha K.", total: 67.0, status: "Processing" },
  { id: "BG-849198", customer: "Leo M.", total: 24.99, status: "Delivered" },
  { id: "BG-849197", customer: "Sara P.", total: 31.5, status: "Wrapped" },
];

const navItems = [
  { label: "Overview", active: true },
  { label: "Orders", active: false },
  { label: "Inventory", active: false },
  { label: "Gift wraps", active: false },
  { label: "Customers", active: false },
  { label: "Settings", active: false },
];

const statusTone: Record<string, "brand" | "ribbon" | "sage" | "neutral"> = {
  Processing: "neutral",
  Wrapped: "ribbon",
  Shipped: "brand",
  Delivered: "sage",
};

export default function AdminPage() {
  const books = getAllBooks();

  return (
    <Container className="py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-3xl font-semibold text-ink">
              Admin
            </h1>
            <Badge tone="neutral">Placeholder</Badge>
          </div>
          <p className="mt-1 text-ink-soft">
            Static preview · no authentication or live data yet.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className="h-fit rounded-2xl border border-ink/8 bg-white p-3 shadow-card lg:sticky lg:top-24">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={
                  "flex w-full items-center rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors " +
                  (item.active
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink-soft hover:bg-ink/5")
                }
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="space-y-8">
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-ink/8 bg-white p-5 shadow-card"
              >
                <p className="text-sm text-ink-muted">{s.label}</p>
                <p className="mt-1 font-serif text-2xl font-semibold text-ink">
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-medium text-sage">{s.delta}</p>
              </div>
            ))}
          </div>

          {/* Recent orders */}
          <section className="overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-card">
            <div className="border-b border-ink/8 px-5 py-4">
              <h2 className="font-serif text-lg font-semibold text-ink">
                Recent orders
              </h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink/8 text-left text-xs uppercase tracking-wide text-ink-muted">
                  <th className="px-5 py-3 font-medium">Order</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr
                    key={o.id}
                    className="border-b border-ink/5 last:border-0 hover:bg-cream/40"
                  >
                    <td className="px-5 py-3 font-medium text-ink">{o.id}</td>
                    <td className="px-5 py-3 text-ink-soft">{o.customer}</td>
                    <td className="px-5 py-3">
                      <Badge tone={statusTone[o.status]}>{o.status}</Badge>
                    </td>
                    <td className="px-5 py-3 text-right font-medium text-ink">
                      {formatPrice(o.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Inventory preview */}
          <section className="overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-card">
            <div className="flex items-center justify-between border-b border-ink/8 px-5 py-4">
              <h2 className="font-serif text-lg font-semibold text-ink">
                Inventory
              </h2>
              <span className="text-sm text-ink-muted">{books.length} titles</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink/8 text-left text-xs uppercase tracking-wide text-ink-muted">
                  <th className="px-5 py-3 font-medium">Title</th>
                  <th className="px-5 py-3 font-medium">Genre</th>
                  <th className="px-5 py-3 text-right font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                {books.slice(0, 6).map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-ink/5 last:border-0 hover:bg-cream/40"
                  >
                    <td className="px-5 py-3 font-medium text-ink">{b.title}</td>
                    <td className="px-5 py-3 text-ink-soft">{b.genre}</td>
                    <td className="px-5 py-3 text-right font-medium text-ink">
                      {formatPrice(b.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </Container>
  );
}
