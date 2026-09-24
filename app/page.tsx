import { Architecture } from "@/components/sections/architecture/Architecture";
import { Comparison } from "@/components/sections/comparison/Comparison";
import { Hero } from "@/components/sections/hero/Hero";
import { ProblemSolution } from "@/components/sections/problem/ProblemSolution";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <Architecture />
      <Comparison />
    </>
  );
}
