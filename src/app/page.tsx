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
      "A space where Mexican culinary tradition is honored through refined technique and contemporary execution. Craftsmanship, depth of flavor, and heritage recipes elevated.",
    image: "/assets/kitchen.jpg",
    alt: "Wood-fired kitchen with open flames and plated dishes at La Victoria",
    href: "#kitchen-menu",
  },
  {
    title: "Crudo",
    description:
      "Rooted in coastal Mexican traditions, celebrating fresh ingredients with restraint and precision. Bold simplicity, vibrant textures, and raw elegance at their peak.",
    image: "/assets/crudo.jpg",
    alt: "Fresh crudo preparations with citrus and microgreens at the raw bar",
    href: "#crudo-menu",
  },
  {
    title: "Cantina",
    description:
      "Inspired by the timeless Mexican cantina, representing conviviality, storytelling, and ritual. Curated spirits, artisanal cocktails, and celebratory energy.",
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
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <Image
          src="/assets/cactus-video.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-deep/60" />
        <div className="hero-glow absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,_rgba(77,24,7,0.12)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_70%_30%,_rgba(124,101,51,0.08)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_80%,_rgba(244,212,124,0.06)_0%,_transparent_70%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Title */}
          <h1 className="sr-only">La Victoria</h1>
          <Image
            src="/assets/La-Victoria-title-only.svg"
            alt="La Victoria"
            width={600}
            height={133}
            priority
            className="hero-title w-[438px] md:w-[703px] h-auto"
          />

          {/* Subtitle */}
          <p className="hero-subtitle font-mono text-[12px] tracking-[6px] uppercase text-brass mt-5">
            Kitchen&ensp;&middot;&ensp;Crudo&ensp;&middot;&ensp;Cantina
          </p>

          {/* CTA */}
          <a
            href="#reserve"
            className="hero-cta group relative inline-block mt-10 font-mono text-[11px] tracking-[3px] uppercase text-cream border border-brass/40 px-8 py-3.5 overflow-hidden transition-colors duration-500"
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

      {/* -- Triptych -- */}
      <section
        id="menus"
        data-bg="deep"
        className="py-[140px] px-6"
      >
        <p className="font-mono text-[11px] tracking-[2.5px] uppercase text-brass text-center mb-20">
          Three Experiences, One Destination
        </p>

        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-3 gap-6">
          {PANELS.map((panel, i) => (
            <ScrollReveal key={panel.title} delay={i * 150}>
              <a
                href={panel.href}
                className="group relative block h-[50vh] min-h-[350px] md:h-[65vh] md:min-h-[450px] overflow-hidden cursor-pointer"
              >
                {/* Photo */}
                <Image
                  src={panel.image}
                  alt={panel.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                  className="object-cover object-center scale-[1.02] transition-transform duration-[600ms] ease-out group-hover:scale-[1.05]"
                />

                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/30 to-deep/5" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="font-body font-light italic text-[36px] text-cream leading-tight">
                    {panel.title}
                  </h3>
                  <p className="font-body text-[14px] text-sand mt-2 max-w-[280px] leading-relaxed">
                    {panel.description}
                  </p>
                  <span className="inline-block mt-4 font-mono text-[11px] tracking-[2px] uppercase text-brass opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    View Menu &rarr;
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* -- Philosophy -- */}
      <Philosophy />

      {/* -- Gallery -- */}
      <Gallery />

      {/* -- Menu Preview -- */}
      <MenuPreview />

      {/* -- Reservation CTA -- */}
      <ReservationCta />

      {/* -- Location -- */}
      <Location />

      {/* -- Footer -- */}
      <Footer />
    </main>
  );
}
