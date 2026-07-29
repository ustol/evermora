"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

export default function TermsPage() {
  return (
    <Container className="py-20">
      <h1 className="font-heading text-4xl text-foreground">Terms &amp; conditions</h1>
      <div className="mt-8 max-w-prose space-y-4 text-muted-foreground">
        <p>
          By using {siteConfig.name}, you agree to these terms and conditions.
          Please read them carefully.
        </p>
        <h2 className="font-heading text-xl text-foreground">Use of service</h2>
        <p>
          This platform is provided for creating and viewing memorial pages.
          Users must not post content that is defamatory, offensive, or violates
          any applicable laws.
        </p>
        <h2 className="font-heading text-xl text-foreground">Account responsibility</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account
          credentials and for all activities under your account.
        </p>
        <h2 className="font-heading text-xl text-foreground">Content moderation</h2>
        <p>
          Memorial owners have full control over the content on their pages.
          We reserve the right to remove content that violates these terms.
        </p>
      </div>
    </Container>
  );
}
