export const designSystem = {
  name: "Akornafa Design System",
  designRead:
    "Calm, dignified memorial and funeral-service editorial system for families, with warm gold, obsidian, and cream foundations.",
  componentsDir: "src/components",
  uiComponentsDir: "src/components/ui",
  docsRoute: "/design-system",
  tokenFiles: ["src/app/globals.css", "src/config/design-system.ts"],
  typography: {
    body: "Source Sans 3",
    heading: "Chillax",
    source: {
      body: "@fontsource/source-sans-3",
      heading: "public/fonts/chillax/*.woff2",
    },
  },
  color: {
    accent: "--brand-kente-gold",
    neutralBias: "warm ceremonial parchment/cocoa, not default grey",
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
