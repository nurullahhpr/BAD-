import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  /** Text colour class; defaults to the brand accent. */
  tone?: string;
};

/** Small mono label shown above section headings. */
export function Eyebrow({ children, className, tone = "text-accent" }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-mono text-xs uppercase tracking-[0.2em]",
        tone,
        className,
      )}
    >
      {children}
    </p>
  );
}
