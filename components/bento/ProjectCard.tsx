import BentoCard from "./BentoCard";
import Chip from "../ui/Chip";
import type { Project } from "@/lib/types";

const KIND_LABEL: Record<Project["kind"], string> = {
  web: "web · full-stack",
  embedded: "embedded · hardware",
};

function ArrowLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="group/link inline-flex items-center gap-1.5 font-mono text-xs text-gray-400 transition-colors hover:text-cyan"
    >
      {label}
      <span className="transition-transform duration-300 group-hover/link:translate-x-0.5">
        →
      </span>
    </a>
  );
}

/**
 * Collapses every link-ish field into one list so the JSON author can use
 * whichever is natural: an explicit `links` array, or just `liveUrl`/`repoUrl`/
 * `demoVideo`. Deduped by href so setting both doesn't double up.
 */
function resolveLinks(project: Project) {
  const out = [...(project.links ?? [])];
  const add = (label: string, href?: string) => {
    if (!href || out.some((l) => l.href === href)) return;
    out.push({ label, href });
  };
  if (project.kind === "web") {
    add("Live", project.liveUrl);
    add("Code", project.repoUrl);
  } else {
    add("Code", project.repoUrl);
    add("Demo", project.demoVideo);
  }
  return out;
}

/**
 * Renders either project shape. The `kind` discriminator decides whether we
 * surface a software stack or a hardware/firmware bill of materials — the JSON
 * stays the only place either list is edited.
 */
export default function ProjectCard({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) {
  const featured = project.featured;
  const links = resolveLinks(project);

  return (
    <BentoCard
      accent={project.accent}
      delay={delay}
      className={featured ? "md:col-span-4" : "md:col-span-2"}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span
            className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
              project.accent === "cyan" ? "text-cyan-dim" : "text-amber-dim"
            }`}
          >
            {KIND_LABEL[project.kind]}
          </span>
          <span className="font-mono text-[11px] text-gray-600">
            {project.year}
          </span>
        </div>

        <h3
          className={`mt-4 font-mono font-semibold tracking-tight text-gray-50 ${
            featured ? "text-xl sm:text-2xl" : "text-lg"
          }`}
        >
          {project.title}
        </h3>

        {project.tags.length > 0 && (
          <p className="mt-2 font-mono text-[11px] text-gray-600">
            {project.tags.join(" · ")}
          </p>
        )}

        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          {project.summary}
        </p>

        {featured && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-500">
            {project.description}
          </p>
        )}

        {featured && project.kind === "web" && project.metrics && (
          <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-charcoal-700 bg-charcoal-700 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-charcoal-800/80 px-4 py-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-600">
                  {m.label}
                </dt>
                <dd className="mt-1 font-mono text-sm text-gray-200">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.kind === "web"
            ? project.stack.map((s) => (
                <Chip key={s} label={s} tone={project.accent} />
              ))
            : project.hardware.map((h) => (
                <Chip key={h} label={h} tone={project.accent} />
              ))}
        </div>

        {project.kind === "embedded" && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.firmware.map((f) => (
              <Chip key={f} label={f} />
            ))}
          </div>
        )}

        {/* links pinned to the bottom so cards of different heights line up */}
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
          {links.map((l) => (
            <ArrowLink key={l.href} label={l.label} href={l.href} />
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
