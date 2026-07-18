import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

type UserRole = Database["public"]["Enums"]["user_role"]
type AccountStatus = Database["public"]["Enums"]["account_status"]
type ReportStatus = Database["public"]["Enums"]["report_status"]
type MemorialStatus = Database["public"]["Enums"]["memorial_status"]
type PrivacyStatus = Database["public"]["Enums"]["privacy_status"]

export interface PlatformStats {
  totalUsers: number
  suspendedUsers: number
  totalMemorials: number
  publishedMemorials: number
  draftMemorials: number
  suspendedMemorials: number
  openReports: number
}

export async function getPlatformStats(
  supabase: SupabaseClient<Database>
): Promise<PlatformStats> {
  const [
    users,
    suspendedUsers,
    memorials,
    published,
    drafts,
    suspendedMemorials,
    openReports,
  ] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("status", "suspended"),
    supabase.from("memorials").select("id", { count: "exact", head: true }),
    supabase
      .from("memorials")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("memorials")
      .select("id", { count: "exact", head: true })
      .eq("status", "draft"),
    supabase
      .from("memorials")
      .select("id", { count: "exact", head: true })
      .eq("admin_suspended", true),
    supabase
      .from("content_reports")
      .select("id", { count: "exact", head: true })
      .eq("status", "open"),
  ])

  for (const result of [
    users,
    suspendedUsers,
    memorials,
    published,
    drafts,
    suspendedMemorials,
    openReports,
  ]) {
    if (result.error) throw result.error
  }

  return {
    totalUsers: users.count ?? 0,
    suspendedUsers: suspendedUsers.count ?? 0,
    totalMemorials: memorials.count ?? 0,
    publishedMemorials: published.count ?? 0,
    draftMemorials: drafts.count ?? 0,
    suspendedMemorials: suspendedMemorials.count ?? 0,
    openReports: openReports.count ?? 0,
  }
}

// --- Users ---

export interface AdminProfile {
  id: string
  displayName: string
  email: string | null
  role: UserRole
  status: AccountStatus
  createdAt: string
}

export async function listAllProfiles(
  supabase: SupabaseClient<Database>
): Promise<AdminProfile[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return (data ?? []).map((p) => ({
    id: p.id,
    displayName: p.display_name,
    email: p.email,
    role: p.role,
    status: p.status,
    createdAt: p.created_at,
  }))
}

export async function setProfileRole(
  supabase: SupabaseClient<Database>,
  profileId: string,
  role: UserRole
) {
  const { error } = await supabase.rpc("admin_update_profile_role", {
    p_profile_id: profileId,
    p_role: role,
  })
  if (error) throw error
}

export async function setProfileStatus(
  supabase: SupabaseClient<Database>,
  profileId: string,
  status: AccountStatus
) {
  const { error } = await supabase.rpc("admin_update_profile_status", {
    p_profile_id: profileId,
    p_status: status,
  })
  if (error) throw error
}

// --- Memorials ---

export interface AdminMemorial {
  id: string
  slug: string
  displayName: string
  status: MemorialStatus
  privacy: PrivacyStatus
  isFeatured: boolean
  adminSuspended: boolean
  ownerDisplayName: string
  createdAt: string
}

export async function listAllMemorials(
  supabase: SupabaseClient<Database>
): Promise<AdminMemorial[]> {
  const { data, error } = await supabase
    .from("memorials")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  const memorials = data ?? []

  const ownerIds = [...new Set(memorials.map((m) => m.owner_id))]
  const ownerNameById = new Map<string, string>()
  if (ownerIds.length > 0) {
    const { data: owners, error: ownersError } = await supabase
      .from("profiles")
      .select("id, display_name")
      .in("id", ownerIds)
    if (ownersError) throw ownersError
    for (const o of owners ?? []) ownerNameById.set(o.id, o.display_name)
  }

  return memorials.map((m) => ({
    id: m.id,
    slug: m.slug,
    displayName: m.display_name,
    status: m.status,
    privacy: m.privacy,
    isFeatured: m.is_featured,
    adminSuspended: m.admin_suspended,
    ownerDisplayName: ownerNameById.get(m.owner_id) ?? "Unknown",
    createdAt: m.created_at,
  }))
}

