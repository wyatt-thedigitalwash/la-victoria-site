import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import MenuTabs from "@/components/MenuTabs";

export const metadata: Metadata = {
  title: "Menus | La Victoria",
  description:
    "Explore the Kitchen, Crudo, and Cantina menus at La Victoria — an upscale Mexican dining experience in downtown Tampa.",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface MenuItem {
  name: string;
  desc: string;
  price: number | null;
}

interface MenuCategory {
  category: string;
  note?: string;
  items: MenuItem[];
}

interface MenuSection {
  id: string;
  title: string;
  categories: MenuCategory[];
}

const MENUS: MenuSection[] = [
  {
    id: "kitchen",
    title: "Kitchen",
    categories: [
      {
        category: "Para Empezar (To Start)",
        items: [
          { name: "Elote Asado", desc: "Grilled street corn, chile mayo, cotija, lime, toasted grasshopper salt", price: 14 },
          { name: "Bone Marrow Tostada", desc: "Roasted marrow, salsa macha, pickled onion, cilantro", price: 18 },
          { name: "Queso Fundido", desc: "Oaxacan cheese, chorizo, roasted poblano, flour tortillas", price: 16 },
          { name: "Tortilla Soup", desc: "Guajillo broth, avocado, crema, crispy tortilla strips", price: 14 },
        ],
      },
      {
        category: "Platos Fuertes (Main Courses)",
        items: [
          { name: "Duck Carnitas", desc: "Slow-braised Moulard duck, salsa negra, handmade tortillas, pickled onion", price: 42 },
          { name: "Whole Grilled Branzino", desc: "Wood-fired, mole verde, charred lime, heirloom tomato salsa", price: 48 },
          { name: "Short Rib Barbacoa", desc: "12-hour braised, black bean puree, pickled jalape\u00f1o, corn tortillas", price: 38 },
          { name: "Cochinita Pibil", desc: "Achiote-marinated heritage pork, habanero onion, handmade tortillas", price: 34 },
          { name: "Carne Asada", desc: "16oz prime ribeye, chimichurri, roasted chiles, grilled spring onion", price: 56 },
        ],
      },
      {
        category: "Postres (Desserts)",
        items: [
          { name: "Corn Husk Meringue", desc: "Corn mousse, husk ash, caramelized milk ice cream, toasted masa", price: 18 },
          { name: "Tres Leches", desc: "Vanilla sponge, cinnamon crema, seasonal fruit, toasted coconut", price: 16 },
          { name: "Churros", desc: "Dark chocolate ganache, cajeta, cinnamon sugar", price: 14 },
        ],
      },
    ],
  },
  {
    id: "crudo",
    title: "Crudo",
    categories: [
      {
        category: "Raw",
        items: [
          { name: "Hamachi Crudo", desc: "Yuzu kosho, pickled serrano, avocado mousse, crispy shallot", price: 24 },
          { name: "Tuna Tostada", desc: "Ahi tuna, chipotle aioli, mango, crispy wonton, sesame", price: 22 },
          { name: "Oysters", desc: "Half dozen, mignonette, habanero hot sauce, charred lemon", price: 28 },
          { name: "Scallop Tiradito", desc: "Thinly sliced diver scallops, aji amarillo, citrus, micro herbs", price: 26 },
        ],
      },
      {
        category: "Cured & Ceviched",
        items: [
          { name: "Aguachile Rojo", desc: "Gulf shrimp, chile de arbol, cucumber, red onion, tostada", price: 22 },
          { name: "Ceviche Clasico", desc: "Catch of the day, lime tiger\u2019s milk, sweet potato, crispy corn", price: 20 },
          { name: "Kampachi Tataki", desc: "Seared, ponzu, avocado, radish, jalape\u00f1o crisp", price: 26 },
          { name: "Ceviche Negro", desc: "Squid ink tiger\u2019s milk, octopus, shrimp, plantain chip", price: 24 },
        ],
      },
    ],
  },
  {
    id: "cantina",
    title: "Cantina",
    categories: [
      {
        category: "Signature Cocktails",
        items: [
          { name: "La Victoria", desc: "Mezcal, Aperol, passionfruit, lime, smoked salt", price: 18 },
          { name: "El Dorado", desc: "Reposado tequila, pineapple tepache, ancho chile, agave", price: 17 },
          { name: "Rosa de Oaxaca", desc: "Mezcal, hibiscus, grapefruit, elderflower, black lava salt", price: 18 },
          { name: "Paloma Negra", desc: "Charcoal-infused blanco, grapefruit shrub, lime, soda, smoked rim", price: 16 },
          { name: "Mango Margarita", desc: "Blanco tequila, fresh mango, Cointreau, lime, tajin rim", price: 16 },
        ],
      },
      {
        category: "Agave Spirits",
        note: "Our collection features over 60 mezcals and tequilas. Ask your server for the full spirits list.",
        items: [],
      },
      {
        category: "Sin Alcohol (Non-Alcoholic)",
        items: [
          { name: "Agua de Jamaica", desc: "Hibiscus, cinnamon, citrus", price: 8 },
          { name: "Tepache Fresca", desc: "Fermented pineapple, ginger, piloncillo", price: 9 },
          { name: "Mexican Coke Float", desc: "Vanilla bean ice cream, Mexican Coca-Cola", price: 10 },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function MenusPage() {
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
            Menus
          </p>
          <h1 className="font-body font-light italic text-cream text-[clamp(32px,5vw,56px)] leading-[1.2]">
            Kitchen&ensp;&middot;&ensp;Crudo&ensp;&middot;&ensp;Cantina
          </h1>
        </div>
      </section>

      {/* Sticky tabs */}
      <MenuTabs />

      {/* Menu sections */}
      {MENUS.map((menu) => (
        <section
          key={menu.id}
          id={menu.id}
          data-bg="deep"
          className="pt-[100px] pb-20 px-6 md:px-12"
        >
          <div className="mx-auto max-w-[900px]">
            {/* Section heading */}
            <h2 className="font-body font-light italic text-[40px] text-cream text-center leading-tight">
              {menu.title}
            </h2>
            <div className="mx-auto mt-6 mb-6 w-10 h-px bg-brass" />

            {/* Categories */}
            {menu.categories.map((cat) => (
              <div key={cat.category} className="mt-16">
                <h3 className="font-body text-[24px] font-medium text-cream mb-4">
                  {cat.category}
                </h3>
                <div className="h-px w-full bg-brass/8 mb-2" />

                {cat.note && (
                  <p className="font-body font-light italic text-[15px] text-sand leading-[1.7] py-6">
                    {cat.note}
                  </p>
                )}

                {cat.items.map((item, i) => (
                  <ScrollReveal key={item.name} delay={i * 80}>
                    <div className="py-5 border-b border-brass/[0.06]">
                      <div className="flex items-baseline gap-3">
                        <span className="font-body text-[20px] text-cream shrink-0">
                          {item.name}
                        </span>
                        <span className="flex-1 border-b border-dotted border-brass/15 translate-y-[-4px] min-w-[20px]" />
                        {item.price !== null && (
                          <span className="font-body text-[18px] font-medium text-brass whitespace-nowrap shrink-0">
                            ${item.price}
                          </span>
                        )}
                      </div>
                      <p className="font-body text-[13px] text-sand leading-[1.5] mt-1.5">
                        {item.desc}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
