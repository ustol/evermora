import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

export default function AboutPage() {
  return (
    <Container className="py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-heading text-4xl text-foreground">About {siteConfig.name}</h1>
        <div className="mt-6 space-y-4 text-muted-foreground">
          <p>
            {siteConfig.name} is a platform for{" "}
            announcing funerals, creating lasting memorials, and gathering{" "}
            tributes and condolences from family, friends, and community.
          </p>
          <p>
            We believe every life deserves to be honoured with dignity and
            care. Whether you are announcing a funeral, sharing a memorial, or
            leaving a tribute, {siteConfig.name} provides a respectful space
            for connection.
          </p>
          <p>
            {siteConfig.name} is a product of {siteConfig.parentCompany} based
            in {siteConfig.region}.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard/memorials/new"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Create a Memorial
          </Link>
          <Link
            href="/memorials"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Find a Memorial
          </Link>
        </div>
      </div>
    </Container>
  )
}
