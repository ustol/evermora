import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"
import { slugify } from "@/lib/slug"

type VendorRow = Database["public"]["Tables"]["vendors"]["Row"]
type VendorCategory = Database["public"]["Enums"]["vendor_category"]
type VendorStatus = Database["public"]["Enums"]["vendor_status"]
type ListingRow = Database["public"]["Tables"]["vendor_listings"]["Row"]

export const vendorCategoryLabels: Record<VendorCategory, string> = {
  caterers: "Caterers",
  florists: "Florists",
  transport: "Transport & Hearse",
  printing: "Printing & Programs",
  event_planning: "Event Planning",
  mortuary_services: "Mortuary Services",
  photography_videography: "Photography & Videography",
  music_choir: "Music & Choir",
  other: "Other",
}

export const vendorCategoryOptions = Object.entries(vendorCategoryLabels).map(
  ([value, label]) => ({ value: value as VendorCategory, label })
)

export interface VendorWithLogo extends VendorRow {
  logoUrl: string | null
}

export interface VendorListing extends ListingRow {
  imageUrl: string | null
}

function vendorLogoUrl(
  supabase: SupabaseClient<Database>,
  logoPath: string | null
): string | null {
  if (!logoPath) return null
  return supabase.storage.from("vendor-assets").getPublicUrl(logoPath).data.publicUrl
}

function attachLogoUrl(
  supabase: SupabaseClient<Database>,
  vendor: VendorRow
): VendorWithLogo {
  return { ...vendor, logoUrl: vendorLogoUrl(supabase, vendor.logo_path) }
}

function attachImageUrl(
  supabase: SupabaseClient<Database>,
  listing: ListingRow
): VendorListing {
  return {
    ...listing,
    imageUrl: listing.image_path
      ? supabase.storage.from("vendor-assets").getPublicUrl(listing.image_path).data.publicUrl
      : null,
  }
}

// --- Public directory ---

export async function listApprovedVendors(
  supabase: SupabaseClient<Database>,
  category?: VendorCategory
): Promise<VendorWithLogo[]> {
  let query = supabase
    .from("vendors")
    .select("*")
    .eq("status", "approved")
    .order("business_name", { ascending: true })

  if (category) query = query.eq("category", category)

  const { data, error } = await query
  if (error) throw error
  return (data ?? []).map((v) => attachLogoUrl(supabase, v))
}

export async function getVendorBySlug(
  supabase: SupabaseClient<Database>,
  slug: string
): Promise<VendorWithLogo | null> {
  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()

  if (error) throw error
  return data ? attachLogoUrl(supabase, data) : null
}

export async function listActiveListingsForVendor(
  supabase: SupabaseClient<Database>,
  vendorId: string
): Promise<VendorListing[]> {
  const { data, error } = await supabase
    .from("vendor_listings")
    .select("*")
    .eq("vendor_id", vendorId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })

  if (error) throw error
  return (data ?? []).map((l) => attachImageUrl(supabase, l))
}

// --- Owner: registration and profile management ---

export async function getVendorByOwnerId(
  supabase: SupabaseClient<Database>,
  ownerId: string
): Promise<VendorWithLogo | null> {
  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("owner_id", ownerId)
    .maybeSingle()

  if (error) throw error
  return data ? attachLogoUrl(supabase, data) : null
}

export async function isVendorSlugAvailable(
  supabase: SupabaseClient<Database>,
  slug: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("vendors")
    .select("id")
    .eq("slug", slug)
    .maybeSingle()
  if (error) throw error
  return !data
}

export async function generateUniqueVendorSlug(
  supabase: SupabaseClient<Database>,
  businessName: string
): Promise<string> {
  const root = slugify(businessName) || "vendor"
  let candidate = root
  let suffix = 2
  while (!(await isVendorSlugAvailable(supabase, candidate))) {
    candidate = `${root}-${suffix}`
    suffix += 1
  }
  return candidate
}

