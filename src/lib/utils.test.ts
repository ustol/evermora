import { describe, expect, it } from "vitest"
import { cn, sanitizeRedirectPath } from "@/lib/utils"

describe("cn", () => {
  it("merges class names and resolves Tailwind conflicts", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4")
  })

  it("drops falsy values", () => {
    const condition = false
    expect(cn("a", condition && "b", undefined, null, "c")).toBe("a c")
  })
})

describe("sanitizeRedirectPath", () => {
  it("allows a plain relative path", () => {
    expect(sanitizeRedirectPath("/dashboard")).toBe("/dashboard")
  })

  it("allows a relative path with a query string", () => {
    expect(sanitizeRedirectPath("/memorials/some-slug?tab=gallery")).toBe(
      "/memorials/some-slug?tab=gallery"
    )
  })

  it("rejects null", () => {
    expect(sanitizeRedirectPath(null)).toBeUndefined()
  })

  it("rejects an empty string", () => {
    expect(sanitizeRedirectPath("")).toBeUndefined()
  })

  it("rejects protocol-relative URLs (open redirect via //host)", () => {
    expect(sanitizeRedirectPath("//evil.example.com")).toBeUndefined()
  })

  it("rejects absolute URLs with a scheme", () => {
    expect(sanitizeRedirectPath("https://evil.example.com")).toBeUndefined()
    expect(sanitizeRedirectPath("javascript://alert(1)")).toBeUndefined()
  })

  it("rejects paths that don't start with a slash", () => {
    expect(sanitizeRedirectPath("dashboard")).toBeUndefined()
  })
})
