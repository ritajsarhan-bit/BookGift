import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return (
    <Container className="flex justify-center py-16">
      <AuthForm mode="login" />
    </Container>
  );
}
