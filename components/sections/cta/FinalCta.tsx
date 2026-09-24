import { CtaPanel } from "@/components/ui/CtaPanel";
import { finalCta } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";

export function FinalCta() {
  return (
    <CtaPanel
      id="iletisim"
      title={finalCta.title}
      body={finalCta.body}
      cta={finalCta.cta}
      href={siteConfig.ctaHref}
      fineprint={finalCta.fineprint}
    />
  );
}
