import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const PANELS = [
  {
    title: "Kitchen",
    description:
      "A space where Mexican culinary tradition is honored through refined technique and contemporary execution.",
    image: "/assets/photos/kitchen-plate.jpg",
    lift: "150%",
    zoom: 1,
    alt: "Close view of a composed plate with crisp fritters and pickled onion",
  },
  {
    title: "Crudo",
    description:
      "Rooted in coastal Mexican traditions, celebrating fresh ingredients with restraint and precision.",
    image: "/assets/photos/crudo-oysters.jpg",
    lift: "115%",
    zoom: 1,
    alt: "Oysters on the half shell over crushed ice with lemon and salsas",
  },
  {
    title: "Cantina",
    description:
      "Inspired by the timeless Mexican cantina, representing conviviality, storytelling, and ritual.",
    image: "/assets/photos/cantina-stone-table.jpg",
    lift: "100%",
    zoom: 1.14,
    alt: "Four colorful cocktails on a stone table in the dining room",
  },
] as const;

export default function Triptych() {
  return (
    <section className="px-6 pt-16 md:pt-24 pb-[140px]">
      <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-3 gap-6">
        {PANELS.map((panel, i) => (
          <ScrollReveal key={panel.title} delay={i * 150}>
            <Link
              href="/menus"
              className="group relative block h-[50vh] min-h-[350px] md:h-[65vh] md:min-h-[450px] overflow-hidden"
            >
              {/* Taller than the card and anchored to its bottom, which lifts the photo */}
              <div
                className="absolute inset-x-0 bottom-0"
                style={{
                  height: panel.lift,
                  transform: `scale(${panel.zoom})`,
                  transformOrigin: "50% 46%",
                }}
              >
                <Image
                  src={panel.image}
                  alt={panel.alt}
                  fill
                  sizes="(max-width: 767px) 150vw, 50vw"
                  loading="lazy"
                  className="object-cover object-bottom scale-[1.02] transition-transform duration-[600ms] ease-out group-hover:scale-[1.05]"
                />
              </div>

              {/* Gradient lives on the text block so it follows the copy however it wraps */}
              <div className="absolute bottom-0 left-0 right-0 p-6 pt-24 md:p-8 md:pt-28 bg-gradient-to-t from-deep/95 via-deep/70 via-70% to-transparent">
                <h2 className="font-display text-[40px] font-normal tracking-[1px] text-cream leading-tight">
                  {panel.title}
                </h2>
                {/* Side by side, the longest copy sets the height so all three titles line up */}
                <p className="font-body text-[14px] text-cream mt-2 max-w-[320px] leading-relaxed md:min-h-[7lh] lg:min-h-[4lh] xl:min-h-0">
                  {panel.description}
                </p>
                {/* Reveals on hover, and always shows on touch screens, which can't hover */}
                <span className="inline-block mt-4 font-body text-[12px] font-medium tracking-[1px] uppercase text-brass opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0">
                  View Menu &rarr;
                </span>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
