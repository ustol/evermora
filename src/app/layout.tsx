import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
import { TopLoader } from "@/components/layout/TopLoader";

export const metadata: Metadata = {
  title: "Akornafa — Honouring lives. Preserving memories.",
  description:
    "Akornafa is a dignified place to announce a funeral, share a memorial page, and gather tributes and condolences from family, friends, and community.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground font-sans antialiased">
        <Suspense fallback={null}>
          <TopLoader />
        </Suspense>
        <Providers>
          <TooltipProvider>
            {children}
            <Toaster position="top-center" richColors closeButton />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
