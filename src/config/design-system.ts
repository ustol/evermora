export const designSystem = {
  name: "Akornafa Design System",
  designRead:
    "Warm modern editorial publication system for readers and families, preserving Akornafa's dignified memorial brand while adding stronger blog-reading rhythm.",
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
