"use client";

import { motion } from "framer-motion";
import { useState, type KeyboardEvent } from "react";
import { easeOutExpo } from "@/lib/motion";
import { useElementWidth } from "@/lib/useElementWidth";
import { formatTick, formatValue, niceScale, type ValueFormat } from "./scale";

type BarChartProps = {
  title: string;
  values: number[];
  labels: string[];
  format?: ValueFormat;
  /** Bars from this index on are "after" (accent); earlier bars are grey. */
  splitIndex?: number;
  height?: number;
};

const MARGIN = { top: 16, right: 8, bottom: 28, left: 56 };
const MAX_BAR = 24;
const RADIUS = 4;

/** Column path: square at the baseline, 4px rounded data end. */
function columnPath(x: number, y: number, w: number, h: number): string {
  const r = Math.min(RADIUS, w / 2, h);
  return `M${x},${y + h} V${y + r} Q${x},${y} ${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h} Z`;
}

// Column chart: bars grow from one baseline, capped at 24px, each band is the
// hover/focus target and shows its value in a tooltip. Last bar is labelled.
export function BarChart({
  title,
  values,
  labels,
  format = "number",
  splitIndex = 0,
  height = 220,
}: BarChartProps) {
  const [ref, width] = useElementWidth<HTMLDivElement>();
  const [active, setActive] = useState<number | null>(null);

  const count = values.length;
  const peak = Math.max(...values);
  const { max, ticks } = niceScale(peak);
  const plotWidth = Math.max(width - MARGIN.left - MARGIN.right, 0);
  const plotHeight = height - MARGIN.top - MARGIN.bottom;
  const band = plotWidth / count;
  const barWidth = Math.min(MAX_BAR, band * 0.6);
  const bandX = (i: number) => MARGIN.left + i * band;
  const barX = (i: number) => bandX(i) + (band - barWidth) / 2;
  const y = (v: number) => MARGIN.top + plotHeight * (1 - v / max);
  const baseline = y(0);

  const summary = `${title}, ${labels[0]}–${labels[count - 1]}: ${formatValue(values[0] ?? 0, format)} → ${formatValue(values[count - 1] ?? 0, format)}.`;

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 1 : -1;
    setActive((index) => Math.min(count - 1, Math.max(0, (index ?? count - 1) + delta)));
  }

  const last = count - 1;
  const activeCenter = active === null ? 0 : bandX(active) + band / 2;
  const tooltipAlign =
    activeCenter < 90 ? "translate-x-0" : activeCenter > width - 90 ? "-translate-x-full" : "-translate-x-1/2";

  return (
    <div
      ref={ref}
      tabIndex={0}
      role="img"
      aria-label={summary}
      onKeyDown={handleKey}
      onFocus={(event) => {
        if (event.currentTarget.matches(":focus-visible")) setActive(last);
      }}
      onBlur={() => setActive(null)}
      className="relative rounded-lg"
      style={{ height }}
    >
      {width > 0 && (
        <motion.svg
          width={width}
          height={height}
          className="block touch-pan-y"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
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

          {values.map((value, i) => {
            const top = y(value);
            const after = i >= splitIndex;
            return (
              <g key={labels[i]}>
                <motion.path
                  d={columnPath(barX(i), top, barWidth, baseline - top)}
                  className={
                    active === i
                      ? after ? "fill-accent-300" : "fill-fg-muted"
                      : after ? "fill-accent" : "fill-line-strong"
                  }
                  style={{ originY: 1, transformBox: "fill-box" }}
                  variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1 } }}
                  transition={{ duration: 0.6, ease: easeOutExpo, delay: i * 0.04 }}
                />
                {/* The whole band is the hit target, not just the painted bar. */}
                <rect
                  x={bandX(i)}
                  y={MARGIN.top}
                  width={band}
                  height={plotHeight}
                  className="fill-transparent"
                  onPointerEnter={() => setActive(i)}
                  onPointerDown={() => setActive(i)}
                />
                <text
                  x={bandX(i) + band / 2}
                  y={height - 8}
                  textAnchor="middle"
                  className="fill-fg-subtle font-mono text-[10px]"
                >
                  {labels[i]}
                </text>
              </g>
            );
          })}

          {active === null && (
            <text
              x={barX(last) + barWidth / 2}
              y={y(values[last] ?? 0) - 8}
              textAnchor="middle"
              className="fill-fg font-mono text-[11px] font-medium"
            >
              {formatValue(values[last] ?? 0, format)}
            </text>
          )}
        </motion.svg>
      )}

      {active !== null && width > 0 && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 rounded-lg border border-line-strong bg-surface-overlay px-3 py-2 shadow-window ${tooltipAlign}`}
          style={{ left: activeCenter }}
        >
          <p className="text-sm font-semibold text-fg">{formatValue(values[active] ?? 0, format)}</p>
          <p className="text-xs text-fg-subtle">{labels[active]}</p>
        </div>
      )}
    </div>
  );
}
