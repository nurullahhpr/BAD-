import type { SchemaNode } from "@/lib/schema";

/** Renders schema.org nodes as one JSON-LD graph. `<` is escaped so text cannot close the tag. */
export function JsonLd({ nodes }: { nodes: SchemaNode[] }) {
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
