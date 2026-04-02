import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import Philosophy from "@/components/Philosophy";
import Gallery from "@/components/Gallery";
import MenuPreview from "@/components/MenuPreview";
import ReservationCta from "@/components/ReservationCta";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

const PANELS = [
  {
    title: "Kitchen",
    description:
      "Wood-fired traditions reimagined through the lens of Mexico\u2019s culinary heritage. Every dish tells a story of land and flame.",
    image: "/assets/kitchen.jpg",
    alt: "Wood-fired kitchen with open flames and plated dishes at La Victoria",
    href: "#kitchen-menu",
  },
  {
    title: "Crudo",
    description:
      "Gulf-to-glass freshness. Raw, cured, and ceviched preparations that honor the sea with precision and restraint.",
    image: "/assets/crudo.jpg",
    alt: "Fresh crudo preparations with citrus and microgreens at the raw bar",
    href: "#crudo-menu",
  },
  {
    title: "Cantina",
    description:
      "Mezcal-forward cocktails, rare tequilas, and agave spirits served at the green marble bar. A destination in itself.",
    image: "/assets/cantina.jpg",
    alt: "Mezcal cocktails and agave spirits at the green marble cantina bar",
    href: "#cantina-menu",
  },
] as const;

export default function Home() {
  return (
    <main>
      <section
        id="home"
        data-bg="deep"
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        {/* Atmospheric background */}
        <div className="absolute inset-0 bg-deep" />
        <div className="hero-glow absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,_rgba(139,58,47,0.12)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_70%_30%,_rgba(74,107,90,0.08)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_80%,_rgba(184,151,106,0.06)_0%,_transparent_70%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Logo mark */}
          <Image
            src="/assets/la-victoria-logo-white.png"
            alt="La Victoria logo"
            width={90}
            height={110}
            priority
            className="hero-logo w-[70px] md:w-[90px] h-auto mb-8"
          />

          {/* Title */}
          <h1 className="hero-title font-display font-light uppercase text-cream tracking-[8px] text-[clamp(48px,8vw,96px)] leading-[1.1]">
            La Victoria
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle font-body text-[12px] font-normal tracking-[6px] uppercase text-brass mt-5">
            Kitchen&ensp;·&ensp;Crudo&ensp;·&ensp;Cantina
          </p>

          {/* CTA */}
          <a
            href="#reserve"
            className="hero-cta group relative inline-block mt-10 font-body text-[11px] font-medium tracking-[3px] uppercase text-cream border border-brass/40 px-8 py-3.5 overflow-hidden transition-colors duration-500"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-terracotta transition-transform duration-500 group-hover:scale-x-100" />
            <span className="relative">Reserve a Table</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-10 bg-gradient-to-b from-brass/60 to-transparent scroll-pulse" />
        </div>
      </section>

      {/* ── Triptych ── */}
      <section
        id="menus"
        data-bg="deep"
        className="py-[140px] px-6"
      >
        <p className="font-body text-[11px] font-medium tracking-[4px] uppercase text-brass text-center mb-20">
          Three Experiences, One Destination
        </p>

        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-3 gap-6">
          {PANELS.map((panel, i) => (
            <ScrollReveal key={panel.title} delay={i * 150}>
              <a
                href={panel.href}
                className="group relative block h-[50vh] min-h-[350px] md:h-[70vh] md:min-h-[500px] overflow-hidden cursor-pointer"
              >
                {/* Photo */}
                <Image
                  src={panel.image}
                  alt={panel.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                  className="object-cover object-center transition-transform duration-[600ms] ease-out group-hover:scale-105"
                />

                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="font-display italic text-[36px] text-cream leading-tight">
                    {panel.title}
                  </h3>
                  <p className="font-body text-[14px] text-sand mt-2 max-w-[280px] leading-relaxed">
                    {panel.description}
                  </p>
                  <span className="inline-block mt-4 font-body text-[11px] font-medium tracking-[2px] uppercase text-brass opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    View Menu &rarr;
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Philosophy ── */}
      <Philosophy />

      {/* ── Gallery ── */}
      <Gallery />

      {/* ── Menu Preview ── */}
      <MenuPreview />

      {/* ── Reservation CTA ── */}
      <ReservationCta />

      {/* ── Location ── */}
      <Location />

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
