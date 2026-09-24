"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  createContext,
  useContext,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

const ScrollSceneContext = createContext<MotionValue<number> | null>(null);

type ScrollSceneProps = ComponentPropsWithoutRef<"section">;

/**
 * Section that tracks its own scroll-out progress (0 at rest, 1 when it has left the top).
 * `Parallax` children read that progress.
 */
export function ScrollScene({ children, ...props }: ScrollSceneProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <ScrollSceneContext.Provider value={scrollYProgress}>
      <section ref={ref} {...props}>
        {children}
      </section>
    </ScrollSceneContext.Provider>
  );
}

type ParallaxProps = {
  children?: ReactNode;
  className?: string;
  /** Pixels moved while the scene scrolls out. Negative moves up. */
  y?: number;
  /** Fade to transparent while the scene scrolls out. */
  fade?: boolean;
};

function useSceneProgress(): MotionValue<number> {
  const progress = useContext(ScrollSceneContext);
  if (!progress) throw new Error("Parallax must be used inside ScrollScene.");
  return progress;
}

export function Parallax({ children, className, y = 0, fade = false }: ParallaxProps) {
  const progress = useSceneProgress();
  const reduceMotion = useReducedMotion();
  const translateY = useTransform(progress, [0, 1], [0, y]);
  const opacity = useTransform(progress, [0, 0.8], [1, fade ? 0 : 1]);

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} style={{ y: translateY, opacity }}>
      {children}
    </motion.div>
  );
}
