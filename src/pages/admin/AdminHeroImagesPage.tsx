import { useRef } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { ChevronLeft, ChevronRight, ImagePlus, Images, Trash2 } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { EmptyState } from "@/components/layout/EmptyState"
import { ErrorState } from "@/components/layout/ErrorState"
import { Skeleton } from "@/components/ui/skeleton"
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
import {
  listHeroImages,
  uploadHeroImage,
  deleteHeroImage,
  updateHeroImageSortOrder,
  MAX_HERO_IMAGES,
  type HeroImage,
} from "@/services/heroImages"

const MAX_FILE_SIZE = 8 * 1024 * 1024
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

interface ImageCardProps {
  image: HeroImage
  index: number
  prevImage: HeroImage | null
  nextImage: HeroImage | null
}

function ImageCard({ image, index, prevImage, nextImage }: ImageCardProps) {
  const supabase = useSupabaseClient()
  const queryClient = useQueryClient()

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["hero-images", "admin"] })

  const deleteMutation = useMutation({
    mutationFn: () => deleteHeroImage(supabase, image.id),
    onSuccess: () => {
      toast.success("Image removed.")
      invalidate()
    },
    onError: () => toast.error("Couldn't remove this image."),
  })

  // Swaps by array position, not stored sort_order — matches the gallery
  // reorder pattern (MemorialGalleryPage), safe even if legacy rows share
  // the same sort_order value.
  const moveMutation = useMutation({
    mutationFn: async (direction: "up" | "down") => {
      const neighbor = direction === "up" ? prevImage : nextImage
      if (!neighbor) return
      const neighborIndex = direction === "up" ? index - 1 : index + 1
      await Promise.all([
        updateHeroImageSortOrder(supabase, image.id, neighborIndex),
        updateHeroImageSortOrder(supabase, neighbor.id, index),
      ])
    },
    onSuccess: () => invalidate(),
    onError: () => toast.error("Couldn't reorder this image."),
  })

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img src={image.url} alt="" className="size-full object-cover" />
      </div>
      <div className="flex items-center justify-between gap-2 p-3">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={!prevImage || moveMutation.isPending}
            onClick={() => moveMutation.mutate("up")}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={!nextImage || moveMutation.isPending}
            onClick={() => moveMutation.mutate("down")}
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
        </div>

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
            Remove
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove this image?</AlertDialogTitle>
              <AlertDialogDescription>
                It will no longer appear in the homepage hero slideshow.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate()}
              >
                {deleteMutation.isPending ? "Removing…" : "Remove"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default function AdminHeroImagesPage() {
  const supabase = useSupabaseClient()
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    data: images,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["hero-images", "admin"],
    queryFn: () => listHeroImages(supabase),
  })

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadHeroImage(supabase, file),
    onSuccess: () => {
      toast.success("Image added to the hero slideshow.")
      queryClient.invalidateQueries({ queryKey: ["hero-images", "admin"] })
    },
    onError: () =>
      toast.error("Couldn't upload this image. Please try again."),
  })

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Please choose a JPEG, PNG, or WebP image.")
    } else if (file.size > MAX_FILE_SIZE) {
      toast.error("That image is larger than 8MB. Please choose a smaller file.")
    } else {
      uploadMutation.mutate(file)
    }
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const atLimit = (images?.length ?? 0) >= MAX_HERO_IMAGES

  return (
    <Container className="flex flex-col gap-8 py-10">
      <PageHeader
        title="Hero images"
        description={`Up to ${MAX_HERO_IMAGES} images shown as a rotating slideshow behind the homepage hero.`}
        actions={
          <>
            <Input
              ref={fileInputRef}
              type="file"
              accept={ALLOWED_TYPES.join(",")}
              onChange={handleFileChange}
              className="hidden"
              id="hero-image-upload"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={atLimit || uploadMutation.isPending}
            >
              <ImagePlus className="size-4" aria-hidden="true" />
              {uploadMutation.isPending
                ? "Uploading…"
                : atLimit
                  ? `Limit reached (${MAX_HERO_IMAGES})`
                  : "Upload image"}
            </Button>
          </>
        }
      />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="aspect-video w-full rounded-2xl" />
          ))}
        </div>
      ) : images && images.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <ImageCard
              key={image.id}
              image={image}
              index={index}
              prevImage={index > 0 ? images[index - 1] : null}
              nextImage={index < images.length - 1 ? images[index + 1] : null}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Images}
          title="No hero images yet"
          description="Upload up to 5 images to show a slideshow on the homepage."
        />
      )}
    </Container>
  )
}
