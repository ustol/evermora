"use client";

import MemorialPage from "@/lib/pages/MemorialPage";

export default function Page({ params }: { params: { slug: string } }) {
  return <MemorialPage slug={params.slug} />;
}
