import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/layout/EmptyState";
import { MemorialCard } from "@/components/memorial/MemorialCard";
import { Search } from "lucide-react";

const PAGE_SIZE = 12;

async function fetchMemorials() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, count, error } = await supabase
    .from("memorials")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .eq("privacy", "public")
    .order("is_featured", { ascending: false })
    .order("published_at", { ascending: false })
    .range(0, PAGE_SIZE - 1);

  if (error) {
    console.error("fetchMemorials:", error.message);
    return { memorials: [], total: 0 };
  }

  // Get signed URLs for memorial photos (private bucket)
  const paths = (data ?? []).map((m: any) => m.primary_photo_path).filter(Boolean);
  const signedUrlByPath = new Map<string, string>();
  if (paths.length > 0) {
    try {
      const admin = createClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      const { data: signed } = await admin.storage
        .from("memorial-media")
        .createSignedUrls(paths, 3600);
      for (const entry of signed ?? []) {
        if (entry.path && entry.signedUrl) {
          signedUrlByPath.set(entry.path, entry.signedUrl);
        }
      }
    } catch (e) {
      console.error("signed URL fallback:", e);
    }
  }

  const memorials = (data ?? []).map((m: any) => ({
    id: m.id,
    slug: m.slug,
    displayName: m.display_name,
    photoUrl: m.primary_photo_path
      ? (signedUrlByPath.get(m.primary_photo_path) ??
         supabase.storage.from("memorial-media").getPublicUrl(m.primary_photo_path).data.publicUrl)
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

export default async function MemorialsDirectoryPage() {
  const { memorials, total } = await fetchMemorials();
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader
        title="Find a memorial"
        description="Search for a published memorial by name, hometown, or year of passing."
      />

      {memorials.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {memorials.map((memorial) => (
              <MemorialCard key={memorial.id} memorial={memorial} />
            ))}
          </div>
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
