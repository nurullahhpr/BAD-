import type { Metadata } from "next";
import { Architecture } from "@/components/sections/architecture/Architecture";
import { Comparison } from "@/components/sections/comparison/Comparison";
import { FinalCta } from "@/components/sections/cta/FinalCta";
import { DashboardShowcase } from "@/components/sections/dashboard/DashboardShowcase";
import { Hero } from "@/components/sections/hero/Hero";
import { ProblemSolution } from "@/components/sections/problem/ProblemSolution";
import { Program } from "@/components/sections/program/Program";
import { Results } from "@/components/sections/results/Results";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <Architecture />
      <Comparison />
      <Program />
      <Results />
      <DashboardShowcase />
      <FinalCta />
    </>
  );
}
