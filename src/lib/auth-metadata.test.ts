import { describe, expect, it } from "vitest"
import { getAuthDisplayName, getAuthNameParts, getProviderDisplayName, getProviderNameParts } from "@/lib/auth-metadata"

describe("auth metadata helpers", () => {
  it("preserves app-managed display_name fields over provider metadata", () => {
    const metadata = {
      display_name: "Ama Mensah",
      first_name: "Ama",
      last_name: "Mensah",
      full_name: "visio cms",
      name: "visio cms",
    }

    expect(getAuthDisplayName(metadata, "ama@example.com")).toBe("Ama Mensah")
    expect(getAuthNameParts(metadata)).toEqual({ firstName: "Ama", lastName: "Mensah" })
  })

  it("uses Google full_name when app-managed name fields are unavailable", () => {
    const metadata = {
      full_name: "visio cms",
      name: "visio cms",
    }

    expect(getAuthDisplayName(metadata, "visiocms@gmail.com")).toBe("visio cms")
    expect(getAuthNameParts(metadata)).toEqual({ firstName: "visio", lastName: "cms" })
  })

  it("ignores provider-normalized fields as app-managed profile names", () => {
    const metadata = {
      display_name: "visio cms",
      first_name: "visio",
      last_name: "cms",
      full_name: "visio cms",
      profile_name_source: "provider",
    }

    expect(getAuthDisplayName(metadata, "visiocms@gmail.com")).toBe("visio cms")
    expect(getAuthNameParts(metadata)).toEqual({ firstName: "visio", lastName: "cms" })
  })

  it("exposes provider names separately for OAuth normalization", () => {
    const metadata = {
      display_name: "Peter Lotsu",
      first_name: "Peter",
      last_name: "Lotsu",
      name: "visio cms",
    }

    expect(getProviderDisplayName(metadata)).toBe("visio cms")
    expect(getProviderNameParts(metadata)).toEqual({ firstName: "visio", lastName: "cms" })
  })

  it("uses email/password display_name when provider names are unavailable", () => {
    const metadata = {
      display_name: "Ama Mensah",
      first_name: "Ama",
      last_name: "Mensah",
    }

    expect(getAuthDisplayName(metadata, "ama@example.com")).toBe("Ama Mensah")
    expect(getAuthNameParts(metadata)).toEqual({ firstName: "Ama", lastName: "Mensah" })
  })

  it("falls back safely when metadata is empty", () => {
    expect(getAuthDisplayName({}, "fallback@example.com")).toBe("fallback@example.com")
    expect(getAuthNameParts({})).toEqual({ firstName: "", lastName: "" })
  })
})
