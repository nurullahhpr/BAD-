import { CtaPanel } from "@/components/ui/CtaPanel";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { cases, casesPage, sectors } from "@/lib/content/cases";
import { finalCta } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";
import { CaseFilter } from "./CaseFilter";

/** /sonuclar page body. */
export function CasesIndex() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Ana sayfa", href: "/" }, { label: casesPage.title }]}
        eyebrow={casesPage.eyebrow}
        title={casesPage.title}
        body={casesPage.body}
      />
      <section aria-label="Vaka listesi" className="pb-24 sm:pb-32">
        <Container>
          <CaseFilter
            cases={cases}
            sectors={sectors}
            label={casesPage.filterLabel}
            allLabel={casesPage.allLabel}
          />
        </Container>
      </section>
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
