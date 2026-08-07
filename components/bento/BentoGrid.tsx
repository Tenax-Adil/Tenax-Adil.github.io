import { ReactNode } from "react";

/**
 * The Bento container. A 6-column track on desktop so cells can be split
 * 4/2 or 3/3 or 2/2/2 — that unevenness is what keeps the grid from reading
 * as a plain card list. Collapses to a single column on mobile.
 */
export default function BentoGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6 ${className}`}
    >
      {children}
    </div>
  );
}
