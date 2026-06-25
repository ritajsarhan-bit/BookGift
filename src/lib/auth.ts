// Browser-side auth helpers for client components (e.g. the login/signup form).
//
// Thin wrappers over the Supabase browser client. Each returns a discriminated
// result instead of throwing, so UI can render friendly messages. When Supabase
// is not configured they return a "not configured" error rather than crashing,
// which keeps the placeholder UI working in a fresh checkout.
"use client";

import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "./supabase/client";

export interface AuthResult {
  ok: boolean;
  error: string | null;
  user?: User | null;
}

const NOT_CONFIGURED =
  "Authentication isn't connected yet. Add your Supabase keys to .env.local.";

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (typeof window !== "undefined" ? window.location.origin : "")
  );
}

export async function signUpWithEmail(
  email: string,
  password: string,
  fullName?: string
): Promise<AuthResult> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { ok: false, error: NOT_CONFIGURED };

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: fullName ? { full_name: fullName } : undefined,
      emailRedirectTo: `${siteUrl()}/auth/callback`,
    },
  });

  return { ok: !error, error: error?.message ?? null, user: data.user };
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResult> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { ok: false, error: NOT_CONFIGURED };

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { ok: !error, error: error?.message ?? null, user: data.user };
}

export async function signInWithGoogle(): Promise<AuthResult> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { ok: false, error: NOT_CONFIGURED };

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${siteUrl()}/auth/callback` },
  });

  return { ok: !error, error: error?.message ?? null };
}

export async function signOut(): Promise<AuthResult> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { ok: false, error: NOT_CONFIGURED };

  const { error } = await supabase.auth.signOut();
  return { ok: !error, error: error?.message ?? null };
}

export async function getBrowserSession(): Promise<Session | null> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}
