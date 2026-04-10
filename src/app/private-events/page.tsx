import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Private Events | La Victoria",
  description:
    "Host your next private event at La Victoria. Intimate dinners, celebrations, and corporate gatherings in downtown Tampa\u2019s newest upscale Mexican restaurant.",
};

const DETAILS = [
  { label: "Capacity", value: "Up to 40 seated guests" },
  { label: "Availability", value: "Tuesday through Sunday evenings" },
  { label: "Minimum Spend", value: "Varies by day and party size" },
];

const FIELDS = [
  { id: "name", label: "Name", type: "text", required: true },
  { id: "email", label: "Email", type: "email", required: true },
  { id: "phone", label: "Phone", type: "tel", required: false },
  { id: "date", label: "Preferred Date", type: "date", required: false },
] as const;

export default function PrivateEventsPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative flex items-center justify-center min-h-[45vh] min-h-[max(45vh,320px)] overflow-hidden pt-[72px]">
        <div className="absolute inset-0 bg-deep" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,_rgba(77,24,7,0.1)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_70%_30%,_rgba(124,101,51,0.07)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_80%,_rgba(244,212,124,0.05)_0%,_transparent_70%)]" />

        <div className="relative z-10 text-center px-6">
          <p className="font-mono text-[11px] tracking-[2.5px] uppercase text-brass mb-5">
            Private Events
          </p>
          <h1 className="font-body font-light italic text-cream text-[clamp(32px,5vw,56px)] leading-[1.2]">
            Your evening, our stage
          </h1>
        </div>
      </section>

      {/* Content */}
      <section data-bg="deep" className="py-[100px] px-6 md:px-12">
        <div className="mx-auto max-w-[1000px] grid grid-cols-1 md:grid-cols-[55%_45%] gap-12 md:gap-16">
          {/* Left column -- info */}
          <ScrollReveal>
            <div>
              <p className="font-body font-light italic text-[22px] text-cream leading-[1.6] mb-12">
                La Victoria offers an intimate private dining room perfect for
                celebrations, corporate gatherings, and milestone events. Our team
                will work with you to create a custom menu and curated cocktail
                experience tailored to your occasion.
              </p>

              {DETAILS.map((d) => (
                <div key={d.label} className="mb-8">
                  <p className="font-mono text-[11px] tracking-[2.5px] uppercase text-brass mb-2">
                    {d.label}
                  </p>
                  <p className="font-body text-[16px] text-cream">{d.value}</p>
                </div>
              ))}

              <p className="font-body text-[13px] text-sand italic mt-4">
                For inquiries about buyouts of the full restaurant, please contact
                us directly.
              </p>
            </div>
          </ScrollReveal>

          {/* Right column -- form */}
          <ScrollReveal delay={150}>
            <div className="bg-surface border border-brass/10 p-8 md:p-10">
              <h2 className="font-body font-light italic text-[24px] text-cream mb-8">
                Inquire
              </h2>

              <form className="flex flex-col gap-5">
                {FIELDS.map((f) => (
                  <div key={f.id}>
                    <label
                      htmlFor={f.id}
                      className="block font-mono text-[11px] tracking-[1.5px] uppercase text-sand mb-1.5"
                    >
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      name={f.id}
                      type={f.type}
                      required={f.required}
                      className="w-full bg-transparent border-b border-brass/20 text-cream font-body text-[14px] py-3 outline-none transition-colors duration-300 placeholder:text-smoke focus:border-brass"
                    />
                  </div>
                ))}

                {/* Guest count */}
                <div>
                  <label
                    htmlFor="guests"
                    className="block font-mono text-[11px] tracking-[1.5px] uppercase text-sand mb-1.5"
                  >
                    Guest Count
                  </label>
                  <input
                    id="guests"
                    name="guests"
                    type="number"
                    placeholder="Number of guests"
                    className="w-full bg-transparent border-b border-brass/20 text-cream font-body text-[14px] py-3 outline-none transition-colors duration-300 placeholder:text-smoke focus:border-brass"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-[11px] tracking-[1.5px] uppercase text-sand mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your event"
                    className="w-full bg-transparent border-b border-brass/20 text-cream font-body text-[14px] py-3 outline-none transition-colors duration-300 placeholder:text-smoke focus:border-brass resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-3 w-full bg-terracotta text-cream font-mono text-[12px] tracking-[3px] uppercase py-4 transition-colors duration-300 hover:bg-terracotta-glow"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
