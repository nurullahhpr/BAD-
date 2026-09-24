import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type SectionProps = ComponentPropsWithoutRef<"section">;

/** Page section with the default vertical rhythm. */
export function Section({ className, ...props }: SectionProps) {
  return <section className={cn("py-24 sm:py-32", className)} {...props} />;
}
