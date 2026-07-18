import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Check, Store, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { EmptyState } from "@/components/layout/EmptyState"
import { ErrorState } from "@/components/layout/ErrorState"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { listAllVendors, setVendorStatus, type AdminVendor } from "@/services/admin"
import { vendorCategoryLabels } from "@/services/vendors"
import { formatDayMonthYear } from "@/lib/date"

const tabs = ["pending", "approved", "rejected", "suspended"] as const
type StatusTab = (typeof tabs)[number]

const tabLabels: Record<StatusTab, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  suspended: "Suspended",
}

const statusStyles: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
  suspended: "bg-destructive/10 text-destructive",
}

function RejectDialog({ vendor, onDone }: { vendor: AdminVendor; onDone: () => void }) {
  const supabase = useSupabaseClient()
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")

  const mutation = useMutation({
    mutationFn: () => setVendorStatus(supabase, vendor.id, "rejected", reason.trim() || undefined),
    onSuccess: () => {
      toast.success("Vendor rejected.")
      setOpen(false)
      setReason("")
      onDone()
    },
    onError: () => toast.error("Couldn't update this vendor."),
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" variant="outline" />}>
        <X className="size-4" aria-hidden="true" />
        Reject
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject {vendor.businessName}</DialogTitle>
          <DialogDescription>
            Let them know why, so they can update their details and re-apply.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          className="mt-4"
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason (optional)"
        />
        <DialogFooter className="mt-6">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={() => mutation.mutate()} disabled={mutation.isPending}>
            {mutation.isPending ? "Saving…" : "Reject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function VendorRow({ vendor, onDone }: { vendor: AdminVendor; onDone: () => void }) {
  const supabase = useSupabaseClient()

  const approveMutation = useMutation({
    mutationFn: () => setVendorStatus(supabase, vendor.id, "approved"),
    onSuccess: () => {
      toast.success("Vendor approved.")
      onDone()
    },
    onError: () => toast.error("Couldn't approve this vendor."),
  })

  const suspendMutation = useMutation({
    mutationFn: () => setVendorStatus(supabase, vendor.id, "suspended"),
    onSuccess: () => {
      toast.success("Vendor suspended.")
      onDone()
    },
    onError: () => toast.error("Couldn't suspend this vendor."),
  })

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium text-foreground">{vendor.businessName}</p>
          <Badge variant="secondary">{vendorCategoryLabels[vendor.category]}</Badge>
          <Badge className={statusStyles[vendor.status]}>{vendor.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {vendor.ownerDisplayName}
          {vendor.phone ? ` · ${vendor.phone}` : ""}
          {vendor.email ? ` · ${vendor.email}` : ""}
        </p>
        <p className="text-xs text-muted-foreground">
          Applied {formatDayMonthYear(vendor.createdAt)}
        </p>
        {vendor.status === "rejected" && vendor.rejectionReason && (
          <p className="mt-1 text-sm text-destructive">Reason: {vendor.rejectionReason}</p>
        )}
      </div>

      <div className="flex shrink-0 flex-wrap gap-2">
        {vendor.status !== "approved" && (
          <Button size="sm" onClick={() => approveMutation.mutate()} disabled={approveMutation.isPending}>
            <Check className="size-4" aria-hidden="true" />
            Approve
          </Button>
        )}
        {vendor.status !== "rejected" && <RejectDialog vendor={vendor} onDone={onDone} />}
        {vendor.status !== "suspended" && (
          <Button
            size="sm"
            variant="outline"
            className="text-destructive hover:text-destructive/80"
            onClick={() => suspendMutation.mutate()}
            disabled={suspendMutation.isPending}
          >
            Suspend
          </Button>
        )}
      </div>
    </div>
  )
}

export default function AdminVendorsPage() {
  const supabase = useSupabaseClient()
  const queryClient = useQueryClient()
  const [tab, setTab] = useState<StatusTab>("pending")

  const {
    data: vendors,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["admin-vendors"],
    queryFn: () => listAllVendors(supabase),
  })

  const onDone = () => queryClient.invalidateQueries({ queryKey: ["admin-vendors"] })
  const filtered = (vendors ?? []).filter((v) => v.status === tab)

  return (
    <Container className="flex flex-col gap-8 py-10">
      <PageHeader
        title="Vendors"
        description="Review vendor applications and manage active listings access."
      />

      <Tabs value={tab} onValueChange={(v) => setTab(v as StatusTab)}>
        <TabsList>
          {tabs.map((t) => (
            <TabsTrigger key={t} value={t}>
              {tabLabels[t]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filtered.map((vendor) => (
            <VendorRow key={vendor.id} vendor={vendor} onDone={onDone} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Store}
          title={`No ${tabLabels[tab].toLowerCase()} vendors`}
          description="Nothing to show here right now."
        />
      )}
    </Container>
  )
}
