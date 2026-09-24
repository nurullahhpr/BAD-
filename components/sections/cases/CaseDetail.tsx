import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { MetricRow } from "@/components/sections/results/CaseCard";
import { ServiceIcon } from "@/components/sections/services/ServiceIcon";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { MinusIcon, CheckIcon } from "@/components/ui/icons";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { caseMonths, caseSeries, caseSplitIndex, type CaseStudy } from "@/lib/content/cases";
import { finalCta, pillars } from "@/lib/content/home";
import { pillarTheme } from "@/lib/pillarTheme";
import { siteConfig } from "@/lib/site";

const MONTH_TICKS = { wide: [0, 1, 2, 3, 4, 5], narrow: [0, 2, 3, 5] };
const monthLabels = caseMonths.map((month) => `Ay ${month}`);

/** Detail template for one case study: /sonuclar/[slug]. */
export function CaseDetail({ study }: { study: CaseStudy }) {
  const { orders, revenue } = caseSeries(study);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Ana sayfa", href: "/" },
          { label: "Sonuçlar", href: "/sonuclar" },
          { label: study.client },
        ]}
        eyebrow={`${study.sector} · ${study.period}`}
        title={study.title}
        body={study.summary}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {study.metrics.map((metric) => (
            <div key={metric.label} className="rounded-card border border-line bg-surface p-6">
              <MetricRow metric={metric} />
            </div>
          ))}
        </div>
      </PageHero>

      <Section aria-labelledby="case-story-title">
        <Container>
          <SectionHeader eyebrow="Vaka" title="Problem ve çözüm" titleId="case-story-title" />
          <RevealGroup className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-2">
            <RevealItem className="rounded-card border border-dashed border-line-strong p-6 sm:p-8">
              <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-fg-subtle">
                <MinusIcon /> Problem
              </h3>
              <div className="mt-5 space-y-3 leading-relaxed text-fg-muted">
                {study.problem.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </RevealItem>
            <RevealItem className="rounded-card border border-accent/30 bg-accent/[0.04] p-6 sm:p-8">
              <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-accent">
                <CheckIcon /> Çözüm
              </h3>
              <div className="mt-5 space-y-3 leading-relaxed text-fg">
                {study.solution.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </RevealItem>
          </RevealGroup>
        </Container>
      </Section>

      <Section aria-labelledby="case-strategy-title">
        <Container>
          <SectionHeader
            eyebrow="BADİ Mimarisi"
            title="Uygulanan strateji"
            titleId="case-strategy-title"
            body="Her adım bir hizmet sütunundan geldi."
          />
          <RevealGroup as="ol" className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-3">
            {study.strategy.map((step, index) => {
              const pillar = pillars.find((item) => item.id === step.pillar);
              return (
                <RevealItem as="li" key={step.title} className="rounded-card border border-line bg-surface p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <ServiceIcon pillar={step.pillar} />
                    <span className="font-mono text-xs text-fg-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className={`mt-6 font-mono text-xs uppercase tracking-[0.15em] ${pillarTheme[step.pillar].text}`}>
                    {pillar?.name}
                  </p>
                  <h3 className="mt-2 text-lg font-medium tracking-tight text-fg">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-fg-muted">{step.body}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      <Section aria-labelledby="case-results-title">
        <Container>
          <SectionHeader
            eyebrow="Sonuç"
            title="Rakamlarla sonuç"
            titleId="case-results-title"
            body="BADİ başlangıcından önceki üç ay ile programın üç ayı."
          />
          <ul aria-label="Grafik açıklaması" className="mt-12 flex flex-wrap gap-6 text-sm text-fg-muted sm:mt-16">
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="h-0.5 w-4 rounded-full bg-fg-subtle" />
              BADİ öncesi
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="h-0.5 w-4 rounded-full bg-accent" />
              BADİ ile
            </li>
          </ul>
          <RevealGroup className="mt-6 grid gap-6 lg:grid-cols-2">
            <RevealItem className="rounded-card border border-line bg-surface p-5 sm:p-6">
              <h3 className="text-sm font-medium text-fg">Aylık ciro</h3>
              <p className="text-xs text-fg-subtle">₺, BADİ başlangıcına göre ay</p>
              <div className="mt-4">
                <LineChart
                  title="Aylık ciro"
                  values={revenue}
                  labels={monthLabels}
                  format="lira"
                  xTicks={MONTH_TICKS}
                  splitIndex={caseSplitIndex}
                  splitLabel="BADİ başlangıcı"
                />
              </div>
            </RevealItem>
            <RevealItem className="rounded-card border border-line bg-surface p-5 sm:p-6">
              <h3 className="text-sm font-medium text-fg">Aylık sipariş</h3>
              <p className="text-xs text-fg-subtle">Adet, BADİ başlangıcına göre ay</p>
              <div className="mt-4">
                <BarChart
                  title="Aylık sipariş"
                  values={orders}
                  labels={monthLabels}
                  format="number"
                  splitIndex={caseSplitIndex}
                />
              </div>
            </RevealItem>
          </RevealGroup>
          {/* PLACEHOLDER: drop this note once real case data is in. */}
          <p className="mt-6 text-xs text-fg-subtle">Görseldeki veriler örnektir.</p>
          <div className="mt-10">
            <ButtonLink href="/sonuclar" variant="secondary">
              ← Tüm vaka çalışmaları
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <CtaPanel
        id="iletisim"
        title={finalCta.title}
        body={finalCta.body}
        cta={finalCta.cta}
        href={siteConfig.ctaHref}
        fineprint={finalCta.fineprint}
      />
    </>
  );
}
