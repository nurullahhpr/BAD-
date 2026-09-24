"use client";

import { motion, type Transition } from "framer-motion";
import type { ComponentType } from "react";
import type { PillarId } from "@/lib/content/home";
import { draw, easeOutExpo } from "@/lib/motion";

// Line-art illustrations for each pillar. Strokes draw in when the parent card
// reaches its "visible" variant.

function stroke(order: number): Transition {
  return { duration: 0.9, ease: easeOutExpo, delay: 0.25 + order * 0.12 };
}

const base = "fill-none stroke-line-strong";
const accent = "fill-none stroke-accent";

function OperationsGlyph() {
  const rows = [16, 40, 64];
  return (
    <>
      {rows.map((y, i) => (
        <g key={y}>
          <motion.rect
            x="48"
            y={y}
            width="144"
            height="16"
            rx="8"
            className={base}
            variants={draw}
            transition={stroke(i)}
          />
          <motion.path
            d={`M72 ${y + 8} H${i === 2 ? 112 : 140}`}
            className="fill-none stroke-fg-subtle"
            strokeLinecap="round"
            variants={draw}
            transition={stroke(i + 0.5)}
          />
          {i < 2 ? (
            <motion.path
              d={`M56.5 ${y + 8} l2.5 2.5 l4.5 -5`}
              className={accent}
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={draw}
              transition={stroke(i + 1)}
            />
          ) : (
            // Partially drawn ring reads as "in progress".
            <motion.circle
              cx="60"
              cy={y + 8}
              r="3.5"
              className={accent}
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: { pathLength: 0.65, opacity: 1 },
              }}
              transition={stroke(i + 1)}
            />
          )}
        </g>
      ))}
    </>
  );
}

function GrowthGlyph() {
  const line = "M24 74 L60 66 L92 70 L124 50 L156 54 L188 32 L216 18";
  return (
    <>
      <motion.path
        d="M24 82 H216"
        className={base}
        variants={draw}
        transition={stroke(0)}
      />
      <motion.path
        d={`${line} L216 82 L24 82 Z`}
        className="fill-accent/10"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        transition={{ duration: 0.8, delay: 1 }}
      />
      <motion.path
        d={line}
        className={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
        transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.4 }}
      />
      <motion.circle
        cx="216"
        cy="18"
        r="3"
        className="fill-accent"
        variants={{ hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1 } }}
        transition={{ duration: 0.4, delay: 1.3 }}
      />
    </>
  );
}

function InfrastructureGlyph() {
  const nodes = [
    { x: 48, y: 22, d: "M110 48 H84 V22 H54" },
    { x: 48, y: 74, d: "M110 48 H84 V74 H54" },
    { x: 192, y: 22, d: "M130 48 H156 V22 H186" },
    { x: 192, y: 74, d: "M130 48 H156 V74 H186" },
  ];
  return (
    <>
      {nodes.map((node, i) => (
        <g key={node.d}>
          <motion.path
            d={node.d}
            className={base}
            variants={draw}
            transition={stroke(i * 0.5 + 1)}
          />
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="6"
            className={base}
            variants={draw}
            transition={stroke(i * 0.5 + 1.5)}
          />
        </g>
      ))}
      <motion.rect
        x="110"
        y="38"
        width="20"
        height="20"
        rx="5"
        className={accent}
        strokeWidth="1.5"
        variants={draw}
        transition={stroke(0)}
      />
      <motion.circle
        cx="120"
        cy="48"
        r="2.5"
        className="fill-accent"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        transition={{ duration: 0.4, delay: 0.6 }}
      />
    </>
  );
}

const glyphs: Record<PillarId, ComponentType> = {
  administration: OperationsGlyph,
  development: GrowthGlyph,
  infrastructure: InfrastructureGlyph,
};

export function PillarGlyph({ id }: { id: PillarId }) {
  const Glyph = glyphs[id];
  return (
    <svg
      viewBox="0 0 240 96"
      aria-hidden="true"
      className="h-full w-full"
    >
      <Glyph />
    </svg>
  );
}
