"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import type { AccentColor } from "@/lib/types";

const ACCENT_HOVER: Record<AccentColor, string> = {
  cyan: "hover:border-cyan/25 hover:shadow-glow-cyan",
  amber: "hover:border-amber/25 hover:shadow-glow-amber",
};

/**
 * A single cell of the Bento grid.
 *
 * Owns three things: the charcoal surface itself, the scroll-reveal, and the
 * Apple-style tilt. The outer motion.div is the grid item — pass span classes
 * (`md:col-span-4`) through `className` and everything below stretches to fill.
 */
export default function BentoCard({
  children,
  className = "",
  accent = "cyan",
  delay = 0,
  tilt = true,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  accent?: AccentColor;
  delay?: number;
  tilt?: boolean;
  padded?: boolean;
}) {
  const surface = (
    <div
      className={`relative h-full overflow-hidden rounded-2xl border border-charcoal-700 bg-charcoal-900 shadow-card transition-[border-color,box-shadow] duration-500 ${
        ACCENT_HOVER[accent]
      } ${padded ? "p-6 sm:p-7" : ""}`}
    >
      {/* faint schematic grid, masked so it fades toward the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-schematic [background-size:32px_32px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />
      <div className="relative h-full">{children}</div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {tilt ? (
        <TiltCard className="h-full">{surface}</TiltCard>
      ) : (
        <div className="h-full">{surface}</div>
      )}
    </motion.div>
  );
}
