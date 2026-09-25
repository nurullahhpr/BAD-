/**
 * BADİ colour tokens: the single source for Tailwind (tailwind.config.ts) and for
 * places that cannot use classes (share images, the browser theme colour).
 * Dark-first navy-violet palette with a single strong accent.
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
  // Hairlines one step above the surfaces: dividers stay visible, card edges nearly vanish.
  DEFAULT: "#2A2842",
  strong: "#3A3854",
} as const;

export const colors = {
  // Page and layer backgrounds, darkest to lightest. Navy-violet neutrals, not pure black:
  // layers are told apart by tone, borders are secondary.
  canvas: "#171628",
  surface: {
    DEFAULT: "#1F1D33",
    raised: "#27253D",
    overlay: "#302E48",
  },
  // Borders and dividers.
  line,
  // Text, cool lavender-grey to match the surfaces.
  fg: {
    DEFAULT: "#F5F5FA",
    muted: "#B4B3C9",
    // ≥4.5:1 on every background layer (canvas 6.1, surface-overlay 4.5).
    subtle: "#9896B2",
  },
  // Occasional light sections.
  paper: "#F6F7F9",
  ink: "#0B0D10",
  accent,
  // Data states for metrics and dashboards.
  positive: "#2EF08A",
  negative: "#FF6B6B",
  warning: "#FFB547",
} as const;
