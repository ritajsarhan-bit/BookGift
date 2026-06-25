"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
} from "@/lib/auth";

type Mode = "login" | "signup";

export function AuthForm({ mode }: { mode: Mode }) {
  const isLogin = mode === "login";
  const router = useRouter();
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const fullName = String(form.get("name") ?? "");

    const result = isLogin
      ? await signInWithEmail(email, password)
      : await signUpWithEmail(email, password, fullName);

    setLoading(false);

    if (result.ok) {
      router.push("/");
      router.refresh();
    } else {
      setNotice(result.error);
    }
  }

  async function handleGoogle() {
    setNotice(null);
    const result = await signInWithGoogle();
    if (!result.ok) setNotice(result.error);
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-ink/8 bg-white p-8 shadow-card">
        <div className="mb-6 text-center">
          <h1 className="font-serif text-2xl font-semibold text-ink">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            {isLogin
              ? "Sign in to track orders and saved gifts."
              : "Join BookGift to save gifts and check out faster."}
          </p>
        </div>

        {notice && (
          <div className="mb-5 rounded-xl bg-cream/80 p-3 text-center text-sm text-ink-soft">
            {notice}
          </div>
        )}

        {/* Social */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleGoogle}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
          >
            <span className="text-base">G</span> Continue with Google
          </button>
        </div>

        <div className="my-5 flex items-center gap-3 text-xs text-ink-muted">
          <span className="h-px flex-1 bg-ink/10" />
          or
          <span className="h-px flex-1 bg-ink/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <Input
              id="name"
              name="name"
              label="Full name"
              placeholder="Jane Reader"
              required
            />
          )}
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            required
          />
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            required
          />

          {isLogin && (
            <div className="flex justify-end">
              <Link href="#" className="text-sm text-brand-600 hover:underline">
                Forgot password?
              </Link>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? "Please wait…"
              : isLogin
                ? "Sign in"
                : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-soft">
          {isLogin ? "New to BookGift? " : "Already have an account? "}
          <Link
            href={isLogin ? "/signup" : "/login"}
            className="font-medium text-brand-600 hover:underline"
          >
            {isLogin ? "Create an account" : "Sign in"}
          </Link>
        </p>
      </div>

      <p className="mt-4 text-center text-xs text-ink-muted">
        By continuing you agree to our Terms and Privacy Policy.
      </p>
    </div>
  );
}
