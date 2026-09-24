import { cn } from "@/lib/cn";

type GridBackdropProps = {
  /** Which edge the grid fades from and the accent glow sits on. */
  from?: "top" | "bottom";
  className?: string;
};

/** Static version of the hero backdrop: hairline grid plus a soft accent glow. */
export function GridBackdrop({ from = "top", className }: GridBackdropProps) {
  const top = from === "top";
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <div
        className={cn(
          "absolute inset-0 bg-grid bg-size-[4rem_4rem]",
          top
            ? "[mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
            : "[mask-image:radial-gradient(ellipse_70%_60%_at_50%_100%,black,transparent)]",
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 size-[48rem] -translate-x-1/2 bg-accent-glow",
          top ? "-top-96" : "-bottom-96",
        )}
      />
    </div>
  );
}
