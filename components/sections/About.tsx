import Link from "next/link";
import BentoCard from "../bento/BentoCard";
import BentoGrid from "../bento/BentoGrid";
import SectionHeading from "../ui/SectionHeading";
import Chip from "../ui/Chip";
import type { Profile, SkillGroup, StatCell } from "@/lib/types";

/**
 * The Bento payload: a bio cell, one cell per skill cluster, and a stats block
 * that packs four small metrics into a single cell. Cell spans are chosen so
 * each row sums to the grid's 6 tracks (3+3, then 2+2+2).
 */
export default function About({
  profile,
  skills,
  stats,
}: {
  profile: Profile;
  skills: SkillGroup[];
  stats: StatCell[];
}) {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32"
    >
      <SectionHeading
        index="02 / profile"
        title="Who's at the keyboard"
        blurb="Final-year electronics and computer engineering, split evenly between schematic capture and a code editor."
      />

      <BentoGrid>
        {/* bio */}
        <BentoCard accent="cyan" className="md:col-span-3">
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
              {profile.status}
            </div>
            <h3 className="mt-4 font-mono text-xl font-semibold tracking-tight text-gray-50">
              {profile.name}
            </h3>
            <p className="mt-1 font-mono text-xs text-cyan">{profile.role}</p>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              {profile.tagline}
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-6 font-mono text-xs text-gray-600">
              <span>{profile.location}</span>
              {profile.resumeUrl && (
                <Link
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-cyan"
                >
                  résumé ↗
                </Link>
              )}
            </div>
          </div>
        </BentoCard>

        {/* first skill cluster gets the wide slot beside the bio */}
        {skills[0] && <SkillCard group={skills[0]} className="md:col-span-3" delay={0.08} />}

        {/* remaining clusters */}
        {skills.slice(1).map((group, i) => (
          <SkillCard
            key={group.label}
            group={group}
            className="md:col-span-2"
            delay={0.16 + i * 0.08}
          />
        ))}

        {/* stats packed into one cell */}
        <BentoCard accent="amber" className="md:col-span-2" delay={0.32} padded={false}>
          <div className="grid h-full grid-cols-2 gap-px bg-charcoal-700">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col justify-center bg-charcoal-900 px-5 py-6"
              >
                <span
                  className={`font-mono text-lg font-semibold ${
                    s.accent === "cyan" ? "text-cyan" : "text-amber"
                  }`}
                >
                  {s.value}
                </span>
                <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-600">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </BentoCard>
      </BentoGrid>
    </section>
  );
}

function SkillCard({
  group,
  className,
  delay,
}: {
  group: SkillGroup;
  className?: string;
  delay?: number;
}) {
  return (
    <BentoCard accent={group.accent} className={className} delay={delay}>
      <div className="flex h-full flex-col">
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
            group.accent === "cyan" ? "text-cyan-dim" : "text-amber-dim"
          }`}
        >
          {group.label}
        </span>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {group.items.map((item) => (
            <Chip key={item} label={item} tone={group.accent} />
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
