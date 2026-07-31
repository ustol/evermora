import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";
import { createAdminClient } from "@/lib/supabase-admin";
import { syncProfileForUser } from "@/lib/profile-resolver";
import { getSupabaseCookieOptions } from "@/lib/supabase-cookie-options";
import { sanitizeRedirectPath } from "@/lib/utils";

function redirectTo(path: string) {
  return new NextResponse(null, { status: 303, headers: { Location: path } });
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const redirectUrl = sanitizeRedirectPath(url.searchParams.get("redirect_url") ?? "") ?? "/dashboard";
  const code = url.searchParams.get("code");

  const response = redirectTo(redirectUrl);

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return redirectTo(
      `/sign-in?error=${encodeURIComponent("Supabase is not configured")}&redirect_url=${encodeURIComponent(redirectUrl)}`,
    );
  }

  if (!code) {
    return redirectTo(
      `/sign-in?error=${encodeURIComponent("Unable to complete sign-in")}&redirect_url=${encodeURIComponent(redirectUrl)}`,
    );
  }

  const supabase = createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookieOptions: getSupabaseCookieOptions(req.nextUrl, req.headers),
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(cookiesToSet, headers = {}) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
        Object.entries(headers).forEach(([key, value]) => {
          response.headers.set(key, value);
        });
      },
    },
  });

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    return redirectTo(
      `/sign-in?error=${encodeURIComponent(exchangeError.message)}&redirect_url=${encodeURIComponent(redirectUrl)}`,
    );
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return redirectTo(
      `/sign-in?error=${encodeURIComponent(
        userError?.message ?? "Unable to complete sign-in",
      )}&redirect_url=${encodeURIComponent(redirectUrl)}`,
    );
  }

  try {
    await syncProfileForUser(createAdminClient(), user);
  } catch (err) {
    console.error("Profile sync failed after OAuth sign-in", err);
  }

  return response;
}
