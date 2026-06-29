"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const JOB_LISTINGS = [
  {
    title: "Server",
    href: "https://www.indeed.com/job/server-bb7f848b3437ea85",
    department: "Front of House / Dining Room",
    reportsTo: "Supervisor / Assistant General Manager",
    type: "Full-Time / Part-Time",
    flsa: "NonExempt (Hourly)",
    description:
      "The Server is responsible for providing guests with a positive dining experience through prompt, courteous, and professional service. Primary duties include greeting guests, explaining menu items, taking orders, serving food and beverages, monitoring guest satisfaction, handling payments, providing proper mise en place to guests, pre-bussing tables, completing sidework, and maintaining a clean and safe work environment in compliance with company policies and applicable laws and regulations.",
  },
  {
    title: "Line Cook",
    href: "https://www.indeed.com/job/line-cook-599c99ef2b633ee6",
    department: "Back of House / Kitchen",
    reportsTo: "Supervisor / Sous Chef",
    type: "Full-Time / Part-Time",
    flsa: "NonExempt (Hourly)",
    description:
      "The Line Cook is responsible for preparing, cooking, and plating menu items according to restaurant recipes, portion standards, food safety requirements, and service timelines. This role works closely with kitchen staff and front-of-house personnel to ensure consistent quality, cleanliness, and adherence to all health, safety, and sanitation regulations.",
  },
  {
    title: "Bartender",
    href: "https://www.indeed.com/job/bartender-ee5eecdb0489c30d",
    department: "Front of House / Bar",
    reportsTo: "Supervisor / Assistant General Manager",
    type: "Full-Time / Part-Time",
    flsa: "NonExempt (Hourly)",
    description:
      "The Bartender is responsible for preparing and serving alcoholic and nonalcoholic beverages to guests in a courteous, efficient, and professional manner, while complying with all applicable liquor laws, health and safety regulations, and company policies. The Bartender creates a positive guest experience by providing attentive, friendly, and knowledgeable service, as well as providing proper mise en place to guests, pre-bussing the bartop, and completing sidework.",
  },
  {
    title: "Prep Cook",
    href: "https://www.indeed.com/job/prep-cook-5a8d0d433fffc602",
    department: "Back of House / Kitchen",
    reportsTo: "Supervisor / Sous Chef",
    type: "Full-Time / Part-Time",
    flsa: "NonExempt (Hourly)",
    description:
      "The Prep Cook is responsible for preparing ingredients and basic menu components in accordance with standardized recipes, food safety requirements, and company quality standards. The role supports line cooks, general utility, and the broader kitchen team to ensure timely and consistent service.",
  },
  {
    title: "Guest Services",
    href: "https://www.indeed.com/job/hosthostess-dac262ccd469b83f",
    department: "Front of House / Dining Room",
    reportsTo: "Supervisor / Assistant General Manager",
    type: "Full-Time / Part-Time",
    flsa: "NonExempt (Hourly)",
    description:
      "Guest Services is responsible for providing a welcoming, professional first impression to guests, managing reservations and seating, coordinating with the service team to ensure a smooth flow of guests through the dining room, answering phones, and facilitating take-out orders. This role requires strong customer service skills, attention to detail, and the ability to work in a fast-paced environment.",
  },
  {
    title: "Server Assistant",
    href: "https://www.indeed.com/job/server-assistant-8198e2ad1f6dd363",
    department: "Front of House / Bar and Dining Room",
    reportsTo: "Supervisor / Assistant General Manager",
    type: "Full-Time / Part-Time",
    flsa: "NonExempt (Hourly)",
    description:
      "The Server Assistant supports servers, bartenders, and the broader front-of-house team to ensure timely, efficient, and high-quality service to guests. This position is responsible for clearing and resetting tables, running food, refilling beverages, maintaining cleanliness in the dining areas and bar, and assisting with guest needs in coordination with servers, bartenders, and management.",
  },
  {
    title: "General Utility",
    href: "https://www.indeed.com/job/general-utility-worker-ac3e779a33d5d0c3",
    department: "Back of House / Kitchen",
    reportsTo: "Supervisor / Sous Chef",
    type: "Full-Time / Part-Time",
    flsa: "NonExempt (Hourly)",
    description:
      "General Utility is responsible for maintaining the cleanliness and sanitation of all dishware, glassware, utensils, pots, pans, and kitchen equipment in accordance with company standards and applicable health and safety regulations. General Utility supports kitchen and dining operations by ensuring a steady supply of clean items, maintaining a clean and safe work environment, and assisting with preparing ingredients and basic menu components in accordance with standardized recipes, food safety requirements, and company quality standards.",
  },
  {
    title: "Barista",
    href: "https://www.indeed.com/job/barista-3ce3caed13c7096c",
    department: "Front of House / Bar",
    reportsTo: "Supervisor / Assistant General Manager",
    type: "Full-Time / Part-Time",
    flsa: "NonExempt (Hourly)",
    description:
      "The Barista prepares and serves coffee, espresso-based drinks, teas, aguas frescas, and light food items while providing prompt, friendly, and professional customer service, pre-bussing tables, and completing sidework. The role includes operating point-of-sale systems, handling cash and electronic payments, maintaining a clean and safe work environment, and complying with all company policies and applicable health, safety, and labor regulations.",
  },
] as const;

