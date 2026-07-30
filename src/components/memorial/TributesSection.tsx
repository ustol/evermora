"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { HeartHandshake } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { TributeFormDialog } from "@/components/memorial/TributeFormDialog";
import { TributeCard } from "@/components/memorial/TributeCard";
import { TributeDetailDialog } from "@/components/memorial/TributeDetailDialog";

interface TributesSectionProps {
  memorialId: string;
  slug: string;
  allowTributes: boolean;
  allowCondolences: boolean;
  allowContributorPhotos: boolean;
  requireApproval: boolean;
  showContributorNames: boolean;
}

interface Contribution {
  id: string;
  contributionType: string;
  content: string | null;
  photoUrl: string | null;
  authorName: string | null;
  relationship: string | null;
  createdAt: string;
}

export function TributesSection({
  memorialId,
  slug,
  allowTributes,
  allowCondolences,
  allowContributorPhotos,
  requireApproval,
  showContributorNames,
}: TributesSectionProps) {
  const [contributions, setContributions] = useState<Contribution[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contribution | null>(null);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false } }
    );
    supabase
      .from("contributions")
      .select("*")
      .eq("memorial_id", memorialId)
      .in("status", ["approved", "auto_approved"])
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error("contributions fetch error:", error);
          setContributions([]);
        } else {
          setContributions(
            (data ?? []).map((row: any) => ({
              id: row.id,
              contributionType: row.contribution_type,
              content: row.content,
              photoUrl: row.photo_path
                ? supabase.storage.from("memorial-media").getPublicUrl(row.photo_path).data.publicUrl
                : null,
              authorName: row.author_name,
              relationship: row.author_relationship,
              createdAt: row.created_at,
            }))
          );
        }
        setLoading(false);
      });
  }, [memorialId]);

  const canContribute = allowTributes || allowCondolences;

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-xl text-foreground">
          Tributes & Condolences
          {contributions && contributions.length > 0 && (
            <span className="ml-2 text-base font-normal text-muted-foreground">
              ({contributions.length})
            </span>
          )}
        </h2>
        {canContribute && (
          <TributeFormDialog
            memorialId={memorialId}
            slug={slug}
            allowTributes={allowTributes}
            allowCondolences={allowCondolences}
            allowPhotos={allowContributorPhotos}
            requireApproval={requireApproval}
          />
        )}
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-56 w-full rounded-2xl" />
            ))}
          </div>
        ) : contributions && contributions.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {contributions.map((contribution) => (
              <TributeCard
                key={contribution.id}
                contribution={contribution}
                showContributorNames={showContributorNames}
                onOpen={() => setSelected(contribution)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-10 text-center">
            <HeartHandshake className="size-6 text-muted-foreground" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">
              No tributes yet — be the first to share a memory.
            </p>
          </div>
        )}
      </div>

      <TributeDetailDialog
        contribution={selected}
        showContributorNames={showContributorNames}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
