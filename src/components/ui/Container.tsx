import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="space-y-1.5">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-500">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
          {title}
        </h2>
        {subtitle && <p className="max-w-xl text-sm text-ink-soft">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
