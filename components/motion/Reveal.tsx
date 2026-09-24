"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { baseTransition, fadeUp } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Fades content up once when it enters the viewport. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ ...baseTransition, delay }}
    >
      {children}
    </motion.div>
  );
}
