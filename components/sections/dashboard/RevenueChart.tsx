"use client";

import { motion } from "framer-motion";
import { useState, type KeyboardEvent, type PointerEvent } from "react";
import { formatLiraCompact, formatNumber } from "@/lib/format";
import { easeOutExpo } from "@/lib/motion";
import { useElementWidth } from "@/lib/useElementWidth";

type RevenueChartProps = {
  title: string;
  values: number[];
  days: string[];
};

const HEIGHT = 220;
const MARGIN = { top: 12, right: 12, bottom: 28, left: 52 };
// Fewer date labels on narrow plots so they never touch.
const X_LABEL_DAYS = { wide: [0, 7, 14, 21, 29], narrow: [0, 14, 29] };

/** Rounds a raw step up to 1, 2, 2.5 or 5 × 10ⁿ so axis ticks stay clean. */
function niceStep(raw: number): number {
  const power = 10 ** Math.floor(Math.log10(raw));
  const n = raw / power;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return step * power;
}

// Single-series area chart: 2px line, 10% wash, hairline grid, end dot with a
// surface ring, crosshair + tooltip on hover and on arrow keys.
export function RevenueChart({ title, values, days }: RevenueChartProps) {
  const [ref, width] = useElementWidth<HTMLDivElement>();
  const [active, setActive] = useState<number | null>(null);

  const count = values.length;
  const peak = Math.max(...values);
  const step = niceStep(peak / 3);
  const max = Math.ceil(peak / step) * step;
  const ticks = Array.from({ length: Math.round(max / step) + 1 }, (_, i) => i * step);

  const plotWidth = Math.max(width - MARGIN.left - MARGIN.right, 0);
  const plotHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
  const x = (i: number) => MARGIN.left + (i / (count - 1)) * plotWidth;
  const y = (v: number) => MARGIN.top + plotHeight * (1 - v / max);

  const line = values
    .map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`)
    .join(" ");
  const area = `${line} L${x(count - 1).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(1)},${y(0).toFixed(1)} Z`;

  const low = Math.min(...values);
  const summary = `${title}, ${days[0]}–${days[count - 1]}: en düşük ${formatLiraCompact(low)}, en yüksek ${formatLiraCompact(peak)}.`;

  function handlePointer(event: PointerEvent<SVGSVGElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left - MARGIN.left) / plotWidth;
    setActive(Math.min(count - 1, Math.max(0, Math.round(ratio * (count - 1)))));
  }

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 1 : -1;
    setActive((index) => Math.min(count - 1, Math.max(0, (index ?? count - 1) + delta)));
  }

  const activeX = active === null ? 0 : x(active);
  const tooltipAlign =
    activeX < 90 ? "translate-x-0" : activeX > width - 90 ? "-translate-x-full" : "-translate-x-1/2";

  return (
    <div
      ref={ref}
      tabIndex={0}
      role="img"
      aria-label={summary}
      onKeyDown={handleKey}
      // Keyboard focus starts the readout on the latest day; pointer focus keeps the pointed day.
      onFocus={(event) => {
        if (event.currentTarget.matches(":focus-visible")) setActive(count - 1);
      }}
      onBlur={() => setActive(null)}
      className="relative rounded-lg"
      style={{ height: HEIGHT }}
    >
      {width > 0 && (
        <svg
          width={width}
          height={HEIGHT}
          className="block touch-pan-y"
          onPointerMove={handlePointer}
          onPointerDown={handlePointer}
          // Touch fires pointerleave right after a tap; keep the readout until the next tap.
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") setActive(null);
          }}
        >
          {ticks.map((tick) => (
            <g key={tick}>
              <line
                x1={MARGIN.left}
                x2={width - MARGIN.right}
                y1={y(tick)}
                y2={y(tick)}
                className="stroke-line"
              />
              <text
                x={MARGIN.left - 10}
                y={y(tick)}
                dy="0.32em"
                textAnchor="end"
                className="fill-fg-subtle font-mono text-[10px] tabular-nums"
              >
                {tick === 0
                  ? "0"
                  : `${formatNumber(tick / 1000, Number.isInteger(tick / 1000) ? 0 : 1)} bin`}
              </text>
            </g>
          ))}

          {X_LABEL_DAYS[plotWidth < 360 ? "narrow" : "wide"].map((index) => (
            <text
              key={index}
              x={x(index)}
              y={HEIGHT - 8}
              textAnchor={index === 0 ? "start" : index === count - 1 ? "end" : "middle"}
              className="fill-fg-subtle font-mono text-[10px]"
            >
              {days[index]}
            </text>
          ))}

          <motion.path
            className="fill-accent/10"
            initial={false}
            animate={{ d: area }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          />
          <motion.path
            className="fill-none stroke-accent"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ d: line, pathLength: 0 }}
            animate={{ d: line }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ d: { duration: 0.6, ease: easeOutExpo }, pathLength: { duration: 1.4, ease: easeOutExpo } }}
          />

          {active === null ? (
            <circle
              cx={x(count - 1)}
              cy={y(values[count - 1] ?? 0)}
              r={4}
              strokeWidth={2}
              className="fill-accent stroke-surface"
            />
          ) : (
            <g>
              <line
                x1={activeX}
                x2={activeX}
                y1={MARGIN.top}
                y2={MARGIN.top + plotHeight}
                className="stroke-fg-subtle"
              />
              <circle
                cx={activeX}
                cy={y(values[active] ?? 0)}
                r={4}
                strokeWidth={2}
                className="fill-accent stroke-surface"
              />
            </g>
          )}
        </svg>
      )}

      {active !== null && width > 0 && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 rounded-lg border border-line-strong bg-surface-overlay px-3 py-2 shadow-window ${tooltipAlign}`}
          style={{ left: activeX }}
        >
          <p className="text-sm font-semibold text-fg">{formatLiraCompact(values[active] ?? 0)}</p>
          <p className="text-xs text-fg-subtle">{days[active]}</p>
        </div>
      )}
    </div>
  );
}
