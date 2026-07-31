import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { OAUTH_REDIRECT_COOKIE } from "@/lib/oauth-redirect";

const mocks = vi.hoisted(() => ({
  createServerClient: vi.fn(),
}));

vi.mock("@supabase/ssr", () => ({
  createServerClient: mocks.createServerClient,
}));

function googleSignInRequest(path: string, headers: Record<string, string> = {}) {
  return new NextRequest(new URL(path, "https://app.example.com"), {
    headers: {
      host: "app.example.com",
      "x-forwarded-host": "app.example.com",
      "x-forwarded-proto": "https",
      ...headers,
    },
  });
}

describe("GET /api/auth/sign-in/google", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "publishable-key",
    };
  });

  it("starts Supabase OAuth with an exact allowlisted callback redirect_to and stores the return path in the OAuth cookie", async () => {
    const signInWithOAuth = vi.fn().mockResolvedValue({
      data: { url: "https://example.supabase.co/auth/v1/authorize?provider=google&redirect_to=https%3A%2F%2Fapp.example.com%2Fapi%2Fauth%2Fcallback" },
      error: null,
    });
    mocks.createServerClient.mockReturnValue({
      auth: { signInWithOAuth },
    });

    const { GET } = await import("./route");
    const response = await GET(googleSignInRequest("/api/auth/sign-in/google?redirect_url=%2Fdashboard%2Fmemorials%2Fnew"));

    expect(response.status).toBe(303);
    expect(response.headers.get("location")).toContain("/auth/v1/authorize");
    expect(signInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: {
        redirectTo: "https://app.example.com/api/auth/callback",
      },
    });

    const redirectTo = new URL(signInWithOAuth.mock.calls[0][0].options.redirectTo);
    expect(redirectTo.pathname).toBe("/api/auth/callback");
    expect(redirectTo.search).toBe("");

    const setCookie = response.headers.get("set-cookie");
    expect(setCookie).toContain(`${OAUTH_REDIRECT_COOKIE}=%2Fdashboard%2Fmemorials%2Fnew`);
    expect(setCookie).toContain("HttpOnly");
    expect(setCookie).toContain("Path=/");
    expect(setCookie).toContain("Max-Age=600");
  });
});
