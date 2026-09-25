import type { Config } from "tailwindcss";
import { accent, colors, line } from "./lib/tokens";

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
        "display-sm": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "display-md": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.035em" }],
        "display-lg": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.04em" }],
      },
      maxWidth: {
        content: "76rem",
      },
      borderRadius: {
        card: "1rem",
        panel: "1.5rem",
      },
      backgroundImage: {
        // Hairline grid used behind hero-style sections. Pair with `bg-size-[4rem_4rem]`
        // (Tailwind v4 does not read `backgroundSize` from this config).
        grid: `linear-gradient(to right, ${line.DEFAULT} 1px, transparent 1px), linear-gradient(to bottom, ${line.DEFAULT} 1px, transparent 1px)`,
        "accent-glow": `radial-gradient(closest-side, color-mix(in srgb, ${accent.DEFAULT} 18%, transparent), transparent)`,
      },
      boxShadow: {
        // Deep drop shadow for floating product UI (dashboard window).
        window: "0 40px 120px -40px rgb(0 0 0 / 0.8)",
        glow: `0 0 0 1px color-mix(in srgb, ${accent.DEFAULT} 25%, transparent), 0 8px 40px -8px color-mix(in srgb, ${accent.DEFAULT} 35%, transparent)`,
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
};

export default config;
