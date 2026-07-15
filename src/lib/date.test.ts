import { describe, expect, it } from "vitest"
import {
  calculateAge,
  formatDayMonthYear,
  formatLifespanYears,
} from "@/lib/date"

describe("formatDayMonthYear", () => {
  it("formats an ISO date string", () => {
    expect(formatDayMonthYear("2026-07-14")).toBe("14 July 2026")
  })

  it("formats a Date object", () => {
    expect(formatDayMonthYear(new Date(2026, 6, 14))).toBe("14 July 2026")
  })

  it("returns an empty string for an invalid date", () => {
    expect(formatDayMonthYear("not-a-date")).toBe("")
  })
})

describe("formatLifespanYears", () => {
  it("shows a birth–death year range when both are known", () => {
    expect(formatLifespanYears("1950-03-01", "2024-11-20")).toBe("1950 – 2024")
  })

  it("falls back to just the death year when birth is unknown", () => {
    expect(formatLifespanYears(null, "2024-11-20")).toBe("2024")
    expect(formatLifespanYears(undefined, "2024-11-20")).toBe("2024")
  })

  it("falls back to just the death year when birth is invalid", () => {
    expect(formatLifespanYears("not-a-date", "2024-11-20")).toBe("2024")
  })

  it("returns an empty string when death date is invalid", () => {
    expect(formatLifespanYears("1950-03-01", "not-a-date")).toBe("")
  })
})

describe("calculateAge", () => {
  it("computes whole years between birth and death", () => {
    expect(calculateAge("1950-03-01", "2024-11-20")).toBe(74)
  })

  it("rounds down for a birthday not yet reached in the death year", () => {
    expect(calculateAge("1950-12-01", "2024-11-20")).toBe(73)
  })

  it("returns null when either date is missing", () => {
    expect(calculateAge(null, "2024-11-20")).toBeNull()
    expect(calculateAge("1950-03-01", null)).toBeNull()
    expect(calculateAge(undefined, undefined)).toBeNull()
  })

  it("returns null when either date is invalid", () => {
    expect(calculateAge("not-a-date", "2024-11-20")).toBeNull()
    expect(calculateAge("1950-03-01", "not-a-date")).toBeNull()
  })
})
