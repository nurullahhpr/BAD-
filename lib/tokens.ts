/**
 * BADİ colour tokens: the single source for Tailwind (tailwind.config.ts) and for
 * places that cannot use classes (share images, the browser theme colour).
 * Dark-first palette with a single strong accent.
 */

// Electric green — growth, conversion, "positive delta" on numbers. Approved brand accent.
export const accent = {
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
} as const;

export const line = {
  DEFAULT: "#1E2228",
  strong: "#2B3038",
} as const;

export const colors = {
  // Page and layer backgrounds, darkest to lightest.
  canvas: "#07080A",
  surface: {
    DEFAULT: "#0C0E11",
    raised: "#121519",
    overlay: "#181C21",
  },
  // Borders and dividers.
  line,
  // Text.
  fg: {
    DEFAULT: "#F4F5F7",
    muted: "#A1A8B3",
    // ≥4.5:1 on every background layer (canvas 5.5, surface-overlay 4.7).
    subtle: "#7F8793",
  },
  // Occasional light sections.
  paper: "#F6F7F9",
  ink: "#0B0D10",
  accent,
  // Data states for metrics and dashboards.
  positive: "#2EF08A",
  negative: "#FF5C5C",
  warning: "#FFB547",
} as const;
