import { useParams } from "react-router-dom"
import { PagePlaceholder } from "@/components/layout/PagePlaceholder"

export default function MemorialSettingsPage() {
  const { id } = useParams<{ id: string }>()
  return (
    <PagePlaceholder title="Privacy & publishing settings" description={id} />
  )
}
