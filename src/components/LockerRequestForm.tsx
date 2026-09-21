"use client";

import { useState, type FormEvent, type ReactNode } from "react";

const CONTACT_METHODS = ["Call", "Text", "Email"] as const;

const inputClass =
  "w-full font-body text-[14px] font-normal rounded-none outline-none transition-colors duration-300 focus:border-[#F4D47C]";

const inputStyle = {
  background: "#221C10",
  border: "1px solid rgba(124, 101, 51, 0.4)",
  color: "#FCE9C7",
  padding: "14px 18px",
};

function Label({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-mono text-[10px] tracking-[2px] uppercase mb-2"
      style={{ color: "#C4A882" }}
    >
      {children}
    </label>
  );
}

export default function LockerRequestForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredContact, setPreferredContact] =
    useState<(typeof CONTACT_METHODS)[number]>("Call");
  const [notes, setNotes] = useState("");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/locker-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          preferred_contact: preferredContact,
          notes: notes.trim(),
          age_confirmed: ageConfirmed,
          website,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="flex flex-col items-center text-center px-8 py-16"
        style={{ background: "rgba(26, 21, 8, 0.8)", border: "1px solid rgba(244, 212, 124, 0.12)" }}
      >
        <div className="mb-5" style={{ color: "#F4D47C" }} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6Z" fill="currentColor" opacity="0.6" />
          </svg>
        </div>
        <p
          className="font-mono text-[12px] tracking-[3px] uppercase mb-4"
          style={{ color: "#F4D47C" }}
        >
          Request Received
        </p>
        <p
          className="font-body text-[15px] font-normal leading-[1.8] max-w-[360px]"
          style={{ color: "rgba(252, 233, 199, 0.7)" }}
        >
          Thank you, {firstName.trim()}. A member of our team will reach out
          personally with availability and next steps.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 p-6 md:p-10"
      style={{ background: "rgba(26, 21, 8, 0.8)", border: "1px solid rgba(244, 212, 124, 0.12)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="locker-first-name">First Name</Label>
          <input
            id="locker-first-name"
            type="text"
            autoComplete="given-name"
            required
            maxLength={80}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <Label htmlFor="locker-last-name">Last Name</Label>
          <input
            id="locker-last-name"
            type="text"
            autoComplete="family-name"
            required
            maxLength={80}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="locker-email">Email</Label>
          <input
            id="locker-email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <Label htmlFor="locker-phone">Phone</Label>
          <input
            id="locker-phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={40}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>

      <fieldset>
        <legend
          className="font-mono text-[10px] tracking-[2px] uppercase mb-2"
          style={{ color: "#C4A882" }}
        >
          Best Way to Reach You
        </legend>
        <div className="grid grid-cols-3 gap-3">
          {CONTACT_METHODS.map((method) => (
            <label key={method} className="relative cursor-pointer">
              <input
                type="radio"
                name="preferred_contact"
                value={method}
                checked={preferredContact === method}
                onChange={() => setPreferredContact(method)}
                className="peer sr-only"
              />
              <span
                className="block text-center font-mono text-[11px] tracking-[2px] uppercase py-3 border border-[rgba(124,101,51,0.4)] text-[#C4A882] transition-colors duration-300 peer-checked:border-[#F4D47C] peer-checked:bg-[rgba(244,212,124,0.08)] peer-checked:text-[#FCE9C7] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#F4D47C]"
              >
                {method}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <Label htmlFor="locker-notes">Favorite Tequila or Mezcal (Optional)</Label>
        <textarea
          id="locker-notes"
          rows={3}
          maxLength={1000}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={`${inputClass} resize-y`}
          style={inputStyle}
        />
      </div>

      {/* Honeypot: hidden from people and assistive tech, only bots fill it in */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="locker-website">Website</label>
        <input
          id="locker-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={ageConfirmed}
          onChange={(e) => setAgeConfirmed(e.target.checked)}
          className="mt-[3px] h-4 w-4 shrink-0 cursor-pointer accent-[#F4D47C]"
        />
        <span
          className="font-body text-[13px] font-normal leading-[1.6]"
          style={{ color: "rgba(252, 233, 199, 0.7)" }}
        >
          I confirm that I am 21 years of age or older.
        </span>
      </label>

      {error && (
        <p role="alert" className="font-body text-[13px] font-normal" style={{ color: "#E8A08A" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full font-mono text-[11px] tracking-[2px] uppercase transition-colors duration-300 hover:bg-[#5e1e0a] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: "#4D1807", color: "#FCE9C7", padding: "16px 20px" }}
      >
        {submitting ? "Submitting..." : "Request a Locker"}
      </button>

      <p
        className="font-body text-[12px] font-normal leading-[1.6] text-center"
        style={{ color: "rgba(252, 233, 199, 0.55)" }}
      >
        We only use your details to contact you about the locker program.
      </p>
    </form>
  );
}
