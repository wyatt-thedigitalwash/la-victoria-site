export default function ReservationCta() {
  return (
    <section
      id="events"
      data-bg="charcoal"
      className="relative py-[140px] px-6 text-center overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,_rgba(77,24,7,0.08)_0%,_transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-[600px]">
        <p className="font-mono text-[11px] tracking-[2.5px] uppercase text-brass mb-5">
          Join Us
        </p>
        <h2 className="font-body font-light italic text-cream text-[clamp(36px,5vw,64px)] leading-[1.2] mb-6">
          Your table awaits
        </h2>
        <p className="font-body text-[15px] text-sand leading-[1.8] mb-12">
          Whether an intimate dinner for two or a private celebration in our
          dining room, every evening at La Victoria is crafted to be remembered.
        </p>
        <a
          href="#reserve"
          className="inline-block font-mono text-[12px] tracking-[3px] uppercase text-cream bg-terracotta border border-terracotta px-14 py-[18px] transition-all duration-500 hover:bg-transparent hover:border-brass"
        >
          Reserve a Table
        </a>
      </div>
    </section>
  );
}
