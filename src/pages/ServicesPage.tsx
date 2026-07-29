import { Link } from "react-router-dom"
import { Code2, Layers, CreditCard, Settings2 } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { FeatureCard } from "@/components/marketing/FeatureCard"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: Code2,
    title: "Software Development",
    description:
      "We design and develop web and mobile software applications tailored to specific user and business needs.",
  },
  {
    icon: Layers,
    title: "Digital Platform Development",
    description:
      "We build and operate technology platforms that connect users with digital services and facilitate structured interactions online.",
  },
  {
    icon: CreditCard,
    title: "Payment-Enabled Digital Solutions",
    description:
      "We integrate secure third-party payment services, such as Paystack, into our platforms to enable users to make payments, contributions, and other permitted transactions related to specific digital services.",
  },
  {
    icon: Settings2,
    title: "Technology Platform Operations",
    description:
      "We manage and operate digital platforms, including user accounts, content management, digital interactions, payment integrations, and related technology infrastructure.",
  },
]

export default function ServicesPage() {
  return (
    <Container className="max-w-4xl py-16 sm:py-24">
      <p className="text-sm font-medium tracking-wide text-heritage-gold uppercase">
        Our Services
      </p>
      <h1 className="mt-3 font-heading text-3xl text-foreground sm:text-4xl">
        Our Technology Services
      </h1>
      <p className="mt-6 max-w-2xl text-foreground/90">
        {siteConfig.name} is a product of {siteConfig.parentCompany},
        a technology company that designs, builds, and operates digital
        platforms. Alongside {siteConfig.name}, {siteConfig.parentCompany}{" "}
        provides the following services.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <FeatureCard key={service.title} {...service} />
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/dashboard/memorials/new"
          className={cn(buttonVariants({ size: "lg" }))}
        >
          Create a Memorial
        </Link>
        <Link
          to="/about"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          About {siteConfig.name}
        </Link>
      </div>
    </Container>
  )
}
