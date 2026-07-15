// Vercel serverless function. Evermora is a client-only SPA (no SSR), so
// social/messaging link-preview crawlers — which never execute JS — would
// otherwise all see the same static index.html with no per-memorial image.
// vercel.json routes crawler user agents hitting /memorials/:slug here
// instead, so we can hand them real og:image/title/description tags before
// bouncing real browsers on to the actual SPA page.
//
// Deliberately has zero local imports beyond the npm-published
// @supabase/supabase-js so Vercel's zero-config bundler has nothing to
// resolve besides node_modules.
import { createClient } from "@supabase/supabase-js"

const SITE_NAME = "Evermora"
const FALLBACK_DESCRIPTION =
  "A dignified place to announce a funeral, share a memorial page, and gather tributes and condolences."

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function formatLifespan(
  dateOfBirth: string | null,
  dateOfDeath: string
): string {
  const deathYear = new Date(dateOfDeath).getUTCFullYear()
  if (!dateOfBirth) return `${deathYear}`
  const birthYear = new Date(dateOfBirth).getUTCFullYear()
  return `${birthYear} – ${deathYear}`
}

export default async function handler(req: any, res: any) {
  const rawSlug = req.query?.slug
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug
  const proto = req.headers["x-forwarded-proto"] ?? "https"
  const origin = `${proto}://${req.headers.host}`
  const pageUrl = slug ? `${origin}/memorials/${slug}` : origin

  let title = SITE_NAME
  let description = FALLBACK_DESCRIPTION
  let imageUrl: string | null = null

  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY

  if (slug && supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data: memorial } = await supabase
      .from("memorials")
      .select("display_name, date_of_birth, date_of_death, primary_photo_path")
      .eq("slug", slug)
      .eq("status", "published")
      .in("privacy", ["public", "unlisted"])
      .maybeSingle()

    if (memorial) {
      const lifespan = formatLifespan(
        memorial.date_of_birth,
        memorial.date_of_death
      )
      title = `${memorial.display_name} (${lifespan}) — In Loving Memory | ${SITE_NAME}`
      description = `In loving memory of ${memorial.display_name} (${lifespan}). Share a tribute and pay your respects on ${SITE_NAME}.`

      if (memorial.primary_photo_path) {
        const { data: signed } = await supabase.storage
          .from("memorial-media")
          .createSignedUrl(memorial.primary_photo_path, 3600)
        imageUrl = signed?.signedUrl ?? null
      }
    }
  }

  const imageTags = imageUrl
    ? `<meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`
    : `<meta name="twitter:card" content="summary" />`

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(pageUrl)}" />
    ${imageTags}
    <meta http-equiv="refresh" content="0; url=${escapeHtml(pageUrl)}" />
  </head>
  <body>
    <p>Redirecting to <a href="${escapeHtml(pageUrl)}">${escapeHtml(title)}</a>&hellip;</p>
  </body>
</html>`

  res.setHeader("Content-Type", "text/html; charset=utf-8")
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300")
  res.status(200).send(html)
}