const THRIVE_HERE = [
  "You believe hospitality is more than just a job",
  "You enjoy serving others",
  "You value discipline and accountability",
  "You want to be part of building something from the ground up",
  "You are growth-minded and coachable",
  "You believe attitude and effort are a choice",
  "You take pride in your work",
];

const THRIVE_ELSEWHERE = [
  "You are uncomfortable with change",
  "You are uncomfortable with feedback",
  "You are uncomfortable in a fast-paced environment",
  "You make excuses",
  "You work best on your own",
];

const TIMELINE = [
  { label: "Applications Open", date: "Monday, June 29th @ 10am" },
  { label: "Applications Close", date: "Monday, August 10th @ 5pm" },
  { label: "Orientation Date", date: "Wednesday, September 2nd" },
];

export default function CareersPage() {
  const revealRefs = useRef<HTMLElement[]>([]);

  const addRevealRef = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  }, []);

  /* ScrollReveal via IntersectionObserver */
  useEffect(() => {
    const elements = revealRefs.current;
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("careers-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main id="main-content">
        {/* ── Hero (dark) ── */}
        <div style={{ background: "#221A0E" }}>
          <section className="careers-hero relative flex items-center justify-center overflow-hidden" style={{ height: "40vh", paddingTop: "56px" }}>
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
                Grow With Us
              </h1>
            </div>
          </section>
        </div>

        {/* ── Content (white) ── */}
        <div style={{ background: "#FFFFFF" }}>
          {/* ── Culture Section ── */}
          <section ref={addRevealRef} className="careers-reveal px-6 py-20">
            <div className="mx-auto max-w-[900px]">
              <p className="font-body text-[16px] font-normal leading-[1.8]" style={{ color: "#2A2418" }}>
                La Victoria is an elevated Mexican restaurant where authenticity and modern technique meet in perfect balance. At La Victoria, you&apos;ll find heritage lives on the plate, innovation drives the kitchen, and precision defines every interaction on the floor. Our goal is simple: to be your favorite restaurant. Yours, your neighbor&apos;s, your grandma&apos;s, and your high school math teacher&apos;s. As our name suggests, we intend to be victorious in this pursuit.
              </p>

              <p className="font-body text-[16px] font-normal leading-[1.8] mt-8" style={{ color: "#2A2418" }}>
                However, the journey is just as important to us as the destination. La Victoria doesn&apos;t want, but requires individuals who:
              </p>

              <ul className="mt-6 space-y-3 pl-0">
                {[
                  "Live their lives in a constant spirit of hospitality, because true hospitality begins from within",
                  "Believe every guest deserves our best and appreciate the value of selfless service",
                  "Understand discipline is the first rung on the ladder of success, and that the second rung is standards",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-[16px] font-normal leading-[1.8]" style={{ color: "#2A2418" }}>
                    <span className="mt-[10px] block h-[6px] w-[6px] shrink-0 rounded-full" style={{ background: "#4D1807" }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="font-body text-[16px] font-normal leading-[1.8] mt-8" style={{ color: "#2A2418" }}>
                Culture is at the core of everything we do. We believe it&apos;s crucial to our success in better serving others so they can better change the world. We want to be upfront about the kind of team we&apos;re building at La Victoria, so here&apos;s a bit of what we expect from you as an applicant, and what you can expect from us to hold you accountable as an associate:
              </p>
            </div>
          </section>

          {/* ── Two Column Section ── */}
          <section ref={addRevealRef} className="careers-reveal px-6 pt-4 pb-10">
            <div className="mx-auto max-w-[900px] grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left: Thrive here */}
              <div>
                <h2 className="font-body text-[18px] font-medium mb-5" style={{ color: "#4D1807" }}>
                  You will thrive here if:
                </h2>
                {THRIVE_HERE.map((item) => (
                  <p key={item} className="font-body text-[15px] font-normal py-2" style={{ color: "#2A2418" }}>
                    {item}
                  </p>
                ))}
              </div>

              {/* Right: Thrive elsewhere */}
              <div>
                <h2 className="font-body text-[18px] font-medium mb-5" style={{ color: "rgba(42, 36, 24, 0.45)" }}>
                  You might thrive better elsewhere if:
                </h2>
                {THRIVE_ELSEWHERE.map((item) => (
                  <p key={item} className="font-body text-[15px] font-normal py-2" style={{ color: "rgba(42, 36, 24, 0.45)" }}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* ── Job Listings ── */}
          <section ref={addRevealRef} className="careers-reveal px-6 py-20">
            <div className="mx-auto max-w-[900px] flex flex-col gap-4">
              {JOB_LISTINGS.map((job) => (
                <article
                  key={job.title}
                  className="rounded-[4px] p-8"
                  style={{
                    background: "#F9F6F0",
                    border: "1px solid rgba(124, 101, 51, 0.12)",
                  }}
                >
                  <a
                    href={job.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/title relative inline-block font-body text-[20px] font-medium transition-colors duration-300"
                    style={{ color: "#4D1807" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#6B2410")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#4D1807")}
                  >
                    {job.title}
                    <span
                      className="absolute left-0 bottom-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover/title:scale-x-100"
                      style={{ background: "#4D1807" }}
                      aria-hidden="true"
                    />
                  </a>

                  <div className="mt-3 flex flex-col gap-1.5">
                    {[
                      { label: "Department", value: job.department },
                      { label: "Reports To", value: job.reportsTo },
                      { label: "Employment", value: job.type },
                      { label: "FLSA", value: job.flsa },
                    ].map((tag) => (
                      <p
                        key={tag.label}
                        className="font-body text-[12px] font-normal"
                        style={{ color: "#7C6533" }}
                      >
                        <span className="font-medium" style={{ color: "#504328" }}>{tag.label}:</span>{" "}
                        {tag.value}
                      </p>
                    ))}
                  </div>

                  <p
                    className="font-body text-[14px] font-normal leading-[1.6] mt-4"
                    style={{ color: "#504328" }}
                  >
                    {job.description}
                  </p>

                  <a
                    href={job.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-block font-mono text-[11px] tracking-[2px] uppercase mt-5 transition-colors duration-300 hover:text-[#6B2410]"
                    style={{ color: "#4D1807" }}
                  >
                    Apply on Indeed &rarr;
                    <span
                      className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                      style={{ background: "#4D1807" }}
                      aria-hidden="true"
                    />
                  </a>
                </article>
              ))}
            </div>
          </section>

          {/* ── Hiring Timeline ── */}
          <section ref={addRevealRef} className="careers-reveal px-6 py-15">
            <div className="mx-auto max-w-[900px]">
              <h2 className="font-body text-[24px] font-medium mb-8" style={{ color: "#1E1A12" }}>
                Hiring Timeline
              </h2>
              {TIMELINE.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3"
                  style={{
                    borderBottom:
                      i < TIMELINE.length - 1
                        ? "1px solid rgba(124, 101, 51, 0.12)"
                        : "none",
                  }}
                >
                  <span className="font-body text-[15px] font-normal" style={{ color: "#7C6533" }}>
                    {item.label}
                  </span>
                  <span className="font-body text-[15px] font-medium" style={{ color: "#1E1A12" }}>
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Next Steps ── */}
          <section ref={addRevealRef} className="careers-reveal px-6 pt-10 pb-20">
            <div className="mx-auto max-w-[900px]">
              <h2 className="font-body text-[24px] font-medium mb-4" style={{ color: "#1E1A12" }}>
                Next Steps
              </h2>
              <p className="font-body text-[15px] font-normal leading-[1.6]" style={{ color: "#504328" }}>
                If your application is selected, we will email you to set up a date and time for an interview.
              </p>
            </div>
          </section>
        </div>

        {/* ── Footer (dark) ── */}
        <footer className="flex flex-col items-center text-center px-6 pt-15 pb-10" style={{ background: "#221A0E" }}>
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
            href="mailto:operations@lavictoriatampa.com"
            className="font-body text-[13px] font-normal mt-1 transition-opacity duration-300 hover:opacity-80"
            style={{ color: "rgba(252, 233, 199, 0.6)" }}
          >
            operations@lavictoriatampa.com
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
          /* ── ScrollReveal ── */
          .careers-reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 800ms cubic-bezier(0, 0, 0.25, 1),
                        transform 800ms cubic-bezier(0, 0, 0.25, 1);
          }

          .careers-visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>
    </main>
  );
}
