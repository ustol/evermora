"use client";

import MemorialEditPage from "@/lib/page-modules/dashboard/MemorialEditPage";

export default function Page({ params }: { params: { id: string } }) {
  return <MemorialEditPage id={params.id} />;
}
