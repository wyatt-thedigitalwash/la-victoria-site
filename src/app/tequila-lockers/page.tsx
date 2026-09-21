import type { Metadata } from "next";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import LockerRequestForm from "@/components/LockerRequestForm";
import SimpleFooter from "@/components/SimpleFooter";

const DESCRIPTION =
  "Reserve a private tequila locker at La Victoria in downtown Tampa. Lockers are limited. Request yours and our team will reach out personally.";

export const metadata: Metadata = {
  title: "Tequila Lockers",
  description: DESCRIPTION,
  alternates: { canonical: "/tequila-lockers" },
  openGraph: {
    title: "Tequila Lockers | La Victoria — Tampa",
    description: DESCRIPTION,
    url: "/tequila-lockers",
  },
};

const FEATURES = [
  {
    title: "Yours Alone",
    description: "A private locker at La Victoria, reserved in your name.",
  },
  {
    title: "Always Ready",
    description: "Your bottle is here between visits, waiting for the next pour.",
  },
  {
    title: "Limited by Design",
    description: "There are only so many lockers on the wall. Once they are claimed, they are claimed.",
  },
] as const;

const STEPS = [
  {
    number: "01",
    title: "Request",
    description: "Share your contact details in the form below. It takes less than a minute.",
  },
  {
    number: "02",
    title: "We Reach Out",
    description:
      "A member of our team contacts you personally with availability, membership details, and next steps.",
  },
  {
    number: "03",
    title: "Claim Your Locker",
    description:
      "Choose your bottle and make the locker yours. If every locker is spoken for, you hold a place on the waitlist.",
  },
] as const;

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://lavictoriatampa.com" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tequila Lockers",
      item: "https://lavictoriatampa.com/tequila-lockers",
    },
  ],
};

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-mono text-[11px] tracking-[4px] uppercase mb-5" style={{ color: "#F4D47C" }}>
      {children}
    </p>
  );
}

function SectionHeading({ children, className = "" }: { children: string; className?: string }) {
  return (
    <h2
      className={`font-body text-[clamp(28px,4vw,40px)] font-light italic leading-[1.3] ${className}`}
      style={{ color: "#FCE9C7" }}
    >
      {children}
    </h2>
  );
}

