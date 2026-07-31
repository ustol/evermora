import { expect, test } from "@playwright/test"
import { trackConsoleErrors } from "./helpers"

const GOOGLE_ROUTE = "/api/auth/sign-in/google"
const OAUTH_REDIRECT_COOKIE = "akornafa_oauth_redirect_url"

function parseRedirectTo(location: string) {
  const redirectTo = new URL(location).searchParams.get("redirect_to")
  expect(redirectTo, "Supabase OAuth URL should include callback redirect_to").toBeTruthy()
  return new URL(redirectTo!)
}

function cookieHeaders(response: { headersArray(): { name: string; value: string }[] }) {
  return response
    .headersArray()
    .filter((header) => header.name.toLowerCase() === "set-cookie")
    .map((header) => header.value)
}

function oauthRedirectCookie(response: { headersArray(): { name: string; value: string }[] }, flowId?: string | null) {
  const cookieName = flowId ? `${OAUTH_REDIRECT_COOKIE}_${flowId}` : OAUTH_REDIRECT_COOKIE
  return cookieHeaders(response).find((cookie) => cookie.startsWith(`${cookieName}=`))
}

test.describe("Supabase Google OAuth", () => {
  test("GET /api/auth/sign-in/google starts OAuth with a clean callback URL and HTTP-only return-path cookie", async ({
    request,
    baseURL,
  }) => {
    if (!baseURL) throw new Error("Playwright baseURL is not configured")

    const response = await request.get(new URL(`${GOOGLE_ROUTE}?redirect_url=%2Fdashboard%2Fmemorials%2Fnew`, baseURL).toString(), {
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
    expect(callbackUrl.searchParams.get("redirect_url"), "Supabase redirect_to should not leak app return path in query parameters").toBeNull()
    const flowId = callbackUrl.searchParams.get("flow")
    expect(flowId).toMatch(/^[a-f0-9]{32}$/)

    const returnPathCookie = oauthRedirectCookie(response, flowId)
    expect(returnPathCookie, "OAuth route should store the post-auth return path in a flow-bound cookie").toBeTruthy()
    expect(returnPathCookie).toContain(`${OAUTH_REDIRECT_COOKIE}_${flowId}=%2Fdashboard%2Fmemorials%2Fnew`)
    expect(returnPathCookie).toContain("HttpOnly")
    expect(returnPathCookie).toContain("Path=/")
    expect(returnPathCookie).toContain("Max-Age=600")
  })

  test("overlapping OAuth starts keep separate return paths", async ({ request, baseURL }) => {
    if (!baseURL) throw new Error("Playwright baseURL is not configured")

    const firstResponse = await request.get(new URL(`${GOOGLE_ROUTE}?redirect_url=%2Fdashboard%2Fmemorials%2Fnew`, baseURL).toString(), {
      maxRedirects: 0,
    })
    const secondResponse = await request.get(new URL(`${GOOGLE_ROUTE}?redirect_url=%2Fdashboard%2Fprofile`, baseURL).toString(), {
      maxRedirects: 0,
    })

    const firstFlowId = parseRedirectTo(firstResponse.headers()["location"]!).searchParams.get("flow")
    const secondFlowId = parseRedirectTo(secondResponse.headers()["location"]!).searchParams.get("flow")

    expect(firstFlowId).toMatch(/^[a-f0-9]{32}$/)
    expect(secondFlowId).toMatch(/^[a-f0-9]{32}$/)
    expect(firstFlowId).not.toBe(secondFlowId)
    expect(oauthRedirectCookie(firstResponse, firstFlowId)).toContain(`${OAUTH_REDIRECT_COOKIE}_${firstFlowId}=%2Fdashboard%2Fmemorials%2Fnew`)
    expect(oauthRedirectCookie(secondResponse, secondFlowId)).toContain(`${OAUTH_REDIRECT_COOKIE}_${secondFlowId}=%2Fdashboard%2Fprofile`)
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

  test("Google sign-up button submits to the OAuth route with the sanitized redirect_url", async ({ page }) => {
    const errors = trackConsoleErrors(page)
    let submittedUrl: URL | undefined
    let submittedMethod: string | undefined

    await page.route(`**${GOOGLE_ROUTE}?**`, async (route) => {
      const request = route.request()
      submittedUrl = new URL(request.url())
      submittedMethod = request.method()
      await route.fulfill({
        status: 303,
        headers: { location: "/sign-up?oauth_test=1" },
        body: "",
      })
    })

    await page.goto("/sign-up?redirect_url=%2Fdashboard%2Fmemorials%2Fnew")

    const googleButton = page.getByRole("button", { name: "Sign up with Google" })
    const googleForm = googleButton.locator("xpath=ancestor::form[1]")
    await expect(googleButton).toBeVisible()
    await expect(googleForm).toHaveAttribute("method", /get/i)
    await expect(googleForm).toHaveAttribute("action", /\/api\/auth\/sign-in\/google$/)
    await expect(googleForm.locator('input[name="redirect_url"]')).toHaveValue("/dashboard/memorials/new")

    await googleButton.click()

    await expect(page).toHaveURL(/\/sign-up\?oauth_test=1/, { timeout: 15_000 })
    expect(submittedMethod).toBe("GET")
    expect(submittedUrl?.pathname).toBe(GOOGLE_ROUTE)
    expect(submittedUrl?.searchParams.get("redirect_url")).toBe("/dashboard/memorials/new")
    expect(errors).toEqual([])
  })

  test("Google sign-up button falls back to dashboard for an unsafe redirect_url", async ({ page }) => {
    const errors = trackConsoleErrors(page)
    let submittedUrl: URL | undefined

    await page.route(`**${GOOGLE_ROUTE}?**`, async (route) => {
      submittedUrl = new URL(route.request().url())
      await route.fulfill({
        status: 303,
        headers: { location: "/sign-up?oauth_test=unsafe" },
        body: "",
      })
    })

    await page.goto("/sign-up?redirect_url=https%3A%2F%2Fevil.example%2Fphish")

    const googleButton = page.getByRole("button", { name: "Sign up with Google" })
    const googleForm = googleButton.locator("xpath=ancestor::form[1]")
    await expect(googleButton).toBeVisible()
    await expect(googleForm.locator('input[name="redirect_url"]')).toHaveValue("/dashboard")

    await googleButton.click()

    await expect(page).toHaveURL(/\/sign-up\?oauth_test=unsafe/, { timeout: 15_000 })
    expect(submittedUrl?.pathname).toBe(GOOGLE_ROUTE)
    expect(submittedUrl?.searchParams.get("redirect_url")).toBe("/dashboard")
    expect(submittedUrl?.toString()).not.toContain("evil.example")
    expect(errors).toEqual([])
  })

  test("OAuth callback without a code uses the flow-bound return-path cookie and clears it", async ({ request, baseURL }) => {
    if (!baseURL) throw new Error("Playwright baseURL is not configured")
    const flowId = "0123456789abcdef0123456789abcdef"

    const response = await request.get(new URL(`/api/auth/callback?flow=${flowId}`, baseURL).toString(), {
      headers: {
        cookie: `${OAUTH_REDIRECT_COOKIE}_${flowId}=${encodeURIComponent("/dashboard/memorials/new")}`,
      },
      maxRedirects: 0,
    })

    expect(response.status(), await response.text()).toBe(303)
    const location = response.headers()["location"]
    expect(location).toContain("/sign-in?error=")
    expect(decodeURIComponent(location ?? "")).toContain("redirect_url=/dashboard/memorials/new")

    const clearedCookie = oauthRedirectCookie(response, flowId)
    expect(clearedCookie, "Callback should clear the temporary OAuth return-path cookie").toBeTruthy()
    expect(clearedCookie).toContain(`${OAUTH_REDIRECT_COOKIE}_${flowId}=`)
    expect(clearedCookie).toContain("Max-Age=0")
    expect(clearedCookie).toContain("HttpOnly")
  })

  test("OAuth callback ignores an unsafe return-path cookie and falls back to dashboard", async ({ request, baseURL }) => {
    if (!baseURL) throw new Error("Playwright baseURL is not configured")

    const response = await request.get(new URL("/api/auth/callback", baseURL).toString(), {
      headers: {
        cookie: `${OAUTH_REDIRECT_COOKIE}=${encodeURIComponent("https://evil.example/phish")}`,
      },
      maxRedirects: 0,
    })

    expect(response.status(), await response.text()).toBe(303)
    const location = response.headers()["location"]
    expect(location).toContain("/sign-in?error=")
    expect(decodeURIComponent(location ?? "")).toContain("redirect_url=/dashboard")
    expect(decodeURIComponent(location ?? "")).not.toContain("evil.example")
  })
})
