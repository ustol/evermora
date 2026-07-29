"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

export default function AboutPage() {
  return (
    <Container className="py-20">
      <h1 className="font-heading text-4xl text-foreground">About {siteConfig.name}</h1>
      <div className="mt-8 max-w-prose space-y-4 text-muted-foreground">
        <p>
          {siteConfig.name} is a dignified platform for families to announce a funeral,
          share a memorial page, and gather tributes and condolences from loved ones
          near and far.
        </p>
        <p>
          We believe every life deserves to be honoured with respect and care. Our
          platform gives families a private space to celebrate their loved one&apos;s
          story with photographs, tributes, and memories — controlled entirely by
          the family.
        </p>
        <p>
          {siteConfig.name} is a product of {siteConfig.parentCompany}, based in {siteConfig.region}.
        </p>
      </div>
    </Container>
  );
}
