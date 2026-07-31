import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseCookieOptions } from "@/lib/supabase-cookie-options";

const publicPaths = [
  "/",
  "/sign-in",
  "/sign-up",
  "/memorials",
  "/about",
  "/blog",
  "/privacy",
  "/terms",
  "/api",
];

function buildForwardedHeaders(req: NextRequest, redirectPath: string) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-current-path", redirectPath);
  requestHeaders.set("cookie", req.cookies.toString());
  return requestHeaders;
}

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const redirectPath = `${pathname}${req.nextUrl.search}`;

  const isProtectedCreateRoute =
    pathname === "/memorials/new" ||
    pathname.startsWith("/memorials/new/") ||
    pathname === "/memorials/create" ||
    pathname.startsWith("/memorials/create/");

  if (!isProtectedCreateRoute && publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  if (!isProtectedCreateRoute && !pathname.startsWith("/dashboard") && !pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", redirectPath);
    return NextResponse.redirect(signInUrl);
  }

  let response = NextResponse.next({ request: { headers: buildForwardedHeaders(req, redirectPath) } });
  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookieOptions: getSupabaseCookieOptions(req.nextUrl, req.headers),
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet, headers = {}) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          response = NextResponse.next({ request: { headers: buildForwardedHeaders(req, redirectPath) } });
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

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", redirectPath);
    const redirectResponse = NextResponse.redirect(signInUrl);
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });
    return redirectResponse;
  }

  return response;
}

export default proxy;

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
