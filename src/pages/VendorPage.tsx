import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Store, MapPin, Phone, Mail, MessageCircle } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { EmptyState } from "@/components/layout/EmptyState"
import { ErrorState } from "@/components/layout/ErrorState"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import {
  getVendorBySlug,
  listActiveListingsForVendor,
  vendorCategoryLabels,
} from "@/services/vendors"

export default function VendorPage() {
  const { slug } = useParams<{ slug: string }>()
  const supabase = useSupabaseClient()

  const {
    data: vendor,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["vendor", slug],
    queryFn: () => getVendorBySlug(supabase, slug!),
    enabled: !!slug,
  })

  const { data: listings, isLoading: listingsLoading } = useQuery({
    queryKey: ["vendor-listings", vendor?.id],
    queryFn: () => listActiveListingsForVendor(supabase, vendor!.id),
    enabled: !!vendor,
  })

  if (isLoading) {
    return (
      <Container className="py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
          <Skeleton className="size-24 rounded-full" />
          <Skeleton className="h-8 w-64" />
        </div>
      </Container>
    )
  }

  if (isError) {
    return (
      <Container className="py-16">
        <ErrorState onRetry={() => refetch()} />
      </Container>
    )
  }

  if (!vendor) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Vendor not found"
          description="This vendor may not be approved yet, or the link may be incorrect."
        />
      </Container>
    )
  }

  return (
    <Container className="max-w-4xl py-12 sm:py-16">
      <div className="flex flex-col items-center text-center">
        <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-card bg-muted shadow-sm">
          {vendor.logoUrl ? (
            <img src={vendor.logoUrl} alt="" className="size-full object-cover" />
          ) : (
            <Store className="size-10 text-muted-foreground" aria-hidden="true" />
          )}
        </div>
        <h1 className="mt-4 font-heading text-3xl text-foreground">{vendor.business_name}</h1>
        <Badge variant="secondary" className="mt-2">
          {vendorCategoryLabels[vendor.category]}
        </Badge>
        {vendor.location && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" aria-hidden="true" />
            {vendor.location}
          </p>
        )}
      </div>

      {vendor.description && (
        <p className="mt-8 text-center text-foreground/90">{vendor.description}</p>
      )}

      {(vendor.phone || vendor.email || vendor.whatsapp) && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-border bg-card p-5">
          {vendor.phone && (
            <a
              href={`tel:${vendor.phone}`}
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-heritage-gold"
            >
              <Phone className="size-4" aria-hidden="true" />
              {vendor.phone}
            </a>
          )}
          {vendor.whatsapp && (
            <a
              href={`https://wa.me/${vendor.whatsapp.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-heritage-gold"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
          )}
          {vendor.email && (
            <a
              href={`mailto:${vendor.email}`}
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-heritage-gold"
            >
              <Mail className="size-4" aria-hidden="true" />
              {vendor.email}
            </a>
          )}
        </div>
      )}

      <section className="mt-12">
        <h2 className="font-heading text-xl text-foreground">Products & services</h2>
        <div className="mt-4">
          {listingsLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-2xl" />
              ))}
            </div>
          ) : listings && listings.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-4"
                >
                  {listing.imageUrl && (
                    <img
                      src={listing.imageUrl}
                      alt=""
                      className="size-20 shrink-0 rounded-lg object-cover"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">{listing.name}</p>
                    {listing.price != null && (
                      <p className="text-sm text-heritage-gold">
                        {listing.currency} {Number(listing.price).toFixed(2)}
                      </p>
                    )}
                    {listing.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {listing.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No products or services listed yet.
            </p>
          )}
        </div>
      </section>
    </Container>
  )
}
