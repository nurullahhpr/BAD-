import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  /** Text colour class; defaults to the brand accent. */
  tone?: string;
};

/** Short sans label above section headings: tone colour, no uppercase tracking. */
export function Eyebrow({ children, className, tone = "text-accent" }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-sm font-medium",
        tone,
        className,
      )}
    >
      {children}
    </p>
  );
}
