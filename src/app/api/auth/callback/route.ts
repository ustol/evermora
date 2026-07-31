import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";
import { createAdminClient } from "@/lib/supabase-admin";
import { getAppManagedDisplayName, getAuthDisplayName, getProviderDisplayName, getProviderNameParts } from "@/lib/auth-metadata";
import { getOAuthRedirectCookieName, getOAuthRedirectCookieOptions, OAUTH_REDIRECT_COOKIE } from "@/lib/oauth-redirect";
import { syncProfileForUser } from "@/lib/profile-resolver";
import { getSupabaseCookieOptions } from "@/lib/supabase-cookie-options";
import { sanitizeRedirectPath } from "@/lib/utils";

function redirectTo(path: string, req?: NextRequest, flowId?: string | null) {
  const response = new NextResponse(null, { status: 303, headers: { Location: path } });

  if (req) {
    response.cookies.set(getOAuthRedirectCookieName(flowId), "", getOAuthRedirectCookieOptions(req.nextUrl, req.headers, 0));
    response.cookies.set(OAUTH_REDIRECT_COOKIE, "", getOAuthRedirectCookieOptions(req.nextUrl, req.headers, 0));
  }

  return response;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const flowId = url.searchParams.get("flow");
  const redirectCookieName = getOAuthRedirectCookieName(flowId);
  const hasFlowBoundRedirect = Boolean(flowId && redirectCookieName !== OAUTH_REDIRECT_COOKIE);
  const redirectTarget = hasFlowBoundRedirect
    ? req.cookies.get(redirectCookieName)?.value
    : url.searchParams.get("redirect_url") ?? req.cookies.get(OAUTH_REDIRECT_COOKIE)?.value;
  const redirectUrl = sanitizeRedirectPath(redirectTarget ?? "") ?? "/dashboard";
  const code = url.searchParams.get("code");

  const response = redirectTo(redirectUrl, req, flowId);

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return redirectTo(
      `/sign-in?error=${encodeURIComponent("Supabase is not configured")}&redirect_url=${encodeURIComponent(redirectUrl)}`,
      req,
      flowId,
    );
  }

  if (!code) {
    return redirectTo(
      `/sign-in?error=${encodeURIComponent("Unable to complete sign-in")}&redirect_url=${encodeURIComponent(redirectUrl)}`,
      req,
      flowId,
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
      req,
      flowId,
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
      req,
      flowId,
    );
  }

  const providerDisplayName = getProviderDisplayName(user.user_metadata);
  const appDisplayName = getAppManagedDisplayName(user.user_metadata);
  const shouldNormalizeProviderName = Boolean(providerDisplayName && !appDisplayName);
  const displayName = shouldNormalizeProviderName ? providerDisplayName! : getAuthDisplayName(user.user_metadata, user.email);
  const nameParts = shouldNormalizeProviderName ? getProviderNameParts(user.user_metadata) : { firstName: "", lastName: "" };
  const normalizedUser =
    shouldNormalizeProviderName
      ? await supabase.auth
          .updateUser({
            data: {
              display_name: displayName,
              first_name: nameParts.firstName,
              last_name: nameParts.lastName,
              profile_name_source: "provider",
            },
          })
          .then(({ data }) => data.user ?? user)
          .catch((err) => {
            console.error("Auth metadata normalization failed after OAuth sign-in", err);
            return user;
          })
      : user;

  try {
    await syncProfileForUser(createAdminClient(), normalizedUser);
  } catch (err) {
    console.error("Profile sync failed after OAuth sign-in", err);
  }

  return response;
}
