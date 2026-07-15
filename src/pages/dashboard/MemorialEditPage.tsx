import { useParams } from "react-router-dom"
import { MemorialWizard } from "@/components/memorial/wizard/MemorialWizard"

export default function MemorialEditPage() {
  const { id } = useParams<{ id: string }>()
  return <MemorialWizard memorialId={id} />
}
