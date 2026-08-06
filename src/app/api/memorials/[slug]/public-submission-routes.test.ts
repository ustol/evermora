import { afterEach, describe, expect, it, vi } from "vitest"
import type { NextRequest } from "next/server"

type TableName = "memorials" | "memorial_media" | "contributions"

type MemorialRow = {
  id: string
  status: string
  privacy: string
  admin_suspended: boolean
  allow_tributes?: boolean
  allow_condolences?: boolean
  allow_contributor_photos?: boolean
  require_approval: boolean
}

const noUserSupabase = {
  auth: {
    getUser: vi.fn(async () => ({ data: { user: null } })),
  },
}

function pngFile(name = "memory.png") {
  return new File([new Uint8Array([137, 80, 78, 71])], name, { type: "image/png" })
}

function multipartRequest(path: string, formData: FormData) {
  return {
    headers: new Headers({ "x-forwarded-for": crypto.randomUUID() }),
    nextUrl: { pathname: path },
    formData: vi.fn(async () => formData),
  } as unknown as NextRequest
}

function createAdminMock(memorial: MemorialRow, options: { uploadError?: Error } = {}) {
  const calls = {
    storageUploads: [] as Array<{ path: string; file: File; options: Record<string, unknown> }>,
    mediaInserts: [] as Array<Record<string, unknown>>,
    contributionInserts: [] as Array<Record<string, unknown>>,
  }

  const admin = {
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn(async (path: string, file: File, uploadOptions: Record<string, unknown>) => {
          calls.storageUploads.push({ path, file, options: uploadOptions })
          return { error: options.uploadError ?? null }
        }),
        remove: vi.fn(async () => ({ error: null })),
      })),
    },
    from: vi.fn((table: TableName) => {
      if (table === "memorials") {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              maybeSingle: vi.fn(async () => ({ data: memorial, error: null })),
            })),
          })),
        }
      }

      if (table === "memorial_media") {
        return {
          insert: vi.fn((payload: Record<string, unknown>) => {
            calls.mediaInserts.push(payload)
            return {
              select: vi.fn(() => ({
                single: vi.fn(async () => ({ data: { id: "media_123" }, error: null })),
              })),
              error: null,
            }
          }),
          delete: vi.fn(() => ({
            eq: vi.fn(async () => ({ error: null })),
          })),
        }
      }

      return {
        insert: vi.fn(async (payload: Record<string, unknown>) => {
          calls.contributionInserts.push(payload)
          return { error: null }
        }),
      }
    }),
  }

  return { admin, calls }
}

async function withRouteMocks<T>(admin: unknown, run: () => Promise<T>) {
  vi.resetModules()
  vi.doMock("@/lib/supabase-admin", () => ({ createAdminClient: () => admin }))
  vi.doMock("@/lib/supabase-server", () => ({ createServerSupabaseClient: async () => noUserSupabase }))
  vi.doMock("@/lib/profile-resolver", () => ({ resolveProfileForUser: vi.fn() }))

  return run()
}

afterEach(() => {
  vi.doUnmock("@/lib/supabase-admin")
  vi.doUnmock("@/lib/supabase-server")
  vi.doUnmock("@/lib/profile-resolver")
  vi.resetModules()
})

describe("public memorial submission API routes", () => {
  it("stores anonymous tribute photo media with a nullable uploader", async () => {
    const { admin, calls } = createAdminMock({
      id: "memorial_123",
      status: "published",
      privacy: "public",
      admin_suspended: false,
      allow_tributes: true,
      allow_condolences: true,
      require_approval: true,
    })
    const formData = new FormData()
    formData.set("type", "condolence")
    formData.set("message", "Sharing a photo with condolences.")
    formData.set("photo", pngFile("condolence.png"))

    await withRouteMocks(admin, async () => {
      const { POST } = await import("./contributions/route")
      const response = await POST(multipartRequest("/api/memorials/konto-2/contributions", formData), {
        params: Promise.resolve({ slug: "konto-2" }),
      })

      expect(response.status).toBe(200)
      await expect(response.json()).resolves.toMatchObject({ ok: true, pending: true })
    })

    expect(calls.mediaInserts).toHaveLength(1)
    expect(calls.mediaInserts[0]).toMatchObject({
      memorial_id: "memorial_123",
      uploaded_by: null,
      moderation_status: "pending",
    })
    expect(calls.mediaInserts[0].storage_path).toMatch(/^memorial_123\/anonymous\/tributes\//)
    expect(calls.contributionInserts[0]).toMatchObject({
      author_id: null,
      photo_media_id: "media_123",
      status: "pending",
    })
  })

  it("stores anonymous gallery uploads with a nullable uploader", async () => {
    const { admin, calls } = createAdminMock({
      id: "memorial_456",
      status: "published",
      privacy: "unlisted",
      admin_suspended: false,
      allow_contributor_photos: true,
      require_approval: true,
    })
    const formData = new FormData()
    formData.set("caption", "A shared memory")
    formData.set("photo", pngFile("gallery.png"))

    await withRouteMocks(admin, async () => {
      const { POST } = await import("./photos/route")
      const response = await POST(multipartRequest("/api/memorials/konto-2/photos", formData), {
        params: Promise.resolve({ slug: "konto-2" }),
      })

      expect(response.status).toBe(200)
      await expect(response.json()).resolves.toMatchObject({ ok: true, pending: true })
    })

    expect(calls.mediaInserts).toHaveLength(1)
    expect(calls.mediaInserts[0]).toMatchObject({
      memorial_id: "memorial_456",
      uploaded_by: null,
      caption: "A shared memory",
      moderation_status: "pending",
    })
    expect(calls.mediaInserts[0].storage_path).toMatch(/^memorial_456\/anonymous\/gallery\//)
  })

  it("returns a safe public error when gallery storage fails", async () => {
    const { admin } = createAdminMock(
      {
        id: "memorial_789",
        status: "published",
        privacy: "public",
        admin_suspended: false,
        allow_contributor_photos: true,
        require_approval: false,
      },
      { uploadError: new Error("storage-service-secret-token") },
    )
    const formData = new FormData()
    formData.set("photo", pngFile("gallery.png"))

    await withRouteMocks(admin, async () => {
      const { POST } = await import("./photos/route")
      const response = await POST(multipartRequest("/api/memorials/konto-2/photos", formData), {
        params: Promise.resolve({ slug: "konto-2" }),
      })

      expect(response.status).toBe(500)
      await expect(response.json()).resolves.toEqual({
        ok: false,
        error: "Something went wrong. Please try again.",
      })
    })
  })
})
