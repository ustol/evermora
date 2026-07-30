import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

/**
 * Proxies a memorial-media file as a public image.
 * The bucket is private, so we create a signed URL server-side
 * and redirect the browser to it.
 */
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path")
  if (!path) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 })
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )

    const { data, error } = await supabase.storage
      .from("memorial-media")
      .createSignedUrls([path], 3600)

    if (error || !data?.[0]?.signedUrl) {
      // Fallback: try public URL (won't work for private bucket but worth a shot)
      const fallbackUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/memorial-media/${path}`
      return NextResponse.redirect(fallbackUrl)
    }

    return NextResponse.redirect(data[0].signedUrl)
  } catch {
    return NextResponse.json({ error: "Failed to generate signed URL" }, { status: 500 })
  }
}
