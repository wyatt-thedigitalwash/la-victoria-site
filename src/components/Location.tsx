import MapPlaceholder from "@/components/MapPlaceholder";

const HOURS = [
  { day: "Tuesday \u2014 Thursday", time: "5:00 PM \u2014 10:00 PM" },
  { day: "Friday \u2014 Saturday", time: "5:00 PM \u2014 11:00 PM" },
  { day: "Sunday", time: "5:00 PM \u2014 9:00 PM" },
  { day: "Monday", time: "Closed" },
];

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=105+W+Tyler+Street+Tampa+FL+33602";

export default function Location() {
  return (
    <section
      id="location"
      data-bg="charcoal"
      className="grid grid-cols-1 md:grid-cols-2"
    >
      {/* Info column */}
      <div className="bg-charcoal py-20 md:py-20 px-6 md:px-16">
        <p className="font-mono text-[11px] tracking-[2.5px] uppercase text-brass mb-6">
          Find Us
        </p>

        <address className="not-italic font-body font-light italic text-[28px] text-cream leading-[1.5] mb-10">
          105 W Tyler Street
          <br />
          Tampa, Florida 33602
        </address>

        {/* Hours */}
        <div className="max-w-[300px]">
          {HOURS.map((row) => (
            <div
              key={row.day}
              className="flex justify-between py-2 border-b border-brass/8"
            >
              <span className="font-body text-[13px] text-sand">{row.day}</span>
              <span className="font-body text-[13px] text-cream">{row.time}</span>
            </div>
          ))}
        </div>

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-10 font-mono text-[11px] tracking-[2px] uppercase text-brass transition-colors duration-300 hover:text-cream"
        >
          Get Directions &rarr;
        </a>
      </div>

      {/* Map placeholder */}
      <MapPlaceholder className="min-h-[400px] md:min-h-0" />
    </section>
  );
}
