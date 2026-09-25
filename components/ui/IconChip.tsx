import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { PillarId } from "@/lib/content/home";
import { pillarTheme } from "@/lib/pillarTheme";

export type ChipTone = "neutral" | "accent" | PillarId;

const sizes = {
  sm: "size-7 rounded-lg [&>svg]:size-4",
  md: "size-10 rounded-xl [&>svg]:size-5",
  lg: "size-12 rounded-[0.875rem] [&>svg]:size-6",
} as const;

function toneClass(tone: ChipTone): string {
  if (tone === "neutral") return "bg-surface-overlay text-fg-muted";
  if (tone === "accent") return "bg-accent/15 text-accent";
  return cn(pillarTheme[tone].chip, pillarTheme[tone].text);
}

type IconChipProps = {
  tone?: ChipTone;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
};

/**
 * Soft rounded-square box that holds an icon. The tint comes from the pillar tones
 * (or the accent / a neutral layer); the icon sits on top in the matching colour.
 */
export function IconChip({ tone = "neutral", size = "md", className, children }: IconChipProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center transition-colors",
        sizes[size],
        toneClass(tone),
        className,
      )}
    >
      {children}
    </span>
  );
}
