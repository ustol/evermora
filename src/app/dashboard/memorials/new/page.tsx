import { Suspense } from "react"
import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { MemorialWizard } from "@/components/memorial/wizard/MemorialWizard"
import { Container } from "@/components/layout/Container"
import { Skeleton } from "@/components/ui/skeleton"

export default async function NewMemorialPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/sign-in?redirect_url=/dashboard/memorials/new")

  return (
    <Suspense fallback={<Container className="py-16"><Skeleton className="h-96 w-full rounded-2xl" /></Container>}>
      <MemorialWizard userId={user.id} />
    </Suspense>
  )
}
