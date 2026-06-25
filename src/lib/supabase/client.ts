// Browser-side Supabase client (App Router / client components).
//
// Built on @supabase/ssr so the auth session is stored in cookies and shared
// with the server. Returns null when env vars are absent so the rest of the app
// can fall back to mock data without crashing in a fresh checkout.

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { getSupabaseEnv } from "./env";

let browserClient: SupabaseClient<Database> | null = null;

export function getSupabaseBrowserClient(): SupabaseClient<Database> | null {
  const { url, anonKey } = getSupabaseEnv();
  if (!url || !anonKey) {
    // Not configured yet — features relying on this should fall back to mocks.
    return null;
  }

  if (!browserClient) {
    browserClient = createBrowserClient<Database>(url, anonKey) as any;
  }
  return browserClient;
}
