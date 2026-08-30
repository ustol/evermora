import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";
import { createAdminClient } from "@/lib/supabase-admin";
import { syncProfileForUser } from "@/lib/profile-resolver";
import { getSupabaseCookieOptions } from "@/lib/supabase-cookie-options";
import { sanitizeRedirectPath } from "@/lib/utils";

const AUTH_SUCCESS_REDIRECT = "/dashboard";

function redirectTo(_req: NextRequest, path: string) {
  return new NextResponse(null, { status: 303, headers: { Location: path } });
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const requestedRedirectUrl = sanitizeRedirectPath(String(formData.get("redirect_url") ?? "")) ?? AUTH_SUCCESS_REDIRECT;
  const signInErrorRedirect = (message: string) =>
    `/sign-in?error=${encodeURIComponent(message)}&redirect_url=${encodeURIComponent(requestedRedirectUrl)}`;

  if (!email || !password) {
    return redirectTo(req, signInErrorRedirect("Email and password are required"));
  }

  const response = redirectTo(req, AUTH_SUCCESS_REDIRECT);
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return redirectTo(req, signInErrorRedirect("Supabase is not configured"));
  }

  const supabase = createServerClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
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
    },
  );

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return redirectTo(req, signInErrorRedirect(error.message));
  }

  if (data.user) {
    try {
      await syncProfileForUser(createAdminClient(), data.user);
    } catch (error) {
      console.error("Profile sync failed", error);
    }
  }

  return response;
}
