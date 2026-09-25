import type { MetadataRoute } from "next";
import { cases } from "@/lib/content/cases";
import { pillarIds } from "@/lib/content/services";
import { absoluteUrl } from "@/lib/seo";

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entry = (path: string, priority: number, changeFrequency: Entry["changeFrequency"] = "monthly"): Entry => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    ...pillarIds.map((id) => entry(`/hizmetler/${id}`, 0.9)),
    entry("/nasil-calisiyoruz", 0.8),
    entry("/dashboard", 0.8),
    entry("/sonuclar", 0.8, "weekly"),
    ...cases.map((study) => entry(`/sonuclar/${study.slug}`, 0.6)),
    entry("/hakkimizda", 0.7),
    entry("/iletisim", 0.8),
  ];
}
