import { aboutPage } from "@/lib/content/about";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "BADİ — Hakkımızda";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: aboutPage.hero.eyebrow, title: aboutPage.hero.title });
}
