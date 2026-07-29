"use client";

import MemorialSettingsPage from "@/lib/pages/dashboard/MemorialSettingsPage";

export default function Page({ params }: { params: { id: string } }) {
  return <MemorialSettingsPage id={params.id} />;
}
