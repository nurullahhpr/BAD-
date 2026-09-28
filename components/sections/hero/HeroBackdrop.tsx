import { Parallax } from "@/components/motion/ScrollScene";

// Decorative grid and accent glow. Drifts down slower than the page for depth.
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <Parallax y={140} className="absolute inset-0">
        <div className="absolute inset-0 bg-grid bg-size-[4rem_4rem] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-64 left-1/2 size-[56rem] -translate-x-1/2 bg-accent-glow lg:left-[70%]" />
      </Parallax>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-canvas" />
    </div>
  );
}
