import { UserProfile } from "@clerk/react"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"

export default function DashboardProfilePage() {
  return (
    <Container className="flex flex-col gap-6 py-10">
      <PageHeader
        title="Your profile"
        description="Manage your account details, email, and password."
      />
      <UserProfile routing="hash" />
    </Container>
  )
}