export async function registerVendor(
  supabase: SupabaseClient<Database>,
  params: {
    ownerId: string
    businessName: string
    category: VendorCategory
    description?: string
    phone?: string
    email?: string
    whatsapp?: string
    location?: string
  }
): Promise<VendorRow> {
  const slug = await generateUniqueVendorSlug(supabase, params.businessName)

  const { data, error } = await supabase
    .from("vendors")
    .insert({
      owner_id: params.ownerId,
      slug,
      business_name: params.businessName,
      category: params.category,
      description: params.description || null,
      phone: params.phone || null,
      email: params.email || null,
      whatsapp: params.whatsapp || null,
      location: params.location || null,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateVendorProfile(
  supabase: SupabaseClient<Database>,
  vendorId: string,
  params: {
    businessName: string
    category: VendorCategory
    description?: string
    phone?: string
    email?: string
    whatsapp?: string
    location?: string
  }
) {
  const { error } = await supabase
    .from("vendors")
    .update({
      business_name: params.businessName,
      category: params.category,
      description: params.description || null,
      phone: params.phone || null,
      email: params.email || null,
      whatsapp: params.whatsapp || null,
      location: params.location || null,
    })
    .eq("id", vendorId)
  if (error) throw error
}

export async function uploadVendorLogo(
  supabase: SupabaseClient<Database>,
  vendorId: string,
  file: File
): Promise<void> {
  const extension = file.name.split(".").pop() ?? "jpg"
  const path = `${vendorId}/logo-${crypto.randomUUID()}.${extension}`

  const { error: uploadError } = await supabase.storage
    .from("vendor-assets")
    .upload(path, file)
  if (uploadError) throw uploadError

  const { error } = await supabase
    .from("vendors")
    .update({ logo_path: path })
    .eq("id", vendorId)
  if (error) throw error
}

// --- Owner: listings management ---

export async function listAllListingsForOwner(
  supabase: SupabaseClient<Database>,
  vendorId: string
): Promise<VendorListing[]> {
  const { data, error } = await supabase
    .from("vendor_listings")
    .select("*")
    .eq("vendor_id", vendorId)
    .order("sort_order", { ascending: true })

  if (error) throw error
  return (data ?? []).map((l) => attachImageUrl(supabase, l))
}

export async function createVendorListing(
  supabase: SupabaseClient<Database>,
  params: {
    vendorId: string
    name: string
    description?: string
    price?: number
    imagePath?: string
    sortOrder?: number
  }
) {
  const { error } = await supabase.from("vendor_listings").insert({
    vendor_id: params.vendorId,
    name: params.name,
    description: params.description || null,
    price: params.price ?? null,
    image_path: params.imagePath || null,
    sort_order: params.sortOrder ?? 0,
  })
  if (error) throw error
}

export async function uploadListingImage(
  supabase: SupabaseClient<Database>,
  vendorId: string,
  file: File
): Promise<string> {
  const extension = file.name.split(".").pop() ?? "jpg"
  const path = `${vendorId}/listing-${crypto.randomUUID()}.${extension}`
  const { error } = await supabase.storage.from("vendor-assets").upload(path, file)
  if (error) throw error
  return path
}

export async function updateVendorListing(
  supabase: SupabaseClient<Database>,
  listingId: string,
  params: { name: string; description?: string; price?: number }
) {
  const { error } = await supabase
    .from("vendor_listings")
    .update({
      name: params.name,
      description: params.description || null,
      price: params.price ?? null,
    })
    .eq("id", listingId)
  if (error) throw error
}

export async function setListingActive(
  supabase: SupabaseClient<Database>,
  listingId: string,
  isActive: boolean
) {
  const { error } = await supabase
    .from("vendor_listings")
    .update({ is_active: isActive })
    .eq("id", listingId)
  if (error) throw error
}

export async function deleteVendorListing(
  supabase: SupabaseClient<Database>,
  listingId: string
) {
  const { error } = await supabase.from("vendor_listings").delete().eq("id", listingId)
  if (error) throw error
}

export type { VendorRow, VendorCategory, VendorStatus }
