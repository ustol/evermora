"use client";

import AdminBlogEditorPage from "@/lib/page-modules/admin/AdminBlogEditorPage";

export default function Page({ params }: { params: { id: string } }) {
  return <AdminBlogEditorPage id={params.id} />;
}
