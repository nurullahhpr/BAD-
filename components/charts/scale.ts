import { formatLiraCompact, formatNumber } from "@/lib/format";

/** How chart values are printed. Passed as a name so server components can choose it. */
export type ValueFormat = "lira" | "number" | "ratio";

/** Rounds a raw step up to 1, 2, 2.5 or 5 × 10ⁿ so axis ticks stay clean. */
export function niceStep(raw: number): number {
  const power = 10 ** Math.floor(Math.log10(raw));
  const n = raw / power;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return step * power;
}

/** Zero-based axis with about three clean intervals above the peak. */
export function niceScale(peak: number): { max: number; ticks: number[] } {
  const step = niceStep(peak / 3);
  const max = Math.ceil(peak / step) * step;
  const ticks = Array.from({ length: Math.round(max / step) + 1 }, (_, i) => i * step);
  return { max, ticks };
}

export function formatValue(value: number, format: ValueFormat): string {
  if (format === "lira") return formatLiraCompact(value);
  if (format === "ratio") return `${formatNumber(value, 1)}x`;
  return formatNumber(Math.round(value));
}

/** Short axis tick: "50 bin", "1,5 Mn" for lira; grouped digits for counts. */
export function formatTick(value: number, format: ValueFormat): string {
  if (value === 0) return "0";
  if (format === "number") return formatNumber(value);
  if (format === "ratio") return `${formatNumber(value, Number.isInteger(value) ? 0 : 1)}x`;
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `${formatNumber(m, Number.isInteger(m) ? 0 : 1)} Mn`;
  }
  const k = value / 1000;
  return `${formatNumber(k, Number.isInteger(k) ? 0 : 1)} bin`;
}
