import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  /** Id for the h2, referenced by the section's aria-labelledby. */
  titleId: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
  /** Eyebrow colour class, e.g. a pillar tone. */
  tone?: string;
};

/** Eyebrow + h2 + optional lead, identical across every home section. */
export function SectionHeader({
  eyebrow,
  title,
  titleId,
  body,
  align = "left",
  className,
  tone,
}: SectionHeaderProps) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        id={titleId}
        className="mt-5 text-balance text-3xl font-medium tracking-tight text-fg sm:text-4xl"
      >
        {title}
      </h2>
      {body && <p className="mt-5 text-pretty leading-relaxed text-fg-muted">{body}</p>}
    </Reveal>
  );
}
