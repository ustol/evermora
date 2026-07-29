import { MemorialWizard } from "@/components/memorial/wizard/MemorialWizard"

export default function MemorialEditPage({ id }: { id?: string }) {
  return <MemorialWizard memorialId={id} />
}
