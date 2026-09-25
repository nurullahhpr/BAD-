import Image from "next/image";
import { cn } from "@/lib/cn";
import type { TeamMember } from "@/lib/content/about";
import { pillars } from "@/lib/content/home";
import { pillarTheme } from "@/lib/pillarTheme";

/** Portrait, name, role and pillar tag. Falls back to a neutral placeholder until photos arrive. */
export function TeamCard({ member }: { member: TeamMember }) {
  const pillar = member.pillar ? pillars.find((item) => item.id === member.pillar) : undefined;

  return (
    <div className="group h-full overflow-hidden rounded-card bg-surface transition-colors duration-200 hover:bg-surface-raised">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-raised">
        {member.photo ? (
          <Image
            src={member.photo.src}
            alt={member.photo.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 18rem, 50vw"
            className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
          />
        ) : (
          <PortraitPlaceholder />
        )}
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-sm font-medium text-fg sm:text-base">{member.name}</h3>
        <p className="mt-1 text-xs leading-relaxed text-fg-muted sm:text-sm">{member.role}</p>
        {pillar && (
          <p
            lang="en"
            className={cn(
              "mt-3 inline-flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-wider font-medium",
              pillarTheme[pillar.id].text,
            )}
          >
            <span aria-hidden="true" className={cn("size-1.5 rounded-full", pillarTheme[pillar.id].dot)} />
            {pillar.name}
          </p>
        )}
      </div>
    </div>
  );
}

function PortraitPlaceholder() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <svg viewBox="0 0 120 150" fill="none" className="absolute inset-x-0 bottom-0 mx-auto w-3/4 text-line-strong">
        <circle cx="60" cy="58" r="24" fill="currentColor" />
        <path d="M14 150c0-30 20-50 46-50s46 20 46 50" fill="currentColor" />
      </svg>
    </div>
  );
}
