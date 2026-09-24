"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { formatNumber } from "@/lib/format";
import { easeOutExpo } from "@/lib/motion";

type CountUpProps = {
  value: number;
  decimals?: number;
  duration?: number;
  delay?: number;
  className?: string;
};

/**
 * Counts from 0 to `value` once it enters the viewport.
 * Visual only: pair it with a screen-reader copy of the final value.
 */
export function CountUp({
  value,
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
      node.textContent = formatNumber(0, decimals);
      return;
    }

    const controls = animate(0, value, {
      duration,
      delay,
      ease: easeOutExpo,
      onUpdate: (latest) => {
        node.textContent = formatNumber(latest, decimals);
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, decimals, duration, delay]);

  // Server HTML holds the final value, so no-JS visitors still see real numbers.
  return (
    <span ref={ref} aria-hidden="true" className={className}>
      {formatNumber(value, decimals)}
    </span>
  );
}
