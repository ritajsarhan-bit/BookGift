import { cn } from "@/lib/utils";

type Tone = "brand" | "ribbon" | "sage" | "neutral";

const tones: Record<Tone, string> = {
  brand: "bg-brand-100 text-brand-700",
  ribbon: "bg-ribbon/10 text-ribbon",
  sage: "bg-sage/15 text-sage",
  neutral: "bg-ink/8 text-ink-soft",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
