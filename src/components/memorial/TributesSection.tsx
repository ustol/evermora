"use client";

import { useState } from "react";
import { HeartHandshake } from "lucide-react";
import { TributeFormDialog } from "@/components/memorial/TributeFormDialog";
import { TributeCard } from "@/components/memorial/TributeCard";
import { TributeDetailDialog } from "@/components/memorial/TributeDetailDialog";

interface TributesSectionProps {
  memorialId: string;
  slug: string;
  allowTributes: boolean;
  allowCondolences: boolean;
  requireApproval: boolean;
  showContributorNames: boolean;
  initialTributes?: Array<{
    id: string;
    contributionType: string;
    title: string | null;
    content: string | null;
    photoUrl: string | null;
    authorName: string | null;
    relationship: string | null;
    createdAt: string;
  }>;
}

export function TributesSection({
  memorialId,
  slug,
  allowTributes,
  allowCondolences,
  requireApproval,
  showContributorNames,
  initialTributes = [],
}: TributesSectionProps) {
  const [contributions, setContributions] = useState(initialTributes);
  const [selected, setSelected] = useState<(typeof initialTributes)[number] | null>(null);

  const canContribute = allowTributes || allowCondolences;

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-xl text-foreground">
          Tributes & Condolences
          {contributions.length > 0 && (
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
            requireApproval={requireApproval}
          />
        )}
      </div>

      <div className="mt-6">
        {contributions.length > 0 ? (
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
