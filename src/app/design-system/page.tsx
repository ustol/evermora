import Link from "next/link";
import { BookOpen, CheckCircle2, HeartHandshake, Moon, Sun, TriangleAlert } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const sections = [
  {
    label: "Foundations",
    items: [
      { id: "read", label: "Design read" },
      { id: "color", label: "Color" },
      { id: "type", label: "Typography" },
      { id: "modes", label: "Light & dark" },
    ],
  },
  {
    label: "Components",
    items: [
      { id: "buttons", label: "Buttons" },
      { id: "cards", label: "Cards" },
      { id: "forms", label: "Forms" },
      { id: "docs", label: "Docs" },
    ],
  },
];

const brandSwatches = [
  ["Obsidian", "--brand-obsidian", "bg-obsidian text-soft-ivory"],
  ["Rich black", "--brand-rich-black", "bg-rich-black text-soft-ivory"],
  ["Heritage gold", "--brand-heritage-gold", "bg-heritage-gold text-soft-ivory"],
  ["Warm gold", "--brand-warm-gold", "bg-warm-gold text-obsidian"],
  ["Soft ivory", "--brand-soft-ivory", "bg-soft-ivory text-obsidian"],
  ["Warm stone", "--brand-warm-stone", "bg-warm-stone text-obsidian"],
  ["Muted taupe", "--brand-muted-taupe", "bg-muted-taupe text-soft-ivory"],
  ["Clay brown", "--brand-clay-brown", "bg-clay-brown text-soft-ivory"],
  ["Deep burgundy", "--brand-deep-burgundy", "bg-deep-burgundy text-soft-ivory"],
] as const;

