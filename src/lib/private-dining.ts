/**
 * Options for the private dining inquiry form. These are shared by the form and
 * the API route, so the server checks inputs against the same lists the guest
 * picks from. The values match TripleSeat Dynamic Lead Form 7051.
 */

/**
 * TripleSeat requires an event style: "onpremise" (Private Event) or
 * "largeparty" (Large Party). The form doesn't ask, so every inquiry comes in
 * as a Private Event and the team can change it in TripleSeat.
 */
export const EVENT_STYLE = "onpremise";

/** Goes to TripleSeat's "Nature of this Event" field, which allows 50 characters at most. */
export const OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Rehearsal Dinner",
  "Business Dinner",
  "Holiday Party",
  "Celebration",
  "Other",
] as const;

/** TripleSeat referral source IDs for La Victoria. */
export const REFERRAL_SOURCES = [
  { id: "6", label: "Instagram" },
  { id: "5", label: "Facebook" },
  { id: "3", label: "Search Engine" },
  { id: "2", label: "Email" },
  { id: "1", label: "Other" },
] as const;

export const OTHER_REFERRAL_ID = "1";

export const MAX_GUESTS = 300;
export const NOTES_MAX_LENGTH = 2000;

/**
 * Half-hour slots from 9:00 AM to 11:30 PM. The value uses the format
 * TripleSeat's own time picker submits ("7:00pm"), and the label is what
 * guests see ("7:00 PM").
 */
export const TIME_SLOTS = Array.from({ length: 30 }, (_, i) => {
  const minutes = 9 * 60 + i * 30;
  const hours24 = Math.floor(minutes / 60);
  const hours12 = hours24 % 12 || 12;
  const mins = String(minutes % 60).padStart(2, "0");
  const suffix = hours24 < 12 ? "am" : "pm";
  return {
    value: `${hours12}:${mins}${suffix}`,
    label: `${hours12}:${mins} ${suffix.toUpperCase()}`,
  };
});

/** Today's date in Tampa as YYYY-MM-DD, the format of a native date input. */
export function todayInTampa(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
}
