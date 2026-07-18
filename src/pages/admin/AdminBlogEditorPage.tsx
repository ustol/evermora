import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { ImagePlus, Trash2 } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { Skeleton } from "@/components/ui/skeleton"
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { useProfile } from "@/hooks/useProfile"
import {
  getPostById,
  createPost,
  updatePost,
  uploadCoverImage,
  listPostImages,
  addPostImage,
  deletePostImage,
  type BlogPostStatus,
} from "@/services/blog"

const MAX_FILE_SIZE = 8 * 1024 * 1024
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

const statusOptions: { value: BlogPostStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
]

export default function AdminBlogEditorPage() {
  const { id } = useParams<{ id: string }>()
  const isNew = !id
  const navigate = useNavigate()
  const supabase = useSupabaseClient()
  const { data: profile } = useProfile()
  const queryClient = useQueryClient()
  const coverInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", "admin", id],
    queryFn: () => getPostById(supabase, id!),
    enabled: !!id,
  })

  const { data: images } = useQuery({
    queryKey: ["blog-post-images", "admin", id],
    queryFn: () => listPostImages(supabase, id!),
    enabled: !!id,
  })

  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState<BlogPostStatus>("draft")

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setExcerpt(post.excerpt ?? "")
      setContent(post.content)
      setStatus(post.status)
    }
  }, [post])

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!profile) throw new Error("Not signed in")
      if (isNew) {
        const created = await createPost(supabase, {
          authorId: profile.id,
          title: title.trim(),
          excerpt: excerpt.trim() || undefined,
          content: content.trim(),
          status,
        })
        return created.id
      }
      await updatePost(supabase, id!, {
        title: title.trim(),
        excerpt: excerpt.trim() || undefined,
        content: content.trim(),
        status,
        currentPublishedAt: post?.published_at ?? null,
      })
      return id!
    },
    onSuccess: (postId) => {
      toast.success(isNew ? "Post created." : "Post saved.")
      queryClient.invalidateQueries({ queryKey: ["blog-posts", "admin"] })
      if (isNew) {
        navigate(`/admin/blog/${postId}/edit`, { replace: true })
      } else {
        queryClient.invalidateQueries({ queryKey: ["blog-post", "admin", id] })
      }
    },
    onError: () => toast.error("Couldn't save this post. Please try again."),
  })

  const coverMutation = useMutation({
    mutationFn: (file: File) => uploadCoverImage(supabase, id!, file),
    onSuccess: () => {
      toast.success("Cover image updated.")
      queryClient.invalidateQueries({ queryKey: ["blog-post", "admin", id] })
    },
    onError: () => toast.error("Couldn't upload the cover image."),
  })

  const addImageMutation = useMutation({
    mutationFn: (file: File) => addPostImage(supabase, id!, file, images?.length ?? 0),
    onSuccess: () => {
      toast.success("Photo added.")
      queryClient.invalidateQueries({ queryKey: ["blog-post-images", "admin", id] })
    },
    onError: () => toast.error("Couldn't add this photo."),
  })

  const deleteImageMutation = useMutation({
    mutationFn: (imageId: string) => deletePostImage(supabase, imageId),
    onSuccess: () => {
      toast.success("Photo removed.")
      queryClient.invalidateQueries({ queryKey: ["blog-post-images", "admin", id] })
    },
    onError: () => toast.error("Couldn't remove this photo."),
  })

  function validateFile(file: File): boolean {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Please choose a JPEG, PNG, or WebP image.")
      return false
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("That image is larger than 8MB.")
      return false
    }
    return true
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) {
      toast.error("Please enter a title.")
      return
    }
    if (!content.trim()) {
      toast.error("Please write some content.")
      return
    }
    saveMutation.mutate()
  }

  if (id && isLoading) {
    return (
      <Container className="flex flex-col gap-6 py-10">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </Container>
    )
  }

  return (
    <Container className="flex flex-col gap-8 py-10">
      <PageHeader
        title={isNew ? "New post" : "Edit post"}
        description="Posts are only ever written by an Evermora administrator."
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
        <Field>
          <FieldLabel htmlFor="post-title">Title</FieldLabel>
          <Input
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Planning a dignified funeral on a budget"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="post-excerpt">Excerpt (optional)</FieldLabel>
          <FieldDescription>A short summary shown on the blog listing page.</FieldDescription>
          <Textarea
            id="post-excerpt"
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="post-content">Content</FieldLabel>
          <Textarea
            id="post-content"
            rows={14}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write the post…"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="post-status">Status</FieldLabel>
          <Select value={status} onValueChange={(v) => setStatus(v as BlogPostStatus)} items={statusOptions}>
            <SelectTrigger id="post-status" className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Button type="submit" className="w-fit" disabled={saveMutation.isPending}>
          {saveMutation.isPending ? "Saving…" : isNew ? "Create post" : "Save changes"}
        </Button>
      </form>

      {!isNew && (
        <>
          <section className="flex flex-col gap-4">
            <h2 className="font-heading text-xl text-foreground">Cover image</h2>
            <div className="flex items-center gap-4">
              <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
                {post?.coverImageUrl && (
                  <img src={post.coverImageUrl} alt="" className="size-full object-cover" />
                )}
              </div>
              <Input
                ref={coverInputRef}
                type="file"
                accept={ALLOWED_TYPES.join(",")}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file && validateFile(file)) coverMutation.mutate(file)
                  if (coverInputRef.current) coverInputRef.current.value = ""
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => coverInputRef.current?.click()}
                disabled={coverMutation.isPending}
              >
                <ImagePlus className="size-4" aria-hidden="true" />
                {post?.coverImageUrl ? "Replace cover" : "Add cover image"}
              </Button>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl text-foreground">Related pictures</h2>
              <Input
                ref={galleryInputRef}
                type="file"
                accept={ALLOWED_TYPES.join(",")}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file && validateFile(file)) addImageMutation.mutate(file)
                  if (galleryInputRef.current) galleryInputRef.current.value = ""
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => galleryInputRef.current?.click()}
                disabled={addImageMutation.isPending}
              >
                <ImagePlus className="size-4" aria-hidden="true" />
                Add photo
              </Button>
            </div>

            {images && images.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {images.map((image) => (
                  <div key={image.id} className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
                    <img src={image.url} alt="" className="size-full object-cover" />
                    <AlertDialog>
                      <AlertDialogTrigger
                        render={
                          <button
                            type="button"
                            aria-label="Remove photo"
                            className="absolute top-1.5 right-1.5 rounded-full bg-obsidian/70 p-1.5 text-soft-ivory opacity-0 transition-opacity group-hover:opacity-100"
                          />
                        }
                      >
                        <Trash2 className="size-3.5" aria-hidden="true" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove this photo?</AlertDialogTitle>
                          <AlertDialogDescription>
                            It will no longer appear on the post.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            onClick={() => deleteImageMutation.mutate(image.id)}
                          >
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No related pictures yet.</p>
            )}
          </section>
        </>
      )}
    </Container>
  )
}
