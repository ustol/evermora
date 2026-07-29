import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Users } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { EmptyState } from "@/components/layout/EmptyState"
import { ErrorState } from "@/components/layout/ErrorState"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { useProfile } from "@/hooks/useProfile"
import {
  listAllProfiles,
  setProfileRole,
  setProfileStatus,
  type AdminProfile,
} from "@/services/admin"
import { formatDayMonthYear } from "@/lib/date"
import type { Database } from "@/types/supabase"

type UserRole = Database["public"]["Enums"]["user_role"]
type AccountStatus = Database["public"]["Enums"]["account_status"]

const roleOptions: { value: UserRole; label: string }[] = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
]

const statusOptions: { value: AccountStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
  { value: "deleted", label: "Deleted" },
]

const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success",
  suspended: "bg-destructive/10 text-destructive",
  deleted: "bg-muted text-muted-foreground",
}

function UserRow({ profile }: { profile: AdminProfile }) {
  const supabase = useSupabaseClient()
  const { data: currentProfile } = useProfile()
  const queryClient = useQueryClient()
  const isSelf = currentProfile?.id === profile.id

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["admin-profiles"] })

  const roleMutation = useMutation({
    mutationFn: (role: UserRole) => setProfileRole(supabase, profile.id, role),
    onSuccess: () => {
      toast.success("Role updated.")
      invalidate()
    },
    onError: () => toast.error("Couldn't update this user's role."),
  })

  const statusMutation = useMutation({
    mutationFn: (status: AccountStatus) => setProfileStatus(supabase, profile.id, status),
    onSuccess: () => {
      toast.success("Status updated.")
      invalidate()
    },
    onError: () => toast.error("Couldn't update this user's status."),
  })

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium text-foreground">{profile.displayName}</p>
          <Badge className={statusStyles[profile.status]}>{profile.status}</Badge>
          {profile.role === "admin" && <Badge variant="secondary">Admin</Badge>}
        </div>
        {profile.email && (
          <p className="text-sm text-muted-foreground">{profile.email}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Joined {formatDayMonthYear(profile.createdAt)}
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Select
          value={profile.role}
          onValueChange={(v) => roleMutation.mutate(v as UserRole)}
          items={roleOptions}
          disabled={isSelf || roleMutation.isPending}
        >
          <SelectTrigger size="sm" aria-label="Role">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={profile.status}
          onValueChange={(v) => statusMutation.mutate(v as AccountStatus)}
          items={statusOptions}
          disabled={isSelf || statusMutation.isPending}
        >
          <SelectTrigger size="sm" aria-label="Status">
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
      </div>
    </div>
  )
}

export default function AdminUsersPage() {
  const supabase = useSupabaseClient()

  const {
    data: profiles,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: () => listAllProfiles(supabase),
  })

  return (
    <Container className="flex flex-col gap-8 py-10">
      <PageHeader
        title="Users"
        description="Every account on Akornafa. Changing a role or status takes effect immediately."
      />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      ) : profiles && profiles.length > 0 ? (
        <div className="flex flex-col gap-4">
          {profiles.map((profile) => (
            <UserRow key={profile.id} profile={profile} />
          ))}
        </div>
      ) : (
        <EmptyState icon={Users} title="No users yet" />
      )}
    </Container>
  )
}
