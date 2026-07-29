import { Link } from "react-router-dom"
import { Container } from "@/components/layout/Container"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export default function AboutPage() {
  return (
    <Container className="max-w-3xl py-16 sm:py-24">
      <p className="text-sm font-medium tracking-wide text-heritage-gold uppercase">
        About {siteConfig.name}
      </p>
      <h1 className="mt-3 font-heading text-3xl text-foreground sm:text-4xl">
        A quieter way to share the news, and a lasting place to remember
      </h1>

      <div className="mt-10 flex flex-col gap-6 text-foreground/90">
        <p>
          {siteConfig.name} exists to make one difficult task a little
          simpler: letting people know that someone has passed away, and
          gathering everyone who wants to honour them in one dignified place.
        </p>
        <p>
          A memorial page brings together the funeral announcement, the
          arrangements for the wake, burial, or service, and a space for
          family, friends, and colleagues to leave tributes, condolences, and
          photographs — all under the family's control.
        </p>
        <p>
          Every memorial is owned by the person who creates it. Owners decide
          who can see the page, whether contributions need approval before
          they're shown, and whether photographs can be uploaded by
          visitors. Nothing is public unless the owner chooses to publish it.
        </p>
        <p>
          {siteConfig.name} was built with families in Ghana and the
          Ghanaian diaspora in mind, so that distance is never a reason to
          miss the chance to pay respects.
        </p>
      </div>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/dashboard/memorials/new"
          className={cn(buttonVariants({ size: "lg" }))}
        >
          Create a Memorial
        </Link>
        <Link
          to="/memorials"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          Find a Memorial
        </Link>
      </div>
    </Container>
  )
}
