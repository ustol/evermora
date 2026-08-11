import { describe, expect, it } from "vitest"
import { readFileSync } from "node:fs"
import path from "node:path"

const publicPages = [
  "src/app/(marketing)/page.tsx",
  "src/app/(marketing)/memorials/page.tsx",
  "src/app/(marketing)/memorials/[slug]/page.tsx",
]

describe("public memorial page cache policy", () => {
  it.each(publicPages)("marks %s as dynamic and uncached", (filePath) => {
    const source = readFileSync(path.join(process.cwd(), filePath), "utf8")

    expect(source).toMatch(/export\s+const\s+dynamic\s*=\s*["']force-dynamic["']/)
    expect(source).toMatch(/export\s+const\s+revalidate\s*=\s*0/)
  })
})
