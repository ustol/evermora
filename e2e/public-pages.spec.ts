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

test("about page renders its refreshed content with no console errors", async ({ page }) => {
  const errors = trackConsoleErrors(page)
  await page.goto("/about")

  await expect(page).toHaveURL(/\/about$/)
  await expect(page.getByRole("heading", { level: 1, name: "About Akornafa" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "What we believe" })).toBeVisible()
  await expect(page.getByRole("article").getByText("Honouring lives. Preserving memories.")).toBeVisible()
  expect(errors).toEqual([])
})

test("design-system page renders foundations and components with no console errors", async ({ page }) => {
  const errors = trackConsoleErrors(page)
  await page.goto("/design-system")

  await expect(page).toHaveURL(/\/design-system$/)
  await expect(page.getByRole("heading", { level: 1, name: "Editorial foundations & components" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Color system" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Buttons" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Editorial sidebar" })).toBeVisible()
  await expect(page.getByText("Akornafa Design System")).toBeVisible()
  expect(errors).toEqual([])
})

test("memorials directory renders with no console errors", async ({ page }) => {
  const errors = trackConsoleErrors(page)
  await page.goto("/memorials")
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  expect(errors).toEqual([])
})

test("public homepage navigates to the uncached memorial directory", async ({ page }) => {
  const errors = trackConsoleErrors(page)

  const homeResponse = await page.goto("/")
  expect(homeResponse?.headers()["cache-control"]).toMatch(/no-cache|no-store/i)

  const directoryLink = page.getByRole("banner").getByRole("link", { name: "Find a memorial" })
  await expect(directoryLink).toHaveAttribute("href", "/memorials")
  await Promise.all([
    page.waitForURL(/\/memorials$/),
    directoryLink.click(),
  ])
  await expect(page.getByRole("heading", { level: 1, name: "Find a memorial" })).toBeVisible()

  const directoryResponse = await page.goto("/memorials")
  expect(directoryResponse?.headers()["cache-control"]).toMatch(/no-cache|no-store/i)

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

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  await expect(
    page.getByRole("heading", { name: /Tributes & Condolences/ })
  ).toBeVisible()
  await expect(page.getByRole("heading", { name: "Wreaths & roses" })).toBeVisible()

  expect(errors).toEqual([])
})

test("unknown paths render the 404 page", async ({ page }) => {
  const errors = trackConsoleErrors(page)
  const response = await page.goto("/this-page-does-not-exist")
  // The SPA rewrite always serves index.html with a 200 status; the router
  // itself decides to render NotFoundPage — assert on content, not status.
  expect(response?.status()).toBeLessThan(500)
  await expect(page.getByText(/not found/i).first()).toBeVisible()
  expect(errors.filter((error) => !error.includes("status of 404"))).toEqual([])
})
