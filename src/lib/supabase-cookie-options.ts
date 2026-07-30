import type { CookieOptions } from "@supabase/ssr";

const STUDIO_IFRAME_HOST_SUFFIX = ".modal.host";

function forwardedHost(headers: Headers): string | null {
  return headers.get("x-forwarded-host")?.split(",")[0]?.trim() ?? headers.get("host");
}

export function isStudioIframeHost(hostname: string): boolean {
  return hostname === "modal.host" || hostname.endsWith(STUDIO_IFRAME_HOST_SUFFIX);
}

export function shouldUseCrossSiteAuthCookies(url: URL, headers?: Headers): boolean {
  const host = headers ? forwardedHost(headers) : null;
  const hostname = host ? host.split(":")[0] : url.hostname;

  return isStudioIframeHost(hostname);
}

export function getSupabaseCookieOptions(url: URL, headers?: Headers): CookieOptions {
  const useCrossSiteCookies = shouldUseCrossSiteAuthCookies(url, headers);

  return {
    path: "/",
    sameSite: useCrossSiteCookies ? "none" : "lax",
    secure: useCrossSiteCookies || process.env.NODE_ENV === "production",
  };
}
