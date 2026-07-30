import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

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

  if (publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return;
  }

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    try {
      const { userId } = await auth();
      if (!userId) {
        const signInUrl = new URL("/sign-in", req.url);
        signInUrl.searchParams.set("redirect_url", pathname);
        return NextResponse.redirect(signInUrl);
      }
    } catch {
      // Clerk's auth() may throw on frozen headers in some Next.js versions.
      // Fallback: check if the request has a session token directly.
      const sessionCookie = req.cookies.get("__session");
      if (!sessionCookie) {
        const signInUrl = new URL("/sign-in", req.url);
        signInUrl.searchParams.set("redirect_url", pathname);
        return NextResponse.redirect(signInUrl);
      }
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
