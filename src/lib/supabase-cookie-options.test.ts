import { describe, expect, it } from "vitest";
import {
  getSupabaseCookieOptions,
  isStudioIframeHost,
  shouldUseCrossSiteAuthCookies,
} from "./supabase-cookie-options";

describe("Supabase cookie options", () => {
  it("detects the studio iframe preview host", () => {
    expect(isStudioIframeHost("modal.host")).toBe(true);
    expect(isStudioIframeHost("ta-example-3000-token.w.modal.host")).toBe(true);
    expect(isStudioIframeHost("localhost")).toBe(false);
    expect(isStudioIframeHost("example-modal.host.com")).toBe(false);
  });

  it("uses SameSite=None and Secure cookies for the modal.host iframe preview", () => {
    const url = new URL("https://ta-example-3000-token.w.modal.host/dashboard");

    expect(shouldUseCrossSiteAuthCookies(url)).toBe(true);
    expect(getSupabaseCookieOptions(url)).toMatchObject({
      path: "/",
      sameSite: "none",
      secure: true,
    });
  });

  it("uses the forwarded preview host when Next receives the request through a proxy", () => {
    const url = new URL("http://localhost:3000/dashboard");
    const headers = new Headers({
      host: "localhost:3000",
      "x-forwarded-host": "ta-example-3000-token.w.modal.host, proxy.internal",
    });

    expect(shouldUseCrossSiteAuthCookies(url, headers)).toBe(true);
    expect(getSupabaseCookieOptions(url, headers)).toMatchObject({
      path: "/",
      sameSite: "none",
      secure: true,
    });
  });

  it("keeps first-party local development cookies SameSite=Lax", () => {
    const url = new URL("http://localhost:3000/dashboard");
    const headers = new Headers({ host: "localhost:3000" });

    expect(shouldUseCrossSiteAuthCookies(url, headers)).toBe(false);
    expect(getSupabaseCookieOptions(url, headers)).toMatchObject({
      path: "/",
      sameSite: "lax",
      secure: false,
    });
  });
});
