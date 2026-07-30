import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh grid-rows-[auto_1fr] bg-background">
      <Container className="py-6">
        <Link href="/" className="font-heading text-xl text-foreground">
          {siteConfig.name}
        </Link>
      </Container>
      <main className="flex min-h-0 items-center justify-center px-4 pb-16 pt-4">
        {children}
      </main>
    </div>
  );
}
