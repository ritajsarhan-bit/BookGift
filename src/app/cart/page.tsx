import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Your Cart",
};

export default function CartPage() {
  return (
    <Container className="py-12">
      <h1 className="mb-8 font-serif text-3xl font-semibold text-ink sm:text-4xl">
        Your cart
      </h1>
      <CartView />
    </Container>
  );
}
