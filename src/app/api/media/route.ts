import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

/**
 * Resolves an image from Supabase storage.
 *
 * Public buckets (avatars, hero-images, gift-assets, blog-images,
 * vendor-assets) redirect to their public URL. The private `memorial-media`
 * bucket is signed with the anon/publishable key: its storage RLS
 * (memorial_media_storage_select → can_view_memorial) already grants read to
 * anyone for a published+public/unlisted memorial, so no user token needed.
 *
 * Usage: /api/media?path=<memorial_id>/<uploader>/<file>          (memorial-media)
 *        /api/media?bucket=gift-assets&path=<file>                (public bucket)
 */
const PUBLIC_BUCKETS = new Set([
  "avatars",
  "hero-images",
  "gift-assets",
  "blog-images",
  "vendor-assets",
])

function placeholder() {
  return new NextResponse(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <rect fill="#f3f4f6" width="200" height="200"/>
      <circle cx="100" cy="85" r="30" fill="#d1d5db"/>
      <rect x="60" y="120" rx="10" ry="10" width="80" height="40" fill="#d1d5db"/>
      <text x="100" y="190" font-size="12" text-anchor="middle" fill="#9ca3af">Image unavailable</text>
    </svg>`,
    { status: 200, headers: { "Content-Type": "image/svg+xml", "Cache-Control": "no-cache" } }
  )
}

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path")
  const bucket = request.nextUrl.searchParams.get("bucket") ?? "memorial-media"

  if (!path) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false } }
  )

  if (PUBLIC_BUCKETS.has(bucket)) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return NextResponse.redirect(data.publicUrl)
  }

  // Private bucket (memorial-media) — sign as anon; RLS gates by memorial visibility.
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, 3600)
  if (error || !data?.signedUrl) {
    console.error("media sign failed", { bucket, path, error })
    return placeholder()
  }

  return NextResponse.redirect(data.signedUrl)
}
