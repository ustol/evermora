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
    process.env[match[1]] = match[2].replace(/^[\'\"]|[\'\"]$/g, "")
  }
}

async function createConfirmedTestUser() {
  loadDotEnv()
  const admin = createAdminClient<Database>()
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2)}`
  const email = `wreath-dashboard-${stamp}@example.com`
  const password = `Wreath-dashboard-${stamp}!`
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { display_name: "Wreath Dashboard Tester" },
  })
  expect(error).toBeNull()
  expect(data.user?.id).toBeTruthy()
  return {
    admin,
    email,
    password,
    userId: data.user!.id,
    profileId: null as string | null,
    giftId: null as string | null,
  }
}

async function cleanupTestUser(context: Awaited<ReturnType<typeof createConfirmedTestUser>>) {
  const ownerIds = [context.userId, context.profileId].filter((id): id is string => Boolean(id))
  if (ownerIds.length > 0) {
    const { data: memorials } = await context.admin.from("memorials").select("id").in("owner_id", ownerIds)
    const memorialIds = (memorials ?? []).map((memorial) => memorial.id)
    if (memorialIds.length > 0) await context.admin.from("gift_purchases").delete().in("memorial_id", memorialIds)
    await context.admin.from("memorials").delete().in("owner_id", ownerIds)
  }
  if (context.giftId) await context.admin.from("gift_catalog").delete().eq("id", context.giftId)
  if (context.userId) await context.admin.from("profiles").delete().eq("clerk_user_id", context.userId)
  await context.admin.auth.admin.deleteUser(context.userId)
}

function formatMoney(amount: number, currency: string | null) {
  if (!currency) return amount.toLocaleString()

  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `${currency} ${amount.toLocaleString()}`
  }
}

test("signed-in owner can open dashboard wreath sales from the menu with no console errors", async ({ page }) => {
  const auth = await createConfirmedTestUser()
  const errors = trackConsoleErrors(page)
  const profileId = crypto.randomUUID()
  const memorialId = crypto.randomUUID()
  const giftId = crypto.randomUUID()
  const stamp = Date.now()
  const displayName = `Wreath Sales Memorial ${stamp}`

  try {
    auth.profileId = profileId
    auth.giftId = giftId
    const { error: profileError } = await auth.admin.from("profiles").upsert({
      id: profileId,
      clerk_user_id: auth.userId,
      email: auth.email,
      display_name: "Wreath Owner",
    })
    expect(profileError).toBeNull()

    const { error: giftError } = await auth.admin.from("gift_catalog").insert({
      id: giftId,
      name: `E2E Wreath Dashboard ${stamp}`,
      image_path: "e2e/wreath.png",
      price: 12500,
      currency: "GHS",
      is_active: true,
      sort_order: 1,
    })
    expect(giftError).toBeNull()

    const { error: memorialError } = await auth.admin.from("memorials").insert({
      id: memorialId,
      owner_id: profileId,
      slug: `wreath-sales-${stamp}`,
      first_name: "Efua",
      surname: "Mensah",
      display_name: displayName,
      date_of_death: "2024-05-18",
      status: "published",
      privacy: "public",
    })
    expect(memorialError).toBeNull()

    const { data: purchase, error: purchaseError } = await auth.admin
      .from("gift_purchases")
      .insert({
        memorial_id: memorialId,
        gift_catalog_id: giftId,
        purchaser_display_name: "Akwasi Purchaser",
        paystack_reference: `e2e-wreath-${stamp}`,
      })
      .select("id")
      .single()
    expect(purchaseError).toBeNull()
    expect(purchase?.id).toBeTruthy()

    const { error: paidPurchaseError } = await auth.admin
      .from("gift_purchases")
      .update({ status: "paid", paid_at: "2026-01-15T10:30:00.000Z" })
      .eq("id", purchase!.id)
    expect(paidPurchaseError).toBeNull()

    await page.goto("/sign-in")
    await page.getByLabel("Email").fill(auth.email)
    await page.locator("#password").fill(auth.password)
    await page.getByRole("button", { name: "Sign in" }).click()

    await expect(page).toHaveURL(/\/dashboard$/, { timeout: 20_000 })
    await expect(page.getByRole("heading", { level: 1, name: "Dashboard" })).toBeVisible({ timeout: 20_000 })
    const menuLink = page.getByRole("link", { name: "Wreath sales", exact: true })
    await expect(menuLink).toBeVisible()
    await expect(page.getByRole("link", { name: "View wreath sales" })).toBeVisible()
    await expect(page.getByText("Wreath sales snapshot")).toBeVisible()

    await menuLink.click()
    await expect(page).toHaveURL(/\/dashboard\/wreath-sales$/, { timeout: 20_000 })
    await expect(page.getByRole("heading", { level: 1, name: "Wreath sales" })).toBeVisible()
    await expect(page.getByRole("region", { name: "Sales by memorial" })).toBeVisible()
    await expect(page.getByText("Purchase records")).toBeVisible()
    await expect(page.getByRole("region", { name: "Sales by memorial" }).getByRole("link", { name: new RegExp(displayName) })).toBeVisible()
    await expect(page.getByRole("cell", { name: `E2E Wreath Dashboard ${stamp}` })).toBeVisible()
    await expect(page.getByRole("cell", { name: "Akwasi Purchaser" })).toBeVisible()
    await expect(page.getByRole("cell", { name: formatMoney(12500, "GHS") })).toBeVisible()

    expect(errors).toEqual([])
  } finally {
    await cleanupTestUser(auth)
  }
})
