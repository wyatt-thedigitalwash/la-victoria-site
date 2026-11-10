import type { Metadata } from "next";
import Image from "next/image";
import BrandButton from "@/components/BrandButton";
import ScrollReveal from "@/components/ScrollReveal";
import LockerRequestForm from "@/components/LockerRequestForm";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";

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
      <PageHero
        title="Your Bottle, Always Waiting"
        tall
        background={
          <>
            <Image
              src="/assets/tequila-lockers-wall.jpg"
              alt="Wall of backlit oak tequila lockers with black frames at La Victoria"
              fill
              sizes="100vw"
              priority
              className="object-cover object-[center_58%]"
            />
            <div className="absolute inset-0" style={{ background: "rgba(34, 26, 14, 0.68)" }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,_rgba(34,26,14,0.75)_0%,_transparent_75%)]" />
          </>
        }
      >
        <p className="font-body text-[16px] font-normal leading-[1.8] max-w-[540px]" style={{ color: "#FCE9C7" }}>
          A private, glass-front locker at La Victoria, reserved for your bottle
          and ready whenever you are. Lockers are limited. Request yours and
          we&apos;ll reach out personally.
        </p>
        <BrandButton href="#request" className="mt-8">
          Request a Locker
        </BrandButton>
      </PageHero>

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

      <SiteFooter note="Please drink responsibly. Must be 21 or older." />
    </main>
  );
}
