// Browser-side Supabase client scaffold.
//
// NOTE: The database is intentionally NOT connected yet. This module only
// constructs a client when env vars are present so the rest of the app can
// import it without crashing. Swap mock data in src/lib/data for real queries
// once the Supabase project is provisioned.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    // Not configured yet — features relying on this should fall back to mocks.
    return null;
  }

  if (!browserClient) {
    browserClient = createClient(url, anonKey);
  }
  return browserClient;
}
