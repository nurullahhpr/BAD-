import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Absolute origin for canonical URLs, Open Graph, sitemap and structured data.
 * PLACEHOLDER: set NEXT_PUBLIC_SITE_URL to the production domain before launch.
 * On Vercel the production domain is used automatically until then.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return new URL(path, `${siteUrl}/`).href;
}

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/iletisim". Becomes the canonical URL. */
  path: string;
  /** Skip the " · BADİ" title template (home page). */
  absoluteTitle?: boolean;
};

/**
 * Title, description, canonical URL, Open Graph and Twitter tags for one page.
 * The share image comes from the route's `opengraph-image.tsx`.
 */
export function pageMetadata({ title, description, path, absoluteTitle = false }: PageMetaInput): Metadata {
  // Draft headlines often end with a full stop; titles read better without it.
  const clean = title.replace(/\.$/, "");
  const shareTitle = absoluteTitle ? clean : `${clean} · ${siteConfig.name}`;

  return {
    title: absoluteTitle ? { absolute: clean } : clean,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: shareTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
    },
  };
}
