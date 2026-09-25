import { CtaPanel } from "@/components/ui/CtaPanel";
import { PageHero } from "@/components/ui/PageHero";
import { contactHref } from "@/lib/contactHref";
import { aboutPage } from "@/lib/content/about";
import { finalCta } from "@/lib/content/home";
import { Mission } from "./Mission";
import { Principles } from "./Principles";
import { Story } from "./Story";
import { Team } from "./Team";

/** /hakkimizda page body: founding story, mission, principles, team. */
export function AboutPage() {
  const { hero, cta } = aboutPage;

  return (
    <>
      <PageHero
        crumbs={[{ label: "Ana sayfa", href: "/" }, { label: hero.eyebrow }]}
        eyebrow={hero.eyebrow}
        title={hero.title}
        body={hero.body}
      />
      <Story />
      <Mission />
      <Principles />
      <Team />
      <CtaPanel
        id="iletisim"
        title={cta.title}
        body={cta.body}
        cta={cta.label}
        href={contactHref()}
        fineprint={finalCta.fineprint}
      />
    </>
  );
}
