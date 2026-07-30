"use client";

import { use } from "react"
import { Container } from "@/components/layout/Container"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function AdminBlogEditorPage({ params }: PageProps) {
  const { id } = use(params)
  return (
    <Container className="py-12">
      <h1 className="font-heading text-2xl">{id === "new" ? "New" : "Edit"} blog post</h1>
    </Container>
  )
}
