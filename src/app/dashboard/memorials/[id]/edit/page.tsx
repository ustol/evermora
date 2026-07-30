"use client";

import { useEffect, useState } from "react"
import { use } from "react"
import { createClient } from "@supabase/supabase-js"
import { notFound } from "next/navigation"
import { Container } from "@/components/layout/Container"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/layout/ErrorState"

interface PageProps { params: Promise<{ id: string }> }

export default function MemorialEditPage({ params }: PageProps) {
  const { id } = use(params)
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!)
    supabase.from("memorials").select("*").eq("id", id).maybeSingle().then(({ data, error }) => {
      if (error || !data) { setError(true); return }
      setData(data); setLoading(false)
    })
  }, [id])

  if (error) return <Container className="py-16"><ErrorState /></Container>
  if (loading) return <Container className="py-16"><Skeleton className="h-64 rounded-2xl" /></Container>
  if (!data) notFound()

  return (
    <Container className="py-12">
      <h1 className="font-heading text-2xl">Edit memorial</h1>
      <p className="text-muted-foreground">Make changes to this memorial page.</p>
    </Container>
  )
}
