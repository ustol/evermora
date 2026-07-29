import Link from "next/link"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { formatLifespanYears } from "@/lib/date"
import { cn } from "@/lib/utils"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { deleteMemorial } from "@/services/memorials"
import { Skeleton } from "@/components/ui/skeleton"
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
import {
  Eye,
  Pencil,
  MessageSquareText,
  Images,
  Settings,
  Trash2,
  Globe,
  Lock,
  EyeOff,
} from "lucide-react"

import type { MemorialWithPhoto } from "@/services/memorials"

interface OwnerMemorialCardProps {
  memorial: MemorialWithPhoto & {
    visibility?: "public" | "unlisted" | "private"
  }
}

/**
 * A card for the dashboard showing a memorial the current user owns, with
 * action links for edit/moderate/photos/settings and a delete confirmation.
 */
export function OwnerMemorialCard({ memorial }: OwnerMemorialCardProps) {
  const supabase = useSupabaseClient()
  const queryClient = useQueryClient()

  const lifespan = formatLifespanYears(memorial.date_of_birth, memorial.date_of_death)

  const visibilityIcon = {
    public: Globe,
    unlisted: EyeOff,
    private: Lock,
  } as const
  const VisibilityIcon = memorial.visibility
    ? visibilityIcon[memorial.visibility]
    : undefined

  const deleteMutation = useMutation({
    mutationFn: () => deleteMemorial(supabase, memorial.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner-memorials"] })
      toast.success("Memorial deleted")
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to delete memorial")
    },
  })

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="flex gap-5 p-5">
        <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-24">
          {memorial.photoUrl ? (
            <img
              src={memorial.photoUrl}
              alt={memorial.primary_photo_alt ?? memorial.display_name}
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              <Images className="size-8" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-heading text-lg text-foreground">
              {memorial.display_name}
            </h3>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                memorial.status === "published" && "bg-success/10 text-success",
                memorial.status === "draft" && "bg-muted text-muted-foreground",
                (memorial.status as string) === "unpublished" && "bg-destructive/10 text-destructive"
              )}
            >
              {memorial.status}
            </span>
            {memorial.visibility !== "public" && memorial.visibility && VisibilityIcon && (
              <VisibilityIcon className="size-3.5 shrink-0 text-muted-foreground" aria-label={memorial.visibility} />
            )}
          </div>
          {lifespan && <p className="text-sm text-muted-foreground">{lifespan}</p>}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border/60 bg-muted/30 px-5 py-3">
        {memorial.status === "published" && (
          <Link
            href={`/memorials/${memorial.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-heritage-gold"
          >
            <Eye className="size-4" aria-hidden="true" />
            View
          </Link>
        )}
        <Link
          href={`/dashboard/memorials/${memorial.id}/edit`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-heritage-gold"
        >
          <Pencil className="size-4" aria-hidden="true" />
          Edit
        </Link>
        <Link
          href={`/dashboard/memorials/${memorial.id}/content`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-heritage-gold"
        >
          <MessageSquareText className="size-4" aria-hidden="true" />
          Moderate
        </Link>
        <Link
          href={`/dashboard/memorials/${memorial.id}/gallery`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-heritage-gold"
        >
          <Images className="size-4" aria-hidden="true" />
          Photos
        </Link>
        <Link
          href={`/dashboard/memorials/${memorial.id}/settings`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-heritage-gold"
        >
          <Settings className="size-4" aria-hidden="true" />
          Settings
        </Link>

        <AlertDialog>
          <AlertDialogTrigger
            render={
              <button
                type="button"
                aria-label={`Delete ${memorial.display_name}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-destructive hover:text-destructive/80"
              />
            }
          >
            <Trash2 className="size-4" aria-hidden="true" />
            Delete
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this memorial?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete "{memorial.display_name}" along
                with its tributes, photos, and gifts. This can't be undone.
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
  )
}

export function OwnerMemorialCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex gap-5 p-5">
        <Skeleton className="size-20 shrink-0 rounded-xl sm:size-24" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="flex gap-3 border-t border-border/60 bg-muted/30 px-5 py-3">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-14" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  )
}
