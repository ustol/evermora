import { Link } from "react-router-dom"
import { UserRound, Eye, Pencil, Settings, MessageSquareText, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Badge } from "@/components/ui/badge"
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
import { formatLifespanYears } from "@/lib/date"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { deleteMemorial } from "@/services/memorials"
import type { MemorialWithPhoto } from "@/services/memorials"

interface OwnerMemorialCardProps {
  memorial: MemorialWithPhoto
}

const statusStyles: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  published: "bg-success/10 text-success",
  archived: "bg-muted-taupe/10 text-muted-taupe",
}

const statusLabels: Record<string, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
}

export function OwnerMemorialCard({ memorial }: OwnerMemorialCardProps) {
  const lifespan = formatLifespanYears(memorial.date_of_birth, memorial.date_of_death)
  const supabase = useSupabaseClient()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => deleteMemorial(supabase, memorial.id),
    onSuccess: () => {
      toast.success(`"${memorial.display_name}" has been deleted.`)
      queryClient.invalidateQueries({ queryKey: ["owner-memorials"] })
      queryClient.invalidateQueries({ queryKey: ["owner-dashboard-stats"] })
    },
    onError: () => {
      toast.error("Couldn't delete this memorial. Please try again.")
    },
  })

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-start gap-4 p-5">
        <div className="size-16 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
          {memorial.photoUrl ? (
            <img
              src={memorial.photoUrl}
              alt=""
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              <UserRound className="size-7" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-heading text-lg text-foreground">
              {memorial.display_name}
            </h3>
            <Badge className={statusStyles[memorial.status]}>
              {statusLabels[memorial.status]}
            </Badge>
          </div>
          {lifespan && <p className="text-sm text-muted-foreground">{lifespan}</p>}
        </div>

        <AlertDialog>
          <AlertDialogTrigger
            render={
              <button
                type="button"
                aria-label={`Delete ${memorial.display_name}`}
                className="shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              />
            }
          >
            <Trash2 className="size-4" aria-hidden="true" />
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

      <div className="flex flex-wrap gap-2 border-t border-border/60 bg-muted/30 px-5 py-3">
        {memorial.status === "published" && (
          <Link
            to={`/memorials/${memorial.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-heritage-gold"
          >
            <Eye className="size-4" aria-hidden="true" />
            View
          </Link>
        )}
        <Link
          to={`/dashboard/memorials/${memorial.id}/edit`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-heritage-gold"
        >
          <Pencil className="size-4" aria-hidden="true" />
          Edit
        </Link>
        <Link
          to={`/dashboard/memorials/${memorial.id}/content`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-heritage-gold"
        >
          <MessageSquareText className="size-4" aria-hidden="true" />
          Moderate
        </Link>
        <Link
          to={`/dashboard/memorials/${memorial.id}/settings`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-heritage-gold"
        >
          <Settings className="size-4" aria-hidden="true" />
          Settings
        </Link>
      </div>
    </div>
  )
}
