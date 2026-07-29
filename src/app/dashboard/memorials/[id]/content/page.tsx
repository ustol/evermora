"use client";

import MemorialContentPage from "@/lib/pages/dashboard/MemorialContentPage";

export default function Page({ params }: { params: { id: string } }) {
  return <MemorialContentPage id={params.id} />;
}
