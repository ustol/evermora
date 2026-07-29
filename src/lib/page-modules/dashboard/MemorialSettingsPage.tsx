"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** No separate settings screen — jump straight to the wizard's privacy step. */
export default function MemorialSettingsPage({ id: _id }: { id?: string }) {
  const router = useRouter();
  useEffect(() => {
    const id = _id;
    if (id) {
      router.replace(`/dashboard/memorials/${id}/edit?step=5`);
    }
  }, [_id, router]);
  return null;
}
