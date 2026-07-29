"use client";

import BlogPostPage from "@/lib/page-modules/BlogPostPage";

export default function Page({ params }: { params: { slug: string } }) {
  return <BlogPostPage slug={params.slug} />;
}
