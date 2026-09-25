import type { Metadata } from "next";
import { AboutPage } from "@/components/sections/about/AboutPage";
import { aboutPage } from "@/lib/content/about";

export const metadata: Metadata = {
  title: `${aboutPage.hero.eyebrow} — ${aboutPage.hero.title}`,
  description: aboutPage.hero.body,
};

export default function AboutRoute() {
  return <AboutPage />;
}
