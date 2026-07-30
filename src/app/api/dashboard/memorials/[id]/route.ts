import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { getMemorialById, deleteMemorial } from "@/services/memorials"

interface RouteContext {
  params: Promise<{ id: string }>
}

/** Delete a memorial, but only if the caller owns it. */
export async function DELETE(_request: Request, { params }: RouteContext) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  try {
    const memorial = await getMemorialById(supabase, id)
    if (!memorial || memorial.owner_id !== user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    await deleteMemorial(supabase, id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("dashboard memorial delete failed", err)
    return NextResponse.json({ error: "Failed to delete memorial" }, { status: 500 })
  }
}
