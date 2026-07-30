import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";
import { createAdminClient } from "@/lib/supabase-admin";
import { syncProfileForUser } from "@/lib/profile-resolver";
import { sanitizeRedirectPath } from "@/lib/utils";

function redirectTo(_req: NextRequest, path: string) {
  return new NextResponse(null, { status: 303, headers: { Location: path } });
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectUrl = sanitizeRedirectPath(String(formData.get("redirect_url") ?? "")) ?? "/dashboard";
  const signInErrorRedirect = (message: string) =>
    `/sign-in?error=${encodeURIComponent(message)}&redirect_url=${encodeURIComponent(redirectUrl)}`;

  if (!email || !password) {
    return redirectTo(req, signInErrorRedirect("Email and password are required"));
  }

  const response = redirectTo(req, redirectUrl);
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return redirectTo(req, signInErrorRedirect("Supabase is not configured"));
  }

  const supabase = createServerClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
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
