// Session-refresh helper for Next.js middleware.
//
// Runs on every matched request to keep the Supabase auth cookie fresh. Without
// this, server components can end up with an expired session. Safe no-op when
// Supabase env vars are not configured.

import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseEnv } from "./env";

export async function updateSession(
  request: NextRequest
): Promise<NextResponse> {
  let response = NextResponse.next({ request });

  const { url, anonKey } = getSupabaseEnv();
  if (!url || !anonKey) {
    return response;
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // IMPORTANT: getUser() revalidates the token and triggers cookie refresh.
  // Do not run other logic between creating the client and this call.
  await supabase.auth.getUser();

  return response;
}
