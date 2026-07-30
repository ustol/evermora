import { UserProfile } from "@clerk/nextjs"
import { Container } from "@/components/layout/Container"

export default function DashboardProfilePage() {
  return (
    <Container className="py-12">
      <h1 className="font-heading text-2xl">Your profile</h1>
      <p className="mt-2 text-muted-foreground">Manage your account details, email, and password.</p>
      <div className="mt-8">
        <UserProfile routing="hash" />
      </div>
    </Container>
  )
}
