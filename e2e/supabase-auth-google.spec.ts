import { expect, test } from "@playwright/test"
import { trackConsoleErrors } from "./helpers"

const GOOGLE_ROUTE = "/api/auth/sign-in/google"

function parseRedirectTo(location: string) {
  const redirectTo = new URL(location).searchParams.get("redirect_to")
  expect(redirectTo, "Supabase OAuth URL should include callback redirect_to").toBeTruthy()
  return new URL(redirectTo!)
}

test.describe("Supabase Google OAuth", () => {
  test("GET /api/auth/sign-in/google starts the Google OAuth flow with a callback redirect", async ({ request, baseURL }) => {
    if (!baseURL) throw new Error("Playwright baseURL is not configured")

    const response = await request.get(new URL(`${GOOGLE_ROUTE}?redirect_url=%2Fdashboard`, baseURL).toString(), {
      maxRedirects: 0,
    })

    expect(response.status(), await response.text()).toBe(303)
    const location = response.headers()["location"]
    expect(location, "Location header should be set for OAuth redirect").toBeTruthy()

    const oauthUrl = new URL(location!)
    expect(oauthUrl.pathname).toContain("/auth/v1/authorize")
    expect(oauthUrl.searchParams.get("provider")).toBe("google")

    const callbackUrl = parseRedirectTo(location!)
    expect(callbackUrl.pathname).toBe("/api/auth/callback")
    expect(callbackUrl.searchParams.get("redirect_url")).toBe("/dashboard")
  })

  test("Google sign-in button submits the form to the OAuth route with redirect_url", async ({ page }) => {
    const errors = trackConsoleErrors(page)
    let submittedUrl: URL | undefined
    let submittedMethod: string | undefined

    await page.route(`**${GOOGLE_ROUTE}?**`, async (route) => {
      const request = route.request()
      submittedUrl = new URL(request.url())
      submittedMethod = request.method()
      await route.fulfill({
        status: 303,
        headers: { location: "/sign-in?oauth_test=1" },
        body: "",
      })
    })

    await page.goto("/sign-in")

    const googleButton = page.getByRole("button", { name: /continue with google/i })
    await expect(googleButton).toBeVisible()
    await expect(googleButton.locator("xpath=ancestor::form[1]")).toHaveAttribute("method", /get/i)
    await expect(googleButton.locator("xpath=ancestor::form[1]")).toHaveAttribute("action", /\/api\/auth\/sign-in\/google$/)

    await googleButton.click()

    await expect(page).toHaveURL(/\/sign-in\?oauth_test=1/, { timeout: 15_000 })
    expect(submittedMethod).toBe("GET")
    expect(submittedUrl?.pathname).toBe(GOOGLE_ROUTE)
    expect(submittedUrl?.searchParams.get("redirect_url")).toBe("/dashboard")
    expect(errors).toEqual([])
  })

  test("OAuth callback without a code redirects back to sign-in and preserves a safe redirect_url", async ({ request, baseURL }) => {
    if (!baseURL) throw new Error("Playwright baseURL is not configured")

    const response = await request.get(new URL("/api/auth/callback?redirect_url=%2Fdashboard", baseURL).toString(), {
      maxRedirects: 0,
    })

    expect(response.status(), await response.text()).toBe(303)
    const location = response.headers()["location"]
    expect(location).toContain("/sign-in?error=")
    expect(decodeURIComponent(location ?? "")).toContain("redirect_url=/dashboard")
  })
})
