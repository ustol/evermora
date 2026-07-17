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
} from "lucide-react"
import { Container } from "@/components/layout/Container"
import { EmptyState } from "@/components/layout/EmptyState"
import { MemorialCard } from "@/components/memorial/MemorialCard"
import { MemorialCardSkeleton } from "@/components/memorial/MemorialCardSkeleton"
import { FeatureCard } from "@/components/marketing/FeatureCard"
import { StepCard } from "@/components/marketing/StepCard"
import { HeroBackground } from "@/components/marketing/HeroBackground"
import { buttonVariants } from "@/components/ui/button"
import { useHighlightedMemorials } from "@/hooks/useMemorials"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { listHeroImages } from "@/services/heroImages"
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

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 bg-soft-ivory">
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
