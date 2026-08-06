"use client";

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserRound, ExternalLink, Pencil, ShieldAlert } from "lucide-react"
import { attachSignedPhotoUrls, type MemorialWithPhoto } from "@/services/memorials"
import { formatDayMonthYear } from "@/lib/date"
import { cn } from "@/lib/utils"

export default function AdminMemorialsPage() {
  const supabase = useSupabaseClient()
  const [memorials, setMemorials] = useState<MemorialWithPhoto[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set())
  // Reset image errors when memorials reload
  useEffect(() => { setImgErrors(new Set()) }, [memorials])

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase
          .from("memorials")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50)
        const enriched = await attachSignedPhotoUrls(supabase, data ?? [])
        setMemorials(enriched)
      } catch (err) {
        console.error("Failed to load memorials:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [supabase])

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader
        title="All memorials"
        description="View and manage every memorial on the platform."
      />
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-56 rounded-2xl" />
          ))}
        </div>
      ) : !memorials?.length ? (
        <p className="text-sm text-muted-foreground">No memorials yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {memorials.map((m) => {
            const name = m.display_name || `${m.first_name} ${m.surname}`
            const photoUrl = m.photoUrl ?? null
            const imgFailed = imgErrors.has(m.id)

            return (
              <div
                key={m.id}
                className="relative flex flex-col gap-3 rounded-2xl border border-border bg-card pt-16 pb-5 px-5 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Featured image — half inside, half outside */}
                <div className="absolute inset-x-0 -top-12 flex justify-center">
                  <div className="relative size-24 overflow-hidden rounded-full border-4 border-background bg-muted shadow-md">
                    {photoUrl && !imgFailed ? (
                      <img
                        src={photoUrl}
                        alt={name}
                        className="h-full w-full object-cover"
                        onError={() => setImgErrors((prev) => new Set([...prev, m.id]))}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted/50">
                        <UserRound className="size-8 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center w-full">
                  <p className="font-heading text-lg font-semibold text-foreground">
                    {name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDayMonthYear(m.created_at)}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Badge
                    variant={m.status === "published" ? "default" : "secondary"}
                    className="text-[11px]"
                  >
                    {m.status}
                  </Badge>
                  <Badge variant="outline" className="text-[11px]">
                    {m.privacy}
                  </Badge>
                  {m.admin_suspended && (
                    <Badge variant="destructive" className="text-[11px] gap-1">
                      <ShieldAlert className="size-3" />
                      Suspended
                    </Badge>
                  )}
                </div>

                <div className="mt-auto flex items-center justify-center gap-2 pt-2">
                  <Link
                    href={m.slug ? `/memorials/${m.slug}` : "#"}
                    target="_blank"
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    )}
                  >
                    <ExternalLink className="size-3.5" />
                    View
                  </Link>
                  <Link href={`/dashboard/memorials/${m.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Pencil className="size-3.5" />
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Container>
  )
}
