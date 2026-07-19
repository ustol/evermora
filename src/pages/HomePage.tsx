import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {
  Megaphone,
  MessageCircleHeart,
  Images,
  Share2,
  ShieldCheck,
  Lock,
  Search,
  Flower2,
  Clock,
  BookOpen,
} from "lucide-react"
import { Container } from "@/components/layout/Container"
import { EmptyState } from "@/components/layout/EmptyState"
import { Skeleton } from "@/components/ui/skeleton"
import { MemorialCard } from "@/components/memorial/MemorialCard"
import { MemorialCardSkeleton } from "@/components/memorial/MemorialCardSkeleton"
import { FeatureCard } from "@/components/marketing/FeatureCard"
import { StepCard } from "@/components/marketing/StepCard"
import { HeroBackground } from "@/components/marketing/HeroBackground"
import { buttonVariants } from "@/components/ui/button"
import { useHighlightedMemorials } from "@/hooks/useMemorials"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { listHeroImages } from "@/services/heroImages"
import { getPublicStats } from "@/services/publicStats"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

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
    icon: ShieldCheck,
    title: "Full moderation control",
    description:
      "Choose whether submissions need your approval before they appear, and remove anything at any time.",
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
    title: "Share the link",
    description:
      "Publish when you're ready and share the memorial's link with family and friends near and far.",
  },
  {
    title: "Gather tributes",
    description:
      "Review and approve tributes, condolences, and photographs as they come in, at your own pace.",
  },
]

export default function HomePage() {
  const { data: highlighted, isLoading } = useHighlightedMemorials()
  const supabase = useSupabaseClient()
  const { data: heroImages } = useQuery({
    queryKey: ["hero-images", "public"],
    queryFn: () => listHeroImages(supabase),
    staleTime: 5 * 60_000,
    retry: false,
  })
  const hasHeroImages = !!heroImages && heroImages.length > 0

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["public-stats"],
    queryFn: () => getPublicStats(supabase),
    staleTime: 5 * 60_000,
    retry: false,
  })

  const statTiles = [
    {
      icon: MessageCircleHeart,
      value: stats?.tributeCount,
      label: "Tributes & condolences shared",
    },
    {
      icon: Flower2,
      value: stats?.giftCount,
      label: "Wreaths & roses laid",
    },
    {
      icon: BookOpen,
      value: stats?.blogPostCount,
      label: "Blog posts published",
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Always available",
    },
  ]

  return (
    <div>
      {/* Hero — pulled up under the fixed floating header (which main's
          pt-24 otherwise clears) so the background image reaches the true
          top edge; pt-24 here restores the same content position. */}
      <section className="relative -mt-24 overflow-hidden border-b border-border/60 bg-soft-ivory pt-24">
        {hasHeroImages && <HeroBackground images={heroImages} />}
        <Container className="relative z-10 flex flex-col items-center gap-6 py-20 text-center sm:py-28">
          <p
            className={cn(
              "text-sm font-medium tracking-wide uppercase",
              hasHeroImages ? "text-warm-gold" : "text-heritage-gold"
            )}
          >
            {siteConfig.tagline}
          </p>
          <h1
            className={cn(
              "max-w-2xl font-heading text-4xl sm:text-5xl",
              hasHeroImages ? "text-white" : "text-foreground"
            )}
          >
            A dignified place to announce a funeral and gather the memories
            that matter
          </h1>
          <p className={cn("max-w-xl", hasHeroImages ? "text-white/80" : "text-muted-foreground")}>
            {siteConfig.description}
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/dashboard/memorials/new"
              className={cn(
                buttonVariants({ size: "lg" }),
                hasHeroImages && "bg-warm-gold text-obsidian hover:bg-warm-gold/90"
              )}
            >
              Create a Memorial
            </Link>
            <Link
              to="/memorials"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                hasHeroImages && "border-white/40 bg-white/10 text-white hover:bg-white/20"
              )}
            >
              Find a Memorial
            </Link>
          </div>
        </Container>
      </section>

      {/* By the numbers */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {statTiles.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center"
              >
                <div className="flex size-12 items-center justify-center rounded-full border border-heritage-gold text-heritage-gold">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                {statsLoading && typeof value !== "string" ? (
                  <Skeleton className="h-9 w-16" />
                ) : (
                  <p className="font-heading text-3xl text-heritage-gold sm:text-4xl">
                    {value ?? 0}
                  </p>
                )}
                <p className="max-w-[12rem] text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-20">
        <Container>
          <h2 className="font-heading text-2xl text-foreground sm:text-3xl">
            How it works
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {steps.map((step, index) => (
              <StepCard key={step.title} step={index + 1} {...step} />
            ))}
          </div>
        </Container>
      </section>

      {/* Features */}
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

      {/* Featured memorials */}
      <section className="py-20">
        <Container>
          <div className="flex items-end justify-between">
            <h2 className="font-heading text-2xl text-foreground sm:text-3xl">
              Recently published
            </h2>
            <Link
              to="/memorials"
              className="text-sm font-medium text-heritage-gold hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="mt-10">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <MemorialCardSkeleton key={i} />
                ))}
              </div>
            ) : highlighted && highlighted.length > 0 ? (
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

      {/* Trust & privacy */}
      <section className="border-t border-border/60 bg-obsidian py-20 text-soft-ivory">
        <Container className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl">Privacy stays with the family</h2>
            <p className="mt-3 max-w-md text-soft-ivory/70">
              Every memorial can be public, unlisted, or private. Owners
              choose whether tributes and photographs need approval before
              they're visible, and can remove anything at any time.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-2xl">Built for moderation</h2>
            <p className="mt-3 max-w-md text-soft-ivory/70">
              Every submission can be reviewed before it appears. Visitors can
              report anything that shouldn't be there, and it goes straight
              to the memorial's owner.
            </p>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-center">
        <Container className="flex flex-col items-center gap-6">
          <h2 className="max-w-lg font-heading text-3xl text-foreground">
            Ready to create a lasting tribute?
          </h2>
          <Link
            to="/dashboard/memorials/new"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Create a Memorial
          </Link>
        </Container>
      </section>
    </div>
  )
}
