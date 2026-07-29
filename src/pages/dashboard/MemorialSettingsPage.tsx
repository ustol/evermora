import { Navigate, useParams } from "react-router-dom"

/** No separate settings screen — jump straight to the wizard's privacy step. */
export default function MemorialSettingsPage() {
  const { id } = useParams<{ id: string }>()
  return (
    <Navigate to={`/dashboard/memorials/${id}/edit`} state={{ step: 5 }} replace />
  )
}
