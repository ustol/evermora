"use client";

import { useCallback, useEffect, useState } from "react"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  listAllProfiles,
  setProfileStatus,
  setProfileRole,
  type AdminProfile,
} from "@/services/admin"
import { formatDayMonthYear } from "@/lib/date"
import { toast } from "sonner"
import { ShieldBan, ShieldCheck, ShieldUser, UserCog } from "lucide-react"

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  active: "default",
  suspended: "destructive",
  deleted: "secondary",
}

const roleVariant: Record<string, "default" | "secondary" | "outline"> = {
  admin: "default",
  user: "outline",
}

export default function AdminUsersPage() {
  const supabase = useSupabaseClient()
  const [profiles, setProfiles] = useState<AdminProfile[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const load = useCallback(() => {
    setLoading(true)
    setError(null)
    listAllProfiles(supabase)
      .then(setProfiles)
      .catch((err: any) => setError(err?.message ?? "Failed to load users"))
      .finally(() => setLoading(false))
  }, [supabase])

  useEffect(() => { load() }, [load])

  function actionKey(profileId: string, suffix: string) { return `${profileId}__${suffix}` }

  async function handleStatusChange(profileId: string, newStatus: "active" | "suspended") {
    setActionLoading(actionKey(profileId, "status"))
    try {
      await setProfileStatus(supabase, profileId, newStatus)
      toast.success(newStatus === "suspended" ? "User suspended" : "User reactivated")
      load()
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to update user status")
    } finally {
      setActionLoading(null)
    }
  }

  async function handleRoleChange(profileId: string, newRole: "admin" | "user") {
    setActionLoading(actionKey(profileId, "role"))
    try {
      await setProfileRole(supabase, profileId, newRole)
      toast.success(`Role changed to ${newRole}`)
      load()
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to update role")
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader
        title="Users"
        description="Platform user profiles."
      />
      {loading ? (
        <Skeleton className="h-64 rounded-2xl" />
      ) : error ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-12">
          <p className="text-sm text-destructive">{error}</p>
          <Button variant="outline" size="sm" onClick={load}>Retry</Button>
        </div>
      ) : !profiles?.length ? (
        <p className="text-sm text-muted-foreground">No users yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Joined</TableHead>
                <TableHead className="w-[72px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((p) => {
                const busy = actionLoading?.startsWith(`${p.id}__`)
                return (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.displayName}</TableCell>
                  <TableCell className="text-muted-foreground">{p.email ?? "—"}</TableCell>
                  <TableCell>
                    <Badge variant={roleVariant[p.role] ?? "outline"} className="text-[11px]">
                      {p.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[p.status] ?? "outline"} className="text-[11px]">
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground tabular-nums">
                    {p.createdAt ? formatDayMonthYear(p.createdAt) : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-0.5">
                      {/* Role toggle */}
                      <Tooltip>
                        <TooltipTrigger
                          className="inline-flex items-center justify-center size-8 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                          aria-label={p.role === "admin" ? "Remove admin role" : "Make admin"}
                          disabled={busy}
                          onClick={() => handleRoleChange(p.id, p.role === "admin" ? "user" : "admin")}
                        >
                          {p.role === "admin" ? (
                            <UserCog className="size-4" />
                          ) : (
                            <ShieldUser className="size-4" />
                          )}
                        </TooltipTrigger>
                        <TooltipContent>
                          {p.role === "admin" ? "Remove admin" : "Make admin"}
                        </TooltipContent>
                      </Tooltip>

                      {/* Status toggle */}
                      <Tooltip>
                        <TooltipTrigger
                          className="inline-flex items-center justify-center size-8 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                          aria-label={p.status === "suspended" ? "Reactivate user" : "Suspend user"}
                          disabled={busy}
                          onClick={() => handleStatusChange(p.id, p.status === "suspended" ? "active" : "suspended")}
                        >
                          {p.status === "suspended" ? (
                            <ShieldCheck className="size-4" />
                          ) : (
                            <ShieldBan className="size-4" />
                          )}
                        </TooltipTrigger>
                        <TooltipContent>
                          {p.status === "suspended" ? "Reactivate" : "Suspend"}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </Container>
  )
}
