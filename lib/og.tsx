import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { pillars, type PillarId } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";
import { colors } from "@/lib/tokens";

// Shared renderer for every route's opengraph-image.tsx.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// TTF files (next/og cannot read woff2). Geist, SIL OFL 1.1: assets/fonts/OFL.txt.
const font = readFile(join(process.cwd(), "assets/fonts/Geist-Medium.ttf"));

const pillarTone: Record<PillarId, string> = {
  administration: colors.accent[300],
  development: colors.accent.DEFAULT,
  infrastructure: colors.accent[500],
};

type OgInput = {
  eyebrow: string;
  title: string;
  /** Highlights one pillar in the footer row (service pages). */
  pillar?: PillarId;
};

export async function renderOgImage({ eyebrow, title, pillar }: OgInput) {
  const sans = await font;
  // The home eyebrow is the tagline itself; show it once.
  const showTagline = eyebrow.toLocaleLowerCase("tr-TR") !== siteConfig.tagline.toLocaleLowerCase("tr-TR");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          // Flat canvas: no grid, no glow, same as the site.
          backgroundColor: colors.canvas,
          fontFamily: "Geist",
          color: colors.fg.DEFAULT,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 44, letterSpacing: "-0.03em" }}>{siteConfig.name}</div>
          {showTagline && (
            <div style={{ fontSize: 22, color: colors.fg.muted }}>
              {siteConfig.tagline}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <div style={{ fontSize: 28, color: colors.accent.DEFAULT }}>{eyebrow}</div>
          <div style={{ marginTop: 20, fontSize: 64, lineHeight: 1.1, letterSpacing: "-0.03em" }}>{title}</div>
        </div>

        <div style={{ display: "flex", gap: 36, fontSize: 22 }}>
          {pillars.map((item) => {
            const dim = pillar !== undefined && pillar !== item.id;
            return (
              <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, color: dim ? colors.fg.subtle : colors.fg.muted }}>
                <div style={{ width: 12, height: 12, borderRadius: 4, backgroundColor: dim ? colors.line.strong : pillarTone[item.id] }} />
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: sans, weight: 500, style: "normal" },
      ],
    },
  );
}
