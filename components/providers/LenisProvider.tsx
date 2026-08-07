"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Lenis from "@studio-freight/lenis";
import { MotionConfig, frame, cancelFrame } from "framer-motion";

const LenisContext = createContext<Lenis | null>(null);

/** Access the live Lenis instance — null when smoothing is disabled. */
export const useLenis = () => useContext(LenisContext);

/**
 * Bridges Lenis inertia scrolling into Framer Motion's frame loop.
 *
 * Instead of running Lenis on its own requestAnimationFrame, we drive it from
 * Framer's `frame.update` so scroll-linked `useScroll`/`useTransform` values
 * and the smooth scroll position tick on the exact same clock — this is what
 * removes the one-frame lag you'd otherwise see when pinning elements.
 *
 * The instance is published through context so nav links can hand their target
 * to `lenis.scrollTo` rather than fighting it with a native jump.
 */
export default function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const instance = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect users who ask for reduced motion — skip smoothing entirely.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const l = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    instance.current = l;
    setLenis(l);

    function update(data: { timestamp: number }) {
      l.raf(data.timestamp);
    }

    frame.update(update, true);

    return () => {
      cancelFrame(update);
      l.destroy();
      instance.current = null;
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {/* "user" makes Framer drop transform/layout animation for anyone whose
          OS asks for reduced motion, while still fading content in. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LenisContext.Provider>
  );
}
