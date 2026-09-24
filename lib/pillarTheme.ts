import type { PillarId } from "@/lib/content/home";

/**
 * Per-pillar tone. Every tone is a step of the single brand accent (no second hue);
 * the stronger difference between pillars lives in their icon frames.
 */
export type PillarTone = {
  text: string;
  border: string;
  soft: string;
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
    dot: "bg-accent-300",
    stroke: "stroke-accent-300",
    fill: "fill-accent-300",
    wash: "fill-accent-300/10",
  },
  development: {
    text: "text-accent",
    border: "border-accent/40",
    soft: "bg-accent/10",
    dot: "bg-accent",
    stroke: "stroke-accent",
    fill: "fill-accent",
    wash: "fill-accent/10",
  },
  infrastructure: {
    text: "text-accent-500",
    border: "border-accent-500/40",
    soft: "bg-accent-500/10",
    dot: "bg-accent-500",
    stroke: "stroke-accent-500",
    fill: "fill-accent-500",
    wash: "fill-accent-500/10",
  },
};
