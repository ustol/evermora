"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";

interface FieldsFormProps {
  params: Record<string, string | undefined>;
}

export function FieldsForm({ params }: FieldsFormProps) {
  const router = useRouter();
  const [search, setSearch] = useState(params.search ?? "");
  const [hometown, setHometown] = useState(params.hometown ?? "");
  const [yearOfDeath, setYearOfDeath] = useState(params.yearOfDeath ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams();
    if (search.trim()) q.set("search", search.trim());
    if (hometown.trim()) q.set("hometown", hometown.trim());
    if (yearOfDeath.trim()) q.set("yearOfDeath", yearOfDeath.trim());
    q.set("page", "1");
    router.push(`/memorials?${q.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-4"
    >
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input
          placeholder="Search by name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Field>
      <Field>
        <FieldLabel>Hometown</FieldLabel>
        <Input
          placeholder="e.g. Accra"
          value={hometown}
          onChange={(e) => setHometown(e.target.value)}
        />
      </Field>
      <Field>
        <FieldLabel>Year of death</FieldLabel>
        <Input
          type="number"
          placeholder="e.g. 2024"
          value={yearOfDeath}
          onChange={(e) => setYearOfDeath(e.target.value)}
        />
      </Field>
      <div className="flex items-end">
        <Button type="submit" className="w-full">
          <Search className="size-4" />
          Search
        </Button>
      </div>
    </form>
  );
}
