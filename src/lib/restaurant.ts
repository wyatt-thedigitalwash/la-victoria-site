/** OpenTable booking page. */
export const OPENTABLE_URL =
  "https://www.opentable.com/r/la-victoria-reservations-tampa?restref=1504894&lang=en-US&ot_source=Restaurant%20website";

/**
 * OpenTable restaurant ID ("rid"), needed for the embedded booking widget.
 * Find it in OpenTable's widget snippet (…/loader?rid=XXXXXX…) or in the
 * page source of OPENTABLE_URL. While empty, reservation links go straight
 * to OpenTable; once set, they point to the on-site /reservations widget.
 */
export const OPENTABLE_RID = "1504894";

export const RESERVE = OPENTABLE_RID
  ? { href: "/reservations", external: false }
  : { href: OPENTABLE_URL, external: true };

/** Opening hours. Shown in the home hero and every footer. */
export const HOURS = [
  {
    name: "La Victoria",
    rows: [
      { days: "Mon–Thu", time: "4–10 PM" },
      { days: "Fri–Sat", time: "4–11 PM" },
      { days: "Sun", time: "4–10 PM" },
    ],
  },
  {
    name: "La Victoria Cafe",
    rows: [{ days: "Mon–Fri", time: "7 AM–2 PM" }],
  },
] as const;
