"use client";

import { motion } from "framer-motion";
import { useState, type KeyboardEvent, type PointerEvent } from "react";
import { easeOutExpo } from "@/lib/motion";
import { useElementWidth } from "@/lib/useElementWidth";
import { formatTick, formatValue, niceScale, type ValueFormat } from "./scale";

type LineChartProps = {
  /** Names the series; used for the accessible summary. */
  title: string;
  values: number[];
  labels: string[];
  format?: ValueFormat;
  /** Which x labels to print, for wide and narrow plots. */
  xTicks: { wide: number[]; narrow: number[] };
  /** Index where "after" starts: earlier points draw grey, later ones in the accent. */
  splitIndex?: number;
  splitLabel?: string;
  height?: number;
};

const MARGIN = { top: 16, right: 12, bottom: 28, left: 56 };

// Single-series line: 2px stroke, 10% wash, hairline grid, end dot with a surface
// ring, crosshair + tooltip on pointer and arrow keys. An optional split marks
// a before/after boundary (e.g. the day BADİ started).
export function LineChart({
  title,
  values,
  labels,
  format = "lira",
  xTicks,
  splitIndex,
  splitLabel,
  height = 220,
}: LineChartProps) {
  const [ref, width] = useElementWidth<HTMLDivElement>();
  const [active, setActive] = useState<number | null>(null);

  const count = values.length;
  const peak = Math.max(...values);
  const { max, ticks } = niceScale(peak);
  const plotWidth = Math.max(width - MARGIN.left - MARGIN.right, 0);
  const plotHeight = height - MARGIN.top - MARGIN.bottom;
  const x = (i: number) => MARGIN.left + (i / (count - 1)) * plotWidth;
  const y = (v: number) => MARGIN.top + plotHeight * (1 - v / max);

  const pathFor = (from: number, to: number) =>
    values
      .slice(from, to + 1)
      .map((v, i) => `${i === 0 ? "M" : "L"}${x(from + i).toFixed(1)},${y(v).toFixed(1)}`)
      .join(" ");

  const split = splitIndex ?? 0;
  const accentLine = pathFor(split, count - 1);
  const greyLine = split > 0 ? pathFor(0, split) : null;
  const area = `${accentLine} L${x(count - 1).toFixed(1)},${y(0).toFixed(1)} L${x(split).toFixed(1)},${y(0).toFixed(1)} Z`;

  const low = Math.min(...values);
  const summary = `${title}, ${labels[0]}–${labels[count - 1]}: en düşük ${formatValue(low, format)}, en yüksek ${formatValue(peak, format)}.`;

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
  const lineTransition = {
    d: { duration: 0.6, ease: easeOutExpo },
    pathLength: { duration: 1.4, ease: easeOutExpo },
  };

  return (
    <div
      ref={ref}
      tabIndex={0}
      role="img"
      aria-label={summary}
      onKeyDown={handleKey}
      // Keyboard focus starts the readout on the latest point; pointer focus keeps the pointed one.
      onFocus={(event) => {
        if (event.currentTarget.matches(":focus-visible")) setActive(count - 1);
      }}
      onBlur={() => setActive(null)}
      className="relative rounded-lg"
      style={{ height }}
    >
      {width > 0 && (
        <svg
          width={width}
          height={height}
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
              <line x1={MARGIN.left} x2={width - MARGIN.right} y1={y(tick)} y2={y(tick)} className="stroke-line" />
              <text
                x={MARGIN.left - 10}
                y={y(tick)}
                dy="0.32em"
                textAnchor="end"
                className="fill-fg-subtle font-mono text-[10px] tabular-nums"
              >
                {formatTick(tick, format)}
              </text>
            </g>
          ))}

          {xTicks[plotWidth < 360 ? "narrow" : "wide"].map((index) => (
            <text
              key={index}
              x={x(index)}
              y={height - 8}
              textAnchor={index === 0 ? "start" : index === count - 1 ? "end" : "middle"}
              className="fill-fg-subtle font-mono text-[10px]"
            >
              {labels[index]}
            </text>
          ))}

          {split > 0 && (
            <g>
              <line
                x1={x(split)}
                x2={x(split)}
                y1={MARGIN.top}
                y2={MARGIN.top + plotHeight}
                className="stroke-line-strong"
              />
              {splitLabel && (
                <text
                  x={x(split) + 6}
                  y={MARGIN.top + 4}
                  dy="0.32em"
                  className="fill-fg-muted font-mono text-[10px]"
                >
                  {splitLabel}
                </text>
              )}
            </g>
          )}

          <motion.path
            className="fill-accent/10"
            initial={false}
            animate={{ d: area }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          />
          {greyLine && (
            <motion.path
              className="fill-none stroke-fg-subtle"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ d: greyLine, pathLength: 0 }}
              animate={{ d: greyLine }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={lineTransition}
            />
          )}
          <motion.path
            className="fill-none stroke-accent"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ d: accentLine, pathLength: 0 }}
            animate={{ d: accentLine }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={lineTransition}
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
                className={`${active < split ? "fill-fg-subtle" : "fill-accent"} stroke-surface`}
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
          <p className="text-sm font-semibold text-fg">{formatValue(values[active] ?? 0, format)}</p>
          <p className="text-xs text-fg-subtle">{labels[active]}</p>
        </div>
      )}
    </div>
  );
}
