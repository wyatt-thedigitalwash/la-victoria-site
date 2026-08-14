"use client";

import { Suspense, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { OPEN_POSITIONS } from "@/lib/positions";

const POSITIONS = OPEN_POSITIONS;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"];

const inputStyle = {
  background: "#FFFFFF",
  border: "1px solid #D4D4D4",
  color: "#1A1508",
  padding: "14px 20px",
} as const;

const inputClass =
  "w-full font-body text-[14px] font-normal rounded-none outline-none transition-colors duration-300 focus:border-[#4D1807]";

const labelClass =
  "block font-mono text-[10px] uppercase tracking-[1.5px] mb-1.5";

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className={labelClass} style={{ color: "#1A1508" }}>
      {children}
    </label>
  );
}

function ApplyForm() {
  const searchParams = useSearchParams();
  const positionParam = searchParams.get("position") || "";
  // A stale link to a now-closed role falls back to an empty select rather
  // than prefilling a position that can no longer be submitted.
  const initialPosition = POSITIONS.includes(positionParam) ? positionParam : "";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState(initialPosition);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selected = e.target.files?.[0];
    if (!selected) {
      setFile(null);
      return;
    }
    const ext = "." + (selected.name.split(".").pop() || "").toLowerCase();
    if (!ACCEPTED_EXTENSIONS.includes(ext)) {
      setError("Please upload a PDF, DOC, or DOCX file.");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError("File is too large. Maximum size is 5MB.");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !position ||
      !email.trim() ||
      !phone.trim() ||
      !file
    ) {
      setError("Please fill out all required fields and attach your resume.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("first_name", firstName.trim());
      formData.append("last_name", lastName.trim());
      formData.append("position", position);
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      formData.append("notes", notes.trim());
      formData.append("resume", file);

      const res = await fetch("/api/applications", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="apply-confirmation flex flex-col items-center text-center py-10">
        <p
          className="font-body font-light italic"
          style={{ color: "#4D1807", fontSize: "28px" }}
        >
          Application Submitted
        </p>
        <p
          className="font-body text-[15px] font-normal leading-[1.7] mt-4 max-w-[440px]"
          style={{ color: "#1A1508" }}
        >
          Thanks, {firstName.trim()}. We&apos;ll review your application and reach
          out if there&apos;s a fit.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="apply-form flex flex-col gap-5 rounded-[4px]"
      style={{
        background: "#F9F9F9",
        border: "1px solid #E5E5E5",
        padding: "40px",
      }}
    >
      {/* First Name */}
      <div>
        <Label htmlFor="apply-first-name">First Name</Label>
        <input
          id="apply-first-name"
          type="text"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      {/* Last Name */}
      <div>
        <Label htmlFor="apply-last-name">Last Name</Label>
        <input
          id="apply-last-name"
          type="text"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      {/* Position */}
      <div>
        <Label htmlFor="apply-position">Position Applying For</Label>
        <div className="relative">
          <select
            id="apply-position"
            required
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className={`${inputClass} appearance-none cursor-pointer pr-12`}
            style={{ ...inputStyle, color: position ? "#1A1508" : "#A8A29A" }}
          >
            <option value="" disabled>
              Select a position
            </option>
            {POSITIONS.map((p) => (
              <option key={p} value={p} style={{ color: "#1A1508", background: "#FFFFFF" }}>
                {p}
              </option>
            ))}
          </select>
          <span
            className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2"
            aria-hidden="true"
          >
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
              <path d="M1 1L6 5.5L11 1" stroke="#4D1807" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="apply-email">Email</Label>
        <input
          id="apply-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      {/* Phone */}
      <div>
        <Label htmlFor="apply-phone">Phone</Label>
        <input
          id="apply-phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      {/* Resume Upload */}
      <div>
        <Label htmlFor="apply-resume">Resume</Label>
        <input
          ref={fileInputRef}
          id="apply-resume"
          type="file"
          accept=".pdf,.doc,.docx"
          required
          onChange={handleFileChange}
          className="sr-only"
        />
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="shrink-0 font-mono text-[10px] uppercase tracking-[1.5px] transition-colors duration-300 hover:border-[#4D1807]"
            style={{
              background: "#FFFFFF",
              border: "1px solid #D4D4D4",
              color: "#1A1508",
              padding: "14px 24px",
            }}
          >
            Upload Resume
          </button>
          <span
            className="font-body text-[13px] font-normal truncate"
            style={{ color: file ? "#4D1807" : "#A8A29A" }}
          >
            {file ? file.name : "PDF, DOC, or DOCX · Max 5MB"}
          </span>
        </div>
      </div>

      {/* Notes */}
      <div>
        <Label htmlFor="apply-notes">Notes / Message</Label>
        <textarea
          id="apply-notes"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Anything else you'd like us to know?"
          className={`${inputClass} resize-none`}
          style={inputStyle}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full font-mono text-[12px] uppercase tracking-[2px] transition-colors duration-300 hover:bg-[#5e1e0a] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "#4D1807",
          color: "#FCE9C7",
          padding: "16px",
        }}
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </button>

      {error && (
        <p
          className="font-body text-[13px] font-normal text-center"
          style={{ color: "#C0341D" }}
          role="alert"
        >
          {error}
        </p>
      )}
    </form>
  );
}

export default function ApplyPage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col" style={{ background: "#FFFFFF" }}>
      {/* ── Hero (dark) ── */}
      <div style={{ background: "#221A0E" }}>
        <section
          className="apply-hero relative flex items-center justify-center overflow-hidden"
          style={{ height: "40vh", paddingTop: "56px" }}
        >
          {/* Atmospheric gradient */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,_rgba(77,24,7,0.18)_0%,_transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_70%_30%,_rgba(124,101,51,0.12)_0%,_transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_80%,_rgba(244,212,124,0.08)_0%,_transparent_70%)]" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <p
              className="font-mono text-[11px] tracking-[4px] uppercase mb-5"
              style={{ color: "#F4D47C" }}
            >
              Careers
            </p>
            <h1
              className="font-body text-[clamp(32px,5vw,48px)] font-light italic leading-[1.3]"
              style={{ color: "#FCE9C7" }}
            >
              Apply Now
            </h1>
          </div>
        </section>
      </div>

      {/* ── Form Section ── */}
      <section className="flex-1 px-6" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="mx-auto w-full max-w-[600px]">
          <Suspense fallback={null}>
            <ApplyForm />
          </Suspense>
        </div>
      </section>

      <style jsx global>{`
        .apply-form input::placeholder,
        .apply-form textarea::placeholder {
          color: #a8a29a;
          opacity: 1;
        }

        .apply-confirmation {
          animation: apply-fade-in 500ms cubic-bezier(0, 0, 0.25, 1) forwards;
        }

        @keyframes apply-fade-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
