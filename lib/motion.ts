import type { Transition, Variants } from "framer-motion";

/** Shared easing: fast start, soft landing. Mirrors `ease-out-expo` in Tailwind. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const baseTransition: Transition = {
  duration: 0.6,
  ease: easeOutExpo,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};
