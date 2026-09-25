import type { Crumb } from "@/components/ui/PageHero";
import { pillars } from "@/lib/content/home";
import type { PillarPage } from "@/lib/content/services";
import { absoluteUrl, siteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

// schema.org structured data. Contact details are PLACEHOLDER until the real ones
// are provided (see lib/site.ts); they flow in from siteConfig.

export type SchemaNode = { "@type": string } & Record<string, unknown>;

const businessId = `${siteUrl}/#business`;
const areaServed = { "@type": "Country", name: "Türkiye" };

/** The company as a LocalBusiness. Other nodes point at it through `@id`. */
export function localBusinessSchema(): SchemaNode {
  const { contact, social } = siteConfig;
  const sameAs = social.map((item) => item.href).filter((href) => href.startsWith("http"));

  return {
    "@type": "LocalBusiness",
    "@id": businessId,
    name: siteConfig.name,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    url: absoluteUrl("/"),
    image: absoluteUrl("/opengraph-image"),
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "İstanbul",
      addressCountry: "TR",
    },
    areaServed,
    ...(sameAs.length > 0 && { sameAs }),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "BADİ Mimarisi",
      itemListElement: pillars.map((pillar) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${pillar.name} — ${pillar.scope}`,
          url: absoluteUrl(`/hizmetler/${pillar.id}`),
        },
      })),
    },
  };
}

/** One pillar as a Service, with its sub-services as an offer catalog. */
export function serviceSchema({ pillar, intro, services }: PillarPage): SchemaNode {
  const url = absoluteUrl(`/hizmetler/${pillar.id}`);

  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: `${pillar.name} — ${pillar.scope}`,
    serviceType: pillar.scope,
    description: intro,
    url,
    provider: { "@id": businessId },
    areaServed,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: pillar.scope,
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: `${url}#${service.slug}`,
        },
      })),
    },
  };
}

/** Breadcrumb trail matching the visible one; the last crumb is the current page. */
export function breadcrumbSchema(crumbs: Crumb[], path: string): SchemaNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.href ?? path),
    })),
  };
}
