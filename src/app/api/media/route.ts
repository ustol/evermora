import { NextRequest, NextResponse } from "next/server"

/**
 * Proxies an image from Supabase storage.
 * For private buckets (memorial-media, gift-assets) that don't allow
 * anonymous public reads, this proxies the bytes server-side using
 * the authenticated storage endpoint with the anon key as bearer token.
 *
 * Usage: /api/media?bucket=memorial-media&path=xxx/yyy/portrait.png
 */
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path")
  const bucket = request.nextUrl.searchParams.get("bucket") ?? "memorial-media"

  if (!path) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

  // Try the authenticated endpoint with anon key as Bearer token.
  // The anon key (sb_publishable_...) is treated by Supabase as a valid JWT
  // and allows SELECT/READ on storage objects if bucket RLS permits.
  const authedUrl = `${supabaseUrl}/storage/v1/object/authenticated/${bucket}/${path}`
  const res = await fetch(authedUrl, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
  })

  if (res.ok) {
    const contentType = res.headers.get("content-type") ?? "image/png"
    const buffer = await res.arrayBuffer()
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    })
  }

  // Fallback: try signed URL
  try {
    const signRes = await fetch(
      `${supabaseUrl}/storage/v1/object/sign/${bucket}/${path}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
        body: JSON.stringify({ expiresIn: 3600 }),
      }
    )
    if (signRes.ok) {
      const { signedURL } = await signRes.json()
      return NextResponse.redirect(signedURL)
    }
  } catch {
    // fall through
  }

  // Return a transparent placeholder so the UI doesn't break
  return new NextResponse(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <rect fill="#f3f4f6" width="200" height="200"/>
      <circle cx="100" cy="85" r="30" fill="#d1d5db"/>
      <rect x="60" y="120" rx="10" ry="10" width="80" height="40" fill="#d1d5db"/>
      <text x="100" y="190" font-size="12" text-anchor="middle" fill="#9ca3af">Image unavailable</text>
    </svg>`,
    {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-cache",
      },
    }
  )
}
