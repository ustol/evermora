import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

export interface GiftCatalogItem {
  id: string
  name: string
  price: number
  currency: string
  imageUrl: string
}

export interface GiftPurchaseWithGift {
  id: string
  purchaserDisplayName: string
  createdAt: string
  gift: { name: string; imageUrl: string }
}

function catalogImageUrl(supabase: SupabaseClient<Database>, imagePath: string): string {
  return supabase.storage.from("gift-assets").getPublicUrl(imagePath).data.publicUrl
}

export async function listActiveGiftCatalog(
  supabase: SupabaseClient<Database>
): Promise<GiftCatalogItem[]> {
  const { data, error } = await supabase
    .from("gift_catalog")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })

  if (error) throw error
  return (data ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    currency: item.currency,
    imageUrl: catalogImageUrl(supabase, item.image_path),
  }))
}

export async function listPaidGiftsForMemorial(
  supabase: SupabaseClient<Database>,
  memorialId: string
): Promise<GiftPurchaseWithGift[]> {
  const { data, error } = await supabase
    .from("gift_purchases")
    .select("id, purchaser_display_name, created_at, gift_catalog(name, image_path)")
    .eq("memorial_id", memorialId)
    .eq("status", "paid")
    .order("created_at", { ascending: false })

  if (error) throw error

  return (data ?? []).map((row) => {
    const gift = row.gift_catalog as unknown as { name: string; image_path: string } | null
    return {
      id: row.id,
      purchaserDisplayName: row.purchaser_display_name,
      createdAt: row.created_at,
      gift: {
        name: gift?.name ?? "Gift",
        imageUrl: gift ? catalogImageUrl(supabase, gift.image_path) : "",
      },
    }
  })
}

/**
 * purchaserProfileId is omitted for anonymous (signed-out) purchases. Both
 * id and paystackReference are generated client-side and returned as-is
 * (not re-selected after insert): an anonymous purchaser can never satisfy
 * the SELECT policy for their own pending row (no session to prove
 * ownership), so requesting it back would fail RLS even though the insert
 * succeeds. amount/currency are deliberately NOT returned from the
 * database here — the server-side pricing trigger is an anti-tamper check,
 * not the client's source of truth; the caller already knows the price
 * from the catalog it fetched before opening this purchase.
 */
export async function createPendingGiftPurchase(
  supabase: SupabaseClient<Database>,
  params: {
    memorialId: string
    giftCatalogId: string
    purchaserProfileId?: string
    purchaserDisplayName: string
  }
): Promise<{ id: string; paystackReference: string }> {
  const id = crypto.randomUUID()
  const paystackReference = `evermora_${crypto.randomUUID()}`

  const { error } = await supabase.from("gift_purchases").insert({
    id,
    memorial_id: params.memorialId,
    gift_catalog_id: params.giftCatalogId,
    purchaser_profile_id: params.purchaserProfileId || null,
    purchaser_display_name: params.purchaserDisplayName,
    paystack_reference: paystackReference,
  })

  if (error) throw error
  return { id, paystackReference }
}

export async function verifyGiftPurchase(
  supabase: SupabaseClient<Database>,
  purchaseId: string
): Promise<{ ok: boolean; reason?: string }> {
  const { data, error } = await supabase.functions.invoke("verify-gift-purchase", {
    body: { purchaseId },
  })
  if (error) throw error
  return data as { ok: boolean; reason?: string }
}

// --- Admin catalog management ---

export async function listAllGiftCatalog(
  supabase: SupabaseClient<Database>
): Promise<(GiftCatalogItem & { isActive: boolean; imagePath: string })[]> {
  const { data, error } = await supabase
    .from("gift_catalog")
    .select("*")
    .order("sort_order", { ascending: true })

  if (error) throw error
  return (data ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    currency: item.currency,
    isActive: item.is_active,
    imagePath: item.image_path,
    imageUrl: catalogImageUrl(supabase, item.image_path),
  }))
}

export async function uploadGiftImage(
  supabase: SupabaseClient<Database>,
  file: File
): Promise<string> {
  const extension = file.name.split(".").pop() ?? "jpg"
  const path = `${crypto.randomUUID()}.${extension}`
  const { error } = await supabase.storage.from("gift-assets").upload(path, file)
  if (error) throw error
  return path
}

export async function createGiftCatalogItem(
  supabase: SupabaseClient<Database>,
  params: { name: string; imagePath: string; price: number }
) {
  const { error } = await supabase.from("gift_catalog").insert({
    name: params.name,
    image_path: params.imagePath,
    price: params.price,
  })
  if (error) throw error
}

export async function setGiftCatalogItemActive(
  supabase: SupabaseClient<Database>,
  id: string,
  isActive: boolean
) {
  const { error } = await supabase
    .from("gift_catalog")
    .update({ is_active: isActive })
    .eq("id", id)
  if (error) throw error
}