export default function TequilaLockersPage() {
  return (
    <main id="main-content" style={{ background: "#221A0E" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <Image
          src="/assets/tequila-lockers-wall.jpg"
          alt="Wall of backlit oak tequila lockers with black frames at La Victoria"
          fill
          sizes="100vw"
          priority
          className="object-cover object-[center_58%]"
        />
        {/* Dark overlay, fading into the page background at the bottom */}
        <div className="absolute inset-0 bg-[#221A0E]/50" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(34,26,14,0.5)_0%,_transparent_30%,_transparent_60%,_#221A0E_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,_rgba(34,26,14,0.7)_0%,_transparent_75%)]" />

        <div
          className="relative z-10 text-center max-w-[680px] pb-10"
          style={{ paddingTop: "calc(var(--banner-height, 0px) + 72px)" }}
        >
          <div className="hero-subtitle" style={{ animationDelay: "0.2s" }}>
            <SectionLabel>Tequila Lockers</SectionLabel>
          </div>
          <h1
            className="hero-subtitle font-body text-[clamp(34px,5.5vw,56px)] font-light italic leading-[1.25] mb-6"
            style={{ color: "#FCE9C7", animationDelay: "0.5s" }}
          >
            Your Bottle, Always Waiting
          </h1>
          <p
            className="hero-subtitle font-body text-[16px] font-normal leading-[1.8] mx-auto max-w-[540px]"
            style={{ color: "rgba(252, 233, 199, 0.8)", animationDelay: "0.9s" }}
          >
            A private, glass-front locker at La Victoria, reserved for your
            bottle and ready whenever you are. Lockers are limited. Request
            yours and we&apos;ll reach out personally.
          </p>
          <div className="hero-cta mt-10" style={{ animationDelay: "1.3s" }}>
            <a
              href="#request"
              className="group relative inline-block font-mono text-[11px] tracking-[3px] uppercase border border-[rgba(244,212,124,0.4)] px-8 py-3.5 overflow-hidden"
              style={{ color: "#FCE9C7" }}
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-[#4D1807] transition-transform duration-500 group-hover:scale-x-100" />
              <span className="relative">Request a Locker</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── The Lockers ── */}
      <section data-bg="dark" className="px-6 py-20 md:py-32">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <ScrollReveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/assets/tequila-lockers-detail.jpg"
                alt="Close view of the lit oak interiors and black frames of the tequila lockers"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ boxShadow: "inset 0 0 0 1px rgba(244, 212, 124, 0.12)" }}
                aria-hidden="true"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <SectionHeading className="mb-6">Oak, Glass, and Warm Light</SectionHeading>
            <p
              className="font-body text-[16px] font-normal leading-[1.8]"
              style={{ color: "rgba(252, 233, 199, 0.7)" }}
            >
              Set into the wall at La Victoria, each locker is built from oak,
              framed in black, and lit from within. It keeps your bottle
              between visits, so the pour you love is already here when you
              sit down.
            </p>

            <ul className="mt-10 flex flex-col">
              {FEATURES.map((feature) => (
                <li
                  key={feature.title}
                  className="py-5"
                  style={{ borderTop: "1px solid rgba(244, 212, 124, 0.12)" }}
                >
                  <h3
                    className="font-mono text-[12px] font-bold tracking-[3px] uppercase mb-2"
                    style={{ color: "#F4D47C" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="font-body text-[15px] font-normal leading-[1.7]"
                    style={{ color: "rgba(252, 233, 199, 0.7)" }}
                  >
                    {feature.description}
                  </p>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        data-bg="deep"
        className="px-6 py-20 md:py-32"
        style={{
          background: `
            radial-gradient(ellipse 60% 60% at 20% 30%, rgba(77, 24, 7, 0.16) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 80% 70%, rgba(124, 101, 51, 0.1) 0%, transparent 70%),
            #1A1508
          `,
        }}
      >
        <div className="mx-auto max-w-[1100px]">
          <ScrollReveal className="text-center">
            <SectionHeading>Three Steps to Your Own Locker</SectionHeading>
          </ScrollReveal>

          <ol className="mt-14 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-3 md:gap-12">
            {STEPS.map((step, i) => (
              <li key={step.number}>
                <ScrollReveal delay={i * 150}>
                  <div
                    className="pt-6"
                    style={{ borderTop: "1px solid rgba(244, 212, 124, 0.25)" }}
                  >
                    <p
                      className="font-mono text-[11px] tracking-[3px] mb-4"
                      style={{ color: "#C4A882" }}
                      aria-hidden="true"
                    >
                      {step.number}
                    </p>
                    <h3
                      className="font-mono text-[14px] font-bold tracking-[3px] uppercase mb-3"
                      style={{ color: "#F4D47C" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="font-body text-[15px] font-normal leading-[1.8]"
                      style={{ color: "rgba(252, 233, 199, 0.7)" }}
                    >
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Request Form ── */}
      <section
        id="request"
        data-bg="dark"
        className="px-6 py-20 md:py-32"
        style={{ scrollMarginTop: "calc(var(--banner-height, 0px) + 40px)" }}
      >
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 md:grid-cols-[5fr_6fr] md:gap-20">
          <ScrollReveal>
            <SectionHeading className="mb-6">Tell Us Where to Reach You</SectionHeading>
            <p
              className="font-body text-[16px] font-normal leading-[1.8]"
              style={{ color: "rgba(252, 233, 199, 0.7)" }}
            >
              Leave your details and a member of our team will be in touch
              with availability, membership details, and everything that comes
              with holding a locker at La Victoria.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <LockerRequestForm />
          </ScrollReveal>
        </div>
      </section>

      <SimpleFooter note="Please drink responsibly. Must be 21 or older." />
    </main>
  );
}
