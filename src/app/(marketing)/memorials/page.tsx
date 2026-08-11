import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/layout/EmptyState";
import { MemorialCard } from "@/components/memorial/MemorialCard";
import { FieldsForm } from "./FieldsForm";
import { Search } from "lucide-react";

export const dynamic = "force-dynamic"
export const revalidate = 0

const PAGE_SIZE = 12;

interface PageProps {
  searchParams: Promise<{ search?: string; hometown?: string; yearOfDeath?: string; page?: string }>;
}

async function fetchMemorials(params: Awaited<PageProps["searchParams"]>) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false } }
  );

  const page = Math.max(1, Number(params.page) || 1);

  let query = supabase
    .from("memorials")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .eq("privacy", "public");

  if (params.search) {
    query = query.or(
      `first_name.ilike.%${params.search}%,surname.ilike.%${params.search}%,display_name.ilike.%${params.search}%`
    );
  }
  if (params.hometown) {
    query = query.ilike("hometown", `%${params.hometown}%`);
  }
  if (params.yearOfDeath) {
    const start = `${params.yearOfDeath}-01-01`;
    const end = `${params.yearOfDeath}-12-31`;
    query = query.gte("date_of_death", start).lte("date_of_death", end);
  }
  query = query
    .order("is_featured", { ascending: false })
    .order("published_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const { data, count, error } = await query;

  if (error) {
    console.error("fetchMemorials:", error.message);
    return { memorials: [], total: 0 };
  }

  // Get signed URLs via proxy for memorial photos (private bucket)
  const memorials = (data ?? []).map((m: any) => ({
    id: m.id,
    slug: m.slug,
    displayName: m.display_name,
    photoUrl: m.primary_photo_path
      ? `/api/media?path=${encodeURIComponent(m.primary_photo_path)}`
      : null,
    photoAlt: m.primary_photo_alt,
    dateOfBirth: m.date_of_birth,
    dateOfDeath: m.date_of_death,
    hometown: m.hometown,
    shortAnnouncement: m.announcement,
    giftCount: 0,
  }));

  return { memorials, total: count ?? 0 };
}

export default async function MemorialsDirectoryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { memorials, total } = await fetchMemorials(params);
  const page = Math.max(1, Number(params.page) || 1);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader
        title="Find a memorial"
        description="Search for a published memorial by name, hometown, or year of passing."
      />

      <FieldsForm params={params} />

      {memorials.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {memorials.map((memorial) => (
              <MemorialCard key={memorial.id} memorial={memorial} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              {page > 1 && (
                <a
                  href={`/memorials?${new URLSearchParams({ ...params, page: String(page - 1) })}`}
                  className="inline-flex items-center justify-center rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
                >
                  Previous
                </a>
              )}
              <span className="px-2 text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <a
                  href={`/memorials?${new URLSearchParams({ ...params, page: String(page + 1) })}`}
                  className="inline-flex items-center justify-center rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
                >
                  Next
                </a>
              )}
            </div>
          )}
        </>
      ) : (
        <EmptyState
          icon={Search}
          title="No memorials found"
          description="Try adjusting your search or filters."
        />
      )}
    </Container>
  );
}
