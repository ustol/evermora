import { useParams } from "react-router-dom"
import { PagePlaceholder } from "@/components/layout/PagePlaceholder"

export default function MemorialContentPage() {
  const { id } = useParams<{ id: string }>()
  return (
    <PagePlaceholder title="Moderate tributes & condolences" description={id} />
  )
}
