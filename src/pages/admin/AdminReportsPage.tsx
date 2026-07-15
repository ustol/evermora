import { useState } from "react"
import { Link } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Check, Flag, X } from "lucide-react"
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
import { useProfile } from "@/hooks/useProfile"
import { listReports, resolveReport, type AdminReport } from "@/services/admin"
import { formatDayMonthYear } from "@/lib/date"

const tabs = ["open", "reviewing", "resolved", "dismissed"] as const
type StatusTab = (typeof tabs)[number]

const tabLabels: Record<StatusTab, string> = {
  open: "Open",
  reviewing: "Reviewing",
  resolved: "Resolved",
  dismissed: "Dismissed",
}

const statusStyles: Record<string, string> = {
  open: "bg-muted text-muted-foreground",
  reviewing: "bg-heritage-gold/10 text-heritage-gold",
  resolved: "bg-success/10 text-success",
  dismissed: "bg-destructive/10 text-destructive",
}

const targetTypeLabels: Record<string, string> = {
  memorial: "Memorial",
  contribution: "Tribute message",
  media: "Photo",
}

function ResolveDialog({
  report,
  status,
  onResolved,
}: {
  report: AdminReport
  status: "resolved" | "dismissed"
  onResolved: () => void
}) {
  const supabase = useSupabaseClient()
  const { data: profile } = useProfile()
  const [open, setOpen] = useState(false)
  const [notes, setNotes] = useState("")

  const mutation = useMutation({
    mutationFn: async () => {
      if (!profile) throw new Error("Not signed in")
      await resolveReport(supabase, {
        reportId: report.id,
        status,
        resolverProfileId: profile.id,
        resolutionNotes: notes.trim() || undefined,
      })
    },
    onSuccess: () => {
      toast.success(status === "resolved" ? "Report resolved." : "Report dismissed.")
      setOpen(false)
      setNotes("")
      onResolved()
    },
    onError: () => toast.error("Couldn't update this report."),
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="sm" variant={status === "resolved" ? "default" : "outline"} />
        }
      >
        {status === "resolved" ? (
          <>
            <Check className="size-4" aria-hidden="true" />
            Resolve
          </>
        ) : (
          <>
            <X className="size-4" aria-hidden="true" />
            Dismiss
          </>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {status === "resolved" ? "Resolve this report" : "Dismiss this report"}
          </DialogTitle>
          <DialogDescription>
            {status === "resolved"
              ? "Confirm that action has been taken on this report."
              : "Confirm this report doesn't require action."}
          </DialogDescription>
        </DialogHeader>

        <Textarea
          className="mt-4"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Resolution notes (optional)"
        />

        <DialogFooter className="mt-6">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={() => mutation.mutate()} disabled={mutation.isPending}>
            {mutation.isPending ? "Saving…" : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ReportRow({ report, onResolved }: { report: AdminReport; onResolved: () => void }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{targetTypeLabels[report.target.type]}</Badge>
        <Badge className={statusStyles[report.status]}>{report.status}</Badge>
        <span className="text-xs text-muted-foreground">
          Reported by {report.reporterName} · {formatDayMonthYear(report.createdAt)}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-foreground/90">
        {report.target.label}
      </p>
      {report.target.slug && (
        <Link
          to={`/memorials/${report.target.slug}`}
          className="mt-1 inline-block text-sm text-heritage-gold hover:underline"
        >
          View memorial
        </Link>
      )}
      {report.target.type === "media" && report.target.thumbnailUrl && (
        <img
          src={report.target.thumbnailUrl}
          alt=""
          className="mt-2 h-24 rounded-lg object-cover"
        />
      )}

      <div className="mt-3 rounded-lg bg-muted/50 p-3 text-sm text-foreground">
        <span className="font-medium">Reason: </span>
        {report.reason}
      </div>

      {report.resolutionNotes && (
        <div className="mt-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
          <span className="font-medium">Resolution: </span>
          {report.resolutionNotes}
        </div>
      )}

      {(report.status === "open" || report.status === "reviewing") && (
        <div className="mt-4 flex flex-wrap gap-2">
          <ResolveDialog report={report} status="resolved" onResolved={onResolved} />
          <ResolveDialog report={report} status="dismissed" onResolved={onResolved} />
        </div>
      )}
    </div>
  )
}

export default function AdminReportsPage() {
  const supabase = useSupabaseClient()
  const [tab, setTab] = useState<StatusTab>("open")

  const {
    data: reports,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["admin-reports", tab],
    queryFn: () => listReports(supabase, tab),
  })

  const queryClient = useQueryClient()
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["admin-reports"] })

  return (
    <Container className="flex flex-col gap-8 py-10">
      <PageHeader
        title="Content reports"
        description="Reports filed against memorials, tributes, and photos."
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
            <Skeleton key={i} className="h-40 w-full rounded-2xl" />
          ))}
        </div>
      ) : reports && reports.length > 0 ? (
        <div className="flex flex-col gap-4">
          {reports.map((report) => (
            <ReportRow key={report.id} report={report} onResolved={invalidate} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Flag}
          title={`No ${tabLabels[tab].toLowerCase()} reports`}
          description="Nothing to show here right now."
        />
      )}
    </Container>
  )
}
