import { useState } from "react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Store, MapPin } from "lucide-react"
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
import { listApprovedVendors, vendorCategoryLabels, vendorCategoryOptions } from "@/services/vendors"
import type { VendorCategory } from "@/services/vendors"

export default function VendorsDirectoryPage() {
  const supabase = useSupabaseClient()
  const [category, setCategory] = useState<VendorCategory | "all">("all")

  const {
    data: vendors,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["vendors", "public", category],
    queryFn: () => listApprovedVendors(supabase, category === "all" ? undefined : category),
  })

  return (
    <Container className="flex flex-col gap-8 py-12 sm:py-16">
      <PageHeader
        title="Funeral service vendors"
        description="Trusted, independent businesses offering catering, florals, transport, and more for your funeral arrangements."
      />

      <Select
        value={category}
        onValueChange={(v) => setCategory(v as VendorCategory | "all")}
        items={[{ value: "all", label: "All categories" }, ...vendorCategoryOptions]}
      >
        <SelectTrigger className="w-full sm:w-64">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {vendorCategoryOptions.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-2xl" />
          ))}
        </div>
      ) : vendors && vendors.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vendors.map((vendor) => (
            <Link
              key={vendor.id}
              to={`/vendors/${vendor.slug}`}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
                  {vendor.logoUrl ? (
                    <img src={vendor.logoUrl} alt="" className="size-full object-cover" />
                  ) : (
                    <Store className="size-6 text-muted-foreground" aria-hidden="true" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-heading text-lg text-foreground">
                    {vendor.business_name}
                  </p>
                  <Badge variant="secondary">{vendorCategoryLabels[vendor.category]}</Badge>
                </div>
              </div>
              {vendor.location && (
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                  {vendor.location}
                </p>
              )}
              {vendor.description && (
                <p className="line-clamp-2 text-sm text-foreground/80">{vendor.description}</p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Store}
          title="No vendors yet"
          description="Approved vendors will appear here once they register."
        />
      )}
    </Container>
  )
}
