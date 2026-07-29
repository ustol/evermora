"use client";

import MemorialEditPage from "@/lib/pages/dashboard/MemorialEditPage";

export default function Page({ params }: { params: { id: string } }) {
  return <MemorialEditPage id={params.id} />;
}
