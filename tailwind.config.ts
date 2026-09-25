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
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
};

export default config;
