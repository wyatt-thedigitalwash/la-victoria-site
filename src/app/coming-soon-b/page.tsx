"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const EXPERIENCES = [
  {
    title: "Kitchen",
    description:
      "A space where Mexican culinary tradition is honored through refined technique and contemporary execution. It embodies craftsmanship, depth of flavor, and the transformation of heritage recipes into elevated dining experiences. Kitchen reflects the discipline, warmth, and artistry behind every plate.",
  },
  {
    title: "Crudo",
    description:
      "Captures the essence of purity and immediacy. Rooted in coastal Mexican traditions, Crudo celebrates fresh ingredients presented with restraint and precision. It conveys bold simplicity, vibrant textures, and the raw elegance of flavors served at their peak.",
  },
  {
    title: "Cantina",
    description:
      "Evokes the spirit of gathering. Inspired by the timeless Mexican cantina, it represents conviviality, storytelling, and ritual. Cantina reflects curated spirits, artisanal cocktails, and the celebratory energy that turns a meal into an experience, where heritage meets modern refinement.",
  },
] as const;

export default function ComingSoonB() {
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const revealRefs = useRef<HTMLElement[]>([]);

  const addRevealRef = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  }, []);

  /* Hide the global Navigation on this route */
  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) nav.style.display = "none";
    return () => {
      if (nav) nav.style.display = "";
    };
  }, []);

  /* Scroll-driven text reveal: opacity and translateY based on viewport center proximity */
  useEffect(() => {
    const elements = revealRefs.current;
    if (!elements.length) return;

    const onScroll = () => {
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      const revealRange = window.innerHeight * 0.45;

      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        const elCenter = window.scrollY + rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - elCenter);
        const progress = Math.max(0, 1 - distance / revealRange);

        // Map progress: 0 → opacity 0.1, translateY 20px; 1 → opacity 1, translateY 0
        const opacity = 0.1 + progress * 0.9;
        const translateY = (1 - progress) * 20;

        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${translateY}px)`;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main id="main-content" style={{ background: "#221A0E" }}>
      {/* ── Hero ── */}
      <section className="csb-hero relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/assets/cactus-video.png"
          alt="Desert cactus landscape in warm golden light"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#221A0E]/55" />
        {/* Warm atmospheric glows */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,_rgba(77,24,7,0.18)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_70%_30%,_rgba(124,101,51,0.12)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_80%,_rgba(244,212,124,0.08)_0%,_transparent_70%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Title */}
          <h1 className="sr-only">La Victoria</h1>
          <div className="csb-logo">
            <Image
              src="/assets/La-Victoria-title-only.svg"
              alt="La Victoria"
              width={600}
              height={133}
              priority
              className="w-[438px] md:w-[703px] h-auto"
            />
          </div>

          {/* Subtitle */}
          <p className="csb-subtitle font-mono text-[12px] tracking-[6px] uppercase text-brass mt-5"
             style={{ color: "#F4D47C" }}>
            Kitchen&ensp;&middot;&ensp;Crudo&ensp;&middot;&ensp;Cantina
          </p>

          {/* Get Notified button / expandable form */}
          <div className="csb-notify mt-10">
            {submitted ? (
              <p
                className="font-mono text-[12px] tracking-[3px] uppercase"
                style={{ color: "#F4D47C" }}
              >
                You&apos;re on the list
              </p>
            ) : !formOpen ? (
              <>
                {/* Coming soon text */}
                <p
                  className="font-mono text-[12px] tracking-[3px] uppercase mb-6"
                  style={{ color: "#FCE8C7" }}
                >
                  Coming Fall 2026
                </p>

                <button
                  type="button"
                  onClick={() => setFormOpen(true)}
                  className="csb-notify-btn group relative inline-block font-mono text-[11px] tracking-[3px] uppercase border border-[rgba(244,212,124,0.4)] px-8 py-3.5 overflow-hidden transition-colors duration-500 cursor-pointer"
                  style={{ color: "#FCE9C7", background: "transparent" }}
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-[#4D1807] transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="relative">Get Notified</span>
                </button>
              </>
            ) : (
              <form
                className="csb-notify-form flex flex-col items-center w-full max-w-[380px]"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!firstName.trim() || !lastName.trim() || !email.trim()) return;
                  setSubmitting(true);
                  try {
                    const res = await fetch("/api/leads", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        first_name: firstName.trim(),
                        last_name: lastName.trim(),
                        email: email.trim(),
                        phone: phone.trim() || null,
                      }),
                    });
                    if (res.ok) {
                      setFormOpen(false);
                      setSubmitted(true);
                    }
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                <div
                  className="w-full flex flex-col gap-3 rounded-lg backdrop-blur-md"
                  style={{
                    background: "rgba(26, 21, 8, 0.8)",
                    padding: "32px",
                    borderRadius: "8px",
                  }}
                >
                  <label htmlFor="csb-notify-first-name" className="sr-only">First name</label>
                  <input
                    id="csb-notify-first-name"
                    type="text"
                    placeholder="First Name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full font-body text-[14px] font-normal rounded-none outline-none transition-colors duration-300 focus:border-[#F4D47C]"
                    style={{
                      background: "#221C10",
                      border: "1px solid rgba(124, 101, 51, 0.3)",
                      color: "#FCE9C7",
                      padding: "14px 20px",
                    }}
                  />
                  <label htmlFor="csb-notify-last-name" className="sr-only">Last name</label>
                  <input
                    id="csb-notify-last-name"
                    type="text"
                    placeholder="Last Name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full font-body text-[14px] font-normal rounded-none outline-none transition-colors duration-300 focus:border-[#F4D47C]"
                    style={{
                      background: "#221C10",
                      border: "1px solid rgba(124, 101, 51, 0.3)",
                      color: "#FCE9C7",
                      padding: "14px 20px",
                    }}
                  />
                  <label htmlFor="csb-notify-email" className="sr-only">Email address</label>
                  <input
                    id="csb-notify-email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full font-body text-[14px] font-normal rounded-none outline-none transition-colors duration-300 focus:border-[#F4D47C]"
                    style={{
                      background: "#221C10",
                      border: "1px solid rgba(124, 101, 51, 0.3)",
                      color: "#FCE9C7",
                      padding: "14px 20px",
                    }}
                  />
                  <label htmlFor="csb-notify-phone" className="sr-only">Phone number (optional)</label>
                  <input
                    id="csb-notify-phone"
                    type="tel"
                    placeholder="Phone (optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full font-body text-[14px] font-normal rounded-none outline-none transition-colors duration-300 focus:border-[#F4D47C]"
                    style={{
                      background: "#221C10",
                      border: "1px solid rgba(124, 101, 51, 0.3)",
                      color: "#FCE9C7",
                      padding: "14px 20px",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full font-mono text-[11px] tracking-[2px] uppercase transition-colors duration-300 hover:bg-[#5e1e0a] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: "#4D1807",
                      color: "#FCE9C7",
                      padding: "14px 20px",
                    }}
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="font-body text-[11px] font-normal cursor-pointer transition-opacity duration-300 hover:opacity-70 mt-3"
                  style={{ color: "rgba(252, 233, 199, 0.5)", background: "none", border: "none" }}
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="csb-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <p
            className="font-mono text-[10px] tracking-[4px] uppercase"
            style={{ color: "rgba(244, 212, 124, 0.5)" }}
          >
            Discover
          </p>
          <div className="csb-chevron-group flex flex-col items-center gap-1">
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" className="csb-chevron csb-chevron-1">
              <path d="M1 1L6 5.5L11 1" stroke="#F4D47C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" className="csb-chevron csb-chevron-2">
              <path d="M1 1L6 5.5L11 1" stroke="#F4D47C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Text Reveal Sections ── */}
      <div
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 30% 20%, rgba(80, 67, 40, 0.18) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 70% 50%, rgba(124, 101, 51, 0.15) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 40% 80%, rgba(77, 24, 7, 0.14) 0%, transparent 70%),
            #221A0E
          `,
        }}
      >
      {EXPERIENCES.map((exp, i) => (
        <div key={exp.title}>
          {/* Diamond spacer */}
          <div
            className="flex items-center justify-center py-4"
            style={{ color: "rgba(244, 212, 124, 0.2)" }}
            aria-hidden="true"
          >
            <span className="text-[10px]">&#9670;</span>
          </div>

          {/* Experience section */}
          <section className="flex min-h-screen items-center justify-center px-6">
            <div className="max-w-[700px] text-center">
              {/* Title */}
              <h2
                ref={addRevealRef}
                className="font-mono text-[14px] font-bold uppercase tracking-[4px] transition-none"
                style={{ color: "#F4D47C", opacity: 0.1 }}
              >
                {exp.title}
              </h2>

              {/* Divider line */}
              <div
                ref={addRevealRef}
                className="mx-auto mt-6 mb-6 transition-none"
                style={{
                  width: "40px",
                  height: "1px",
                  background: "rgba(244, 212, 124, 0.3)",
                  opacity: 0.1,
                }}
                aria-hidden="true"
              />

              {/* Description */}
              <p
                ref={addRevealRef}
                className="font-body text-[20px] md:text-[24px] italic font-light leading-[1.7] transition-none"
                style={{ color: "#FCE9C7", opacity: 0.1 }}
              >
                {exp.description}
              </p>
            </div>
          </section>
        </div>
      ))}
      </div>

      {/* ── Footer ── */}
      <footer className="flex flex-col items-center text-center px-6 pt-20 pb-10">
        {/* Separator */}
        <div
          className="w-full max-w-[200px] mb-20"
          style={{ height: "1px", background: "rgba(124, 101, 51, 0.15)" }}
          aria-hidden="true"
        />

        {/* Icon */}
        <Image
          src="/assets/La-Victoria-icon-beige.webp"
          alt="La Victoria icon"
          width={40}
          height={40}
          className="mb-6"
        />

        {/* Social links */}
        <a
          href="https://www.instagram.com/lavictoriatampa/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] tracking-[2px] uppercase transition-opacity duration-300 hover:opacity-70"
          style={{ color: "#F4D47C" }}
          aria-label="Follow La Victoria on Instagram"
        >
          Instagram
        </a>

        {/* Address */}
        <p
          className="font-body text-[13px] font-normal mt-4"
          style={{ color: "rgba(252, 233, 199, 0.6)" }}
        >
          105 W Tyler Street, Tampa, FL 33602
        </p>

        {/* Email */}
        <a
          href="mailto:info@lavictoriatampa.com"
          className="font-body text-[13px] font-normal mt-1 transition-opacity duration-300 hover:opacity-80"
          style={{ color: "rgba(252, 233, 199, 0.6)" }}
        >
          info@lavictoriatampa.com
        </a>

        {/* Copyright */}
        <p
          className="font-body text-[13px] font-normal mt-6"
          style={{ color: "rgba(252, 233, 199, 0.4)" }}
        >
          &copy; 2026 La Victoria
        </p>

        {/* Credit */}
        <p
          className="font-body text-[10px] font-normal mt-5"
          style={{ color: "rgba(252, 233, 199, 0.3)" }}
        >
          Site by{" "}
          <a
            href="https://thedigitalwash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-[rgba(252,233,199,0.6)]"
            style={{ color: "inherit" }}
          >
            The Digital Wash
          </a>
        </p>
      </footer>

      <style jsx>{`
        /* ── Form placeholder ── */
        .csb-notify-form input::placeholder {
          color: #7C6533;
          opacity: 1;
        }

        /* ── Form transition (only on form open, not button return) ── */
        .csb-notify-form {
          animation: csb-notify-in 300ms cubic-bezier(0, 0, 0.25, 1) forwards;
        }

        @keyframes csb-notify-in {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* ── Hero animations ── */
        .csb-logo {
          opacity: 0;
          animation: csb-logo-in 2s cubic-bezier(0, 0, 0.25, 1) forwards;
        }

        @keyframes csb-logo-in {
          from {
            opacity: 0;
            filter: blur(6px);
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            filter: blur(0px);
            transform: scale(1);
          }
        }

        .csb-subtitle {
          opacity: 0;
          animation: csb-fade-up 1s cubic-bezier(0, 0, 0.25, 1) 1.2s forwards;
        }

        .csb-notify {
          opacity: 0;
          animation: csb-fade-up 1s cubic-bezier(0, 0, 0.25, 1) 2s forwards;
        }

        .csb-scroll {
          opacity: 0;
          animation: csb-fade-up 1s cubic-bezier(0, 0, 0.25, 1) 2.5s forwards;
        }

        .csb-chevron {
          opacity: 0.3;
        }

        .csb-chevron-1 {
          animation: csb-chevron-drift 3s ease-in-out infinite 3s;
        }

        .csb-chevron-2 {
          animation: csb-chevron-drift 3s ease-in-out infinite 3.4s;
        }

        @keyframes csb-chevron-drift {
          0%, 100% {
            opacity: 0.2;
            transform: translateY(0);
          }
          50% {
            opacity: 0.6;
            transform: translateY(3px);
          }
        }

        @keyframes csb-fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
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
