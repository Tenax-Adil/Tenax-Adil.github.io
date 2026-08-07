import HeroTerminal from "@/components/hero/HeroTerminal";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import {
  getContact,
  getProfile,
  getProjects,
  getSkills,
  getStats,
} from "@/lib/data";

/**
 * Every section is fed from data/portfolio.json via the lib/data accessors.
 * Nothing on this page is hardcoded content — editing the JSON is the only
 * step needed to change what ships.
 */
export default function Page() {
  const profile = getProfile();

  return (
    <>
      <Nav profile={profile} />

      <main id="top" className="relative">
        <HeroTerminal profile={profile} />

        {/* The grid rides above the pinned hero so the hero can dissolve under it. */}
        <div className="relative z-10 bg-charcoal-950">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal-950 to-transparent"
          />
          <Projects projects={getProjects()} />
          <About profile={profile} skills={getSkills()} stats={getStats()} />
          <Contact contact={getContact()} socials={profile.socials} />
          <Footer profile={profile} />
        </div>
      </main>
    </>
  );
}
