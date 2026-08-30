import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";
import { createAdminClient } from "@/lib/supabase-admin";
import { syncProfileForUser } from "@/lib/profile-resolver";

const AUTH_SUCCESS_REDIRECT = "/dashboard";

function redirectTo(_req: NextRequest, path: string) {
  return new NextResponse(null, { status: 303, headers: { Location: path } });
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const displayName = `${firstName} ${lastName}`.trim();
  const signUpRedirect = (params: Record<string, string>) => {
    const searchParams = new URLSearchParams({ ...params, redirect_url: AUTH_SUCCESS_REDIRECT });
    if (email) searchParams.set("email", email);
    return `/sign-up?${searchParams.toString()}`;
  };

  if (!firstName || !lastName || !email || !password) {
    return redirectTo(req, signUpRedirect({ error: "Please fill in all fields" }));
  }

  const response = redirectTo(req, AUTH_SUCCESS_REDIRECT);
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return redirectTo(req, signUpRedirect({ error: "Supabase is not configured" }));
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

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        display_name: displayName,
      },
    },
  });

  if (error) {
    return redirectTo(req, signUpRedirect({ error: error.message }));
  }

  if (!data.session) {
    return redirectTo(req, signUpRedirect({ message: "Check your email to confirm your account, then sign in." }));
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
