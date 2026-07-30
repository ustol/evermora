"use client";

import dynamic from "next/dynamic"

const MemorialWizard = dynamic(() => import("@/components/memorial/wizard/MemorialWizard").then(m => m.MemorialWizard), {
  ssr: false,
})

export default function NewMemorialPage() {
  return <MemorialWizard />
}
