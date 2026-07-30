import { NextResponse } from "next/server"
import { getCurrentProfile } from "@/lib/auth-profile"
import { getMemorialById, deleteMemorial } from "@/services/memorials"

interface RouteContext {
  params: Promise<{ id: string }>
}

/** Delete a memorial, but only if the caller owns it. */
export async function DELETE(_request: Request, { params }: RouteContext) {
  const current = await getCurrentProfile()
  if (!current) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  try {
    const memorial = await getMemorialById(current.supabase, id)
    if (!memorial || memorial.owner_id !== current.profile.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    await deleteMemorial(current.supabase, id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("dashboard memorial delete failed", err)
    return NextResponse.json({ error: "Failed to delete memorial" }, { status: 500 })
  }
}
