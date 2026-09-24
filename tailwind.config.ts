import type { Config } from "tailwindcss";

/**
 * BADİ design tokens.
 *
 * Dark-first palette with a single strong accent.
 * Loaded by Tailwind v4 through `@config` in app/globals.css.
 */

// Accent candidates. Only one is used on the site; swap `accent` below to change it.
const accentPalettes = {
  // Electric green — growth, conversion, "positive delta" on numbers. (Recommended)
  electricGreen: {
    50: "#EAFFF3",
    100: "#CCFFE3",
    200: "#9CFDC9",
    300: "#5FF8A8",
    400: "#2EF08A",
    500: "#12D673",
    600: "#07AE5C",
    700: "#0A884B",
    800: "#0E6B3E",
    900: "#0E5835",
    950: "#01321B",
    DEFAULT: "#2EF08A",
    foreground: "#04140B",
  },
  // Electric blue — trust, infrastructure, fintech feel.
  electricBlue: {
    50: "#EEF4FF",
    100: "#D9E6FF",
    200: "#BBD2FF",
    300: "#8CB4FF",
    400: "#5A8CFF",
    500: "#3D6BFF",
    600: "#2447F5",
    700: "#1C35E1",
    800: "#1D2EB6",
    900: "#1E2E8F",
    950: "#161D57",
    DEFAULT: "#3D6BFF",
    foreground: "#FFFFFF",
  },
} as const;

const accent = accentPalettes.electricGreen;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Page and layer backgrounds, darkest to lightest.
        canvas: "#07080A",
        surface: {
          DEFAULT: "#0C0E11",
          raised: "#121519",
          overlay: "#181C21",
        },
        // Borders and dividers.
        line: {
          DEFAULT: "#1E2228",
          strong: "#2B3038",
        },
        // Text.
        fg: {
          DEFAULT: "#F4F5F7",
          muted: "#A1A8B3",
          subtle: "#6B7380",
        },
        // Occasional light sections.
        paper: "#F6F7F9",
        ink: "#0B0D10",
        accent,
        // Data states for metrics and dashboards.
        positive: "#2EF08A",
        negative: "#FF5C5C",
        warning: "#FFB547",
      },
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
      },
      boxShadow: {
        glow: `0 0 0 1px color-mix(in srgb, ${accent.DEFAULT} 25%, transparent), 0 8px 40px -8px color-mix(in srgb, ${accent.DEFAULT} 35%, transparent)`,
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
};

export default config;
