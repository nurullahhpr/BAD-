"use client";

import { m } from "framer-motion";
import type { AriaRole, ReactNode } from "react";
import { baseTransition, fadeUp } from "@/lib/motion";

type RevealProps = {
  children?: ReactNode;
  className?: string;
  delay?: number;
  role?: AriaRole;
};

/** Fades content up once when it enters the viewport. */
export function Reveal({ children, className, delay = 0, role }: RevealProps) {
  return (
    <m.div
      role={role}
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ ...baseTransition, delay }}
    >
      {children}
    </m.div>
  );
}
