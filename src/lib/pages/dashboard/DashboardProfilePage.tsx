import { UserProfile } from "@clerk/nextjs"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"

export default function DashboardProfilePage() {
  return (
    <Container className="py-8">
      <PageHeader
        title="Your profile"
        description="Manage your name, email, and security settings."
      />
      <div className="mt-6">
        <UserProfile
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "border border-border shadow-sm rounded-xl",
            },
          }}
        />
      </div>
    </Container>
  )
}
