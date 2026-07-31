import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getOAuthRedirectCookieName, OAUTH_REDIRECT_COOKIE } from "@/lib/oauth-redirect";

const mocks = vi.hoisted(() => ({
  createServerClient: vi.fn(),
  createAdminClient: vi.fn(() => ({ admin: true })),
  syncProfileForUser: vi.fn(),
}));

vi.mock("@supabase/ssr", () => ({
  createServerClient: mocks.createServerClient,
}));

vi.mock("@/lib/supabase-admin", () => ({
  createAdminClient: mocks.createAdminClient,
}));

vi.mock("@/lib/profile-resolver", () => ({
  syncProfileForUser: mocks.syncProfileForUser,
}));

function callbackRequest(path: string, cookieHeader?: string) {
  return new NextRequest(new URL(path, "http://localhost:3000"), {
    headers: cookieHeader ? { cookie: cookieHeader, host: "localhost:3000" } : { host: "localhost:3000" },
  });
}

function cookiePair(name: string, value: string) {
  return `${name}=${encodeURIComponent(value)}`;
}

describe("GET /api/auth/callback", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "publishable-key",
    };
  });

  it("normalizes Google provider metadata when app-managed name fields are missing", async () => {
    const staleUser = {
      id: "user-1",
      email: "visiocms@gmail.com",
      user_metadata: {
        full_name: "visio cms",
        name: "visio cms",
      },
    };
    const normalizedUser = {
      ...staleUser,
      user_metadata: {
        ...staleUser.user_metadata,
        display_name: "visio cms",
        first_name: "visio",
        last_name: "cms",
        profile_name_source: "provider",
      },
    };
    const updateUser = vi.fn().mockResolvedValue({ data: { user: normalizedUser }, error: null });
    const supabase = {
      auth: {
        exchangeCodeForSession: vi.fn().mockResolvedValue({ error: null }),
        getUser: vi.fn().mockResolvedValue({ data: { user: staleUser }, error: null }),
        updateUser,
      },
    };
    mocks.createServerClient.mockReturnValue(supabase);

    const { GET } = await import("./route");
    const response = await GET(callbackRequest("/api/auth/callback?code=oauth-code&redirect_url=%2Fdashboard%2Fprofile"));

    expect(response.status).toBe(303);
    expect(response.headers.get("location")).toBe("/dashboard/profile");
    expect(updateUser).toHaveBeenCalledWith({
      data: {
        display_name: "visio cms",
        first_name: "visio",
        last_name: "cms",
        profile_name_source: "provider",
      },
    });
    expect(mocks.syncProfileForUser).toHaveBeenCalledWith({ admin: true }, normalizedUser);
  });

  it("does not overwrite existing app-managed profile metadata with Google provider metadata", async () => {
    const user = {
      id: "user-2",
      email: "ama@example.com",
      user_metadata: {
        display_name: "Ama Mensah",
        first_name: "Ama",
        last_name: "Mensah",
        full_name: "visio cms",
        name: "visio cms",
      },
    };
    const updateUser = vi.fn();
    mocks.createServerClient.mockReturnValue({
      auth: {
        exchangeCodeForSession: vi.fn().mockResolvedValue({ error: null }),
        getUser: vi.fn().mockResolvedValue({ data: { user }, error: null }),
        updateUser,
      },
    });

    const { GET } = await import("./route");
    const response = await GET(callbackRequest("/api/auth/callback?code=oauth-code&redirect_url=%2Fdashboard%2Fprofile"));

    expect(response.status).toBe(303);
    expect(updateUser).not.toHaveBeenCalled();
    expect(mocks.syncProfileForUser).toHaveBeenCalledWith({ admin: true }, user);
  });

  it("does not let redirect_url override a valid flow-bound redirect cookie", async () => {
    const flowId = "33333333333333333333333333333333";
    const cookieName = getOAuthRedirectCookieName(flowId);

    const { GET } = await import("./route");
    const response = await GET(
      callbackRequest(
        `/api/auth/callback?flow=${flowId}&redirect_url=${encodeURIComponent("/admin")}`,
        cookiePair(cookieName, "/dashboard/profile"),
      ),
    );

    expect(response.status).toBe(303);
    expect(response.headers.get("location")).toBe(
      `/sign-in?error=${encodeURIComponent("Unable to complete sign-in")}&redirect_url=${encodeURIComponent("/dashboard/profile")}`,
    );
  });

  it("uses the flow-bound redirect cookie so overlapping OAuth callbacks keep separate return paths", async () => {
    const firstFlowId = "11111111111111111111111111111111";
    const secondFlowId = "22222222222222222222222222222222";
    const firstCookieName = getOAuthRedirectCookieName(firstFlowId);
    const secondCookieName = getOAuthRedirectCookieName(secondFlowId);
    const cookieHeader = [
      cookiePair(OAUTH_REDIRECT_COOKIE, "/dashboard"),
      cookiePair(firstCookieName, "/dashboard/memorials/new"),
      cookiePair(secondCookieName, "/dashboard/profile"),
    ].join("; ");

    const { GET } = await import("./route");
    const response = await GET(callbackRequest(`/api/auth/callback?flow=${secondFlowId}`, cookieHeader));

    expect(response.status).toBe(303);
    const location = response.headers.get("location");
    expect(location).toBe(
      `/sign-in?error=${encodeURIComponent("Unable to complete sign-in")}&redirect_url=${encodeURIComponent("/dashboard/profile")}`,
    );

    const setCookies = response.headers.getSetCookie();
    expect(setCookies.some((cookie) => cookie.startsWith(`${secondCookieName}=;`) && cookie.includes("Max-Age=0"))).toBe(true);
    expect(setCookies.some((cookie) => cookie.startsWith(`${OAUTH_REDIRECT_COOKIE}=;`) && cookie.includes("Max-Age=0"))).toBe(true);
    expect(setCookies.some((cookie) => cookie.startsWith(`${firstCookieName}=;`))).toBe(false);
  });
});
