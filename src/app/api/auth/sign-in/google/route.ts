import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";
import { getSupabaseCookieOptions } from "@/lib/supabase-cookie-options";
import { sanitizeRedirectPath } from "@/lib/utils";

function redirectTo(path: string) {
  return new NextResponse(null, { status: 303, headers: { Location: path } });
}

function getRequestOrigin(req: NextRequest) {
  const forwardedHost = req.headers.get("x-forwarded-host");
  const host = forwardedHost ?? req.headers.get("host") ?? req.nextUrl.host;
  const forwardedProto = req.headers.get("x-forwarded-proto");
  const protocol = host.includes("modal.host")
    ? "https"
    : forwardedProto ?? (host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https");

  return `${protocol}://${host}`;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const redirectUrl = sanitizeRedirectPath(url.searchParams.get("redirect_url") ?? "") ?? "/dashboard";

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return redirectTo(
      `/sign-in?error=${encodeURIComponent("Supabase is not configured")}&redirect_url=${encodeURIComponent(redirectUrl)}`,
    );
  }

  const response = new NextResponse(null, { status: 303 });
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

  const callbackUrl = new URL("/api/auth/callback", getRequestOrigin(req));
  callbackUrl.searchParams.set("redirect_url", redirectUrl);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackUrl.toString(),
    },
  });

  if (error || !data.url) {
    return redirectTo(
      `/sign-in?error=${encodeURIComponent(
        error?.message ?? "Unable to start Google sign-in",
      )}&redirect_url=${encodeURIComponent(redirectUrl)}`,
    );
  }

  response.headers.set("Location", data.url);
  return response;
}
