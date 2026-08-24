import { beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("@/lib/auth-profile", () => ({
  getCurrentProfile: vi.fn(),
}))

vi.mock("@/lib/supabase-admin", () => ({
  createAdminClient: vi.fn(),
}))

import { getCurrentProfile } from "@/lib/auth-profile"
import { createAdminClient } from "@/lib/supabase-admin"
import { POST } from "./route"

const mockedGetCurrentProfile = vi.mocked(getCurrentProfile)
const mockedCreateAdminClient = vi.mocked(createAdminClient)

const URL = "http://localhost/api/dashboard/memorials/memorial-1/featured-image"
const context = (id = "memorial-1") => ({ params: Promise.resolve({ id }) })

interface FakeFile {
  name: string
  type: string
  size: number
  arrayBuffer: () => Promise<ArrayBuffer>
}

function jpegFile(size = 3): FakeFile {
  return { name: "portrait.jpg", type: "image/jpeg", size, arrayBuffer: async () => new ArrayBuffer(0) }
}

function formRequest(file: FakeFile | null, alt?: string) {
  const formData = {
    get: vi.fn((key: string) => {
      if (key === "file") return file
      if (key === "alt") return alt ?? null
      return null
    }),
  }
  return { formData: vi.fn(async () => formData) } as unknown as Request
}

function makeUserSupabase(memorial: { data: unknown; error: unknown }) {
  const maybeSingle = vi.fn(async () => memorial)
  const selectBuilder: Record<string, unknown> = {
    eq: vi.fn(() => selectBuilder),
    maybeSingle,
  }
  return {
    supabase: { from: vi.fn(() => ({ select: vi.fn(() => selectBuilder) })) },
    maybeSingle,
  }
}

function makeAdminClient(
  opts: {
    memorial?: { data: unknown; error: unknown }
    update?: { error: unknown }
    upload?: { error: unknown }
    remove?: { error: unknown }
  } = {}
) {
  const maybeSingle = vi.fn(async () => opts.memorial ?? { data: null, error: null })
  const selectBuilder: Record<string, unknown> = {
    eq: vi.fn(() => selectBuilder),
    maybeSingle,
  }
  const updateEq = vi.fn(async () => opts.update ?? { error: null })
  const update = vi.fn(() => ({ eq: updateEq }))
  const upload = vi.fn(async (..._args: unknown[]) => opts.upload ?? { error: null })
  const remove = vi.fn(async () => opts.remove ?? { error: null })
  const bucket = { upload, remove }
  const client = {
    from: vi.fn(() => ({ select: vi.fn(() => selectBuilder), update })),
    storage: { from: vi.fn(() => bucket) },
  }
  return { client, upload, remove, update, updateEq, maybeSingle }
}

describe("POST /api/dashboard/memorials/[id]/featured-image", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns 401 when the user is not authenticated", async () => {
    mockedGetCurrentProfile.mockResolvedValue(null)

    const response = await POST(new Request(URL, { method: "POST" }), context())

    expect(response.status).toBe(401)
    expect(await response.json()).toEqual({ error: "Unauthorized" })
    expect(mockedCreateAdminClient).not.toHaveBeenCalled()
  })

  it("returns 409 when the authenticated user has no profile", async () => {
    mockedGetCurrentProfile.mockResolvedValue({
      supabase: {},
      profile: null,
      ownerIds: [],
    } as never)

    const response = await POST(new Request(URL, { method: "POST" }), context())

    expect(response.status).toBe(409)
    expect(await response.json()).toEqual({ error: "Profile is required" })
    expect(mockedCreateAdminClient).not.toHaveBeenCalled()
  })

  it("returns 403 when the memorial belongs to someone else", async () => {
    const { supabase } = makeUserSupabase({
      data: { owner_id: "owner-2", primary_photo_path: "old/path.jpg" },
      error: null,
    })
    mockedGetCurrentProfile.mockResolvedValue({
      supabase,
      profile: { id: "profile-1" },
      ownerIds: ["owner-1"],
    } as never)

    const response = await POST(new Request(URL, { method: "POST" }), context())

    expect(response.status).toBe(403)
    expect(await response.json()).toEqual({ error: "Not your memorial" })
    expect(mockedCreateAdminClient).not.toHaveBeenCalled()
  })

  it("returns 404 when the memorial does not exist", async () => {
    const { supabase } = makeUserSupabase({ data: null, error: null })
    mockedGetCurrentProfile.mockResolvedValue({
      supabase,
      profile: { id: "profile-1" },
      ownerIds: ["owner-1"],
    } as never)

    const response = await POST(new Request(URL, { method: "POST" }), context())

    expect(response.status).toBe(404)
    expect(await response.json()).toEqual({ error: "Not found" })
  })

  it("returns 400 when no file is uploaded", async () => {
    const { supabase } = makeUserSupabase({
      data: { owner_id: "owner-1", primary_photo_path: null },
      error: null,
    })
    mockedGetCurrentProfile.mockResolvedValue({
      supabase,
      profile: { id: "profile-1" },
      ownerIds: ["owner-1"],
    } as never)

    const response = await POST(formRequest(null, "A caption without a file"), context())

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({ error: "Missing file" })
  })

  it("returns 400 when the file type is not an allowed image", async () => {
    const { supabase } = makeUserSupabase({
      data: { owner_id: "owner-1", primary_photo_path: null },
      error: null,
    })
    mockedGetCurrentProfile.mockResolvedValue({
      supabase,
      profile: { id: "profile-1" },
      ownerIds: ["owner-1"],
    } as never)

    const gif = { name: "photo.gif", type: "image/gif", size: 3, arrayBuffer: async () => new ArrayBuffer(0) }
    const response = await POST(formRequest(gif), context())

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({
      error: "Please choose a JPEG, PNG, or WebP image.",
    })
  })

  it("returns 400 when the file exceeds the 8MB limit", async () => {
    const { supabase } = makeUserSupabase({
      data: { owner_id: "owner-1", primary_photo_path: null },
      error: null,
    })
    mockedGetCurrentProfile.mockResolvedValue({
      supabase,
      profile: { id: "profile-1" },
      ownerIds: ["owner-1"],
    } as never)

    const huge = jpegFile(8 * 1024 * 1024 + 1)
    const response = await POST(formRequest(huge), context())

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({
      error: "That image is larger than 8MB. Please choose a smaller file.",
    })
  })

  it("returns 500 without updating when the storage upload fails", async () => {
    const { supabase } = makeUserSupabase({
      data: { owner_id: "owner-1", primary_photo_path: null },
      error: null,
    })
    mockedGetCurrentProfile.mockResolvedValue({
      supabase,
      profile: { id: "profile-1" },
      ownerIds: ["owner-1"],
    } as never)

    const admin = makeAdminClient({
      upload: { error: { message: "storage unavailable" } },
    })
    mockedCreateAdminClient.mockReturnValue(admin.client as never)

    const jpeg = jpegFile()
    const response = await POST(formRequest(jpeg, "My portrait"), context())

    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({ error: "storage unavailable" })
    expect(admin.update).not.toHaveBeenCalled()
  })

  it("rolls back the uploaded file when the database update fails", async () => {
    const { supabase } = makeUserSupabase({
      data: { owner_id: "owner-1", primary_photo_path: null },
      error: null,
    })
    mockedGetCurrentProfile.mockResolvedValue({
      supabase,
      profile: { id: "profile-1" },
      ownerIds: ["owner-1"],
    } as never)

    const admin = makeAdminClient({
      update: { error: { message: "db update failed" } },
    })
    mockedCreateAdminClient.mockReturnValue(admin.client as never)

    const jpeg = jpegFile()
    const response = await POST(formRequest(jpeg, "My portrait"), context())

    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({ error: "db update failed" })
    expect(admin.upload).toHaveBeenCalledTimes(1)
    expect(admin.remove).toHaveBeenCalledTimes(1)
    expect(admin.remove).toHaveBeenCalledWith([
      expect.stringContaining("memorial-1/profile-1/portrait-"),
    ])
  })

  it("uploads the file, updates the memorial, and cleans up the old image", async () => {
    const { supabase } = makeUserSupabase({
      data: { owner_id: "owner-1", primary_photo_path: "old/path.jpg" },
      error: null,
    })
    mockedGetCurrentProfile.mockResolvedValue({
      supabase,
      profile: { id: "profile-1" },
      ownerIds: ["owner-1"],
    } as never)

    const admin = makeAdminClient()
    mockedCreateAdminClient.mockReturnValue(admin.client as never)

    const jpeg = jpegFile()
    const response = await POST(formRequest(jpeg, "My portrait"), context())

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.ok).toBe(true)
    expect(body.path).toMatch(/^memorial-1\/profile-1\/portrait-\d+\.jpg$/)

    expect(admin.upload).toHaveBeenCalledTimes(1)
    expect(admin.upload.mock.calls[0][2]).toEqual({
      upsert: true,
      contentType: "image/jpeg",
    })
    expect(admin.update).toHaveBeenCalledWith({
      primary_photo_path: body.path,
      primary_photo_alt: "My portrait",
    })
    expect(admin.remove).toHaveBeenCalledWith(["old/path.jpg"])
  })
})