export async function setMemorialFeatured(
  supabase: SupabaseClient<Database>,
  memorialId: string,
  featured: boolean
) {
  const { error } = await supabase.rpc("admin_set_memorial_featured", {
    p_memorial_id: memorialId,
    p_featured: featured,
  })
  if (error) throw error
}

export async function setMemorialSuspended(
  supabase: SupabaseClient<Database>,
  memorialId: string,
  suspend: boolean
) {
  const { error } = await supabase.rpc("admin_suspend_memorial", {
    p_memorial_id: memorialId,
    p_suspend: suspend,
  })
  if (error) throw error
}

// --- Content reports ---

export type ReportTarget =
  | { type: "memorial"; label: string; slug: string | null }
  | { type: "contribution"; label: string; slug: string | null }
  | { type: "media"; label: string; slug: string | null; thumbnailUrl: string | null }

export interface AdminReport {
  id: string
  reason: string
  status: ReportStatus
  resolutionNotes: string | null
  createdAt: string
  reporterName: string
  target: ReportTarget
}

export async function listReports(
  supabase: SupabaseClient<Database>,
  status?: ReportStatus
): Promise<AdminReport[]> {
  let query = supabase
    .from("content_reports")
    .select("*")
    .order("created_at", { ascending: false })
  if (status) query = query.eq("status", status)

  const { data, error } = await query
  if (error) throw error
  const reports = data ?? []

  const reporterIds = [...new Set(reports.map((r) => r.reported_by))]
  const profileNameById = new Map<string, string>()
  if (reporterIds.length > 0) {
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, display_name")
      .in("id", reporterIds)
    if (profilesError) throw profilesError
    for (const p of profiles ?? []) profileNameById.set(p.id, p.display_name)
  }

  const contributionIds = reports
    .map((r) => r.contribution_id)
    .filter((id): id is string => !!id)
  const contributionById = new Map<string, { message: string; memorial_id: string }>()
  if (contributionIds.length > 0) {
    const { data: contributions, error: contributionsError } = await supabase
      .from("contributions")
      .select("id, message, memorial_id")
      .in("id", contributionIds)
    if (contributionsError) throw contributionsError
    for (const c of contributions ?? [])
      contributionById.set(c.id, { message: c.message, memorial_id: c.memorial_id })
  }

  const mediaIds = reports.map((r) => r.media_id).filter((id): id is string => !!id)
  const mediaById = new Map<
    string,
    { caption: string | null; storage_path: string; memorial_id: string }
  >()
  if (mediaIds.length > 0) {
    const { data: mediaRows, error: mediaError } = await supabase
      .from("memorial_media")
      .select("id, caption, storage_path, memorial_id")
      .in("id", mediaIds)
    if (mediaError) throw mediaError
    for (const m of mediaRows ?? [])
      mediaById.set(m.id, {
        caption: m.caption,
        storage_path: m.storage_path,
        memorial_id: m.memorial_id,
      })
  }

  const memorialIds = new Set<string>()
  for (const r of reports) if (r.memorial_id) memorialIds.add(r.memorial_id)
  for (const c of contributionById.values()) memorialIds.add(c.memorial_id)
  for (const m of mediaById.values()) memorialIds.add(m.memorial_id)

  const memorialById = new Map<string, { display_name: string; slug: string }>()
  if (memorialIds.size > 0) {
    const { data: memorials, error: memorialsError } = await supabase
      .from("memorials")
      .select("id, display_name, slug")
      .in("id", [...memorialIds])
    if (memorialsError) throw memorialsError
    for (const m of memorials ?? [])
      memorialById.set(m.id, { display_name: m.display_name, slug: m.slug })
  }

  const mediaPaths = [...mediaById.values()].map((m) => m.storage_path)
  const mediaUrlByPath = new Map<string, string>()
  if (mediaPaths.length > 0) {
    const { data: signed } = await supabase.storage
      .from("memorial-media")
      .createSignedUrls(mediaPaths, 3600)
    for (const entry of signed ?? []) {
      if (entry.path && entry.signedUrl) mediaUrlByPath.set(entry.path, entry.signedUrl)
    }
  }

  return reports.map((r): AdminReport => {
    const reporterName = profileNameById.get(r.reported_by) ?? "Unknown"
    const base = {
      id: r.id,
      reason: r.reason,
      status: r.status,
      resolutionNotes: r.resolution_notes,
      createdAt: r.created_at,
      reporterName,
    }

    if (r.memorial_id) {
      const m = memorialById.get(r.memorial_id)
      return {
        ...base,
        target: { type: "memorial", label: m?.display_name ?? "A memorial", slug: m?.slug ?? null },
      }
    }

    if (r.contribution_id) {
      const c = contributionById.get(r.contribution_id)
      const m = c ? memorialById.get(c.memorial_id) : undefined
      return {
        ...base,
        target: {
          type: "contribution",
          label: c?.message ?? "A tribute message",
          slug: m?.slug ?? null,
        },
      }
    }

    const md = r.media_id ? mediaById.get(r.media_id) : undefined
    const m = md ? memorialById.get(md.memorial_id) : undefined
    return {
      ...base,
      target: {
        type: "media",
        label: md?.caption ?? "A photo",
        slug: m?.slug ?? null,
        thumbnailUrl: md ? (mediaUrlByPath.get(md.storage_path) ?? null) : null,
      },
    }
  })
}

