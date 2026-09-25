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
const fonts = Promise.all([
  readFile(join(process.cwd(), "assets/fonts/Geist-Medium.ttf")),
  readFile(join(process.cwd(), "assets/fonts/GeistMono-Regular.ttf")),
]);

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
  const [sans, mono] = await fonts;
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
          backgroundColor: colors.canvas,
          backgroundImage: `radial-gradient(circle at 85% 0%, ${colors.accent[900]} 0%, transparent 45%), linear-gradient(to right, ${colors.line.DEFAULT} 1px, transparent 1px), linear-gradient(to bottom, ${colors.line.DEFAULT} 1px, transparent 1px)`,
          backgroundSize: "100% 100%, 64px 64px, 64px 64px",
          fontFamily: "Geist",
          color: colors.fg.DEFAULT,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 44, letterSpacing: "-0.03em" }}>{siteConfig.name}</div>
          {showTagline && (
            <div style={{ fontFamily: "Geist Mono", fontSize: 20, letterSpacing: "0.15em", color: colors.fg.subtle }}>
              {siteConfig.tagline.toLocaleUpperCase("tr-TR")}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <div style={{ fontFamily: "Geist Mono", fontSize: 24, letterSpacing: "0.2em", color: colors.accent.DEFAULT }}>
            {eyebrow.toLocaleUpperCase("tr-TR")}
          </div>
          <div style={{ marginTop: 24, fontSize: 68, lineHeight: 1.08, letterSpacing: "-0.035em" }}>{title}</div>
        </div>

        <div style={{ display: "flex", gap: 36, fontFamily: "Geist Mono", fontSize: 20, letterSpacing: "0.12em" }}>
          {pillars.map((item) => {
            const dim = pillar !== undefined && pillar !== item.id;
            return (
              <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, color: dim ? colors.fg.subtle : colors.fg.muted }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: dim ? colors.line.strong : pillarTone[item.id] }} />
                {item.name.toLocaleUpperCase("en-US")}
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
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
