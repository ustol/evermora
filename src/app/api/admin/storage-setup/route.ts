import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST() {
  const admin = createAdminClient();
  const { data: buckets } = await admin.storage.listBuckets();
  const existing = buckets?.find((b) => b.name === "profile-images");

  if (existing) {
    return NextResponse.json({ ok: true, created: false });
  }

  const { error } = await admin.storage.createBucket("profile-images", {
    public: true,
    allowedMimeTypes: ["image/png", "image/jpeg", "image/webp", "image/gif"],
    fileSizeLimit: 5_242_880,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, created: true });
}
