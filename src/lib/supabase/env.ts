// Centralized access to Supabase environment variables.
//
// Both NEXT_PUBLIC_* vars are safe to expose to the browser; the service-role
// key is server-only and must never be imported into client code.

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url, anonKey };
}

/**
 * Returns true when the public Supabase env vars are present. The app uses this
 * to fall back to mock data when the database has not been configured yet, so
 * the UI keeps working in a fresh checkout without a .env.local.
 */
export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseEnv();
  return Boolean(url && anonKey);
}

/** Like getSupabaseEnv but throws if the public vars are missing. */
export function requireSupabaseEnv() {
  const { url, anonKey } = getSupabaseEnv();
  if (!url || !anonKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local (see .env.example)."
    );
  }
  return { url, anonKey };
}
