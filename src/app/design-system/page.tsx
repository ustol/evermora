"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const sections = [
  {
    id: "foundations",
    label: "Foundations",
    items: [
      { id: "colors", label: "Colors" },
      { id: "typography", label: "Typography" },
      { id: "radius", label: "Radius" },
    ],
  },
  {
    id: "components",
    label: "Components",
    items: [
      { id: "buttons", label: "Buttons" },
      { id: "cards", label: "Cards" },
      { id: "forms", label: "Form fields" },
    ],
  },
];

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
        <Container className="flex items-center justify-between py-3">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Akornafa Design System
            </p>
            <h1 className="font-heading text-lg">Foundations & Components</h1>
          </div>
          <Link href="/" className={buttonVariants({ variant: "outline", size: "sm", className: "hidden sm:inline-flex" })}>
            Back to site
          </Link>
        </Container>
      </header>

      <main className="border-t border-border/60 bg-background">
        <Container className="flex gap-8 py-8 lg:py-10">
          <aside className="sticky top-[4.5rem] hidden w-56 shrink-0 border-r border-border/60 pr-4 text-sm lg:block">
            {sections.map((section) => (
              <div key={section.id} className="mb-6">
                <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                  {section.label}
                </p>
                <nav className="space-y-1">
                  {section.items.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            ))}
          </aside>

          <div className="flex-1 space-y-10 pb-16">
            {/* Foundations */}
            <section id="colors">
              <SectionHeader
                eyebrow="Foundations"
                title="Color system"
                description="Akornafa uses an obsidian-and-ivory base with heritage gold accents and warm neutrals, optimised for legibility in moments of grief. Neutral tokens are slightly warm rather than pure grey."
              />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ColorSwatch name="Obsidian" token="--brand-obsidian" className="bg-obsidian text-soft-ivory" />
                <ColorSwatch name="Rich black" token="--brand-rich-black" className="bg-rich-black text-soft-ivory" />
                <ColorSwatch name="Heritage gold" token="--brand-heritage-gold" className="bg-heritage-gold text-obsidian" />
                <ColorSwatch name="Warm gold" token="--brand-warm-gold" className="bg-warm-gold text-obsidian" />
                <ColorSwatch name="Soft ivory" token="--brand-soft-ivory" className="bg-soft-ivory text-obsidian" />
                <ColorSwatch name="Warm stone" token="--brand-warm-stone" className="bg-warm-stone text-obsidian" />
                <ColorSwatch name="Muted taupe" token="--brand-muted-taupe" className="bg-muted-taupe text-soft-ivory" />
                <ColorSwatch name="Deep burgundy" token="--brand-deep-burgundy" className="bg-deep-burgundy text-soft-ivory" />
                <ColorSwatch name="Success" token="--brand-success" className="bg-success text-soft-ivory" />
                <ColorSwatch name="Error" token="--brand-error" className="bg-error text-soft-ivory" />
              </div>
              <p className="mt-4 max-w-2xl text-xs text-muted-foreground">
                Accent golds are reserved for primary calls to action, focus rings, and key navigation. Semantic success and error colors are separate from the decorative accent, so validation states remain clear even for users with color vision deficiencies.
              </p>
            </section>

            <Separator className="my-6" />

            <section id="typography" className="scroll-m-16">
              <SectionHeader
                eyebrow="Foundations"
                title="Typography"
                description="Chillax is used for headings and key phrases; Supreme for body copy and UI labels. Both are variable fonts, tuned for calm, dignified reading."
              />
              <div className="space-y-6 rounded-xl border border-border/60 bg-card p-6">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                    Display / Heading
                  </p>
                  <h1 className="mt-2 font-heading text-3xl">Honouring lives. Preserving memories.</h1>
                  <p className="mt-1 text-xs text-muted-foreground">font-family: Chillax; tracking tight; used for h1–h3.</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                    Body / UI
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">
                    Supreme is a humanist sans-serif used across body copy, forms, and navigation. Line heights are slightly relaxed to make longer condolence messages easier to read on both mobile and desktop.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">font-family: Supreme; used for paragraphs, inputs, and labels.</p>
                </div>
              </div>
            </section>

            <Separator className="my-6" />

            <section id="radius" className="scroll-m-16">
              <SectionHeader
                eyebrow="Foundations"
                title="Radius & surfaces"
                description="Akornafa leans on soft, rounded corners and subtle borders to keep layouts gentle without feeling ornamental."
              />
              <div className="grid gap-4 md:grid-cols-3">
                <RadiusPreview label="Sm" className="rounded-[var(--radius-sm)]" token="--radius-sm" />
                <RadiusPreview label="Md" className="rounded-[var(--radius-md)]" token="--radius-md" />
                <RadiusPreview label="Lg" className="rounded-[var(--radius-lg)]" token="--radius-lg" />
                <RadiusPreview label="Xl" className="rounded-[var(--radius-xl)]" token="--radius-xl" />
                <RadiusPreview label="2Xl" className="rounded-[var(--radius-2xl)]" token="--radius-2xl" />
                <RadiusPreview label="3Xl" className="rounded-[var(--radius-3xl)]" token="--radius-3xl" />
              </div>
            </section>

            {/* Components */}
            <section id="buttons" className="scroll-m-16">
              <SectionHeader
                eyebrow="Components"
                title="Buttons"
                description="Buttons use the heritage gold and obsidian palette with calm hover states and clear focus rings. Use the primary style for main actions and the outline variant on dark or photographic backgrounds."
              />
              <Card className="space-y-4 border-border/60 bg-card p-6">
                <Tabs defaultValue="states">
                  <TabsList className="bg-muted/40">
                    <TabsTrigger value="states">States</TabsTrigger>
                    <TabsTrigger value="usage">Usage</TabsTrigger>
                  </TabsList>
                  <TabsContent value="states" className="mt-4 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <Button>Primary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button disabled>Disabled</Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-dashed border-border/70 bg-muted/30 p-3 text-xs text-muted-foreground">
                      <p>
                        Focus rings use <code className="rounded bg-muted/70 px-1 py-0.5 text-[10px]">--ring</code> (heritage gold) at 2px with a subtle inset, ensuring clarity against both ivory and dark surfaces.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="usage" className="mt-4 text-xs text-muted-foreground">
                    <p className="mb-2">Use exactly one primary button per section. Prefer outline or ghost styles for secondary paths like "+ Add another" or "Cancel".</p>
                    <p>On the hero and other dark sections, pair outline buttons with warm-gold borders and text to maintain contrast without overpowering the content.</p>
                  </TabsContent>
                </Tabs>
              </Card>
            </section>

            <section id="cards" className="scroll-m-16">
              <SectionHeader
                eyebrow="Components"
                title="Cards"
                description="Cards are used for memorial summaries, administrative lists, and feature callouts. They sit on a soft ivory base with hairline borders and generous padding."
              />
              <Card className="space-y-4 border-border/60 bg-card p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-border/70 bg-background/60 p-4">
                    <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                      Memorial preview
                    </p>
                    <h3 className="mt-2 font-heading text-lg">Ama Serwaa Mensah</h3>
                    <p className="mt-1 text-xs text-muted-foreground">1948 – 2024 • Mother, teacher, and cherished friend.</p>
                    <Button size="sm" className="mt-3">View memorial</Button>
                  </div>
                  <div className="rounded-xl border border-dashed border-border/70 bg-background/30 p-4 text-xs text-muted-foreground">
                    <p>Use cards for discrete, self-contained pieces of content. Avoid nesting more than one primary action per card to keep choices clear under emotional load.</p>
                  </div>
                </div>
              </Card>
            </section>

            <section id="forms" className="scroll-m-16">
              <SectionHeader
                eyebrow="Components"
                title="Form fields"
                description="Form controls privilege clarity, spacing, and accessible descriptions over raw density. Labels stay visible at all times; helper text explains why we ask for each detail."
              />
              <Card className="space-y-4 border-border/60 bg-card p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <label className="flex flex-col gap-1 text-sm">
                      <span className="text-xs font-medium text-muted-foreground">Full name of the deceased</span>
                      <input
                        className="h-10 rounded-md border border-input bg-background px-3 text-sm shadow-[0_0_0_1px_theme(colors.border/40)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        placeholder="e.g. Ama Serwaa Mensah"
                      />
                      <span className="text-[11px] text-muted-foreground">Used on the memorial page and in search results.</span>
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                      <span className="text-xs font-medium text-muted-foreground">Short tribute headline</span>
                      <textarea
                        rows={3}
                        className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-[0_0_0_1px_theme(colors.border/40)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        placeholder="A beloved mother, teacher, and friend."
                      />
                      <span className="text-[11px] text-muted-foreground">Shows near the top of the memorial to quickly introduce who they were.</span>
                    </label>
                  </div>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p>Every form should:</p>
                    <ul className="list-disc space-y-1 pl-4">
                      <li>Keep labels outside inputs, never hidden.</li>
                      <li>Use helper text to explain why a field matters.</li>
                      <li>Group related fields (e.g. dates, locations) into clear sections.</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </section>
          </div>
        </Container>
      </main>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="mb-4 space-y-1">
      <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        {eyebrow}
      </p>
      <h2 className="font-heading text-xl">{title}</h2>
      <p className="max-w-2xl text-xs text-muted-foreground">{description}</p>
    </header>
  );
}

function ColorSwatch({
  name,
  token,
  className,
}: {
  name: string;
  token: string;
  className?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
      <div className={`flex h-20 items-center justify-between px-4 py-3 text-xs ${className}`}>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] opacity-80">
            {name}
          </p>
          <p className="mt-1 text-[11px] opacity-80">{token}</p>
        </div>
      </div>
    </div>
  );
}

function RadiusPreview({
  label,
  token,
  className,
}: {
  label: string;
  token: string;
  className?: string;
}) {
  return (
    <div className="space-y-2 text-xs">
      <div className={`flex h-20 items-center justify-center border border-border/70 bg-card ${className}`}>
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <p className="text-[11px] text-muted-foreground">{token}</p>
    </div>
  );
}
