import type { PillarId } from "@/lib/content/home";

/**
 * Per-pillar tone. Every tone is a step of the single brand accent (no second hue);
 * icons sit in chips tinted with the tone, and each service has its own mark.
 */
export type PillarTone = {
  text: string;
  border: string;
  soft: string;
  /** Icon chip background: a soft tint of the tone. */
  chip: string;
  dot: string;
  stroke: string;
  fill: string;
  wash: string;
};

export const pillarTheme: Record<PillarId, PillarTone> = {
  administration: {
    text: "text-accent-300",
    border: "border-accent-300/40",
    soft: "bg-accent-300/10",
    chip: "bg-accent-300/15",
    dot: "bg-accent-300",
    stroke: "stroke-accent-300",
    fill: "fill-accent-300",
    wash: "fill-accent-300/10",
  },
  development: {
    text: "text-accent",
    border: "border-accent/40",
    soft: "bg-accent/10",
    chip: "bg-accent/15",
    dot: "bg-accent",
    stroke: "stroke-accent",
    fill: "fill-accent",
    wash: "fill-accent/10",
  },
  infrastructure: {
    text: "text-accent-500",
    border: "border-accent-500/40",
    soft: "bg-accent-500/10",
    chip: "bg-accent-500/15",
    dot: "bg-accent-500",
    stroke: "stroke-accent-500",
    fill: "fill-accent-500",
    wash: "fill-accent-500/10",
  },
};
