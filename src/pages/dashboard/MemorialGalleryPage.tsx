import { useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Flag,
  ImagePlus,
  Images,
  Trash2,
  X,
} from "lucide-react"
import { toast } from "sonner"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { EmptyState } from "@/components/layout/EmptyState"
import { ErrorState } from "@/components/layout/ErrorState"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  listMediaForModeration,
  uploadMediaPhoto,
  updateMediaDetails,
  updateMediaSortOrder,
  moderateMedia,
  deleteMedia,
  type MediaItem,
} from "@/services/media"

const MAX_FILE_SIZE = 8 * 1024 * 1024
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

const statusStyles: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
  flagged: "bg-heritage-gold/10 text-heritage-gold",
}

interface PhotoCardProps {
  photo: MediaItem
  memorialId: string
  index: number
  prevPhoto: MediaItem | null
  nextPhoto: MediaItem | null
}

function PhotoCard({ photo, memorialId, index, prevPhoto, nextPhoto }: PhotoCardProps) {
  const supabase = useSupabaseClient()
  const queryClient = useQueryClient()
  const [caption, setCaption] = useState(photo.caption ?? "")

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["gallery-moderation", memorialId] })

  const captionMutation = useMutation({
    mutationFn: () => updateMediaDetails(supabase, photo.id, { caption }),
    onSuccess: () => {
      toast.success("Caption updated.")
      invalidate()
    },
    onError: () => toast.error("Couldn't update the caption."),
  })

  const moderateMutation = useMutation({
    mutationFn: (status: "approved" | "rejected" | "flagged") =>
      moderateMedia(supabase, photo.id, status),
    onSuccess: (_d, status) => {
      toast.success(`Photo ${status}.`)
      invalidate()
    },
    onError: () => toast.error("Couldn't update this photo."),
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteMedia(supabase, photo.id),
    onSuccess: () => {
      toast.success("Photo deleted.")
      invalidate()
    },
    onError: () => toast.error("Couldn't delete this photo."),
  })

  // Swaps by array position (not stored sort_order) so a move always
  // visibly reorders even if legacy rows share the same sort_order value.
  const moveMutation = useMutation({
    mutationFn: async (direction: "up" | "down") => {
      const neighbor = direction === "up" ? prevPhoto : nextPhoto
      if (!neighbor) return
      const neighborIndex = direction === "up" ? index - 1 : index + 1
      await Promise.all([
        updateMediaSortOrder(supabase, photo.id, neighborIndex),
        updateMediaSortOrder(supabase, neighbor.id, index),
      ])
    },
    onSuccess: () => invalidate(),
    onError: () => toast.error("Couldn't reorder this photo."),
  })

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="aspect-square w-full overflow-hidden bg-muted">
        <img src={photo.url} alt={photo.altText ?? ""} className="size-full object-cover" />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <Badge className={statusStyles[photo.status]}>{photo.status}</Badge>

        <div className="flex gap-2">
          <Input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Caption"
            className="text-sm"
          />
          <Button
            size="sm"
            variant="outline"
            onClick={() => captionMutation.mutate()}
            disabled={captionMutation.isPending}
          >
            Save
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={!prevPhoto || moveMutation.isPending}
            onClick={() => moveMutation.mutate("up")}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            Move up
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={!nextPhoto || moveMutation.isPending}
            onClick={() => moveMutation.mutate("down")}
          >
            Move down
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {photo.status !== "approved" && (
            <Button
              size="sm"
              onClick={() => moderateMutation.mutate("approved")}
              disabled={moderateMutation.isPending}
            >
              <Check className="size-4" aria-hidden="true" />
              Approve
            </Button>
          )}
          {photo.status !== "rejected" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => moderateMutation.mutate("rejected")}
              disabled={moderateMutation.isPending}
            >
              <X className="size-4" aria-hidden="true" />
              Reject
            </Button>
          )}
          {photo.status !== "flagged" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => moderateMutation.mutate("flagged")}
              disabled={moderateMutation.isPending}
            >
              <Flag className="size-4" aria-hidden="true" />
              Flag
            </Button>
          )}

          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive/80"
                />
              }
            >
              <Trash2 className="size-4" aria-hidden="true" />
              Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this photo?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove this photo from the gallery. This
                  can't be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  disabled={deleteMutation.isPending}
                  onClick={() => deleteMutation.mutate()}
                >
                  {deleteMutation.isPending ? "Deleting…" : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}

export default function MemorialGalleryPage() {
  const { id } = useParams<{ id: string }>()
  const supabase = useSupabaseClient()
  const { data: profile } = useProfile()
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    data: photos,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["gallery-moderation", id],
    queryFn: () => listMediaForModeration(supabase, id!),
    enabled: !!id,
  })

  const uploadMutation = useMutation({
    mutationFn: async (files: FileList) => {
      if (!profile || !id) return
      const nextSortOrder = (photos?.length ?? 0)
      let offset = 0
      for (const file of Array.from(files)) {
        if (!ALLOWED_TYPES.includes(file.type)) {
          toast.error(`${file.name} isn't a JPEG, PNG, or WebP image.`)
          continue
        }
        if (file.size > MAX_FILE_SIZE) {
          toast.error(`${file.name} is larger than 8MB.`)
          continue
        }
        await uploadMediaPhoto(supabase, {
          memorialId: id,
          uploaderProfileId: profile.id,
          file,
          sortOrder: nextSortOrder + offset,
        })
        offset++
      }
    },
    onSuccess: () => {
      toast.success("Photos uploaded.")
      queryClient.invalidateQueries({ queryKey: ["gallery-moderation", id] })
    },
    onError: () => toast.error("Something went wrong uploading your photos."),
  })

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (files && files.length > 0) uploadMutation.mutate(files)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <Container className="flex flex-col gap-8 py-10">
      <PageHeader
        title="Photo gallery"
        description="Upload, caption, reorder, and moderate photos for this memorial."
        actions={
          <>
            <Input
              ref={fileInputRef}
              type="file"
              accept={ALLOWED_TYPES.join(",")}
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="gallery-manager-upload"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadMutation.isPending}
            >
              <ImagePlus className="size-4" aria-hidden="true" />
              {uploadMutation.isPending ? "Uploading…" : "Upload photos"}
            </Button>
          </>
        }
      />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-2xl" />
          ))}
        </div>
      ) : photos && photos.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              memorialId={id!}
              index={index}
              prevPhoto={index > 0 ? photos[index - 1] : null}
              nextPhoto={index < photos.length - 1 ? photos[index + 1] : null}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Images}
          title="No photos yet"
          description="Upload photos to build a gallery for this memorial."
        />
      )}
    </Container>
  )
}
