"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useLenis } from "../providers/LenisProvider";
import type { Profile } from "@/lib/types";

const LINKS = [
  { label: "work", href: "#work" },
  { label: "profile", href: "#about" },
  { label: "contact", href: "#contact" },
];

/**
 * Stays out of the way during the pinned hero, then fades in once the grid
 * takes over. Clicks are handed to Lenis so the smooth scroller stays the sole
 * owner of scroll position; native jumps would desync the pin.
 */
export default function Nav({ profile }: { profile: Profile }) {
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (y) => {
    setShown(y > window.innerHeight * 2.2);
  });

  function go(e: React.MouseEvent, href: string) {
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.header
      initial={false}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : -12 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: shown ? "auto" : "none" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-charcoal-700/60 bg-charcoal-950/70 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            if (lenis) lenis.scrollTo(0);
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-mono text-xs text-gray-400 transition-colors hover:text-cyan"
        >
          <span className="text-cyan-dim">$</span> {profile.handle}
        </a>
        <div className="flex items-center gap-5 sm:gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className="font-mono text-xs text-gray-500 transition-colors hover:text-gray-100"
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
