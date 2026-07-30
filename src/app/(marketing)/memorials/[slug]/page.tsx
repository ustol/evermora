import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import { notFound } from "next/navigation";
import { MapPin, UserRound, CalendarDays, Clock, Navigation } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ShareButton } from "@/components/shared/ShareButton";
import { ReportMemorialDialog } from "@/components/memorial/ReportMemorialDialog";
import { MemorialGiftsSection } from "@/components/memorial/MemorialGiftsSection";
import { TributesSection } from "@/components/memorial/TributesSection";
import { MediaGallerySection } from "@/components/memorial/MediaGallerySection";
import { TruncatedWriteup } from "@/components/memorial/TruncatedWriteup";
import { calculateAge, formatDayMonthYear, formatLifespanYears } from "@/lib/date";

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

function getAdminSupabase() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

async function createSignedUrl(path: string | null): Promise<string | null> {
  if (!path) return null;
  try {
    const admin = getAdminSupabase();
    const { data } = await admin.storage
      .from("memorial-media")
      .createSignedUrls([path], 3600);
    return data?.[0]?.signedUrl ?? null;
  } catch {
    return getSupabase().storage.from("memorial-media").getPublicUrl(path).data.publicUrl;
  }
}

async function createSignedUrls(paths: string[]): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  if (paths.length === 0) return map;
  try {
    const admin = getAdminSupabase();
    const { data } = await admin.storage
      .from("memorial-media")
      .createSignedUrls(paths, 3600);
    for (const entry of data ?? []) {
      if (entry.path && entry.signedUrl) map.set(entry.path, entry.signedUrl);
    }
  } catch (e) {
    console.error("signed URLs failed", e);
  }
  return map;
}

