import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function SignupPage() {
  return (
    <Container className="flex justify-center py-16">
      <AuthForm mode="signup" />
    </Container>
  );
}
