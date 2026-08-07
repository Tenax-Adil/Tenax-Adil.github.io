import BentoCard from "../bento/BentoCard";
import SectionHeading from "../ui/SectionHeading";
import type { Portfolio, Profile } from "@/lib/types";

/**
 * Closing cell. Deliberately a single wide card rather than a grid — the page
 * has been modular the whole way down, so ending on one unbroken surface reads
 * as a full stop.
 */
export default function Contact({
  contact,
  socials,
}: {
  contact: Portfolio["contact"];
  socials: Profile["socials"];
}) {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 sm:pb-32"
    >
      <SectionHeading index="03 / contact" title="Get in touch" />

      <BentoCard accent="cyan" padded={false}>
        <div className="relative px-6 py-12 sm:px-12 sm:py-16">
          {/* soft cyan bloom behind the CTA */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-cyan/5 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl text-center">
            <h3 className="font-mono text-2xl font-semibold tracking-tight text-gray-50 sm:text-3xl">
              {contact.heading}
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-gray-400">
              {contact.body}
            </p>

            <a
              href={`mailto:${contact.email}`}
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-cyan/25 bg-cyan/5 px-6 py-3 font-mono text-sm text-cyan transition-all duration-300 hover:border-cyan/50 hover:bg-cyan/10 hover:shadow-glow-cyan"
            >
              <span className="text-cyan-dim">$</span>
              {contact.cta}
            </a>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-xs text-gray-500 transition-colors hover:text-gray-200"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </BentoCard>
    </section>
  );
}
