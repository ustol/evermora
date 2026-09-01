export const designSystem = {
  name: "Akornafa / Evermora Design System",
  designRead:
    "Calm trust-first memorial/admin analytics system for operators and families, preserving the dignified Akornafa/Evermora brand while adding polished Linear/Vercel-like dashboard surfaces.",
  componentsDir: "src/components",
  uiComponentsDir: "src/components/ui",
  docsRoute: "/design-system",
  tokenFiles: ["design-system/tokens.css", "src/app/globals.css", "src/config/design-system.ts"],
  docs: {
    guide: "design-system/guide.md",
    components: "design-system/components",
  },
  typography: {
    body: "Source Sans 3",
    heading: "Chillax",
    display: "Chillax",
    source: {
      body: "@fontsource/source-sans-3",
      heading: "local /public/fonts/chillax files",
      display: "local /public/fonts/chillax files",
    },
  },
  color: {
    accent: "--brand-kente-gold",
    neutralBias: "warm memorial parchment/cocoa, not default grey",
    brand: {
      ink: "#18120f",
      charcoal: "#251812",
      kenteGold: "#86610f",
      ceremonialGold: "#c79538",
      ivory: "#fbf6ec",
      parchment: "#f4ead9",
      clay: "#d9c4a8",
      taupe: "#746453",
      cocoa: "#443229",
      burgundy: "#5c2528",
    },
    semantic: {
      success: "#2f6f4e",
      warning: "#9a5a12",
      critical: "#a64232",
    },
  },
} as const;

export type DesignSystem = typeof designSystem;
