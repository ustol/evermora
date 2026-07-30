import { expect, type APIResponse, test } from "@playwright/test"
import { createClient } from "@supabase/supabase-js"
import fs from "node:fs"
import path from "node:path"

function loadDotEnv() {
  const envPath = path.join(process.cwd(), ".env")
  if (!fs.existsSync(envPath)) return

  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)
    if (!match || process.env[match[1]]) continue
    process.env[match[1]] = match[2].replace(/^['\"]|['\"]$/g, "")
  }
}

loadDotEnv()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are required for media proxy regression tests")
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
})

type MemorialFixture = {
  id: string
  slug: string
  primary_photo_path: string
}

type GiftFixture = {
  id: string
  name: string
  image_path: string
}

function proxyPath(bucket: "memorial-media" | "gift-assets", storagePath: string) {
  return `/api/media?bucket=${bucket}&path=${encodeURIComponent(storagePath)}`
}

async function pngPortraitMemorial(): Promise<MemorialFixture> {
  const { data, error } = await supabase
    .from("memorials")
    .select("id,slug,primary_photo_path")
    .eq("status", "published")
    .ilike("primary_photo_path", "%.png")
    .limit(1)
    .maybeSingle()

  if (error) throw new Error(`Could not load memorial portrait fixture: ${error.message}`)
  if (!data?.primary_photo_path) throw new Error("No published memorial with a PNG portrait fixture was found")

  return data as MemorialFixture
}

async function roseGift(): Promise<GiftFixture> {
  const { data, error } = await supabase
    .from("gift_catalog")
    .select("id,name,image_path")
    .ilike("name", "%Rose%")
    .ilike("image_path", "%.png")
    .limit(1)
    .maybeSingle()

  if (error) throw new Error(`Could not load rose gift fixture: ${error.message}`)
  if (!data?.image_path) throw new Error("No rose gift with a PNG image fixture was found")

  return data as GiftFixture
}

async function memorialWithPaidGiftImage(): Promise<{ slug: string; gift: GiftFixture }> {
  const { data: purchases, error: purchaseError } = await supabase
    .from("gift_purchases")
    .select("memorial_id,gift_catalog_id")
    .eq("status", "paid")
    .limit(50)

  if (purchaseError) throw new Error(`Could not load paid gift purchases: ${purchaseError.message}`)
  if (!purchases?.length) throw new Error("No paid gift purchase fixture was found")

  const giftIds = [...new Set(purchases.map((purchase) => purchase.gift_catalog_id).filter(Boolean))]
  const memorialIds = [...new Set(purchases.map((purchase) => purchase.memorial_id).filter(Boolean))]

  const [{ data: gifts, error: giftError }, { data: memorials, error: memorialError }] = await Promise.all([
    supabase.from("gift_catalog").select("id,name,image_path").in("id", giftIds).not("image_path", "is", null),
    supabase.from("memorials").select("id,slug").in("id", memorialIds).eq("status", "published"),
  ])

  if (giftError) throw new Error(`Could not load paid gift catalog fixtures: ${giftError.message}`)
  if (memorialError) throw new Error(`Could not load paid gift memorial fixtures: ${memorialError.message}`)

  for (const purchase of purchases) {
    const gift = gifts?.find((candidate) => candidate.id === purchase.gift_catalog_id && candidate.image_path)
    const memorial = memorials?.find((candidate) => candidate.id === purchase.memorial_id)
    if (gift && memorial?.slug) {
      return { slug: memorial.slug, gift: gift as GiftFixture }
    }
  }

  throw new Error("No published memorial with a paid gift image fixture was found")
}

async function expectPngResponse(response: APIResponse) {
  expect(response.status()).toBe(200)
  expect(response.headers()["content-type"]).toMatch(/^image\/png\b/)

  const bytes = await response.body()
  expect([...bytes.subarray(0, 8)]).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
}

test.describe("media proxy storage bucket regressions", () => {
  test("returns image/png bytes for a memorial-media portrait", async ({ request }) => {
    const memorial = await pngPortraitMemorial()
    const response = await request.get(proxyPath("memorial-media", memorial.primary_photo_path))

    await expectPngResponse(response)
  })

  test("returns image/png bytes for a gift-assets rose image", async ({ request }) => {
    const gift = await roseGift()
    const response = await request.get(proxyPath("gift-assets", gift.image_path))

    await expectPngResponse(response)
  })

  test("memorial detail renders paid gift images through the media proxy", async ({ page }) => {
    const { slug, gift } = await memorialWithPaidGiftImage()
    const expectedPath = encodeURIComponent(gift.image_path)

    await page.goto(`/memorials/${slug}`)
    await expect(page.getByRole("heading", { name: "Wreaths & roses" })).toBeVisible()

    const matchingGiftProxySrc = await page.locator("img").evaluateAll(
      (images, expected) =>
        images
          .map((image) => (image as HTMLImageElement).src)
          .find(
            (src) =>
              src.includes("/api/media?bucket=gift-assets") &&
              src.includes(`path=${expected}`)
          ) ?? "",
      expectedPath
    )

    expect(matchingGiftProxySrc).toContain("/api/media?bucket=gift-assets")
    expect(matchingGiftProxySrc).not.toContain("/storage/v1/object/public/gift-assets")
  })
})
