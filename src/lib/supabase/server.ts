// Server-side Supabase client (App Router: server components, route handlers,
// server actions).
//
// Uses @supabase/ssr with Next's cookie store so the authenticated session is
// read and refreshed on the server. Returns null when env vars are absent so
// callers can fall back to mock data.

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { getSupabaseEnv } from "./env";

export function getSupabaseServerClient(): SupabaseClient<Database> | null {
  const { url, anonKey } = getSupabaseEnv();
  if (!url || !anonKey) {
    return null;
  }

  const cookieStore = cookies();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // `set` throws when called from a Server Component (read-only cookie
          // store). The session is refreshed by middleware instead, so this is
          // safe to ignore here.
        }
      },
    },
  });
}
