import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import {
  Megaphone,
  MessageCircleHeart,
  Images,
  Share2,
  Lock,
  Search,
  Flower2,
  Clock,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { EmptyState } from "@/components/layout/EmptyState";
import { MemorialCard } from "@/components/memorial/MemorialCard";
import { FeatureCard } from "@/components/marketing/FeatureCard";
import { StepCard } from "@/components/marketing/StepCard";
import { HeroBackground } from "@/components/marketing/HeroBackground";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { HighlightedMemorial } from "@/services/publicMemorials";
import type { HeroImage } from "@/services/heroImages";

// Hidden per request — kept in place (data still loads) rather than removed,
// so it can be turned back on by flipping this flag.
const SHOW_STATS_SECTION = false

const features = [
  {
    icon: Megaphone,
    title: "Funeral announcements",
    description:
      "Share the news with clarity and dignity, along with wake, burial, and service details in one place.",
  },
  {
    icon: MessageCircleHeart,
    title: "Tributes & condolences",
    description:
      "Let family, friends, and colleagues leave a tribute or condolence message for the family to read.",
  },
  {
    icon: Images,
    title: "Photograph galleries",
    description:
      "Bring together photographs from a lifetime, with captions and a respectful, uncluttered layout.",
  },
  {
    icon: Flower2,
    title: "Wreaths & roses",
    description:
      "Well-wishers can lay a virtual wreath or rose in the deceased's honour, shown on the memorial with their name.",
  },
  {
    icon: Share2,
    title: "Simple sharing",
    description:
      "Every memorial gets a clean, memorable link that's easy to share by message, email, or social media.",
  },
  {
    icon: Lock,
    title: "Privacy by design",
    description:
      "Make a memorial public, unlisted, or private — and decide who can contribute photographs or messages.",
  },
]

const steps = [
  {
    title: "Create the memorial",
    description:
      "Add the details of your loved one's life and the funeral arrangements, step by step.",
  },
  {
    title: "Share the page",
    description:
      "Share the memorial's link with family, friends, and community via any messaging platform or social media.",
  },
  {
    title: "Gather tributes",
    description:
      "Visitors leave messages, lay virtual wreaths, and share photographs — building a lasting collection of memories.",
  },
]

/* ─── server-side data helpers ─────────────────────────────────── */

function getSupabase() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false } }
  )
}

async function fetchHeroImages(): Promise<HeroImage[]> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from("hero_images")
    .select("*")
    .order("sort_order", { ascending: true })
  if (error) {
    console.error("fetchHeroImages:", error.message);
    return []
  }
  return (data ?? []).map((row) => ({
    id: row.id,
    url: supabase.storage.from("hero-images").getPublicUrl(row.storage_path).data.publicUrl,
    sortOrder: row.sort_order,
  }))
}

async function fetchHighlightedMemorials(limit = 3): Promise<HighlightedMemorial[]> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from("memorials")
    .select("*")
    .eq("status", "published")
    .eq("privacy", "public")
    .order("is_featured", { ascending: false })
    .order("published_at", { ascending: false })
    .limit(limit)
  if (error) {
    console.error("fetchHighlightedMemorials:", error.message);
    return []
  }

  // Attach photo URLs (public bucket, no signed URLs needed)
  const memorials = (data ?? []).map((m) => ({
    ...m,
    photoUrl: m.primary_photo_path
      ? supabase.storage.from("memorial-media").getPublicUrl(m.primary_photo_path).data.publicUrl
      : null,
  }))

  // Attach gift counts
  const ids = memorials.map((m) => m.id)
  const counts = new Map<string, number>()
  if (ids.length > 0) {
    const { data: purchases } = await supabase
      .from("gift_purchases")
      .select("memorial_id")
      .in("memorial_id", ids)
      .eq("status", "paid")
    for (const row of purchases ?? []) {
      counts.set(row.memorial_id, (counts.get(row.memorial_id) ?? 0) + 1)
    }
  }

  return memorials.map((m) => ({ ...m, giftCount: counts.get(m.id) ?? 0 }))
}

/* ─── page ─────────────────────────────────────────────────────── */

export default async function HomePage() {
  const [heroImages, highlighted] = await Promise.all([
    fetchHeroImages(),
    fetchHighlightedMemorials(3),
  ])

  return (
    <div>
      <section className="relative -mt-24 overflow-hidden border-b border-border/60 bg-obsidian pt-24">
        <HeroBackground images={heroImages} />
        <Container className="relative z-10 flex flex-col items-center gap-6 py-20 text-center sm:py-28">
          <p className="text-sm font-medium tracking-wide text-warm-gold uppercase">
            {siteConfig.tagline}
          </p>
          <h1 className="max-w-2xl font-heading text-4xl text-white sm:text-5xl">
            A dignified place to announce a funeral and gather the memories that matter
          </h1>
          <p className="max-w-xl text-white/80">
            {siteConfig.description}
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard/memorials/new"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-warm-gold text-obsidian hover:bg-warm-gold/90"
              )}
            >
              Create a Memorial
            </Link>
            <Link
              href="/memorials"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/40 bg-white/10 text-white hover:bg-white/20"
              )}
            >
              Find a Memorial
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="font-heading text-2xl text-foreground sm:text-3xl">How it works</h2>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {steps.map((step, index) => (
              <StepCard key={step.title} step={index + 1} {...step} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border/60 bg-warm-stone/40 py-20">
        <Container>
          <h2 className="font-heading text-2xl text-foreground sm:text-3xl">
            Everything a family needs, nothing they don't
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="flex items-end justify-between">
            <h2 className="font-heading text-2xl text-foreground sm:text-3xl">Recently published</h2>
            <Link href="/memorials" className="text-sm font-medium text-heritage-gold hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-10">
            {highlighted.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {highlighted.map((memorial) => (
                  <MemorialCard
                    key={memorial.id}
                    memorial={{
                      id: memorial.id,
                      slug: memorial.slug,
                      displayName: memorial.display_name,
                      photoUrl: memorial.photoUrl,
                      photoAlt: memorial.primary_photo_alt,
                      dateOfBirth: memorial.date_of_birth,
                      dateOfDeath: memorial.date_of_death,
                      hometown: memorial.hometown,
                      shortAnnouncement: memorial.announcement,
                      giftCount: memorial.giftCount,
                    }}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Search}
                title="No memorials published yet"
                description="Published memorials will appear here once families start sharing them."
              />
            )}
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60 bg-obsidian py-20 text-soft-ivory">
        <Container className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl">Privacy stays with the family</h2>
            <p className="mt-3 max-w-md text-soft-ivory/70">
              Every memorial can be public, unlisted, or private. Owners choose whether tributes and
              photographs need approval before they're visible, and can remove anything at any time.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-2xl">Built for moderation</h2>
            <p className="mt-3 max-w-md text-soft-ivory/70">
              Every submission can be reviewed before it appears. Visitors can report anything that
              shouldn't be there, and it goes straight to the memorial's owner.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 text-center">
        <Container className="flex flex-col items-center gap-6">
          <h2 className="max-w-lg font-heading text-3xl text-foreground">
            Ready to create a lasting tribute?
          </h2>
          <Link href="/dashboard/memorials/new" className={cn(buttonVariants({ size: "lg" }))}>
            Create a Memorial
          </Link>
        </Container>
      </section>
    </div>
  );
}