export async function resolveReport(
  supabase: SupabaseClient<Database>,
  params: {
    reportId: string
    status: "resolved" | "dismissed"
    resolverProfileId: string
    resolutionNotes?: string
  }
) {
  const { error } = await supabase
    .from("content_reports")
    .update({
      status: params.status,
      resolved_by: params.resolverProfileId,
      resolution_notes: params.resolutionNotes || null,
    })
    .eq("id", params.reportId)
  if (error) throw error
}

// --- Vendors ---

type VendorStatus = Database["public"]["Enums"]["vendor_status"]
type VendorCategory = Database["public"]["Enums"]["vendor_category"]

export interface AdminVendor {
  id: string
  slug: string
  businessName: string
  category: VendorCategory
  status: VendorStatus
  rejectionReason: string | null
  ownerDisplayName: string
  phone: string | null
  email: string | null
  createdAt: string
}

export async function listAllVendors(
  supabase: SupabaseClient<Database>
): Promise<AdminVendor[]> {
  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  const vendors = data ?? []

  const ownerIds = [...new Set(vendors.map((v) => v.owner_id))]
  const ownerNameById = new Map<string, string>()
  if (ownerIds.length > 0) {
    const { data: owners, error: ownersError } = await supabase
      .from("profiles")
      .select("id, display_name")
      .in("id", ownerIds)
    if (ownersError) throw ownersError
    for (const o of owners ?? []) ownerNameById.set(o.id, o.display_name)
  }

  return vendors.map((v) => ({
    id: v.id,
    slug: v.slug,
    businessName: v.business_name,
    category: v.category,
    status: v.status,
    rejectionReason: v.rejection_reason,
    ownerDisplayName: ownerNameById.get(v.owner_id) ?? "Unknown",
    phone: v.phone,
    email: v.email,
    createdAt: v.created_at,
  }))
}

export async function setVendorStatus(
  supabase: SupabaseClient<Database>,
  vendorId: string,
  status: VendorStatus,
  rejectionReason?: string
) {
  const { error } = await supabase.rpc("admin_update_vendor_status", {
    p_vendor_id: vendorId,
    p_status: status,
    p_rejection_reason: rejectionReason ?? null,
  })
  if (error) throw error
}
