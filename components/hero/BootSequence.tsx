"use client";

import { useEffect, useRef, useState } from "react";
import type { BootLine } from "@/lib/types";

const TYPE_SPEED = 22; // ms per character
const LINE_PAUSE = 260; // ms between lines

const COLOR: Record<BootLine["type"], string> = {
  cmd: "text-gray-100",
  out: "text-gray-400",
  ok: "text-cyan",
  warn: "text-amber",
};

/**
 * Types out the boot lines one character at a time, like a shell session.
 * Purely visual and self-contained — it owns its own timers and drives the
 * "typed vs pending" split so the hero can layer it under the scroll motion.
 */
export default function BootSequence({ lines }: { lines: BootLine[] }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (lineIdx >= lines.length) return;

    const current = lines[lineIdx];
    if (charIdx < current.text.length) {
      timer.current = setTimeout(() => setCharIdx((c) => c + 1), TYPE_SPEED);
    } else {
      timer.current = setTimeout(() => {
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, LINE_PAUSE);
    }

    return () => clearTimeout(timer.current);
  }, [lineIdx, charIdx, lines]);

  const done = lineIdx >= lines.length;

  return (
    <div className="font-mono text-[13px] leading-relaxed sm:text-sm">
      {lines.slice(0, lineIdx + 1).map((line, i) => {
        const isActive = i === lineIdx;
        const text = isActive ? line.text.slice(0, charIdx) : line.text;
        return (
          <div key={i} className="flex items-start gap-2 whitespace-pre-wrap">
            {line.type === "cmd" && (
              <span className="select-none text-cyan-dim">$</span>
            )}
            <span className={COLOR[line.type]}>
              {text}
              {isActive && !done && (
                <span className="ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 bg-cyan animate-blink" />
              )}
            </span>
          </div>
        );
      })}
      {done && (
        <div className="mt-1 flex items-center gap-2">
          <span className="select-none text-cyan-dim">$</span>
          <span className="inline-block h-3.5 w-2 translate-y-0.5 bg-cyan animate-blink" />
        </div>
      )}
    </div>
  );
}
