type IconProps = {
  className?: string;
};

export function CheckIcon({ className }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MinusIcon({ className }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Small up/down arrow for deltas. Direction is the sign, not good/bad. */
export function TrendIcon({ direction, className }: IconProps & { direction: "up" | "down" }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d={direction === "up" ? "M6 9.5v-7M3 5.5l3-3 3 3" : "M6 2.5v7M3 6.5l3 3 3-3"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type GlyphName = "clock" | "shield" | "check" | "mail" | "phone" | "pin";

// 20px line glyphs for notes and contact details.
const glyphs: Record<GlyphName, string> = {
  clock: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM10 6.5V10l2.5 1.5",
  shield: "M10 2.75 4 5v4.5c0 3.6 2.6 6.4 6 7.75 3.4-1.35 6-4.15 6-7.75V5l-6-2.25ZM7.5 10l1.75 1.75L12.75 8.25",
  check: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM7 10.25l2 2 4-4.5",
  mail: "M3.5 5h13v10h-13zM3.5 5.5 10 10.5l6.5-5",
  phone: "M5 3.5h3l1.25 3.5-1.75 1.25a8.5 8.5 0 0 0 4.25 4.25L13 10.75l3.5 1.25v3a1.5 1.5 0 0 1-1.6 1.5C8.9 16.1 3.9 11.1 3.5 5.1A1.5 1.5 0 0 1 5 3.5Z",
  pin: "M10 17.5s5.5-4.9 5.5-9.25a5.5 5.5 0 0 0-11 0c0 4.35 5.5 9.25 5.5 9.25ZM10 10.25a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
};

export function Glyph({ name, className }: IconProps & { name: GlyphName }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d={glyphs[name]}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
