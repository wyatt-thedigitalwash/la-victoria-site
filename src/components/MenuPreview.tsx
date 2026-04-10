"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const ITEMS = [
  {
    name: "Hamachi Crudo",
    tag: "Crudo",
    desc: "Yuzu kosho, pickled serrano, avocado mousse, crispy shallot",
    price: 24,
  },
  {
    name: "Duck Carnitas",
    tag: null,
    desc: "Slow-braised Moulard duck, salsa negra, handmade tortillas, pickled onion",
    price: 42,
  },
  {
    name: "Whole Grilled Branzino",
    tag: null,
    desc: "Wood-fired, mole verde, charred lime, heirloom tomato salsa",
    price: 48,
  },
  {
    name: "Aguachile Rojo",
    tag: "Crudo",
    desc: "Gulf shrimp, chile de arbol, cucumber, red onion, tostada",
    price: 22,
  },
  {
    name: "Corn Husk Meringue",
    tag: null,
    desc: "Corn mousse, husk ash, caramelized milk ice cream, toasted masa",
    price: 18,
  },
] as const;

export default function MenuPreview() {
  return (
    <section data-bg="deep" className="py-[140px] px-6 md:px-12">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 mb-10 border-b border-brass/15">
          <div>
            <p className="font-mono text-[11px] tracking-[2.5px] uppercase text-brass mb-3">
              From the Kitchen
            </p>
            <h2 className="font-body font-light italic text-cream text-[clamp(28px,4vw,48px)] leading-[1.3]">
              Signature Selections
            </h2>
          </div>
          <Link
            href="/menus"
            className="shrink-0 font-mono text-[11px] tracking-[2px] uppercase text-brass transition-colors duration-300 hover:text-cream"
          >
            Full Menu &rarr;
          </Link>
        </div>

        {/* Items */}
        <div>
          {ITEMS.map((item, i) => (
            <ScrollReveal key={item.name} delay={i * 100}>
              <div className="menu-item group grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-8 py-9 border-b border-brass/8 cursor-pointer transition-all duration-400">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-body text-[28px] text-cream transition-colors duration-400 group-hover:text-terracotta">
                      {item.name}
                    </span>
                    {item.tag && (
                      <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-verde/80 border border-verde/30 px-2 py-0.5 leading-none">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="font-body text-[14px] text-sand leading-[1.6] mt-1.5">
                    {item.desc}
                  </p>
                </div>
                <span className="font-body text-[22px] font-medium text-brass whitespace-nowrap md:self-center">
                  ${item.price}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
