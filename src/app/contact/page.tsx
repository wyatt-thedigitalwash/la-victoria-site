import type { Metadata } from "next";
import MapPlaceholder from "@/components/MapPlaceholder";

export const metadata: Metadata = {
  title: "Visit | La Victoria",
  description:
    "Find La Victoria at 105 W Tyler Street in downtown Tampa. Hours, directions, and contact information.",
};

const HOURS = [
  { day: "Tuesday \u2014 Thursday", time: "5:00 PM \u2014 10:00 PM" },
  { day: "Friday \u2014 Saturday", time: "5:00 PM \u2014 11:00 PM" },
  { day: "Sunday", time: "5:00 PM \u2014 9:00 PM" },
  { day: "Monday", time: "Closed" },
];

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=105+W+Tyler+Street+Tampa+FL+33602";

export default function ContactPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative flex items-center justify-center min-h-[40vh] min-h-[max(40vh,280px)] overflow-hidden pt-[72px]">
        <div className="absolute inset-0 bg-deep" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,_rgba(77,24,7,0.1)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_70%_30%,_rgba(124,101,51,0.07)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_80%,_rgba(244,212,124,0.05)_0%,_transparent_70%)]" />

        <div className="relative z-10 text-center px-6">
          <p className="font-mono text-[11px] tracking-[2.5px] uppercase text-brass mb-5">
            Visit
          </p>
          <h1 className="font-body font-light italic text-cream text-[clamp(28px,5vw,48px)] leading-[1.2] mb-3">
            105 W Tyler Street
          </h1>
          <p className="font-body text-[14px] text-sand tracking-[1px]">
            Tampa, Florida 33602
          </p>
        </div>
      </section>

      {/* Content */}
      <section data-bg="deep" className="py-[100px] px-6 md:px-12">
        <div className="mx-auto max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left column -- info */}
          <div>
            <h2 className="font-body text-[28px] font-medium text-cream mb-8">
              Hours
            </h2>
            <div className="max-w-[350px]">
              {HOURS.map((row) => (
                <div
                  key={row.day}
                  className="flex justify-between py-2 border-b border-brass/8"
                >
                  <span className="font-body text-[14px] text-sand">
                    {row.day}
                  </span>
                  <span className="font-body text-[14px] text-cream">
                    {row.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-12">
              <h2 className="font-body text-[28px] font-medium text-cream mb-6">
                Contact
              </h2>

              <div className="mb-6">
                <p className="font-mono text-[11px] tracking-[2.5px] uppercase text-brass mb-2">
                  Email
                </p>
                <p className="font-body text-[15px] text-cream">
                  hello@lavictoriatampa.com
                </p>
              </div>

              <div className="mb-8">
                <p className="font-mono text-[11px] tracking-[2.5px] uppercase text-brass mb-2">
                  Phone
                </p>
                <p className="font-body text-[15px] text-cream">
                  (813) 555-0100
                </p>
              </div>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-mono text-[11px] tracking-[2px] uppercase text-brass transition-colors duration-300 hover:text-cream"
              >
                Get Directions &rarr;
              </a>
            </div>
          </div>

          {/* Right column -- map + socials */}
          <div>
            <MapPlaceholder className="w-full min-h-[400px] h-full md:min-h-0" />

            <div className="flex justify-center gap-6 mt-6">
              <a
                href="#"
                className="font-body text-[13px] tracking-[1px] text-smoke transition-colors duration-300 hover:text-brass"
              >
                Instagram
              </a>
              <a
                href="#"
                className="font-body text-[13px] tracking-[1px] text-smoke transition-colors duration-300 hover:text-brass"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
