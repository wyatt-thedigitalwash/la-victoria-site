"use client";

import { useState, useSyncExternalStore } from "react";
import { BUTTON_CLASS, ButtonFace } from "@/components/BrandButton";
import { OPENTABLE_RID } from "@/lib/restaurant";

/**
 * Our own booking bar. OpenTable's widget is a cross-origin iframe that CSS
 * can't reach, so this submits the same search the widget does and OpenTable
 * takes over from there, in a new tab.
 */
const BOOKING_URL = "https://www.opentable.com/booking/restref/availability";

/** Everything the widget sends besides the date, time and party size. */
const BOOKING_PARAMS = {
  rid: OPENTABLE_RID,
  restref: OPENTABLE_RID,
  lang: "en-US",
  color: "8",
  r3uid: "cfe",
  dark: "false",
  ot_source: "Restaurant website",
  logo_pid: "0",
  background_pid: "0",
  font: "arialBlack",
  ot_logo: "standard",
  primary_color: "4d1807",
  primary_font_color: "ffffff",
  button_color: "4d1807",
  button_font_color: "ffffff",
};

const PARTY_SIZES = Array.from({ length: 20 }, (_, i) => i + 1);

const noSubscribe = () => () => {};
const restaurantToday = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());

/** Dinner runs from 4 PM; last slot is 30 minutes before close (see HOURS). */
function timeSlots(date: string) {
  const day = new Date(`${date}T12:00`).getDay();
  const close = day === 5 || day === 6 ? 23 : 22;
  const slots: { value: string; label: string }[] = [];
  for (let minutes = 16 * 60; minutes < close * 60; minutes += 30) {
    const hour = Math.floor(minutes / 60);
    const mins = String(minutes % 60).padStart(2, "0");
    slots.push({ value: `${hour}:${mins}`, label: `${hour - 12}:${mins} PM` });
  }
  return slots;
}

const CELL = "flex flex-col justify-center min-w-0 px-5 py-3.5";
const LABEL = "font-mono text-[11px] tracking-[2.5px] uppercase text-brass mb-1";
const CONTROL =
  "w-full min-w-0 h-7 bg-transparent font-body text-[16px] text-cream cursor-pointer appearance-none";
const CHEVRON = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%23F4D47C' stroke-width='1.5'%3E%3Cpath d='M1 1.5l5 5 5-5'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right center",
};
const RULE = "rgba(244, 212, 124, 0.3)";

export default function ReservationForm() {
  const today = useSyncExternalStore(noSubscribe, restaurantToday, () => "");
  const [pickedDate, setPickedDate] = useState("");
  const [pickedTime, setPickedTime] = useState("19:00");
  const [party, setParty] = useState("2");

  const date = pickedDate || today;
  const slots = timeSlots(date);
  // Friday's late slots don't exist on other nights.
  const time = slots.some((slot) => slot.value === pickedTime)
    ? pickedTime
    : slots[slots.length - 1].value;

  return (
    <form
      action={BOOKING_URL}
      method="get"
      target="_blank"
      rel="noopener"
      className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr_1fr_auto] text-left divide-y md:divide-y-0 md:divide-x divide-[rgba(244,212,124,0.3)]"
      style={{ border: `1px solid ${RULE}`, colorScheme: "dark" }}
    >
      {Object.entries(BOOKING_PARAMS).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <input type="hidden" name="datetime" value={`${date}T${time.padStart(5, "0")}`} />

      <label className={CELL}>
        <span className={LABEL}>Date</span>
        <input
          type="date"
          required
          min={today}
          value={date}
          onChange={(e) => setPickedDate(e.target.value)}
          onClick={(e) => e.currentTarget.showPicker?.()}
          className={`${CONTROL} [&::-webkit-date-and-time-value]:text-left`}
        />
      </label>

      <label className={CELL}>
        <span className={LABEL}>Time</span>
        <select
          value={time}
          onChange={(e) => setPickedTime(e.target.value)}
          className={CONTROL}
          style={CHEVRON}
        >
          {slots.map((slot) => (
            <option key={slot.value} value={slot.value}>
              {slot.label}
            </option>
          ))}
        </select>
      </label>

      <label className={CELL}>
        <span className={LABEL}>Party</span>
        <select
          name="partysize"
          value={party}
          onChange={(e) => setParty(e.target.value)}
          className={CONTROL}
          style={CHEVRON}
        >
          {PARTY_SIZES.map((size) => (
            <option key={size} value={size}>
              {size} {size === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" className={`${BUTTON_CLASS} min-h-[56px] overflow-hidden`}>
        <ButtonFace flush>
          Find a Table<span className="sr-only"> (opens OpenTable in a new tab)</span>
        </ButtonFace>
      </button>
    </form>
  );
}
