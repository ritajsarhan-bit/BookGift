// Server-side auth helpers.
//
// Use these in server components, route handlers, and server actions to read the
// authenticated user. All return null/safe values when Supabase is unconfigured.

import type { User } from "@supabase/supabase-js";
import type { ProfileRow } from "./database.types";
import { getSupabaseServerClient } from "./server";

/**
 * Returns the authenticated user, or null. Uses getUser() (not getSession) so
 * the token is verified against the Supabase auth server.
 */
export async function getServerUser(): Promise<User | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** Returns the current user's profile row, or null if signed out / unconfigured. */
export async function getServerProfile(): Promise<ProfileRow | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return data;
}
