"use client";

import MemorialGalleryPage from "@/lib/pages/dashboard/MemorialGalleryPage";

export default function Page({ params }: { params: { id: string } }) {
  return <MemorialGalleryPage id={params.id} />;
}
