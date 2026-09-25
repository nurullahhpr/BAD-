import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "neutral" | "accent" | "positive" | "negative" | "warning";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-surface-overlay text-fg-muted",
  accent: "bg-accent/15 text-accent",
  positive: "bg-positive/15 text-positive",
  negative: "bg-negative/15 text-negative",
  warning: "bg-warning/15 text-warning",
};

type BadgeProps = {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
};

/** Small label with a soft tinted background and readable text. No border, no pill shape. */
export function Badge({ tone = "neutral", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
