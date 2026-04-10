import type { Metadata } from "next";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "The Space | La Victoria",
  description:
    "Step inside La Victoria. Explore our cantina bar, crudo counter, dining room, and private dining spaces in downtown Tampa.",
};

const SPACES = [
  {
    label: "The Cantina Bar",
    image: "/assets/cantina-bar.jpg",
    alt: "The green marble cantina bar with backlit bottle wall and ribbed glass pendants",
  },
  {
    label: "The Crudo Counter",
    image: "/assets/crudo-counter.jpg",
    alt: "The crudo counter with fresh seafood display and chefs preparing dishes",
  },
  {
    label: "The Dining Room",
    image: "/assets/the-dining-room.jpg",
    alt: "The main dining room with dark marble tables, scalloped ceiling tiles, and candlelight",
  },
  {
    label: "Private Dining",
    image: "/assets/private-dining.jpg",
    alt: "The private dining room with sheer curtain dividers and intimate table setting",
  },
] as const;

export default function TheSpacePage() {
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
            The Space
          </p>
          <h1 className="font-body font-light italic text-cream text-[clamp(32px,5vw,56px)] leading-[1.2]">
            An atmosphere you feel before you see
          </h1>
        </div>
      </section>

      {/* 2x2 Gallery Grid */}
      <section data-bg="deep" className="pt-[60px] pb-0 px-6 md:px-12">
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-6">
          {SPACES.map((item, i) => (
            <ScrollReveal key={item.label} delay={i * 150}>
              <div className="group relative h-[50vh] min-h-[350px] overflow-hidden rounded-sm">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-transparent to-transparent" />
                <span className="absolute bottom-6 left-6 font-body font-light italic text-[24px] text-cream">
                  {item.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Text section */}
      <section className="py-[100px] px-6 md:px-12">
        <div className="mx-auto max-w-[800px]">
          <ScrollReveal>
            <h2 className="font-body font-light italic text-[32px] text-cream text-center mb-12 leading-[1.3]">
              Where heritage meets modern refinement
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p className="font-body text-[16px] text-sand leading-[1.8] mb-8">
              La Victoria brings together three distinct experiences under one
              roof. Each space has been designed to reflect a different dimension
              of Mexican culinary culture, from the fire of the kitchen to the
              precision of the crudo bar to the conviviality of the cantina.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="font-body text-[16px] text-sand leading-[1.8] mb-8">
              The interiors draw from old-world Mexican architecture with arched
              doorways, terracotta tones, and hand-selected materials that feel
              both timeless and contemporary. Green marble, ribbed glass, and
              scalloped ceiling tiles create layers of texture and warmth.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={450}>
            <p className="font-body text-[16px] text-sand leading-[1.8]">
              Whether you are seated at the bar watching a mezcal cocktail come
              to life or tucked into the dining room for a private celebration,
              every detail has been considered.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
