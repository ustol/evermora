import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase-admin"
import { getCurrentProfile } from "@/lib/auth-profile"

const MAX_FILE_SIZE = 8 * 1024 * 1024 // 8MB, matches the memorial-media bucket limit
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function POST(request: Request, { params }: RouteContext) {
  const current = await getCurrentProfile()
  if (!current) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!current.profile) {
    return NextResponse.json({ error: "Profile is required" }, { status: 409 })
  }

  const { id: memorialId } = await params

  // Owner-only: collaborators and other users must not change the featured image.
  const { data: memorial, error: lookupError } = await current.supabase
    .from("memorials")
    .select("owner_id, primary_photo_path")
    .eq("id", memorialId)
    .maybeSingle()

  if (lookupError) {
    return NextResponse.json({ error: lookupError.message }, { status: 500 })
  }
  if (!memorial) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  if (!current.ownerIds.includes(memorial.owner_id)) {
    return NextResponse.json({ error: "Not your memorial" }, { status: 403 })
  }

  const formData = await request.formData()
  const file = formData.get("file") as File | null
  const alt = (formData.get("alt") as string | null)?.trim() ?? null

  if (!file) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 })
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Please choose a JPEG, PNG, or WebP image." },
      { status: 400 }
    )
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "That image is larger than 8MB. Please choose a smaller file." },
      { status: 400 }
    )
  }

  const admin = createAdminClient()
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
  const path = `${memorialId}/${current.profile.id}/portrait-${Date.now()}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { error: uploadError } = await admin.storage
    .from("memorial-media")
    .upload(path, buffer, { upsert: true, contentType: file.type })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  const { error: updateError } = await admin
    .from("memorials")
    .update({ primary_photo_path: path, primary_photo_alt: alt })
    .eq("id", memorialId)

  if (updateError) {
    // Roll back the just-uploaded file so a failed update doesn't leave an orphan.
    await admin.storage.from("memorial-media").remove([path])
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  // Best-effort cleanup of the previous featured image (keep the old file on failure).
  if (memorial.primary_photo_path && memorial.primary_photo_path !== path) {
    await admin.storage.from("memorial-media").remove([memorial.primary_photo_path])
  }

  return NextResponse.json({ ok: true, path })
}
