import type { Profile } from "@/lib/types";

export default function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-charcoal-700/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 font-mono text-[11px] text-gray-600 sm:flex-row sm:px-6">
        <span>
          <span className="text-cyan-dim">$</span> exit 0 — built by{" "}
          {profile.name}
        </span>
        <span>Next.js · Framer Motion · Lenis</span>
      </div>
    </footer>
  );
}
