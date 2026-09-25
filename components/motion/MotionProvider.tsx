"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

const loadFeatures = () => import("@/lib/motionFeatures").then((mod) => mod.default);

/**
 * Loads animation features lazily (components use the light `m.*` elements; `strict`
 * throws if a full `motion.*` element slips in) and honors the OS "reduce motion" setting.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
