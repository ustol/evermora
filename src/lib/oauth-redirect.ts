import { getSupabaseCookieOptions } from "@/lib/supabase-cookie-options";

export const OAUTH_REDIRECT_COOKIE = "akornafa_oauth_redirect_url";

export function getOAuthRedirectCookieOptions(url: URL, headers: Headers, maxAge = 600) {
  const authCookieOptions = getSupabaseCookieOptions(url, headers);

  return {
    httpOnly: true,
    maxAge,
    path: "/",
    sameSite: authCookieOptions.sameSite,
    secure: authCookieOptions.secure,
  } as const;
}
