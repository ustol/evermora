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

const URL = "http://localhost/api/admin/memorials/memorial-1/featured-image"
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

describe("POST /api/admin/memorials/[id]/featured-image", () => {
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

  it("returns 403 when the user is not an admin", async () => {
    mockedGetCurrentProfile.mockResolvedValue({
      supabase: {},
      profile: { id: "profile-1", role: "owner" },
      ownerIds: ["profile-1"],
    } as never)

    const response = await POST(new Request(URL, { method: "POST" }), context())

    expect(response.status).toBe(403)
    expect(await response.json()).toEqual({ error: "Admin access required" })
    expect(mockedCreateAdminClient).not.toHaveBeenCalled()
  })

  it("returns 403 when the authenticated user has no profile", async () => {
    mockedGetCurrentProfile.mockResolvedValue({
      supabase: {},
      profile: null,
      ownerIds: [],
    } as never)

    const response = await POST(new Request(URL, { method: "POST" }), context())

    expect(response.status).toBe(403)
    expect(await response.json()).toEqual({ error: "Admin access required" })
    expect(mockedCreateAdminClient).not.toHaveBeenCalled()
  })

  it("returns 400 when no file is uploaded", async () => {
    mockedGetCurrentProfile.mockResolvedValue({
      supabase: {},
      profile: { id: "admin-1", role: "admin" },
      ownerIds: ["admin-1"],
    } as never)

    const response = await POST(formRequest(null, "A caption without a file"), context())

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({ error: "Missing file" })
  })

  it("returns 400 when the file type is not an allowed image", async () => {
    mockedGetCurrentProfile.mockResolvedValue({
      supabase: {},
      profile: { id: "admin-1", role: "admin" },
      ownerIds: ["admin-1"],
    } as never)

    const gif = { name: "photo.gif", type: "image/gif", size: 3, arrayBuffer: async () => new ArrayBuffer(0) }
    const response = await POST(formRequest(gif), context())

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({
      error: "Please choose a JPEG, PNG, or WebP image.",
    })
  })

  it("returns 404 when the memorial does not exist", async () => {
    mockedGetCurrentProfile.mockResolvedValue({
      supabase: {},
      profile: { id: "admin-1", role: "admin" },
      ownerIds: ["admin-1"],
    } as never)

    const admin = makeAdminClient({ memorial: { data: null, error: null } })
    mockedCreateAdminClient.mockReturnValue(admin.client as never)

    const jpeg = jpegFile()
    const response = await POST(formRequest(jpeg), context())

    expect(response.status).toBe(404)
    expect(await response.json()).toEqual({ error: "Memorial not found" })
  })

  it("returns 500 without updating when the storage upload fails", async () => {
    mockedGetCurrentProfile.mockResolvedValue({
      supabase: {},
      profile: { id: "admin-1", role: "admin" },
      ownerIds: ["admin-1"],
    } as never)

    const admin = makeAdminClient({
      memorial: { data: { primary_photo_path: null }, error: null },
      upload: { error: { message: "storage unavailable" } },
    })
    mockedCreateAdminClient.mockReturnValue(admin.client as never)

    const jpeg = jpegFile()
    const response = await POST(formRequest(jpeg, "Admin portrait"), context())

    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({ error: "storage unavailable" })
    expect(admin.update).not.toHaveBeenCalled()
  })

  it("uploads the file, updates the memorial, and cleans up the old image", async () => {
    mockedGetCurrentProfile.mockResolvedValue({
      supabase: {},
      profile: { id: "admin-1", role: "admin" },
      ownerIds: ["admin-1"],
    } as never)

    const admin = makeAdminClient({
      memorial: { data: { primary_photo_path: "old/path.jpg" }, error: null },
    })
    mockedCreateAdminClient.mockReturnValue(admin.client as never)

    const jpeg = jpegFile()
    const response = await POST(formRequest(jpeg, "Admin portrait"), context())

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.ok).toBe(true)
    expect(body.path).toMatch(/^memorial-1\/admin\/[0-9a-f-]{36}\.jpg$/)

    expect(admin.upload).toHaveBeenCalledTimes(1)
    expect(admin.upload.mock.calls[0][2]).toEqual({
      upsert: true,
      contentType: "image/jpeg",
    })
    expect(admin.update).toHaveBeenCalledWith({
      primary_photo_path: body.path,
      primary_photo_alt: "Admin portrait",
    })
    expect(admin.remove).toHaveBeenCalledWith(["old/path.jpg"])
  })
})
