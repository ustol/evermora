import { expect, test } from "@playwright/test"
import { trackConsoleErrors } from "./helpers"

const protectedRoutes = [
  "/dashboard",
  "/dashboard/memorials",
  "/dashboard/memorials/new",
  "/dashboard/profile",
  "/admin",
  "/admin/users",
  "/admin/memorials",
  "/admin/reports",
  "/admin/gifts",
]

for (const route of protectedRoutes) {
  test(`${route} redirects a signed-out visitor to sign-in`, async ({ page }) => {
    const errors = trackConsoleErrors(page)
    await page.goto(route)

    await expect(page).toHaveURL(/\/sign-in\?redirect_url=/, { timeout: 10_000 })
    expect(decodeURIComponent(page.url())).toContain(`redirect_url=${route}`)
    expect(errors).toEqual([])
  })
}

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
