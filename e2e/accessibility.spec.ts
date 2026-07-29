import { expect, test } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

async function scan(page: import("@playwright/test").Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze()
  return results.violations
}

function formatViolations(violations: Awaited<ReturnType<typeof scan>>) {
  return violations
    .map(
      (v) =>
        `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes.map((n) => n.target.join(" ")).join("\n  ")}`
    )
    .join("\n\n")
}

test("homepage has no automatically detectable a11y violations", async ({ page }) => {
  await page.goto("/")
  const violations = await scan(page)
  expect(violations, formatViolations(violations)).toEqual([])
})

test("about page has no automatically detectable a11y violations", async ({ page }) => {
  await page.goto("/about")
  const violations = await scan(page)
  expect(violations, formatViolations(violations)).toEqual([])
})

test("memorials directory has no automatically detectable a11y violations", async ({
  page,
}) => {
  await page.goto("/memorials", { waitUntil: "networkidle" })
  const violations = await scan(page)
  expect(violations, formatViolations(violations)).toEqual([])
})

test("a real memorial page has no automatically detectable a11y violations", async ({
  page,
}) => {
  await page.goto("/memorials", { waitUntil: "networkidle" })
  const firstMemorialLink = page.locator('a[href^="/memorials/"]').first()
  const hasMemorial = (await firstMemorialLink.count()) > 0
  test.skip(!hasMemorial, "No published memorials exist in this environment yet")

  const href = await firstMemorialLink.getAttribute("href")
  await page.goto(href!, { waitUntil: "networkidle" })
  const violations = await scan(page)
  expect(violations, formatViolations(violations)).toEqual([])
})

test("sign-in page has no automatically detectable a11y violations", async ({ page }) => {
  await page.goto("/sign-in")
  const violations = await scan(page)
  expect(violations, formatViolations(violations)).toEqual([])
})

test("404 page has no automatically detectable a11y violations", async ({ page }) => {
  await page.goto("/this-page-does-not-exist")
  const violations = await scan(page)
  expect(violations, formatViolations(violations)).toEqual([])
})
