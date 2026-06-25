import Link from "next/link";
import { categories } from "@/lib/data/books";

export function CategoryStrip() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
      {categories.map((cat) => (
        <Link
          key={cat.name}
          href={`/books?category=${cat.name}`}
          className="group flex flex-col items-center gap-2 rounded-2xl border border-ink/8 bg-white p-4 text-center shadow-card transition-colors hover:border-brand-200"
        >
          <span className="text-2xl transition-transform group-hover:scale-110">
            {cat.icon}
          </span>
          <span className="text-sm font-medium text-ink">{cat.name}</span>
        </Link>
      ))}
    </div>
  );
}
