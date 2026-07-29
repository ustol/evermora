import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Gift, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { EmptyState } from "@/components/layout/EmptyState"
import { ErrorState } from "@/components/layout/ErrorState"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
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
import { AddGiftCatalogItemDialog } from "@/components/admin/AddGiftCatalogItemDialog"
import { EditGiftCatalogItemDialog } from "@/components/admin/EditGiftCatalogItemDialog"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import {
  listAllGiftCatalog,
  setGiftCatalogItemActive,
  deleteGiftCatalogItem,
} from "@/services/gifts"

export default function AdminGiftCatalogPage() {
  const supabase = useSupabaseClient()
  const queryClient = useQueryClient()

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["gift-catalog", "admin"],
    queryFn: () => listAllGiftCatalog(supabase),
  })

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      setGiftCatalogItemActive(supabase, id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gift-catalog", "admin"] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteGiftCatalogItem(supabase, id),
    onSuccess: () => {
      toast.success("Gift deleted.")
      queryClient.invalidateQueries({ queryKey: ["gift-catalog", "admin"] })
    },
    onError: (error: unknown) => {
      const code = (error as { code?: string })?.code
      if (code === "23503") {
        toast.error(
          "This gift has already been purchased before, so it can't be deleted — deactivate it instead."
        )
      } else {
        toast.error("Couldn't delete this gift. Please try again.")
      }
    },
  })

  return (
    <Container className="flex flex-col gap-8 py-10">
      <PageHeader
        title="Wreaths & roses"
        description="Manage the virtual gifts visitors can purchase for a memorial."
        actions={<AddGiftCatalogItemDialog />}
      />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
            >
              <img
                src={item.imageUrl}
                alt=""
                className="size-16 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.currency} {item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <EditGiftCatalogItemDialog item={item} />

                <AlertDialog>
                  <AlertDialogTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-destructive hover:text-destructive/80"
                      />
                    }
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                    <span className="sr-only">Delete {item.name}</span>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this gift?</AlertDialogTitle>
                      <AlertDialogDescription>
                        "{item.name}" will no longer be available for
                        visitors to purchase. This can't be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        variant="destructive"
                        disabled={deleteMutation.isPending}
                        onClick={() => deleteMutation.mutate(item.id)}
                      >
                        {deleteMutation.isPending ? "Deleting…" : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Switch
                  checked={item.isActive}
                  onCheckedChange={(checked) =>
                    toggleMutation.mutate({ id: item.id, isActive: checked })
                  }
                  aria-label={`${item.isActive ? "Deactivate" : "Activate"} ${item.name}`}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Gift}
          title="No gifts yet"
          description="Add a wreath or rose to let visitors purchase tributes for memorials."
        />
      )}
    </Container>
  )
}
