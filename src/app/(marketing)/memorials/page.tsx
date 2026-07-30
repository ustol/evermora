"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/layout/EmptyState";
import { MemorialCard } from "@/components/memorial/MemorialCard";
import { MemorialCardSkeleton } from "@/components/memorial/MemorialCardSkeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import type { MemorialListFilters } from "@/services/memorials";

const PAGE_SIZE = 12;

interface MemorialItem {
  id: string;
  slug: string;
  displayName: string;
  photoUrl: string | null;
  photoAlt: string | null;
  dateOfBirth: string | null;
  dateOfDeath: string;
  hometown: string | null;
  shortAnnouncement: string | null;
  giftCount: number;
}

async function fetchPublicMemorials(filters: MemorialListFilters) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false } }
  );

  let query = supabase
    .from("memorials")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .eq("privacy", "public");

  if (filters.search) {
    query = query.or(
      `first_name.ilike.%${filters.search}%,surname.ilike.%${filters.search}%,display_name.ilike.%${filters.search}%`
    );
  }
  if (filters.hometown) {
    query = query.ilike("hometown", `%${filters.hometown}%`);
  }
  if (filters.yearOfDeath) {
    const start = `${filters.yearOfDeath}-01-01`;
    const end = `${filters.yearOfDeath}-12-31`;
    query = query.gte("date_of_death", start).lte("date_of_death", end);
  }
  if (filters.page && filters.pageSize) {
    const from = (filters.page - 1) * filters.pageSize;
    query = query.range(from, from + filters.pageSize - 1);
  }
  query = query.order("is_featured", { ascending: false }).order("published_at", { ascending: false });

  const { data, count, error } = await query;
  if (error) throw error;

  const mapped: MemorialItem[] = (data ?? []).map((m: any) => ({
    id: m.id,
    slug: m.slug,
    displayName: m.display_name,
    photoUrl: m.primary_photo_path
      ? supabase.storage.from("memorial-media").getPublicUrl(m.primary_photo_path).data.publicUrl
      : null,
    photoAlt: m.primary_photo_alt,
    dateOfBirth: m.date_of_birth,
    dateOfDeath: m.date_of_death,
    hometown: m.hometown,
    shortAnnouncement: m.announcement,
    giftCount: 0,
  }));

  return { memorials: mapped, total: count ?? 0 };
}

export default function MemorialsDirectoryPage() {
  const [memorials, setMemorials] = useState<MemorialItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState({ search: "", hometown: "", yearOfDeath: "" });
  const [filters, setFilters] = useState<MemorialListFilters>({ page: 1, pageSize: PAGE_SIZE });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // Initial fetch on mount
  useEffect(() => {
    fetchPublicMemorials(filters).then((result) => {
      setMemorials(result.memorials);
      setTotal(result.total);
      setLoading(false);
    }).catch((e) => {
      console.error("fetch error:", e);
      setLoading(false);
    });
  }, []);

  async function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newFilters: MemorialListFilters = {
      page: 1,
      pageSize: PAGE_SIZE,
      search: formState.search.trim() || undefined,
      hometown: formState.hometown.trim() || undefined,
      yearOfDeath: formState.yearOfDeath ? Number(formState.yearOfDeath) : undefined,
    };
    setFilters(newFilters);
    setLoading(true);
    const result = await fetchPublicMemorials(newFilters);
    setMemorials(result.memorials);
    setTotal(result.total);
    setLoading(false);
  }

  async function goToPage(page: number) {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);
    const result = await fetchPublicMemorials(newFilters);
    setMemorials(result.memorials);
    setTotal(result.total);
    setLoading(false);
  }

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader
        title="Find a memorial"
        description="Search for a published memorial by name, hometown, or year of passing."
      />

      <form
        onSubmit={handleSearchSubmit}
        className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-4"
      >
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input
            placeholder="Search by name…"
            value={formState.search}
            onChange={(e) => setFormState((s) => ({ ...s, search: e.target.value }))}
          />
        </Field>
        <Field>
          <FieldLabel>Hometown</FieldLabel>
          <Input
            placeholder="e.g. Accra"
            value={formState.hometown}
            onChange={(e) => setFormState((s) => ({ ...s, hometown: e.target.value }))}
          />
        </Field>
        <Field>
          <FieldLabel>Year of death</FieldLabel>
          <Input
            type="number"
            placeholder="e.g. 2024"
            value={formState.yearOfDeath}
            onChange={(e) => setFormState((s) => ({ ...s, yearOfDeath: e.target.value }))}
          />
        </Field>
        <div className="flex items-end">
          <Button type="submit" className="w-full">
            <Search className="size-4" />
            Search
          </Button>
        </div>
      </form>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <MemorialCardSkeleton key={i} />
          ))}
        </div>
      ) : memorials.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {memorials.map((memorial) => (
              <MemorialCard key={memorial.id} memorial={memorial} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={(filters.page ?? 1) === 1}
                onClick={() => goToPage((filters.page ?? 1) - 1)}
              >
                <ChevronLeft className="size-4" />
                Previous
              </Button>
              <span className="px-2 text-sm text-muted-foreground">
                Page {filters.page ?? 1} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={(filters.page ?? 1) === totalPages}
                onClick={() => goToPage((filters.page ?? 1) + 1)}
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
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
