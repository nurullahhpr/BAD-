import { cn } from "@/lib/cn";

type SparklineProps = {
  values: number[];
  className?: string;
};

const WIDTH = 100;
const HEIGHT = 28;
const PAD = 3;

/**
 * Tiny trend line for stat tiles: de-emphasised stroke, the latest point in the accent.
 * The line stretches to fit; the end dot is HTML so it stays round at any size.
 * Decorative next to its tile value, so it is hidden from assistive tech.
 */
export function Sparkline({ values, className }: SparklineProps) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const x = (i: number) => PAD + (i / (values.length - 1)) * (WIDTH - PAD * 2);
  const y = (v: number) => PAD + (1 - (v - min) / span) * (HEIGHT - PAD * 2);
  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const last = values.length - 1;

  return (
    <span aria-hidden="true" className={cn("relative block", className)}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" className="absolute inset-0 size-full">
        <polyline
          points={points}
          fill="none"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className="stroke-fg-subtle"
        />
      </svg>
      <span
        className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ left: `${(x(last) / WIDTH) * 100}%`, top: `${(y(values[last] ?? 0) / HEIGHT) * 100}%` }}
      />
    </span>
  );
}
