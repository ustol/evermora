"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const sections = [
  {
    id: "foundations",
    label: "Foundations",
    items: [
      { id: "design-read", label: "Design read" },
      { id: "colors", label: "Color" },
      { id: "typography", label: "Typography" },
      { id: "radius", label: "Radius & focus" },
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

const brandSwatches = [
  { name: "Ivory", token: "--brand-ivory", ink: "text-ink" },
  { name: "Parchment", token: "--brand-parchment", ink: "text-ink" },
  { name: "Clay", token: "--brand-clay", ink: "text-ink" },
  { name: "Taupe", token: "--brand-taupe", ink: "text-ivory" },
  { name: "Cocoa", token: "--brand-cocoa", ink: "text-ivory" },
  { name: "Ceremonial gold", token: "--brand-ceremonial-gold", ink: "text-ink" },
  { name: "Kente gold", token: "--brand-kente-gold", ink: "text-ivory" },
  { name: "Burgundy", token: "--brand-burgundy", ink: "text-ivory" },
  { name: "Charcoal", token: "--brand-charcoal", ink: "text-ivory" },
  { name: "Ink", token: "--brand-ink", ink: "text-ivory" },
];

const semanticSwatches = [
  { name: "Success", token: "--success", note: "confirmed / completed" },
  { name: "Warning", token: "--warning", note: "needs attention" },
  { name: "Critical", token: "--critical", note: "destructive / failed" },
];

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-background/88 backdrop-blur-xl supports-[backdrop-filter]:bg-background/78">
        <Container className="flex items-center justify-between gap-4 py-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Akornafa Design System
            </p>
            <h1 className="truncate font-heading text-xl leading-tight sm:text-2xl">
              Memorial foundations & components
            </h1>
          </div>
          <Link
            href="/"
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "hidden shrink-0 sm:inline-flex",
            })}
          >
            Back to site
          </Link>
        </Container>
      </header>

      <main className="bg-[radial-gradient(circle_at_top_left,color-mix(in_oklch,var(--brand-ceremonial-gold)_10%,transparent),transparent_26rem)]">
        <Container className="flex items-start gap-8 py-8 lg:py-10">
          <aside className="sticky top-[5rem] hidden max-h-[calc(100vh-6rem)] w-60 shrink-0 overflow-y-auto border-r border-border/70 pr-5 text-sm lg:block">
            {sections.map((section) => (
              <div key={section.id} className="mb-7">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {section.label}
                </p>
                <nav className="space-y-1">
                  {section.items.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/65 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            ))}
          </aside>

          <div className="min-w-0 flex-1 space-y-12 pb-16">
            <section id="design-read" className="scroll-m-24">
              <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-[0_24px_80px_color-mix(in_oklch,var(--brand-cocoa)_12%,transparent)] sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                  Design read
                </p>
                <h2 className="mt-3 max-w-3xl font-heading text-3xl leading-[1.05] sm:text-5xl">
                  Dignified Ghanaian remembrance, composed for families at home and across the diaspora.
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
                  The system favours warm ceremonial neutrals, editorial rhythm, accessible contrast, and quiet confidence. Gold is used as a measured accent, never as a flashy gradient; semantic states stay separate so sensitive memorial workflows remain clear.
                </p>
                <div className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                  <Principle label="Variance" value="Composed, not rigid" />
                  <Principle label="Motion" value="Respectfully restrained" />
                  <Principle label="Density" value="Airy enough for grief" />
                </div>
              </div>
            </section>

            <section id="colors" className="scroll-m-24">
              <SectionHeader
                eyebrow="Foundations"
                title="Color system"
                description="Akornafa uses an ivory, parchment, cocoa, and ceremonial-gold palette drawn from memorial cloth, candlelight, earth, and printed tribute programs. The neutral ramp is warm and hue-biased, not default grey."
              />

              <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <Card className="border-border/70 bg-card p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-heading text-lg">Brand palette</h3>
                      <p className="text-sm text-muted-foreground">Stable named colors for brand moments and documentation.</p>
                    </div>
                    <span className="rounded-full border border-border/70 bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Ghana warm
                    </span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {brandSwatches.map((swatch) => (
                      <ColorSwatch key={swatch.token} {...swatch} />
                    ))}
                  </div>
                </Card>

                <div className="space-y-4">
                  <ThemePreview mode="Light" />
                  <div className="dark">
                    <ThemePreview mode="Dark" />
                  </div>
                  <Card className="border-border/70 bg-card p-5">
                    <h3 className="font-heading text-lg">Semantic states</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Validation and operational messaging do not borrow from the ceremonial gold accent.
                    </p>
                    <div className="space-y-3">
                      {semanticSwatches.map((swatch) => (
                        <SemanticSwatch key={swatch.token} {...swatch} />
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </section>

            <Separator />

            <section id="typography" className="scroll-m-24">
              <SectionHeader
                eyebrow="Foundations"
                title="Typography"
                description="Chillax provides a warm, characterful display voice for names, page titles, and tribute headers. Source Sans 3 carries UI, forms, and long memorial copy with clarity. Chillax is self-hosted in /public/fonts and wired into Tailwind heading tokens."
              />
              <Card className="border-border/70 bg-card p-6">
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Display / Chillax</p>
                    <p className="mt-3 font-heading text-5xl leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                      Ama Serwaa Mensah
                    </p>
                    <p className="mt-3 font-heading text-2xl font-medium text-muted-foreground">
                      1948–2024
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Body / Source Sans 3</p>
                    <p className="max-w-prose text-base leading-8 text-muted-foreground">
                      Use relaxed line-height for condolences, biographies, service details, and explanatory form copy. Avoid tiny paragraphs in grief-state flows; the system should feel steady and legible on mobile, tablets, and printed-program-inspired pages.
                    </p>
                    <div className="grid gap-3 text-sm sm:grid-cols-3">
                      <TypeSpec label="H1" value="Chillax / 48–72" />
                      <TypeSpec label="Body" value="Source Sans 3 / 16–18" />
                      <TypeSpec label="Label" value="Source Sans 3 / 12 / tracked" />
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            <Separator />

            <section id="radius" className="scroll-m-24">
              <SectionHeader
                eyebrow="Foundations"
                title="Radius, surfaces & focus"
                description="Surfaces use soft program-card corners, hairline borders, and visible ceremonial-gold focus rings. The shapes are calm rather than playful."
              />
              <div className="grid gap-4 md:grid-cols-3">
                <RadiusPreview label="Small" token="--radius-sm" className="rounded-[var(--radius-sm)]" />
                <RadiusPreview label="Medium" token="--radius-md" className="rounded-[var(--radius-md)]" />
                <RadiusPreview label="Large" token="--radius-lg" className="rounded-[var(--radius-lg)]" />
                <RadiusPreview label="XL" token="--radius-xl" className="rounded-[var(--radius-xl)]" />
                <RadiusPreview label="2XL" token="--radius-2xl" className="rounded-[var(--radius-2xl)]" />
                <div className="rounded-2xl border border-border/70 bg-card p-4 text-sm">
                  <button className="w-full rounded-xl border border-input bg-background px-4 py-3 text-left font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                    Keyboard focus preview
                  </button>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground">Use a 2px ring with offset for all interactive elements.</p>
                </div>
              </div>
            </section>

            <section id="buttons" className="scroll-m-24">
              <SectionHeader
                eyebrow="Components"
                title="Buttons"
                description="Buttons prioritize calm, clear actions. Use one primary action per composition; supporting paths should use outline or ghost variants."
              />
              <Card className="space-y-5 border-border/70 bg-card p-6">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Light surface</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button>Publish memorial</Button>
                    <Button variant="outline">Preview page</Button>
                    <Button variant="secondary">Save draft</Button>
                    <Button variant="ghost">Cancel</Button>
                    <Button variant="destructive">Remove</Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </div>
                <UsageNote>Primary buttons use charcoal on light surfaces for the strongest contrast; gold remains available for focus, active indicators, and ceremonial emphasis.</UsageNote>
                <div className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
                  <UsageNote>Do: pair service-detail actions with short, specific verbs like “Add tribute” or “Share service”.</UsageNote>
                  <UsageNote>Do not: stack multiple gold calls-to-action in one memorial card or family workflow.</UsageNote>
                </div>
                <div className="dark rounded-2xl border border-border bg-background p-5 text-foreground">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Dark surface</p>
                  <div className="flex flex-wrap gap-3">
                    <Button>Continue</Button>
                    <Button variant="outline">View order</Button>
                    <Button variant="ghost">Not now</Button>
                  </div>
                </div>
              </Card>
            </section>

            <section id="cards" className="scroll-m-24">
              <SectionHeader
                eyebrow="Components"
                title="Cards"
                description="Cards are quiet containers for memorial summaries, condolence prompts, contribution states, and admin lists. They should feel like editorial panels, not dashboard tiles."
              />
              <div className="grid gap-4 lg:grid-cols-2">
                <Card className="border-border/70 bg-card p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Memorial preview</p>
                  <h3 className="mt-3 font-heading text-3xl leading-tight">Kofi Agyeman Boateng</h3>
                  <p className="mt-1 text-sm text-muted-foreground">1939–2025 • Father, elder, teacher, and cherished friend.</p>
                  <p className="mt-5 border-l-2 border-accent pl-4 text-sm leading-7 text-muted-foreground">
                    “His kindness crossed oceans and gathered family wherever his stories were told.”
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button size="sm">View memorial</Button>
                    <Button size="sm" variant="outline">Share with family</Button>
                  </div>
                </Card>
                <Card className="dark border-border bg-card p-6 text-card-foreground">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Guidance</p>
                  <h3 className="mt-3 font-heading text-3xl leading-tight">Dark memorial surfaces</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    Dark mode is warm night/cocoa rather than black. Keep hairline borders visible, preserve generous spacing, and use gold sparingly for orientation and focus.
                  </p>
                </Card>
              </div>
            </section>

            <section id="forms" className="scroll-m-24">
              <SectionHeader
                eyebrow="Components"
                title="Form fields"
                description="Forms must be legible under emotional load: visible labels, explanatory helper text, clear focus, and no hidden-placeholder-only patterns."
              />
              <Card className="border-border/70 bg-card p-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
                  <div className="space-y-4">
                    <label className="flex flex-col gap-1.5 text-sm">
                      <span className="font-semibold text-foreground">Full name of the deceased</span>
                      <input
                        className="h-11 rounded-xl border border-input bg-background px-3 text-base shadow-[inset_0_1px_0_color-mix(in_oklch,var(--foreground)_5%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        placeholder="e.g. Ama Serwaa Mensah"
                      />
                      <span className="text-xs leading-5 text-muted-foreground">Used on the memorial page, service announcement, and search results.</span>
                    </label>
                    <label className="flex flex-col gap-1.5 text-sm">
                      <span className="font-semibold text-foreground">Tribute headline</span>
                      <textarea
                        rows={4}
                        className="rounded-xl border border-input bg-background px-3 py-2 text-base shadow-[inset_0_1px_0_color-mix(in_oklch,var(--foreground)_5%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        placeholder="A beloved mother, teacher, and friend."
                      />
                      <span className="text-xs leading-5 text-muted-foreground">Keep this short and respectful; longer remembrances belong in the biography.</span>
                    </label>
                  </div>
                  <div className="rounded-2xl border border-dashed border-border/80 bg-muted/45 p-5 text-sm leading-7 text-muted-foreground">
                    <p className="font-semibold text-foreground">Form rules</p>
                    <ul className="mt-3 list-disc space-y-2 pl-5">
                      <li>Labels remain visible after entry.</li>
                      <li>Helper text explains why sensitive details are requested.</li>
                      <li>Error messages use semantic critical, not gold.</li>
                      <li>Dates, locations, and service details are grouped into clear sections.</li>
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
    <header className="mb-5 space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
      <h2 className="font-heading text-3xl leading-tight sm:text-4xl">{title}</h2>
      <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
    </header>
  );
}

function Principle({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium text-foreground">{value}</p>
    </div>
  );
}

function ColorSwatch({ name, token, ink }: { name: string; token: string; ink: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-background">
      <div
        className={`min-h-24 p-4 ${ink}`}
        style={{ backgroundColor: `var(${token})` }}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-90">{name}</p>
        <p className="mt-1 break-all text-xs opacity-80">{token}</p>
      </div>
    </div>
  );
}

function ThemePreview({ mode }: { mode: "Light" | "Dark" }) {
  return (
    <Card className="border-border/70 bg-card p-5 text-card-foreground">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{mode} tokens</p>
      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <TokenChip label="Background" token="--background" />
        <TokenChip label="Foreground" token="--foreground" />
        <TokenChip label="Card" token="--card" />
        <TokenChip label="Accent" token="--accent" />
      </div>
    </Card>
  );
}

function TokenChip({ label, token }: { label: string; token: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-background p-3 text-foreground">
      <div className="mb-2 h-8 rounded-lg border border-border" style={{ backgroundColor: `var(${token})` }} />
      <p className="font-semibold">{label}</p>
      <p className="text-[11px] text-muted-foreground">{token}</p>
    </div>
  );
}

function SemanticSwatch({ name, token, note }: { name: string; token: string; note: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-background p-3">
      <span className="size-9 rounded-full border border-border" style={{ backgroundColor: `var(${token})` }} />
      <div>
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-muted-foreground">{token} · {note}</p>
      </div>
    </div>
  );
}

function TypeSpec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-background p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}

function RadiusPreview({ label, token, className }: { label: string; token: string; className?: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4 text-sm">
      <div className={`flex h-24 items-center justify-center border border-border/80 bg-background ${className}`}>
        <span className="font-semibold text-muted-foreground">{label}</span>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{token}</p>
    </div>
  );
}

function UsageNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-border/80 bg-muted/45 p-4 text-sm leading-6 text-muted-foreground">
      {children}
    </div>
  );
}
