import { expect, test } from "@playwright/test"
import { trackConsoleErrors } from "./helpers"

const dashboardRoutes = [
  "/dashboard",
  "/dashboard/memorials",
  "/dashboard/memorials/new",
  "/dashboard/profile",
]

const adminRoutes = [
  "/admin",
  "/admin/users",
  "/admin/memorials",
  "/admin/reports",
  "/admin/hero-images",
  "/admin/blog",
  "/admin/blog/new",
  "/admin/blog/example-post/edit",
  "/admin/gifts",
  "/admin/gift-purchases",
]

const protectedRoutes = [...dashboardRoutes, ...adminRoutes]

for (const route of protectedRoutes) {
  test(`${route} redirects a signed-out visitor to sign-in with the exact redirect_url`, async ({ page }) => {
    const errors = trackConsoleErrors(page)
    await page.goto(route)

    await expect(page).toHaveURL(/\/sign-in\?redirect_url=/, { timeout: 10_000 })
    const signInUrl = new URL(page.url())
    expect(signInUrl.pathname).toBe("/sign-in")
    expect(signInUrl.searchParams.get("redirect_url")).toBe(route)
    expect(errors).toEqual([])
  })
}

test("admin route guard preserves the exact redirect_url including query strings", async ({ page }) => {
  const route = "/admin/reports?status=open&sort=newest"
  const errors = trackConsoleErrors(page)
  await page.goto(route)

  await expect(page).toHaveURL(/\/sign-in\?redirect_url=/, { timeout: 10_000 })
  const signInUrl = new URL(page.url())
  expect(signInUrl.pathname).toBe("/sign-in")
  expect(signInUrl.searchParams.get("redirect_url")).toBe(route)
  expect(errors).toEqual([])
})

test("sign-in page renders with no console errors", async ({ page }) => {
  const errors = trackConsoleErrors(page)
  await page.goto("/sign-in")
  await expect(page).toHaveURL(/\/sign-in/)
  expect(errors).toEqual([])
})

test("sign-up page renders with no console errors", async ({ page }) => {
  const errors = trackConsoleErrors(page)
  await page.goto("/sign-up")
  await expect(page).toHaveURL(/\/sign-up/)
  expect(errors).toEqual([])
})
