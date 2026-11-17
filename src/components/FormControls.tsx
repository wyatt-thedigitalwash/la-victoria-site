import type { ReactNode } from "react";

/**
 * Ruled form cells that match the "Your Table Awaits" booking bar: a brass
 * hairline grid, each cell holding a short Space Mono label over a bare control.
 *
 * Lay cells out in a grid with `gap-px` and RULE as the grid's background, so
 * the gaps draw the lines.
 */
export const RULE = "rgba(244, 212, 124, 0.3)";

/** The page background, so cells cover the grid everywhere but the gaps. */
const CELL_BG = "#221A0E";

export const CONTROL =
  "w-full min-w-0 bg-transparent font-body text-[16px] text-cream outline-none appearance-none placeholder:text-[rgba(252,233,199,0.35)]";

/** Faded text for a select still showing its placeholder option. */
export const EMPTY_SELECT = "text-[rgba(252,233,199,0.4)]";

export const CHEVRON = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%23F4D47C' stroke-width='1.5'%3E%3Cpath d='M1 1.5l5 5 5-5'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right center",
  paddingRight: "24px",
} as const;

export function Cell({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label
      className={`flex flex-col justify-center min-w-0 px-5 py-3.5 cursor-text transition-shadow duration-300 focus-within:shadow-[inset_0_0_0_1px_#F4D47C] ${className}`}
      style={{ background: CELL_BG }}
    >
      <span className="font-mono text-[11px] tracking-[2.5px] uppercase text-brass mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}
