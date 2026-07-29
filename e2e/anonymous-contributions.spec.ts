import { expect, test } from "@playwright/test"
import { trackConsoleErrors } from "./helpers"

test("signed-out visitors can open the tribute form without being redirected to sign-in", async ({
  page,
}) => {
  const errors = trackConsoleErrors(page)
  await page.goto("/memorials", { waitUntil: "networkidle" })

  const firstMemorialLink = page.locator('a[href^="/memorials/"]').first()
  const hasMemorial = (await firstMemorialLink.count()) > 0
  test.skip(!hasMemorial, "No published memorials exist in this environment yet")

  const href = await firstMemorialLink.getAttribute("href")
  await page.goto(href!, { waitUntil: "networkidle" })

  await page.getByRole("button", { name: /Leave a (tribute|condolence)/i }).click()

  // Must NOT bounce to sign-in — the whole point is no login required.
  await expect(page).not.toHaveURL(/sign-in/)
  await expect(page.getByLabel("Your name")).toBeVisible()
  await expect(page.getByLabel("Your message")).toBeVisible()

  expect(errors).toEqual([])
})

test("signed-out visitors can open the gift purchase dialog without being redirected to sign-in", async ({
  page,
}) => {
  const errors = trackConsoleErrors(page)
  await page.goto("/memorials", { waitUntil: "networkidle" })

  const firstMemorialLink = page.locator('a[href^="/memorials/"]').first()
  const hasMemorial = (await firstMemorialLink.count()) > 0
  test.skip(!hasMemorial, "No published memorials exist in this environment yet")

  const href = await firstMemorialLink.getAttribute("href")
  await page.goto(href!, { waitUntil: "networkidle" })

  await page.getByRole("button", { name: /Send a wreath or rose/i }).click()

  await expect(page).not.toHaveURL(/sign-in/)
  await expect(page.getByText(/no account needed/i)).toBeVisible()

  expect(errors).toEqual([])
})
