import { differenceInYears, format, isValid, parseISO } from "date-fns"

function toDate(value: string | Date): Date {
  return typeof value === "string" ? parseISO(value) : value
}

/** Clear day-month-year display, e.g. "14 July 2026". */
export function formatDayMonthYear(value: string | Date): string {
  const date = toDate(value)
  return isValid(date) ? format(date, "d MMMM yyyy") : ""
}

/** Year-only lifespan for cards, e.g. "1950 – 2024" or "2024" if birth year is unknown. */
export function formatLifespanYears(
  dateOfBirth: string | Date | null | undefined,
  dateOfDeath: string | Date
): string {
  const death = toDate(dateOfDeath)
  if (!isValid(death)) return ""
  if (!dateOfBirth) return format(death, "yyyy")

  const birth = toDate(dateOfBirth)
  if (!isValid(birth)) return format(death, "yyyy")

  return `${format(birth, "yyyy")} – ${format(death, "yyyy")}`
}

/** Age at death in whole years, or null if either date is missing/invalid. */
export function calculateAge(
  dateOfBirth: string | Date | null | undefined,
  dateOfDeath: string | Date | null | undefined
): number | null {
  if (!dateOfBirth || !dateOfDeath) return null
  const birth = toDate(dateOfBirth)
  const death = toDate(dateOfDeath)
  if (!isValid(birth) || !isValid(death)) return null
  return differenceInYears(death, birth)
}
