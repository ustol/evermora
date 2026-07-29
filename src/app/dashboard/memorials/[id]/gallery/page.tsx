"use client";

import MemorialGalleryPage from "@/lib/page-modules/dashboard/MemorialGalleryPage";

export default function Page({ params }: { params: { id: string } }) {
  return <MemorialGalleryPage id={params.id} />;
}
