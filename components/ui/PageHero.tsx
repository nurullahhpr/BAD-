import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GridBackdrop } from "@/components/ui/GridBackdrop";

export type Crumb = {
  label: string;
  href?: string;
};

type PageHeroProps = {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  body: string;
  /** Eyebrow colour class. */
  tone?: string;
  /** Extra content under the intro (chips, metrics). */
  children?: ReactNode;
};

/**
 * Opening block for inner pages: breadcrumb, eyebrow, h1 and intro.
 * The text renders visible (it is the LCP element); only `children` fade in.
 */
export function PageHero({ crumbs, eyebrow, title, body, tone, children }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden">
      <GridBackdrop from="top" />
      <Container className="relative pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20">
        <nav aria-label="Sayfa konumu">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-fg-subtle">
            {crumbs.map((crumb, index) => (
              <li key={crumb.label} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="inline-block py-1 transition-colors hover:text-fg">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-fg-muted">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-10 max-w-3xl">
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          <h1
            id="page-title"
            className="mt-5 text-balance text-display-sm font-medium text-fg sm:text-display-md"
          >
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-fg-muted">{body}</p>
        </div>
        {children && (
          <Reveal delay={0.08} className="mt-12">
            {children}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
