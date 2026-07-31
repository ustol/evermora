import { getSupabaseCookieOptions } from "@/lib/supabase-cookie-options";

export const OAUTH_REDIRECT_COOKIE = "akornafa_oauth_redirect_url";
const OAUTH_REDIRECT_COOKIE_PREFIX = `${OAUTH_REDIRECT_COOKIE}_`;
const OAUTH_FLOW_ID_PATTERN = /^[a-f0-9]{32}$/;

export function getOAuthRedirectCookieName(flowId?: string | null) {
  if (!flowId) return OAUTH_REDIRECT_COOKIE;
  return OAUTH_FLOW_ID_PATTERN.test(flowId) ? `${OAUTH_REDIRECT_COOKIE_PREFIX}${flowId}` : OAUTH_REDIRECT_COOKIE;
}

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
