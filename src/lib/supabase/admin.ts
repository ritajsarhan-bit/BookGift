// Service-role Supabase client — SERVER ONLY.
//
// Bypasses Row Level Security. Use only in trusted server contexts (admin
// dashboards, webhooks, seeding). NEVER import this from a client component or
// expose the service-role key to the browser.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export function getSupabaseAdminClient(): SupabaseClient<Database> | null {
  if (typeof window !== "undefined") {
    throw new Error(
      "getSupabaseAdminClient() must never be called in the browser — it uses " +
        "the service-role key which bypasses Row Level Security."
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return null;
  }

  return createClient<Database>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
