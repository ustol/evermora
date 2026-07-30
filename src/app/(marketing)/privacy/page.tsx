"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { siteConfig, legalConfig } from "@/config/site";

export default function PrivacyPage() {
  return (
    <Container className="py-20">
      <h1 className="font-heading text-4xl text-foreground">Privacy policy</h1>
      <div className="mt-8 max-w-prose space-y-4 text-muted-foreground">
        <p>
          At {siteConfig.name}, we take your privacy seriously. This policy describes
          how we collect, use, and protect your personal information.
        </p>
        <h2 className="font-heading text-xl text-foreground">Information we collect</h2>
        <p>
          We collect only the information you voluntarily provide, such as your name
          and email address when you create an account or leave a tribute.
        </p>
        <h2 className="font-heading text-xl text-foreground">How we use your information</h2>
        <p>
          Your information is used solely to provide and improve our memorial services.
          We never sell or share your personal data with third parties for marketing.
        </p>
        <h2 className="font-heading text-xl text-foreground">Contact</h2>
        <p>
          For privacy-related inquiries, contact us at{" "}
          <Link href={`mailto:${legalConfig.supportEmail}`} className="text-heritage-gold hover:underline">
            {legalConfig.supportEmail}
          </Link>
        </p>
      </div>
    </Container>
  );
}
