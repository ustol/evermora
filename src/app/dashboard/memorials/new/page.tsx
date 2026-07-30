import { Suspense } from "react"
import { MemorialWizard } from "@/components/memorial/wizard/MemorialWizard"
import { Container } from "@/components/layout/Container"
import { Skeleton } from "@/components/ui/skeleton"

export default function NewMemorialPage() {
  return (
    <Suspense fallback={<Container className="py-16"><Skeleton className="h-96 w-full rounded-2xl" /></Container>}>
      <MemorialWizard />
    </Suspense>
  )
}
