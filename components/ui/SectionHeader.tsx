import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  title: string;
  /** Id for the h2, referenced by the section's aria-labelledby. */
  titleId: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
};

/** h2 + optional lead, identical across every section. No kicker label above the title. */
export function SectionHeader({ title, titleId, body, align = "left", className }: SectionHeaderProps) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <h2 id={titleId} className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
      {body && <p className="mt-5 text-pretty leading-relaxed text-fg-muted">{body}</p>}
    </Reveal>
  );
}
