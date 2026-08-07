"use client";

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ImagePlus, Loader2, Trash2 } from "lucide-react"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getPostById, createPost, updatePost, type BlogPostWithCover } from "@/services/blog"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_FILE_SIZE = 3 * 1024 * 1024

interface BlogPostEditorProps {
  postId?: string
}

export function BlogPostEditor({ postId }: BlogPostEditorProps) {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const isEdit = Boolean(postId)

  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [authorId, setAuthorId] = useState<string>("")
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState<"draft" | "published">("draft")
  const [currentPublishedAt, setCurrentPublishedAt] = useState<string | null>(null)
  const [existingCoverPath, setExistingCoverPath] = useState<string | null>(null)
  const [existingCoverUrl, setExistingCoverUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [removeCover, setRemoveCover] = useState(false)

  // Load current user and existing post
  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error("You must be signed in.")
        router.push("/sign-in")
        return
      }

      // Resolve the profile id (may differ from auth user id for legacy profiles)
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("clerk_user_id", user.id)
        .maybeSingle()
      if (profileError) {
        console.error("Failed to load profile", profileError)
        toast.error("Failed to load your profile. Please try again.")
        return
      }
      if (!profile) {
        toast.error("Profile not found. Please sign out and sign in again.")
        router.push("/sign-in")
        return
      }
      setAuthorId(profile.id)

      if (postId) {
        const post = await getPostById(supabase, postId)
        if (!post) {
          toast.error("Post not found.")
          router.push("/admin/blog")
          return
        }
        setTitle(post.title)
        setExcerpt(post.excerpt ?? "")
        setContent(post.content)
        setStatus(post.status as "draft" | "published")
        setCurrentPublishedAt(post.published_at)
        if (post.cover_image_path) {
          setExistingCoverPath(post.cover_image_path)
          setExistingCoverUrl(post.coverImageUrl)
        }
        setLoading(false)
      }
    }
    init()
  }, [supabase, postId, router])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0]
    if (!selected) return
    if (!ALLOWED_TYPES.includes(selected.type)) { toast.error("JPEG, PNG, or WebP only."); return }
    if (selected.size > MAX_FILE_SIZE) { toast.error("Max 3MB."); return }
    setFile(selected)
    setPreviewUrl(URL.createObjectURL(selected))
    setRemoveCover(false)
  }

  async function handleSave() {
    if (!title.trim()) { toast.error("Title is required."); return }
    if (!content.trim()) { toast.error("Content is required."); return }
    setSaving(true)

    try {
      let coverImagePath = existingCoverPath

      if (removeCover) {
        coverImagePath = null
      } else if (file) {
        // Delete old cover if replacing
        if (existingCoverPath) {
          await supabase.storage.from("blog-images").remove([existingCoverPath])
        }
        const ext = file.name.split(".").pop() ?? "png"
        const path = `covers/${crypto.randomUUID()}.${ext}`
        const { error: uploadError } = await supabase.storage.from("blog-images").upload(path, file)
        if (uploadError) throw uploadError
        coverImagePath = path
      }

      if (isEdit && postId) {
        await updatePost(supabase, postId, {
          title: title.trim(),
          excerpt: excerpt.trim() || undefined,
          content: content.trim(),
          status,
          currentPublishedAt,
        })
        // Update cover separately if it changed
        if (coverImagePath !== existingCoverPath) {
          await supabase.from("blog_posts").update({ cover_image_path: coverImagePath }).eq("id", postId)
        }
        toast.success("Post updated.")
      } else {
        await createPost(supabase, {
          authorId,
          title: title.trim(),
          excerpt: excerpt.trim() || undefined,
          content: content.trim(),
          status,
        })
        // Update cover if one was uploaded (need to find the created post)
        if (coverImagePath) {
          const { data: created } = await supabase
            .from("blog_posts")
            .select("id")
            .order("created_at", { ascending: false })
            .limit(1)
            .single()
          if (created) {
            await supabase.from("blog_posts").update({ cover_image_path: coverImagePath }).eq("id", created.id)
          }
        }
        toast.success("Post created.")
      }

      router.push("/admin/blog")
    } catch (err) {
      console.error("save blog post error:", err)
      toast.error("Something went wrong.")
    } finally {
      setSaving(false)
    }
  }

  const displayCover = removeCover ? null : (previewUrl ?? existingCoverUrl)

  if (loading) {
    return (
      <Container className="py-12">
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="h-8 w-48 rounded-lg bg-muted animate-pulse" />
          <div className="h-10 w-full rounded-lg bg-muted animate-pulse" />
          <div className="h-32 w-full rounded-lg bg-muted animate-pulse" />
          <div className="h-96 w-full rounded-lg bg-muted animate-pulse" />
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-12">
      <div className="mx-auto max-w-2xl flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            {isEdit ? "Edit" : "New"} blog post
          </h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => router.push("/admin/blog")}>
              Cancel
            </Button>
            <Button disabled={saving} onClick={handleSave}>
              {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
              {saving ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Field>
            <FieldLabel>Title</FieldLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Honouring a Life Well-Lived"
            />
          </Field>

          <Field>
            <FieldLabel>Excerpt</FieldLabel>
            <FieldDescription>A short summary shown on the blog listing page.</FieldDescription>
            <Textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              placeholder="A brief description of the post…"
            />
          </Field>

          <Field>
            <FieldLabel>Content</FieldLabel>
            <FieldDescription>Write the full article. Each blank line starts a new paragraph.</FieldDescription>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={16}
              className="font-mono text-sm"
              placeholder="Start writing…"
            />
          </Field>

          <div className="flex items-center gap-6">
            <Field className="flex-1">
              <FieldLabel>Status</FieldLabel>
              <Select value={status} onValueChange={(v) => setStatus(v as "draft" | "published")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field className="flex-1">
              <FieldLabel>Cover image</FieldLabel>
              <FieldDescription>JPEG, PNG, or WebP. Max 3MB.</FieldDescription>
              {displayCover ? (
                <div className="relative mt-2 rounded-xl border border-border overflow-hidden">
                  <img src={displayCover} alt="" className="h-40 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => { setRemoveCover(true); setFile(null); setPreviewUrl(null) }}
                    className="absolute top-2 right-2 size-8 flex items-center justify-center rounded-lg bg-background/80 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ) : (
                <label className="mt-2 flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/50 text-sm text-muted-foreground hover:bg-muted transition-colors">
                  <ImagePlus className="size-6" />
                  <span>Upload cover image</span>
                  <input
                    type="file"
                    accept={ALLOWED_TYPES.join(",")}
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
              )}
            </Field>
          </div>
        </div>
      </div>
    </Container>
  )
}
