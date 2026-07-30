import { afterEach, describe, expect, it, vi } from "vitest";

const { createBrowserClientMock, getBrowserSupabaseCookieOptionsMock } = vi.hoisted(() => ({
  createBrowserClientMock: vi.fn(() => ({ auth: {} })),
  getBrowserSupabaseCookieOptionsMock: vi.fn(() => ({
    path: "/",
    sameSite: "none" as const,
    secure: true,
  })),
}));

vi.mock("@supabase/ssr", () => ({
  createBrowserClient: createBrowserClientMock,
}));

vi.mock("@/lib/supabase-cookie-options", () => ({
  getBrowserSupabaseCookieOptions: getBrowserSupabaseCookieOptionsMock,
}));

describe("browser Supabase client", () => {
  afterEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    createBrowserClientMock.mockClear();
    getBrowserSupabaseCookieOptionsMock.mockClear();
  });

  it("passes browser cookie options into Supabase so auth refreshes use the iframe-safe attributes", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://project.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "publishable-key");

    const { createClient } = await import("./supabase-browser");

    const client = createClient();

    expect(getBrowserSupabaseCookieOptionsMock).toHaveBeenCalledTimes(1);
    expect(createBrowserClientMock).toHaveBeenCalledWith(
      "https://project.supabase.co",
      "publishable-key",
      {
        cookieOptions: {
          path: "/",
          sameSite: "none",
          secure: true,
        },
      },
    );
    expect(createClient()).toBe(client);
    expect(createBrowserClientMock).toHaveBeenCalledTimes(1);
  });
});
