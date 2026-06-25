import { cn } from "@/lib/utils";

function Star({ fill }: { fill: number }) {
  // fill: 0..1 fraction of this star that is filled
  const id = `star-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill * 100}%`} stopColor="#D17A52" />
          <stop offset={`${fill * 100}%`} stopColor="#E5DED2" />
        </linearGradient>
      </defs>
      <path
        d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z"
        fill={`url(#${id})`}
      />
    </svg>
  );
}

export function Rating({
  value,
  reviewCount,
  className,
}: {
  value: number;
  reviewCount?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} fill={Math.max(0, Math.min(1, value - i))} />
        ))}
      </div>
      <span className="text-sm font-medium text-ink-soft">
        {value.toFixed(1)}
      </span>
      {reviewCount != null && (
        <span className="text-xs text-ink-muted">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
