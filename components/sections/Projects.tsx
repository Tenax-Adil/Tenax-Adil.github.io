import ProjectCard from "../bento/ProjectCard";
import BentoGrid from "../bento/BentoGrid";
import SectionHeading from "../ui/SectionHeading";
import type { Project } from "@/lib/types";

/**
 * Featured builds lead, side builds follow. Order comes from the `featured`
 * flag in the JSON rather than array position, so reordering the file can't
 * accidentally demote the headline project.
 */
export default function Projects({ projects }: { projects: Project[] }) {
  const ordered = [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured)
  );

  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        index="01 / work"
        title="Things I've built"
        blurb="Two halves of the same instinct — one runs in a browser, one runs on a board."
      />
      <BentoGrid>
        {ordered.map((project, i) => (
          <ProjectCard key={project.id} project={project} delay={i * 0.08} />
        ))}
      </BentoGrid>
    </section>
  );
}
