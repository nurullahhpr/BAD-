"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Segmented } from "@/components/sections/dashboard-page/Segmented";
import { cn } from "@/lib/cn";
import { pillars } from "@/lib/content/home";
import { easeOutExpo } from "@/lib/motion";
import { pillarTheme } from "@/lib/pillarTheme";
import { useElementWidth } from "@/lib/useElementWidth";

type Mode = "chaos" | "order";
type Point = [number, number];

type Layout = {
  width: number;
  height: number;
  font: number;
  hub: Point;
  /** Pillars stacked in one column: the spine runs group to group instead of fanning out. */
  stacked: boolean;
  /** Header anchor for each pillar (where its nodes connect). */
  headers: Point[];
  order: Point[];
  chaos: Point[];
  /** In chaos, node i is wired to node tangle[i]: lines cross everywhere. */
  tangle: number[];
};

const tangle = [4, 7, 5, 8, 2, 0, 3, 1, 6];

const landscape: Layout = {
  width: 720,
  height: 380,
  font: 13,
  hub: [360, 44],
  stacked: false,
  headers: [160, 360, 560].map((x) => [x, 128] as Point),
  order: [0, 1, 2].flatMap((c) => [0, 1, 2].map((r) => [160 + c * 200, 190 + r * 62] as Point)),
  chaos: [
    [90, 250], [610, 90], [300, 330], [470, 180], [140, 70],
    [640, 300], [380, 110], [230, 190], [520, 350],
  ],
  tangle,
};

const portrait: Layout = {
  width: 360,
  height: 620,
  font: 12,
  hub: [180, 36],
  stacked: true,
  headers: [0, 1, 2].map((k) => [180, 110 + k * 180] as Point),
  order: [0, 1, 2].flatMap((k) => [60, 180, 300].map((x) => [x, 170 + k * 180] as Point)),
  chaos: [
    [60, 420], [300, 110], [170, 560], [250, 330], [80, 150],
    [310, 500], [190, 230], [110, 300], [260, 440],
  ],
  tangle,
};

type ChaosToOrderProps = {
  labels: string[];
  toggle: Record<Mode, string>;
  captions: Record<Mode, string>;
  description: string;
};

// The founding idea as a picture: nine jobs spread over separate vendors, tangled,
// then pulled into the three BADİ pillars. Plays once on view; the toggle replays it.
export function ChaosToOrder({ labels, toggle, captions, description }: ChaosToOrderProps) {
  const [ref, width] = useElementWidth<HTMLDivElement>();
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<Mode>("chaos");
  const touched = useRef(false);

  useEffect(() => {
    if (!inView || touched.current) return;
    const timer = window.setTimeout(() => setMode("order"), reduceMotion ? 0 : 700);
    return () => window.clearTimeout(timer);
  }, [inView, reduceMotion]);

  const layout = width > 0 && width < 560 ? portrait : landscape;
  const ordered = mode === "order";
  const move = (index: number) => ({
    duration: reduceMotion ? 0 : 1.1,
    ease: easeOutExpo,
    delay: reduceMotion ? 0 : index * 0.04,
  });
  const fade = { duration: reduceMotion ? 0 : 0.4, delay: ordered && !reduceMotion ? 0.6 : 0 };

  return (
    <div className="rounded-panel border border-line bg-surface p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-fg-muted">
          {captions[mode]}
        </p>
        <Segmented
          label="Diyagram görünümü"
          value={mode}
          onChange={(value) => {
            touched.current = true;
            setMode(value);
          }}
          options={[
            { value: "chaos", label: toggle.chaos },
            { value: "order", label: toggle.order },
          ]}
        />
      </div>

      <div ref={ref} className="mt-4 rounded-xl border border-line bg-canvas">
        {width > 0 && (
          <svg viewBox={`0 0 ${layout.width} ${layout.height}`} role="img" aria-label={description} className="block w-full">
            {/* Hub and pillar headers exist only in the ordered state. */}
            <m.g initial={false} animate={{ opacity: ordered ? 1 : 0 }} transition={fade}>
              {layout.headers.map(([hx, hy], k) => {
                // Stacked: start under the previous group's middle label, not at the hub.
                const [sx, sy] =
                  layout.stacked && k > 0
                    ? [hx, layout.order[k * 3 - 2]![1] + 32]
                    : [layout.hub[0], layout.hub[1] + 16];
                return (
                  <line key={`spine-${k}`} x1={sx} y1={sy} x2={hx} y2={hy - 14} className="stroke-accent/40" />
                );
              })}
              <rect
                x={layout.hub[0] - 52}
                y={layout.hub[1] - 16}
                width={104}
                height={32}
                rx={16}
                className="fill-surface stroke-accent/60"
              />
              <text
                x={layout.hub[0]}
                y={layout.hub[1]}
                dy="0.35em"
                textAnchor="middle"
                fontSize={layout.font}
                className="fill-fg font-semibold"
              >
                BADİ
              </text>
              {layout.headers.map(([hx, hy], k) => (
                <text
                  key={`head-${k}`}
                  x={hx}
                  y={hy}
                  dy="0.35em"
                  textAnchor="middle"
                  fontSize={layout.font}
                  className={cn("font-mono", pillarTheme[pillars[k]!.id].fill)}
                  letterSpacing="0.08em"
                >
                  {/* English names: uppercase them outside the Turkish locale (no dotted İ). */}
                  {pillars[k]!.name.toLocaleUpperCase("en-US")}
                </text>
              ))}
            </m.g>

            {/* Wires: tangled between nodes, then each to its pillar header. */}
            {layout.order.map((_, i) => {
              const pillar = Math.floor(i / 3);
              const [x1, y1] = ordered ? layout.order[i]! : layout.chaos[i]!;
              const [x2, y2] = ordered
                ? [layout.headers[pillar]![0], layout.headers[pillar]![1] + 14]
                : layout.chaos[layout.tangle[i]!]!;
              return (
                <m.line
                  key={`wire-${i}`}
                  initial={false}
                  animate={{ x1, y1, x2, y2 }}
                  transition={move(i)}
                  className={ordered ? "stroke-accent/30" : "stroke-negative/40"}
                  strokeDasharray={ordered ? undefined : "4 4"}
                />
              );
            })}

            {layout.order.map((_, i) => {
              const pillar = pillars[Math.floor(i / 3)]!;
              const [cx, cy] = ordered ? layout.order[i]! : layout.chaos[i]!;
              return (
                <m.g key={`node-${i}`} initial={false} animate={{ x: cx, y: cy }} transition={move(i)}>
                  <circle
                    r={7}
                    strokeWidth={2}
                    className={cn(
                      "transition-colors duration-500",
                      ordered ? pillarTheme[pillar.id].fill : "fill-fg-subtle",
                      "stroke-canvas",
                    )}
                  />
                  <text
                    y={22}
                    textAnchor="middle"
                    fontSize={layout.font - 1}
                    className="fill-fg-muted"
                  >
                    {labels[i]}
                  </text>
                </m.g>
              );
            })}
          </svg>
        )}
        {width === 0 && <div className="aspect-[720/380]" />}
      </div>
    </div>
  );
}
