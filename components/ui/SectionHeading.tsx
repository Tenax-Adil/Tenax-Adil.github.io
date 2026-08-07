"use client";

import { motion } from "framer-motion";

/**
 * Terminal-flavoured section header. The index reads like a shell comment,
 * which keeps the "engineer" half of the aesthetic present in the chrome
 * rather than only in the hero.
 */
export default function SectionHeading({
  index,
  title,
  blurb,
}: {
  index: string;
  title: string;
  blurb?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-8 sm:mb-10"
    >
      <div className="flex items-center gap-3 font-mono text-xs text-cyan-dim">
        <span className="text-cyan">//</span>
        <span className="uppercase tracking-[0.25em]">{index}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-charcoal-700 to-transparent" />
      </div>
      <h2 className="mt-3 font-mono text-2xl font-semibold tracking-tight text-gray-50 sm:text-3xl">
        {title}
      </h2>
      {blurb && (
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-400">
          {blurb}
        </p>
      )}
    </motion.div>
  );
}
