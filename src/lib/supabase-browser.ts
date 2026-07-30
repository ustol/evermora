"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getBrowserSupabaseCookieOptions } from "@/lib/supabase-cookie-options";
import type { Database } from "@/types/supabase";

let client: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createClient() {
  if (!client) {
    client = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookieOptions: getBrowserSupabaseCookieOptions(),
      },
    );
  }

  return client;
}
