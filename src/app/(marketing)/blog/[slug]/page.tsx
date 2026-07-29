"use client";

import BlogPostPage from "@/lib/pages/BlogPostPage";

export default function Page({ params }: { params: { slug: string } }) {
  return <BlogPostPage slug={params.slug} />;
}
