import type { Transition, Variants } from "framer-motion";

/** Shared easing: fast start, soft landing. Mirrors `ease-out-expo` in Tailwind. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const baseTransition: Transition = {
  duration: 0.6,
  ease: easeOutExpo,
};

// Variants carry no transition on purpose: set it on the component so
// `delay` and parent stagger timing are not overridden.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

/** Vertical line that grows from its top edge. Pair with `origin-top`. */
export const growDown: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1 },
};

/** Horizontal line that grows out from its center. */
export const growX: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1 },
};

/** SVG stroke that draws itself in. Works on path, rect, circle and line. */
export const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
};

/** Parent variant that reveals its children one after another. */
export function stagger(gap = 0.12, delay = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: gap, delayChildren: delay } },
  };
}
