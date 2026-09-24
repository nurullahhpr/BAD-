import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

// Temporary hero shell. Real content and motion arrive in the next phase.
export function HeroPlaceholder() {
  return (
    <section aria-labelledby="hero-title" className="py-24 sm:py-32">
      <Container>
        <Reveal className="space-y-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            E-Commerce Accelerator
          </p>
          <h1 id="hero-title" className="text-display-sm text-fg sm:text-display-md">
            {siteConfig.tagline}
          </h1>
          <div className="flex min-h-72 items-center justify-center rounded-card border border-dashed border-line-strong bg-surface/50">
            <span className="text-sm text-fg-subtle">Hero alanı · yakında</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
