/**
 * Single source of truth for which roles are still accepting applications.
 *
 * Adding a title to CLOSED_POSITIONS does three things at once:
 *  - the careers listing renders with an "Applications Closed" badge and no
 *    apply buttons
 *  - the apply form drops it from the position dropdown and ignores it as a
 *    ?position= prefill
 *  - the /api/applications route rejects submissions for it
 */
export const ALL_POSITIONS = [
  "Sous Chef",
  "Pastry Chef",
  "Server",
  "Bartender",
  "Line Cook",
  "Prep Cook",
  "Guest Services",
  "Server Assistant",
  "General Utility",
  "Barista",
] as const;

export type Position = (typeof ALL_POSITIONS)[number];

export const CLOSED_POSITIONS: readonly string[] = ["Server", "Bartender", "Barista"];

export const OPEN_POSITIONS: readonly string[] = ALL_POSITIONS.filter(
  (title) => !CLOSED_POSITIONS.includes(title)
);

export function isClosedPosition(title: string): boolean {
  return CLOSED_POSITIONS.includes(title);
}
