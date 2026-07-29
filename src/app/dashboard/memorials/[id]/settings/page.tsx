"use client";

import MemorialSettingsPage from "@/lib/page-modules/dashboard/MemorialSettingsPage";

export default function Page({ params }: { params: { id: string } }) {
  return <MemorialSettingsPage id={params.id} />;
}
