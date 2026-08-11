import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import { notFound } from "next/navigation";
import { MapPin, UserRound, CalendarDays, Navigation } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ShareButton } from "@/components/shared/ShareButton";
import { ReportMemorialDialog } from "@/components/memorial/ReportMemorialDialog";
import { MemorialGiftsSection } from "@/components/memorial/MemorialGiftsSection";
import { TributesSection } from "@/components/memorial/TributesSection";
import { MediaGallerySection } from "@/components/memorial/MediaGallerySection";
import { TruncatedWriteup } from "@/components/memorial/TruncatedWriteup";
import { calculateAge, formatDayMonthYear, formatLifespanYears } from "@/lib/date";

export const dynamic = "force-dynamic"
export const revalidate = 0

const eventTypeLabels: Record<string, string> = {
  wake: "Wake",
  burial: "Burial",
  funeral_service: "Funeral service",
  thanksgiving_service: "Thanksgiving service",
  reception: "Reception",
  other: "Event",
};

function getSupabase() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false } }
  );
}

/** Proxied URL for memorial-media (private bucket) images. */
function mediaUrl(path: string | null): string | null {
  if (!path) return null;
  return `/api/media?path=${encodeURIComponent(path)}`;
}

async function fetchMemorial(slug: string) {
  const supabase = getSupabase();
  const { data: memorial, error } = await supabase
    .from("memorials")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !memorial || memorial.status !== "published") return null;

  const photoUrl = mediaUrl(memorial.primary_photo_path);

  const events = await supabase
    .from("funeral_events")
    .select("*")
    .eq("memorial_id", memorial.id)
    .order("event_date", { ascending: true })
    .order("sort_order", { ascending: true })
    .then(({ data }) => data ?? []);

  // Gifts
  const { data: giftPurchases } = await supabase
    .from("gift_purchases")
    .select("*")
    .eq("memorial_id", memorial.id)
    .eq("status", "paid")
    .order("created_at", { ascending: false });

  const giftCatalogIds = [...new Set((giftPurchases ?? []).map((g: any) => g.gift_catalog_id))];
  const { data: catalogGifts } = giftCatalogIds.length > 0
    ? await supabase.from("gift_catalog").select("*").in("id", giftCatalogIds)
    : { data: [] };

  const giftMap = new Map((catalogGifts ?? []).map((g: any) => [g.id, g]));

  const gifts = (giftPurchases ?? []).map((p: any) => {
    const catalog = giftMap.get(p.gift_catalog_id);
    return {
      id: p.id,
      purchaserDisplayName: p.purchaser_display_name ?? "Anonymous",
      createdAt: p.created_at,
      gift: {
        name: catalog?.name ?? "Gift",
        imageUrl: catalog?.image_path ? `/api/media?bucket=gift-assets&path=${encodeURIComponent(catalog.image_path)}` : "",
      },
    };
  });

  // Gallery photos — use proxy URLs for private bucket
  const { data: mediaRows } = await supabase
    .from("memorial_media")
    .select("*")
    .eq("memorial_id", memorial.id)
    .in("moderation_status", ["approved"])
    .order("sort_order", { ascending: true });

  const gallery = (mediaRows ?? []).map((m: any) => ({
    id: m.id,
    url: m.storage_path ? mediaUrl(m.storage_path) ?? "" : "",
    caption: m.caption,
    altText: m.alt_text,
    sortOrder: m.sort_order,
  }));

  // Tributes
  const { data: contributions } = await supabase
    .from("contributions")
    .select("*")
    .eq("memorial_id", memorial.id)
    .in("status", ["approved"])
    .order("created_at", { ascending: false });

  // Resolve each tribute's attached photo (contributions.photo_media_id ->
  // memorial_media.storage_path) so it can be served via the media proxy.
  const photoMediaIds = [
    ...new Set((contributions ?? []).map((c: any) => c.photo_media_id).filter(Boolean)),
  ];
  const pathByMediaId = new Map<string, string>();
  if (photoMediaIds.length > 0) {
    const { data: photoRows } = await supabase
      .from("memorial_media")
      .select("id, storage_path")
      .in("id", photoMediaIds);
    for (const row of photoRows ?? []) {
      pathByMediaId.set(row.id, row.storage_path);
    }
  }

  const tributes = (contributions ?? []).map((c: any) => ({
    id: c.id,
    contributionType: c.type,
    title: c.title,
    content: c.message,
    photoUrl: c.photo_media_id ? mediaUrl(pathByMediaId.get(c.photo_media_id) ?? null) : null,
    authorName: c.author_name,
    relationship: c.relationship,
    createdAt: c.created_at,
  }));

  return {
    memorial,
    photoUrl,
    events,
    gifts,
    gallery,
    tributes,
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function MemorialPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await fetchMemorial(slug);

  if (!result) notFound();

  const { memorial, photoUrl, events, gifts, gallery, tributes } = result;
  const age = calculateAge(memorial.date_of_birth, memorial.date_of_death);
  const lifespan = formatLifespanYears(memorial.date_of_birth, memorial.date_of_death);
  const fullName = memorial.display_name || `${memorial.first_name} ${memorial.surname}`;
  const location = [memorial.hometown, memorial.place_of_death].find(Boolean) ?? null;
  const lifeStory = memorial.biography || memorial.obituary;

  return (
    <Container className="py-8 sm:py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* MAIN COLUMN */}
        <div className="min-w-0">
          {/* Portrait + name */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="size-32 overflow-hidden rounded-full border-4 border-border bg-muted sm:size-36">
              {photoUrl ? (
                <img src={photoUrl} alt={memorial.primary_photo_alt ?? fullName} className="size-full object-cover" />
              ) : (
                <div className="flex size-full items-center justify-center bg-heritage-gold/10">
                  <UserRound className="size-14 text-heritage-gold/30" />
                </div>
              )}
            </div>
            <div>
              <h1 className="font-heading text-3xl text-foreground sm:text-4xl">{fullName}</h1>
              <p className="mt-1 text-muted-foreground">
                {lifespan}
                {age !== null ? ` · Age ${age}` : ""}
              </p>
              {location && (
                <p className="mt-1 flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-4 shrink-0" />
                  {location}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <ShareButton path={`/memorials/${slug}`} title={fullName} />
              <ReportMemorialDialog memorialId={memorial.id} slug={slug} />
            </div>
          </div>

          {/* Quotation / announcement */}
          {memorial.announcement && (
            <blockquote className="mt-8 text-center font-serif text-lg italic leading-relaxed text-muted-foreground">
              &ldquo;{memorial.announcement}&rdquo;
            </blockquote>
          )}

          {/* Life story */}
          {lifeStory && (
            <div className="mt-10">
              <h2 className="font-heading text-xl">Life story</h2>
              <TruncatedWriteup text={lifeStory} label="Life story" memorialName={fullName} photoUrl={photoUrl} photoAlt={memorial.primary_photo_alt} />
            </div>
          )}

          {/* Funeral programme */}
          {events.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-xl">Funeral programme</h2>
              <div className="mt-4 space-y-4">
                {events.map((event: any) => (
                  <div key={event.id} className="rounded-xl border border-border bg-card p-4">
                    <span className="text-xs font-semibold uppercase tracking-wide text-heritage-gold">
                      {eventTypeLabels[event.event_type] ?? event.event_type}
                    </span>
                    <p className="mt-1 font-medium text-foreground">{event.title}</p>
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <CalendarDays className="size-4 shrink-0" />
                      {formatDayMonthYear(event.event_date)}
                      {event.start_time ? ` · ${event.start_time}` : ""}
                    </p>
                    {event.venue && (
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="size-4 shrink-0" />
                        {[event.venue, event.town_city, event.country].filter(Boolean).join(", ")}
                      </p>
                    )}
                    {event.directions_url && (
                      <a
                        href={event.directions_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-heritage-gold hover:underline"
                      >
                        <Navigation className="size-4" />
                        Get directions
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          <MediaGallerySection
            memorialId={memorial.id}
            slug={slug}
            allowContributorPhotos={memorial.allow_contributor_photos}
            requireApproval={memorial.require_approval}
            initialGallery={gallery}
          />

          {/* Tributes */}
          <TributesSection
            memorialId={memorial.id}
            slug={slug}
            allowTributes={memorial.allow_tributes}
            allowCondolences={memorial.allow_condolences}
            requireApproval={memorial.require_approval}
            showContributorNames={memorial.show_contributor_names}
            initialTributes={tributes}
          />
        </div>

        {/* SIDEBAR — Wreaths & roses */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <MemorialGiftsSection memorialId={memorial.id} slug={slug} initialGifts={gifts} />
        </div>
      </div>
    </Container>
  );
}
