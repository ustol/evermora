import { expect, test } from "@playwright/test"
import { createAdminClient } from "@supabase/server/core"
import { existsSync, readFileSync } from "node:fs"
import type { Database } from "../src/types/supabase"
import { trackConsoleErrors } from "./helpers"

function loadDotEnv() {
  if (!existsSync(".env")) return
  const env = readFileSync(".env", "utf8")
  for (const line of env.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (!match || process.env[match[1]]) continue
    process.env[match[1]] = match[2].replace(/^['\"]|['\"]$/g, "")
  }
}

async function createConfirmedTestUser() {
  loadDotEnv()
  const admin = createAdminClient<Database>()
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2)}`
  const email = `memorial-flow-${stamp}@example.com`
  const password = `Memorial-flow-${stamp}!`
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { display_name: "Memorial Flow Tester" },
  })
  expect(error).toBeNull()
  expect(data.user?.id).toBeTruthy()
  return { admin, email, password, userId: data.user!.id, profileId: null as string | null }
}

async function cleanupTestUser(context: Awaited<ReturnType<typeof createConfirmedTestUser>>) {
  if (context.userId) {
    const ownerIds = [context.userId, context.profileId].filter((id): id is string => Boolean(id))
    if (ownerIds.length > 0) await context.admin.from("memorials").delete().in("owner_id", ownerIds)
    await context.admin.from("profiles").delete().eq("clerk_user_id", context.userId)
  }
  await context.admin.auth.admin.deleteUser(context.userId)
}

const protectedCreateRoutes = [
  "/memorials/new",
  "/memorials/new/details",
  "/memorials/create",
  "/memorials/create/details",
]

test.describe("Supabase auth and protected memorial routes", () => {
  test.describe.configure({ mode: "serial" })
  test("signed-in user can sync profile and create a draft memorial from the dashboard", async ({ page }) => {
    const auth = await createConfirmedTestUser()
    const errors = trackConsoleErrors(page)

    try {
      await page.goto("/sign-in")
      await page.getByLabel("Email").fill(auth.email)
      await page.locator("#password").fill(auth.password)
      await page.getByRole("button", { name: "Sign in" }).click()

      await expect(page).toHaveURL(/\/dashboard$/, { timeout: 20_000 })
      await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible()

      await page.goto("/dashboard/memorials/new")
      await expect(page.getByRole("heading", { name: "Create a memorial" })).toBeVisible()

      const displayName = `E2E Draft ${Date.now()}`
      await page.getByLabel("First name").fill("Esi")
      await page.getByLabel("Surname").fill("Mensah")
      await page.getByLabel("Preferred display name").fill(displayName)
      await page.getByLabel("Date of death").fill("2024-01-02")
      await page.getByRole("button", { name: "Continue" }).click()

      await expect(page).toHaveURL(/\/dashboard\/memorials\/[^/]+\/edit\?step=2$/, { timeout: 20_000 })
      await expect(page.getByText(/Your profile is still loading/i)).toHaveCount(0)
      await expect(page.getByRole("heading", { name: "Edit memorial" })).toBeVisible({ timeout: 20_000 })

      const memorialId = new URL(page.url()).pathname.split("/").at(-2)
      expect(memorialId).toBeTruthy()
      const { data: memorial, error: memorialError } = await auth.admin
        .from("memorials")
        .select("id, owner_id, status, display_name")
        .eq("id", memorialId!)
        .single()
      expect(memorialError).toBeNull()
      expect(memorial).toMatchObject({
        id: memorialId,
        owner_id: auth.userId,
        status: "draft",
        display_name: displayName,
      })
      expect(errors).toEqual([])
    } finally {
      await cleanupTestUser(auth)
    }
  })

  test("owner can view memorials and moderate tributes from the dashboard", async ({ page }) => {
    const auth = await createConfirmedTestUser()
    const errors = trackConsoleErrors(page)
    const profileId = crypto.randomUUID()
    const memorialId = crypto.randomUUID()
    const tributeId = crypto.randomUUID()
    const condolenceId = crypto.randomUUID()
    const displayName = `Moderation Memorial ${Date.now()}`

    try {
      auth.profileId = profileId
      const { error: profileError } = await auth.admin.from("profiles").upsert({
        id: profileId,
        clerk_user_id: auth.userId,
        email: auth.email,
        display_name: "Owner Moderator",
      })
      expect(profileError).toBeNull()

      const { error: memorialError } = await auth.admin.from("memorials").insert({
        id: memorialId,
        owner_id: profileId,
        slug: `moderation-${Date.now()}`,
        first_name: "Ama",
        surname: "Owusu",
        display_name: displayName,
        date_of_death: "2024-04-12",
        status: "published",
        privacy: "public",
        require_approval: true,
      })
      expect(memorialError).toBeNull()

      const { error: contributionError } = await auth.admin.from("contributions").insert([
        {
          id: tributeId,
          memorial_id: memorialId,
          author_name: "Kofi Tribute",
          type: "tribute",
          title: "A generous spirit",
          message: "A tribute waiting for approval.",
          status: "pending",
        },
        {
          id: condolenceId,
          memorial_id: memorialId,
          author_name: "Akua Condolence",
          type: "condolence",
          message: "A condolence waiting for review.",
          status: "pending",
        },
      ])
      expect(contributionError).toBeNull()

      await page.goto("/sign-in")
      await page.getByLabel("Email").fill(auth.email)
      await page.locator("#password").fill(auth.password)
      await page.getByRole("button", { name: "Sign in" }).click()
      await expect(page).toHaveURL(/\/dashboard$/, { timeout: 20_000 })

      await page.goto("/dashboard/memorials")
      await expect(page.getByRole("heading", { name: "My memorials" })).toBeVisible()
      await expect(page.getByRole("link", { name: displayName })).toBeVisible()
      await page.getByRole("link", { name: "Review tributes" }).click()

      await expect(page).toHaveURL(new RegExp(`/dashboard/memorials/${memorialId}/content`), { timeout: 20_000 })
      await expect(page.getByRole("heading", { name: "Tributes & condolences" })).toBeVisible()
      await expect(page.getByText("2 pending")).toBeVisible()

      await page.locator("article", { hasText: "A tribute waiting for approval." }).getByRole("button", { name: "Approve" }).click()
      await page.locator("article", { hasText: "A condolence waiting for review." }).getByRole("button", { name: "Reject" }).click()

      await expect(page.locator("article", { hasText: "A tribute waiting for approval." }).getByText("approved")).toBeVisible()
      await expect(page.locator("article", { hasText: "A condolence waiting for review." }).getByText("rejected")).toBeVisible()
      await expect(page.getByText("0 pending")).toBeVisible()

      const { data: reviewed, error: reviewedError } = await auth.admin
        .from("contributions")
        .select("id, status")
        .in("id", [tributeId, condolenceId])
      expect(reviewedError).toBeNull()
      expect(reviewed).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: tributeId, status: "approved" }),
          expect.objectContaining({ id: condolenceId, status: "rejected" }),
        ])
      )
      expect(errors).toEqual([])
    } finally {
      await cleanupTestUser(auth)
    }
  })

  test("admin user lands on dashboard after sign-in even with an admin redirect_url", async ({ page }) => {
    const auth = await createConfirmedTestUser()
    const errors = trackConsoleErrors(page)
    const redirectUrl = "/admin?source=login&tab=overview"

    try {
      const { error: profileError } = await auth.admin.from("profiles").upsert({
        id: auth.userId,
        clerk_user_id: auth.userId,
        email: auth.email,
        display_name: "Admin Redirect Tester",
        role: "admin",
      })
      expect(profileError).toBeNull()

      await page.goto(`/sign-in?${new URLSearchParams({ redirect_url: redirectUrl }).toString()}`)
      await page.getByLabel("Email").fill(auth.email)
      await page.locator("#password").fill(auth.password)
      await page.getByRole("button", { name: "Sign in" }).click()

      await expect(page).toHaveURL(/\/dashboard$/, { timeout: 20_000 })
      await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible({ timeout: 20_000 })
      expect(errors).toEqual([])
    } finally {
      await cleanupTestUser(auth)
    }
  })

  test("non-admin user following an admin redirect_url is routed back to the dashboard", async ({ page }) => {
    const auth = await createConfirmedTestUser()
    const errors = trackConsoleErrors(page)

    try {
      await page.goto("/sign-in?redirect_url=/admin")
      await page.getByLabel("Email").fill(auth.email)
      await page.locator("#password").fill(auth.password)
      await page.getByRole("button", { name: "Sign in" }).click()

      await expect(page).toHaveURL(/\/dashboard$/, { timeout: 20_000 })
      await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible()
      expect(errors).toEqual([])
    } finally {
      await cleanupTestUser(auth)
    }
  })

  test("/dashboard/memorials/new redirects a signed-out visitor to sign-in", async ({ page }) => {
    const errors = trackConsoleErrors(page)

    await page.goto("/dashboard/memorials/new")

    await expect(page).toHaveURL(/\/sign-in(?:\?|$)/, { timeout: 10_000 })
    await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible()
    expect(errors).toEqual([])
  })

  for (const route of protectedCreateRoutes) {
    test(`${route} redirects a signed-out visitor to sign-in`, async ({ page }) => {
      const errors = trackConsoleErrors(page)

      await page.goto(route)

      await expect(page).toHaveURL(/\/sign-in\?redirect_url=/, { timeout: 10_000 })
      expect(decodeURIComponent(page.url())).toContain(`redirect_url=${route}`)
      await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible()
      expect(errors).toEqual([])
    })
  }

  test("sign-in invalid credentials displays the Supabase error", async ({ page }) => {
    const errors = trackConsoleErrors(page)

    await page.goto("/sign-in")
    await page.getByLabel("Email").fill(`not-a-user-${Date.now()}@example.com`)
    await page.locator("#password").fill("wrong-password")
    await page.getByRole("button", { name: "Sign in" }).click()

    await expect(page).toHaveURL(/\/sign-in\?error=/, { timeout: 15_000 })
    await expect(page.getByText(/invalid login credentials/i)).toBeVisible()
    expect(errors).toEqual([])
  })

  test("admin sign-in failure offers a non-enumerating setup path", async ({ page }) => {
    const errors = trackConsoleErrors(page)

    await page.goto("/sign-in?redirect_url=/admin")
    await page.getByLabel("Email").fill(`unknown-admin-${Date.now()}@example.com`)
    await page.locator("#password").fill("wrong-password")
    await page.getByRole("button", { name: "Sign in" }).click()

    await expect(page).toHaveURL(/\/sign-in\?error=/, { timeout: 15_000 })
    await expect(page.getByText(/Admin access now uses Supabase passwords/i)).toBeVisible()
    await expect(page.getByText(/existing admin email/i)).toBeVisible()
    await expect(page.getByText(/not-a-user|unknown-admin/i)).toHaveCount(0)
    await page.getByRole("link", { name: "create your admin password" }).click()
    await expect(page).toHaveURL(/\/sign-up\?/, { timeout: 15_000 })
    const signUpUrl = new URL(page.url())
    expect(signUpUrl.searchParams.get("redirect_url")).toBe("/admin")
    expect(errors).toEqual([])
  })

  test("sign-up preserves an admin redirect_url with its query string in the submitted form", async ({ page }) => {
    const redirectUrl = "/admin/gift-purchases?status=pending&sort=newest"
    const errors = trackConsoleErrors(page)
    const submission = page.waitForRequest(
      (request) => request.url().endsWith("/api/auth/sign-up") && request.method() === "POST",
    )

    await page.route("**/api/auth/sign-up", async (route) => {
      await route.fulfill({ status: 204, body: "" })
    })
    await page.goto(`/sign-up?${new URLSearchParams({
      email: "admin@example.com",
      message: "Create your admin password to continue.",
      redirect_url: redirectUrl,
    }).toString()}`)

    await expect(page.getByText("Create your admin password to continue.")).toBeVisible()
    await expect(page.getByLabel("Email")).toHaveValue("admin@example.com")
    await expect(page.locator('input[name="redirect_url"]').first()).toHaveValue(redirectUrl)

    await page.getByLabel("First name").fill("Admin")
    await page.getByLabel("Last name").fill("User")
    await page.locator("#password").fill("testpassword123")
    await page.getByRole("button", { name: "Create account" }).click()

    const request = await submission
    const form = new URLSearchParams(request.postData() ?? "")
    expect(form.get("redirect_url")).toBe(redirectUrl)
    expect(form.get("email")).toBe("admin@example.com")
    expect(errors).toEqual([])
  })

  test("sign-in password visibility can be toggled", async ({ page }) => {
    await page.goto("/sign-in")
    const password = page.locator("#password")

    await expect(password).toHaveAttribute("type", "password")
    await page.getByRole("button", { name: "Show password" }).click()
    await expect(password).toHaveAttribute("type", "text")
    await page.getByRole("button", { name: "Hide password" }).click()
    await expect(password).toHaveAttribute("type", "password")
  })

  test("sign-up has name fields, password visibility, and submits through the app", async ({ page }) => {
    const errors = trackConsoleErrors(page)
    loadDotEnv()
    const admin = createAdminClient<Database>()
    const email = `auth-regression-${Date.now()}@gmail.com`

    try {
      await page.goto("/sign-up")
      const appOrigin = await page.evaluate(() => window.location.origin)

      await expect(page.getByLabel("First name")).toBeVisible()
      await expect(page.getByLabel("Last name")).toBeVisible()

      const password = page.locator("#password")
      await expect(password).toHaveAttribute("type", "password")
      await page.getByRole("button", { name: "Show password" }).click()
      await expect(password).toHaveAttribute("type", "text")
      await page.getByRole("button", { name: "Hide password" }).click()
      await expect(password).toHaveAttribute("type", "password")

      await page.getByLabel("First name").fill("Auth")
      await page.getByLabel("Last name").fill("Regression")
      await page.getByLabel("Email").fill(email)
      await password.fill("testpassword123")
      await page.getByRole("button", { name: "Create account" }).click()

      await expect(page).toHaveURL(/\/(sign-up\?(error|message)=|dashboard)/, { timeout: 20_000 })
      expect(new URL(page.url()).origin).toBe(appOrigin)
      await expect(
        page.getByText(/check your email|already registered|user already registered|dashboard|rate limit|security purposes|invalid/i).or(
          page.getByRole("heading", { name: /dashboard/i }),
        ),
      ).toBeVisible({ timeout: 10_000 })
      expect(errors).toEqual([])
    } finally {
      for (let pageNumber = 1; pageNumber <= 20; pageNumber += 1) {
        const { data } = await admin.auth.admin.listUsers({ page: pageNumber, perPage: 1000 })
        const created = data.users.find((user) => user.email === email)
        if (created) {
          await admin.auth.admin.deleteUser(created.id)
          break
        }
        if (data.users.length < 1000) break
      }
    }
  })
})

test("a public memorial page still renders after auth changes", async ({ page }) => {
  const errors = trackConsoleErrors(page)
  await page.goto("/memorials", { waitUntil: "networkidle" })

  const firstMemorialLink = page.locator('a[href^="/memorials/"]').first()
  const hasMemorial = (await firstMemorialLink.count()) > 0
  test.skip(!hasMemorial, "No published memorials exist in this environment yet")

  const href = await firstMemorialLink.getAttribute("href")
  await page.goto(href!)

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  await expect(page.getByRole("heading", { name: /Tributes & Condolences/ })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Wreaths & roses" })).toBeVisible()
  expect(errors).toEqual([])
})
