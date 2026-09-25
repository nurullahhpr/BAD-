import { CtaPanel } from "@/components/ui/CtaPanel";
import { finalCta } from "@/lib/content/home";

export function FinalCta() {
  return (
    <CtaPanel
      id="iletisim"
      title={finalCta.title}
      body={finalCta.body}
      cta={finalCta.cta}
      href={finalCta.href}
      fineprint={finalCta.fineprint}
    />
  );
}
