import { ButtonLink } from "@/components/ui/Button";

const steps = [
  { n: "01", title: "Pick a book", text: "Browse hand-curated titles for every reader." },
  { n: "02", title: "Wrap it your way", text: "Choose paper, ribbon, and a keepsake box." },
  { n: "03", title: "Add a note", text: "We print your message on a handwritten-style card." },
];

export function GiftBanner() {
  return (
    <section className="overflow-hidden rounded-3xl bg-ink px-6 py-12 text-paper sm:px-10 lg:px-14 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
            The BookGift experience
          </p>
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
            Gifting a book has never felt this thoughtful.
          </h2>
          <p className="max-w-md text-paper/70">
            Every order is wrapped by hand and finished with a personal touch.
            Three simple steps from cart to doorstep.
          </p>
          <ButtonLink href="/gift" variant="ribbon" size="lg">
            Customize a gift
          </ButtonLink>
        </div>

        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.n}
              className="flex items-start gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10"
            >
              <span className="font-serif text-2xl font-semibold text-brand-300">
                {step.n}
              </span>
              <div>
                <p className="font-medium text-paper">{step.title}</p>
                <p className="text-sm text-paper/60">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