async function fetchMemorial(slug: string) {
  const supabase = getSupabase();
  const { data: memorial, error } = await supabase
    .from("memorials")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !memorial || memorial.status !== "published") return null;

  const [photoUrl, events] = await Promise.all([
    createSignedUrl(memorial.primary_photo_path),
    supabase
      .from("funeral_events")
      .select("*")
      .eq("memorial_id", memorial.id)
      .order("start_time", { ascending: true })
      .then(({ data }) => data ?? []),
  ]);

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
  const giftImagePaths = (catalogGifts ?? []).map((g: any) => g.image_path).filter(Boolean);
  const giftImageUrls = await createSignedUrls(giftImagePaths);

  const gifts = (giftPurchases ?? []).map((p: any) => {
    const catalog = giftMap.get(p.gift_catalog_id);
    return {
      id: p.id,
      purchaserDisplayName: p.purchaser_display_name ?? "Anonymous",
      createdAt: p.created_at,
      gift: {
        name: catalog?.name ?? "Gift",
        imageUrl: catalog?.image_path ? giftImageUrls.get(catalog.image_path) ?? "" : "",
      },
    };
  });

  // Gallery photos
  const { data: mediaRows } = await supabase
    .from("memorial_media")
    .select("*")
    .eq("memorial_id", memorial.id)
    .in("status", ["approved"])
    .order("sort_order", { ascending: true });

  const mediaPaths = (mediaRows ?? []).map((m: any) => m.storage_path).filter(Boolean);
  const mediaUrls = await createSignedUrls(mediaPaths);

  const gallery = (mediaRows ?? []).map((m: any) => ({
    id: m.id,
    url: m.storage_path ? (mediaUrls.get(m.storage_path) ?? "") : "",
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

  const contributionsWithPhotos = contributions?.map((c: any) => ({
    ...c,
    photoUrl: null, // contributions don't have photo paths in this schema
  })) ?? [];

  const tributes = contributionsWithPhotos.map((c: any) => ({
    id: c.id,
    contributionType: c.contribution_type,
    content: c.content,
    photoUrl: null,
    authorName: c.author_name,
    relationship: c.author_relationship,
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

  return (
    <Container className="py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        {/* Portrait + name */}
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="size-36 overflow-hidden rounded-full border-4 border-border bg-muted sm:size-44">
            {photoUrl ? (
              <img src={photoUrl} alt={memorial.primary_photo_alt ?? fullName} className="size-full object-cover" />
            ) : (
              <div className="flex size-full items-center justify-center bg-heritage-gold/10">
                <UserRound className="size-16 text-heritage-gold/30" />
              </div>
            )}
          </div>
          <div>
            <h1 className="font-heading text-3xl text-foreground sm:text-4xl">{fullName}</h1>
            <p className="mt-1 text-muted-foreground">
              {memorial.date_of_birth && memorial.date_of_death
                ? `${formatDayMonthYear(memorial.date_of_birth)} — ${formatDayMonthYear(memorial.date_of_death)}`
                : lifespan}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ShareButton path={`/memorials/${slug}`} title={fullName} />
            <ReportMemorialDialog memorialId={memorial.id} slug={slug} />
          </div>
        </div>

        {/* Details */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {memorial.date_of_birth && (
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
              <CalendarDays className="size-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Born</p>
                <p className="text-sm font-medium">{formatDayMonthYear(memorial.date_of_birth)}</p>
              </div>
            </div>
          )}
          {memorial.date_of_death && (
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
              <Clock className="size-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Passed</p>
                <p className="text-sm font-medium">{formatDayMonthYear(memorial.date_of_death)}</p>
              </div>
            </div>
          )}
          {memorial.place_of_birth && (
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
              <MapPin className="size-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Place of birth</p>
                <p className="text-sm font-medium">{memorial.place_of_birth}</p>
              </div>
            </div>
          )}
          {memorial.hometown && (
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
              <Navigation className="size-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Hometown</p>
                <p className="text-sm font-medium">{memorial.hometown}</p>
              </div>
            </div>
          )}
          {memorial.occupation && (
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
              <UserRound className="size-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Occupation</p>
                <p className="text-sm font-medium">{memorial.occupation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Events */}
        {events.length > 0 && (
          <div className="mt-10">
            <h2 className="font-heading text-xl">Funeral events</h2>
            <div className="mt-4 space-y-4">
              {events.map((event: any) => (
                <div key={event.id} className="rounded-xl border border-border bg-card p-4">
                  <span className="text-xs font-semibold tracking-wide text-heritage-gold uppercase">
                    {eventTypeLabels[event.event_type] ?? event.event_type}
                  </span>
                  {event.venue && <p className="mt-1 text-sm">{event.venue}{event.town_city ? `, ${event.town_city}` : ""}</p>}
                  {event.start_time && (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {formatDayMonthYear(event.start_time)}{" "}
                      {new Date(event.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Announcement */}
        {memorial.announcement && (
          <div className="mt-10">
            <h2 className="font-heading text-xl">Announcement</h2>
            <div className="mt-2 whitespace-pre-line text-pretty text-muted-foreground">
              {memorial.announcement}
            </div>
          </div>
        )}

        {/* Biography / Obituary */}
        {memorial.biography && (
          <div className="mt-10">
            <h2 className="font-heading text-xl">Biography</h2>
            <TruncatedWriteup text={memorial.biography} label="Biography" memorialName={fullName} photoUrl={photoUrl} photoAlt={memorial.primary_photo_alt} />
          </div>
        )}

        {memorial.obituary && (
          <div className="mt-10">
            <h2 className="font-heading text-xl">Obituary</h2>
            <TruncatedWriteup text={memorial.obituary} label="Obituary" memorialName={fullName} photoUrl={photoUrl} photoAlt={memorial.primary_photo_alt} />
          </div>
        )}

        {/* Gifts — pass server-fetched data */}
        <MemorialGiftsSection memorialId={memorial.id} slug={slug} initialGifts={gifts} />

        {/* Gallery — pass server-fetched data */}
        <MediaGallerySection
          memorialId={memorial.id}
          slug={slug}
          allowContributorPhotos={memorial.allow_contributor_photos}
          requireApproval={memorial.require_approval}
          initialGallery={gallery}
        />

        {/* Tributes — pass server-fetched data */}
        <TributesSection
          memorialId={memorial.id}
          slug={slug}
          allowTributes={memorial.allow_tributes}
          allowCondolences={memorial.allow_condolences}
          allowContributorPhotos={memorial.allow_contributor_photos}
          requireApproval={memorial.require_approval}
          showContributorNames={memorial.show_contributor_names}
          initialTributes={tributes}
        />
      </div>
    </Container>
  );
}
