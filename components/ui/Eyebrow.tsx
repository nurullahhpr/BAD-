import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

/** Small mono label shown above section headings. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-mono text-xs uppercase tracking-[0.2em] text-accent",
        className,
      )}
    >
      {children}
    </p>
  );
}
