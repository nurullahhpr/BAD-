"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import { easeOutExpo } from "@/lib/motion";

type CountUpProps = {
  value: number;
  /** Starting value, e.g. the "before" figure in a before/after comparison. */
  from?: number;
  decimals?: number;
  duration?: number;
  delay?: number;
  className?: string;
};

/**
 * Counts from `from` to `value` once it enters the viewport.
 * Visual only: pair it with a screen-reader copy of the final value.
 */
export function CountUp({
  value,
  from = 0,
  decimals = 0,
  duration = 1.6,
  delay = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduceMotion) {
      node.textContent = formatNumber(value, decimals);
      return;
    }
    if (!inView) {
      node.textContent = formatNumber(from, decimals);
      return;
    }

    const controls = animate(from, value, {
      duration,
      delay,
      ease: easeOutExpo,
      onUpdate: (latest) => {
        node.textContent = formatNumber(latest, decimals);
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, from, decimals, duration, delay]);

  // Invisible copies reserve the widest text so neighbours never shift while counting;
  // the live number is right-aligned in that box, like an odometer.
  // Server HTML holds the final value, so no-JS visitors still see real numbers.
  return (
    <span aria-hidden="true" className={cn("inline-grid justify-items-end tabular-nums", className)}>
      <span className="invisible col-start-1 row-start-1">{formatNumber(value, decimals)}</span>
      <span className="invisible col-start-1 row-start-1">{formatNumber(from, decimals)}</span>
      <span ref={ref} className="col-start-1 row-start-1">
        {formatNumber(value, decimals)}
      </span>
    </span>
  );
}
