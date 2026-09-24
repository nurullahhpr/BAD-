import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import type { PainPoint } from "@/lib/content/home";

type PainPointListProps = {
  items: PainPoint[];
};

// Dashed borders stand for the disconnected, vendor-by-vendor setup.
export function PainPointList({ items }: PainPointListProps) {
  return (
    <RevealGroup as="ul" className="space-y-3">
      {items.map((item, index) => (
        <RevealItem
          as="li"
          key={item.title}
          className="flex gap-4 rounded-xl border border-dashed border-line-strong p-5"
        >
          <span className="pt-0.5 font-mono text-xs text-fg-subtle">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-medium text-fg">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-fg-muted">{item.body}</p>
            <p className="mt-3 font-mono text-xs text-fg-subtle">
              BADİ&apos;de: <span className="text-accent">{item.pillar}</span>
            </p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
