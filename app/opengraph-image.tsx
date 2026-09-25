import { hero } from "@/lib/content/home";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "BADİ — Dijital Ticaret Hızlandırıcı";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: hero.eyebrow, title: hero.headline.lead });
}
