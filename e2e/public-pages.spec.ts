import { expect, test } from "@playwright/test"
import { trackConsoleErrors } from "./helpers"

test("homepage renders brand chrome with no console errors", async ({ page }) => {
  const errors = trackConsoleErrors(page)
  await page.goto("/")

  const header = page.getByRole("banner")
  await expect(header.getByRole("link", { name: "Akornafa" })).toBeVisible()
  await expect(header.getByRole("link", { name: "Find a memorial" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Create a memorial" }).first()).toBeVisible()
  await expect(
    page.getByRole("contentinfo").getByText("Honouring lives. Preserving memories.")
  ).toBeVisible()

  expect(errors).toEqual([])
})

test("about page renders with no console errors", async ({ page }) => {
  const errors = trackConsoleErrors(page)
  await page.goto("/about")
  await expect(page).toHaveURL(/\/about$/)
  expect(errors).toEqual([])
})

test("memorials directory renders with no console errors", async ({ page }) => {
  const errors = trackConsoleErrors(page)
  await page.goto("/memorials")
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  expect(errors).toEqual([])
})

test("a real memorial page renders its core sections with no console errors", async ({
  page,
}) => {
  const errors = trackConsoleErrors(page)
  await page.goto("/memorials", { waitUntil: "networkidle" })

  const firstMemorialLink = page.locator('a[href^="/memorials/"]').first()
  const hasMemorial = (await firstMemorialLink.count()) > 0
  test.skip(!hasMemorial, "No published memorials exist in this environment yet")

  const href = await firstMemorialLink.getAttribute("href")
  await page.goto(href!)

  await expect(page.getByRole("heading", { name: "Photo gallery" })).toBeVisible()
  await expect(
    page.getByRole("heading", { name: "Tributes & Condolences" })
  ).toBeVisible()
  await expect(page.getByText("Wreaths & roses")).toBeVisible()

  expect(errors).toEqual([])
})

test("unknown paths render the 404 page", async ({ page }) => {
  const errors = trackConsoleErrors(page)
  const response = await page.goto("/this-page-does-not-exist")
  // The SPA rewrite always serves index.html with a 200 status; the router
  // itself decides to render NotFoundPage — assert on content, not status.
  expect(response?.status()).toBeLessThan(500)
  await expect(page.getByText(/not found/i).first()).toBeVisible()
  expect(errors).toEqual([])
})
