"use client";

import MemorialPage from "@/lib/page-modules/MemorialPage";

export default function Page({ params }: { params: { slug: string } }) {
  return <MemorialPage slug={params.slug} />;
}