const semanticSwatches = [
  ["Good", "--semantic-good", "bg-good text-success-foreground", CheckCircle2],
  ["Warn", "--semantic-warn", "bg-warn text-warning-foreground", TriangleAlert],
  ["Critical", "--semantic-critical", "bg-critical text-soft-ivory", TriangleAlert],
] as const;

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/88 backdrop-blur-xl">
        <Container className="flex items-center justify-between gap-4 py-3">
          <div className="min-w-0">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-accent">
              Akornafa / Evermora
            </p>
            <h1 className="truncate font-heading text-lg leading-tight sm:text-xl">
              Memorial design system
            </h1>
          </div>
          <nav className="hidden items-center gap-2 sm:flex">
            <a href="#docs" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              Documentation
            </a>
            <Link href="/" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Back to site
            </Link>
          </nav>
        </Container>
      </header>

      <main className="bg-[radial-gradient(circle_at_top_left,color-mix(in_oklch,var(--brand-warm-gold)_18%,transparent),transparent_34rem)]">
        <Container className="grid gap-8 py-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:py-10">
          <aside className="hidden lg:block">
            <div className="sticky top-[5.25rem] space-y-6 border-r border-border/70 pr-5">
              {sections.map((section) => (
                <div key={section.label}>
                  <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                    {section.label}
                  </p>
                  <nav className="space-y-1">
                    {section.items.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </aside>

          <div className="min-w-0 space-y-12 pb-16">
            <section id="read" className="scroll-m-24">
              <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-3xl border border-border/70 bg-card/92 p-6 shadow-sm sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">Design read</p>
                  <h2 className="mt-4 max-w-3xl font-heading text-3xl leading-tight sm:text-5xl">
                    Calm public memorial contribution UI for bereaved visitors and friends.
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    The system is respectful, editorial, and service-led: warm Akornafa heritage colors, careful reading rhythm, and clear form patterns for people acting under emotional load.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button className="bg-obsidian text-soft-ivory hover:bg-obsidian/90">Create a memorial</Button>
                    <Button variant="outline">Find a memorial</Button>
                  </div>
                </div>
                <Card className="border-border/70 bg-rich-black p-6 text-soft-ivory shadow-sm">
                  <HeartHandshake className="size-9 text-warm-gold" aria-hidden="true" />
                  <h3 className="mt-5 font-heading text-2xl">Design principles</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-soft-ivory/78">
                    <li>Respectful before expressive; stories come first.</li>
                    <li>Warm heritage neutrals instead of default grey.</li>
                    <li>Plain service language with visible labels.</li>
                    <li>One confident gold accent; semantics remain separate.</li>
                  </ul>
                </Card>
              </div>
            </section>

            <Separator />

            <section id="color" className="scroll-m-24">
              <SectionHeader
                eyebrow="Foundations"
                title="Warm heritage color"
                description="Akornafa uses a warm ivory-to-obsidian neutral ramp with a heritage/kente gold accent. The palette is drawn from solemn memorial contexts, Ghanaian heritage cues, printed funeral programmes, and candlelit service spaces."
              />
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {brandSwatches.map(([name, token, className]) => (
                  <ColorSwatch key={token} name={name} token={token} className={className} />
                ))}
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {semanticSwatches.map(([name, token, className, Icon]) => (
                  <div key={token} className="rounded-2xl border border-border/70 bg-card p-4">
                    <div className={cn("flex items-center gap-3 rounded-xl p-4", className)}>
                      <Icon className="size-5" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold">{name}</p>
                        <p className="text-xs opacity-80">{token}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <UsageNote>
                Do not use gold for success, warning, or error. Gold is for brand emphasis, selected states, primary focus rings, and sparing calls to action.
              </UsageNote>
            </section>

            <section id="type" className="scroll-m-24">
              <SectionHeader
                eyebrow="Foundations"
                title="Editorial/service typography"
                description="Literata gives memorial names and stories an editorial register; Source Sans 3 keeps forms and contribution UI clear, human, and highly readable. Both are installed through Fontsource packages."
              />
              <div className="grid gap-4 lg:grid-cols-2">
                <Card className="border-border/70 bg-card p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Display / Literata</p>
                  <p className="mt-4 font-heading text-4xl leading-tight">Honouring lives. Preserving memories.</p>
                  <p className="mt-4 text-sm text-muted-foreground">Use for memorial names, page titles, section headers, and story-led moments.</p>
                </Card>
                <Card className="border-border/70 bg-card p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Body / Source Sans 3</p>
                  <p className="mt-4 text-lg leading-relaxed">
                    Leave a tribute for the family to read, share a photograph, or add funeral details with labels that stay visible at every step.
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground">Use for paragraphs, metadata, form controls, helper text, and navigation.</p>
                </Card>
              </div>
            </section>

            <section id="modes" className="scroll-m-24">
              <SectionHeader
                eyebrow="Foundations"
                title="Light and dark parity"
                description="Tokens define both :root and .dark. Components should not hard-code alternate dark palettes; inherit the same variables for predictable contrast."
              />
              <div className="grid gap-4 lg:grid-cols-2">
                <ModePreview mode="light" />
                <div className="dark">
                  <ModePreview mode="dark" />
                </div>
              </div>
            </section>

            <Separator />

            <section id="buttons" className="scroll-m-24">
              <SectionHeader
                eyebrow="Components"
                title="Buttons"
                description="Buttons are calm, compact, and direct. Use one primary action per section; secondary actions should not compete with the memorial story."
              />
              <PreviewSurface>
                <div className="flex flex-wrap items-center gap-3">
                  <Button>Leave a tribute</Button>
                  <Button variant="outline">Share memorial</Button>
                  <Button variant="secondary">Add a photograph</Button>
                  <Button variant="ghost">Cancel</Button>
                  <Button variant="destructive">Report</Button>
                </div>
                <UsageNote compact>
                  CTA labels use sentence case and plain service language. Avoid urgency or sales-like language in bereavement flows.
                </UsageNote>
              </PreviewSurface>
            </section>

            <section id="cards" className="scroll-m-24">
              <SectionHeader
                eyebrow="Components"
                title="Memorial cards"
                description="Cards frame names, dates, and contributions with quiet borders, generous padding, and one clear next step."
              />
              <PreviewSurface>
                <div className="grid gap-4 lg:grid-cols-2">
                  <article className="rounded-2xl border border-border/70 bg-background/70 p-5 text-center shadow-sm">
                    <div className="mx-auto flex size-24 items-center justify-center rounded-full border-2 border-warm-stone bg-muted text-muted-foreground">
                      <BookOpen className="size-9" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-heading text-2xl">Ama Serwaa Mensah</h3>
                    <p className="mt-1 text-sm text-muted-foreground">1948 – 2024 • Mother, teacher, and cherished friend</p>
                    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-foreground/78">
                      A generous life remembered through photographs, tributes, and service details for family and friends.
                    </p>
                    <Button size="sm" className="mt-4">View memorial</Button>
                  </article>
                  <article className="rounded-2xl border border-dashed border-border/80 bg-muted/35 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Usage</p>
                    <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-relaxed text-muted-foreground">
                      <li>Use cards for self-contained memorial summaries and contribution previews.</li>
                      <li>Keep one primary action per card.</li>
                      <li>Prefer meaningful metadata over dashboard-style density.</li>
                    </ul>
                  </article>
                </div>
              </PreviewSurface>
            </section>

            <section id="forms" className="scroll-m-24">
              <SectionHeader
                eyebrow="Components"
                title="Contribution forms"
                description="Forms prioritize clarity and reassurance: visible labels, helper text, accessible focus rings, and clear validation states."
              />
              <PreviewSurface>
                <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
                  <div className="space-y-4">
                    <label className="block text-sm font-medium">
                      <span>Full name of the deceased</span>
                      <input
                        className="mt-1 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        placeholder="e.g. Ama Serwaa Mensah"
                      />
                      <span className="mt-1 block text-xs font-normal text-muted-foreground">Shown on the memorial page and search results.</span>
                    </label>
                    <label className="block text-sm font-medium">
                      <span>Tribute message</span>
                      <textarea
                        rows={4}
                        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        placeholder="Share a memory or condolence for the family."
                      />
                      <span className="mt-1 block text-xs font-normal text-muted-foreground">Messages are reviewed with care before appearing publicly.</span>
                    </label>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-muted/35 p-5 text-sm leading-relaxed text-muted-foreground">
                    <p className="font-semibold text-foreground">Form checklist</p>
                    <ul className="mt-3 list-disc space-y-2 pl-4">
                      <li>Never rely on placeholder-only labels.</li>
                      <li>Explain why sensitive details are requested.</li>
                      <li>Use critical semantics only for real errors or moderation danger.</li>
                    </ul>
                  </div>
                </div>
              </PreviewSurface>
            </section>

            <section id="docs" className="scroll-m-24">
              <SectionHeader
                eyebrow="Documentation"
                title="Source files"
                description="The design-system folder records tokens, guidance, and component usage so future feature work can compose from the same visual decisions."
              />
              <div className="grid gap-3 md:grid-cols-3">
                <DocFile path="design-system/tokens.css" label="tokens.css" detail="Theme variables and Tailwind tokens" />
                <DocFile path="design-system/guide.md" label="guide.md" detail="Design read, principles, and content rules" />
                <DocFile path="design-system/design-system.json" label="design-system.json" detail="Machine-readable system metadata" />
              </div>
            </section>
          </div>
        </Container>
      </main>
    </div>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="mb-4 max-w-3xl space-y-2">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">{eyebrow}</p>
      <h2 className="font-heading text-2xl leading-tight sm:text-3xl">{title}</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </header>
  );
}

function ColorSwatch({ name, token, className }: { name: string; token: string; className: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
      <div className={cn("flex min-h-24 items-end justify-between gap-4 p-4", className)}>
        <div>
          <p className="text-sm font-semibold">{name}</p>
          <p className="mt-1 text-xs opacity-80">{token}</p>
        </div>
      </div>
    </div>
  );
}

function PreviewSurface({ children }: { children: React.ReactNode }) {
  return <Card className="space-y-4 border-border/70 bg-card/92 p-5 shadow-sm sm:p-6">{children}</Card>;
}

function UsageNote({ children, compact = false }: { children: React.ReactNode; compact?: boolean }) {
  return (
    <div className={cn("rounded-xl border border-dashed border-border/80 bg-muted/35 text-sm leading-relaxed text-muted-foreground", compact ? "p-3" : "mt-4 p-4")}>
      {children}
    </div>
  );
}

function ModePreview({ mode }: { mode: "light" | "dark" }) {
  const isDark = mode === "dark";
  return (
    <Card className="border-border/70 bg-card p-5 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">{isDark ? "Dark" : "Light"} mode</p>
          <h3 className="mt-2 font-heading text-2xl">A quiet place for memory</h3>
        </div>
        {isDark ? <Moon className="size-5 text-accent" aria-hidden="true" /> : <Sun className="size-5 text-accent" aria-hidden="true" />}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Names, dates, tributes, and funeral details stay legible while the gold accent remains restrained.
      </p>
      <div className="mt-4 flex gap-2">
        <Button size="sm">Leave a tribute</Button>
        <Button size="sm" variant="outline">Read details</Button>
      </div>
    </Card>
  );
}

function DocFile({ path, label, detail }: { path: string; label: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
      <p className="font-mono text-sm text-accent">{label}</p>
      <p className="mt-1 font-mono text-[0.7rem] text-muted-foreground">{path}</p>
      <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
    </div>
  );
}
