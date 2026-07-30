import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase-admin"
import { createServerSupabaseClient } from "@/lib/supabase-server"

interface RouteContext {
  params: Promise<{ id: string; mediaId: string }>
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: memorialId, mediaId } = await params

  // Verify ownership
  const { data: memorial } = await supabase
    .from("memorials")
    .select("owner_id")
    .eq("id", memorialId)
    .maybeSingle()
  if (!memorial || memorial.owner_id !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const admin = createAdminClient()

  // Get the storage path before deleting the row
  const { data: media } = await admin
    .from("memorial_media")
    .select("storage_path")
    .eq("id", mediaId)
    .maybeSingle()

  if (media?.storage_path) {
    await admin.storage.from("memorial-media").remove([media.storage_path])
  }

  const { error } = await admin.from("memorial_media").delete().eq("id", mediaId)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
