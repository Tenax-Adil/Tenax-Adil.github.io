import type { AccentColor } from "@/lib/types";

const TONE: Record<AccentColor | "neutral", string> = {
  cyan: "border-cyan/20 bg-cyan/5 text-cyan",
  amber: "border-amber/20 bg-amber/5 text-amber",
  neutral: "border-charcoal-700 bg-charcoal-800/60 text-gray-400",
};

/** Small monospaced pill used for stacks, hardware, tags. */
export default function Chip({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: AccentColor | "neutral";
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-1 font-mono text-[11px] leading-none ${TONE[tone]}`}
    >
      {label}
    </span>
  );
}
