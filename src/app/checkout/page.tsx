import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <Container className="py-12">
      <h1 className="mb-8 font-serif text-3xl font-semibold text-ink sm:text-4xl">
        Checkout
      </h1>
      <CheckoutForm />
    </Container>
  );
}
