"use client";

import AdminBlogEditorPage from "@/lib/pages/admin/AdminBlogEditorPage";

export default function Page({ params }: { params: { id: string } }) {
  return <AdminBlogEditorPage id={params.id} />;
}
