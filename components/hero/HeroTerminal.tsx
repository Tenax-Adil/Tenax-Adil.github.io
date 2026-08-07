"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { Profile } from "@/lib/types";
import BootSequence from "./BootSequence";

/**
 * 300vh pinned scrollytelling hero.
 *
 * A tall wrapper drives `useScroll`; the inner terminal is `sticky` so it
 * stays pinned centre-screen while we scrub through three beats:
 *   1. boot   — terminal sits full-size, the shell session types itself out
 *   2. settle — the frame tightens and the identity block resolves in
 *   3. hand-off — everything scales up slightly and dissolves, revealing the
 *                 Bento grid beneath it
 *
 * Scroll progress is smoothed with `useSpring` so the pin never shows the
 * one-frame lag you get mapping raw scroll straight onto transforms.
 */
export default function HeroTerminal({ profile }: { profile: Profile }) {
  const wrapper = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapper,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  // Terminal window: holds, tightens, then blooms and fades on hand-off.
  const termScale = useTransform(progress, [0, 0.55, 0.85, 1], [1, 1, 1.04, 1.12]);
  const termOpacity = useTransform(progress, [0, 0.8, 1], [1, 1, 0]);
  const termBlur = useTransform(progress, [0.8, 1], [0, 8]);
  const termFilter = useTransform(termBlur, (b) => `blur(${b}px)`);

  // Identity block resolves in during the settle beat.
  const idOpacity = useTransform(progress, [0.4, 0.62], [0, 1]);
  const idY = useTransform(progress, [0.4, 0.62], [16, 0]);

  // Scroll hint fades out as soon as the user starts moving.
  const hintOpacity = useTransform(progress, [0, 0.08], [1, 0]);

  return (
    <section ref={wrapper} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-4">
        <motion.div
          style={{ scale: termScale, opacity: termOpacity, filter: termFilter }}
          className="w-full max-w-2xl origin-center"
        >
          <div className="overflow-hidden rounded-xl border border-charcoal-700 bg-charcoal-900/90 shadow-card backdrop-blur-sm">
            {/* title bar */}
            <div className="flex items-center gap-2 border-b border-charcoal-700 bg-charcoal-800/80 px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-gray-500">
                {profile.handle}: ~/portfolio
              </span>
            </div>

            {/* terminal body */}
            <div className="min-h-[320px] px-5 py-4 sm:px-6 sm:py-5">
              <BootSequence lines={profile.boot} />

              <motion.div
                style={{ opacity: idOpacity, y: idY }}
                className="mt-6 border-t border-charcoal-700/70 pt-5"
              >
                <h1 className="font-mono text-2xl font-semibold tracking-tight text-gray-50 sm:text-3xl">
                  {profile.name}
                </h1>
                <p className="mt-1 font-mono text-sm text-cyan">{profile.role}</p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-400">
                  {profile.tagline}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
                    {profile.status}
                  </span>
                  <span>{profile.location}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-600"
        >
          scroll ↓
        </motion.div>
      </div>
    </section>
  );
}
