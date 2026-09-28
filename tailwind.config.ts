import type { Config } from "tailwindcss";
import { colors } from "./lib/tokens";

/**
 * BADİ design tokens. Colours live in lib/tokens.ts.
 * Loaded by Tailwind v4 through `@config` in app/globals.css.
 */

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Calm product scale: headings stay confident without poster sizes.
        "display-sm": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.025em" }],
        "display-md": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
      },
      maxWidth: {
        content: "76rem",
      },
      borderRadius: {
        // Soft, generous corners for tone-separated surfaces.
        card: "1.25rem",
        panel: "1.5rem",
      },
      backgroundImage: {
        // Hairline grid and accent glow behind hero and CTA sections (GridBackdrop, HeroBackdrop).
        // Pair the grid with `bg-size-[4rem_4rem]`: Tailwind v4 does not read `backgroundSize` here.
        grid: `linear-gradient(to right, ${colors.line.DEFAULT} 1px, transparent 1px), linear-gradient(to bottom, ${colors.line.DEFAULT} 1px, transparent 1px)`,
        "accent-glow": `radial-gradient(closest-side, color-mix(in srgb, ${colors.accent.DEFAULT} 18%, transparent), transparent)`,
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
};

export default config;
