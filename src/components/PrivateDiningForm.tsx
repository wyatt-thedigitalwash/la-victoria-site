"use client";

import { useState, useSyncExternalStore, type ChangeEvent, type FormEvent } from "react";
import { BUTTON_CLASS, ButtonFace } from "@/components/BrandButton";
import { CHEVRON, CONTROL, Cell, EMPTY_SELECT, RULE } from "@/components/FormControls";
import Turnstile, { TURNSTILE_SITE_KEY } from "@/components/Turnstile";
import {
  MAX_GUESTS,
  NOTES_MAX_LENGTH,
  OCCASIONS,
  OTHER_REFERRAL_ID,
  REFERRAL_SOURCES,
  SPACES,
  TIME_SLOTS,
  todayInTampa,
} from "@/lib/private-dining";

const EMPTY = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  occasion: "",
  guest_count: "",
  event_date: "",
  start_time: "",
  end_time: "",
  space: "",
  notes: "",
  referral_source_id: "",
  referral_source_other: "",
  website: "",
};

type Values = typeof EMPTY;

const TRACKING_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];

const noSubscribe = () => () => {};

export default function PrivateDiningForm() {
  const today = useSyncExternalStore(noSubscribe, todayInTampa, () => "");
  const [values, setValues] = useState<Values>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);

  const bind = (name: keyof Values) => ({
    name,
    value: values[name],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [name]: e.target.value })),
  });

  /** Select styling, faded while the placeholder option is showing. */
  const selectProps = (name: keyof Values) => ({
    ...bind(name),
    className: `${CONTROL} h-7 cursor-pointer ${values[name] ? "" : EMPTY_SELECT}`,
    style: CHEVRON,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError("One moment, we're still checking your browser. Please try again in a few seconds.");
      return;
    }
    setSubmitting(true);
    const params = new URLSearchParams(window.location.search);
    const tracking = Object.fromEntries(TRACKING_PARAMS.map((key) => [key, params.get(key) ?? ""]));
    try {
      const res = await fetch("/api/private-dining", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, ...tracking, turnstile_token: turnstileToken }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error || "Something went wrong. Please try again.");
        setTurnstileReset((n) => n + 1); // each token works only once
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setTurnstileReset((n) => n + 1);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div role="status" className="px-8 py-16 text-center" style={{ border: `1px solid ${RULE}` }}>
        <p className="font-body text-[18px] leading-[1.7] text-cream">
          Thank you, {values.first_name.trim()}.
        </p>
        <p className="font-body text-[15px] leading-[1.8] mt-2" style={{ color: "rgba(252, 233, 199, 0.7)" }}>
          We have your inquiry. Our private dining manager will be in touch soon.
        </p>
      </div>
    );
  }

  const startIndex = TIME_SLOTS.findIndex((t) => t.value === values.start_time);

  return (
    <form onSubmit={handleSubmit} className="text-left" style={{ colorScheme: "dark" }}>
      <div
        className="grid grid-cols-6 gap-px"
        style={{ background: RULE, border: `1px solid ${RULE}` }}
      >
        <Cell label="First Name" className="col-span-6 md:col-span-3">
          <input {...bind("first_name")} type="text" autoComplete="given-name" required maxLength={80} className={`${CONTROL} h-7`} />
        </Cell>
        <Cell label="Last Name" className="col-span-6 md:col-span-3">
          <input {...bind("last_name")} type="text" autoComplete="family-name" required maxLength={80} className={`${CONTROL} h-7`} />
        </Cell>
        <Cell label="Email" className="col-span-6 md:col-span-3">
          <input {...bind("email")} type="email" autoComplete="email" required maxLength={200} className={`${CONTROL} h-7`} />
        </Cell>
        <Cell label="Phone" className="col-span-6 md:col-span-3">
          <input {...bind("phone")} type="tel" autoComplete="tel" required maxLength={40} className={`${CONTROL} h-7`} />
        </Cell>

        <Cell label="Occasion" className="col-span-6 md:col-span-3">
          <select {...selectProps("occasion")} required>
            <option value="" disabled>Select</option>
            {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Cell>
        <Cell label="Guests" className="col-span-6 md:col-span-3">
          <input {...bind("guest_count")} type="number" inputMode="numeric" required min={1} max={MAX_GUESTS} step={1} placeholder="How many?" className={`${CONTROL} h-7`} />
        </Cell>

        <Cell label="Date" className="col-span-6 md:col-span-2">
          <input
            {...bind("event_date")}
            type="date"
            required
            min={today}
            onClick={(e) => e.currentTarget.showPicker?.()}
            className={`${CONTROL} h-7 cursor-pointer [&::-webkit-date-and-time-value]:text-left ${values.event_date ? "" : EMPTY_SELECT}`}
          />
        </Cell>
        <Cell label="Start" className="col-span-3 md:col-span-2">
          <select
            {...selectProps("start_time")}
            onChange={(e) => {
              const start = e.target.value;
              const startAt = TIME_SLOTS.findIndex((t) => t.value === start);
              const endAt = TIME_SLOTS.findIndex((t) => t.value === values.end_time);
              // Drop an end time that no longer comes after the new start.
              setValues((v) => ({ ...v, start_time: start, end_time: endAt > startAt ? v.end_time : "" }));
            }}
            required
          >
            <option value="" disabled>Select</option>
            {TIME_SLOTS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </Cell>
        <Cell label="End" className="col-span-3 md:col-span-2">
          <select {...selectProps("end_time")}>
            <option value="">Select</option>
            {TIME_SLOTS.map((t, i) => (
              <option key={t.value} value={t.value} disabled={startIndex !== -1 && i <= startIndex}>
                {t.label}
              </option>
            ))}
          </select>
        </Cell>

        <Cell label="Space" className="col-span-6 md:col-span-3">
          <select {...selectProps("space")} required>
            <option value="" disabled>Select</option>
            {SPACES.map((s) => <option key={s.label} value={s.label}>{s.label}</option>)}
          </select>
        </Cell>
        <Cell label="Heard About Us" className="col-span-6 md:col-span-3">
          <select {...selectProps("referral_source_id")}>
            <option value="">Select</option>
            {REFERRAL_SOURCES.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
        </Cell>
        {values.referral_source_id === OTHER_REFERRAL_ID && (
          <Cell label="Where?" className="col-span-6">
            <input {...bind("referral_source_other")} type="text" maxLength={200} className={`${CONTROL} h-7`} />
          </Cell>
        )}

        <Cell label="Notes" className="col-span-6">
          <textarea
            {...bind("notes")}
            rows={3}
            maxLength={NOTES_MAX_LENGTH}
            placeholder="Dietary needs, budget, anything else"
            className={`${CONTROL} resize-none leading-[1.6]`}
          />
        </Cell>

        <button type="submit" disabled={submitting} className={`${BUTTON_CLASS} col-span-6 min-h-[56px] overflow-hidden`}>
          <ButtonFace flush>{submitting ? "Sending..." : "Send Inquiry"}</ButtonFace>
        </button>
      </div>

      <Turnstile onToken={setTurnstileToken} resetSignal={turnstileReset} />

      {/* Honeypot: hidden from people and assistive tech, only bots fill it in */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="pd-website">Website</label>
        <input {...bind("website")} id="pd-website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p role="alert" className="font-body text-[13px] mt-4" style={{ color: "#E8A08A" }}>
          {error}
        </p>
      )}
    </form>
  );
}
