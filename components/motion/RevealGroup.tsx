"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { baseTransition, fadeUp, stagger } from "@/lib/motion";

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
  gap?: number;
  delay?: number;
};

/** Reveals `RevealItem` children one after another when the group enters the viewport. */
export function RevealGroup({
  children,
  className,
  as = "div",
  gap = 0.1,
  delay = 0,
}: RevealGroupProps) {
  const Tag = m[as];

  return (
    <Tag
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </Tag>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
};

export function RevealItem({ children, className, as = "div" }: RevealItemProps) {
  const Tag = m[as];

  return (
    <Tag className={className} variants={fadeUp} transition={baseTransition}>
      {children}
    </Tag>
  );
}
