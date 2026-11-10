import type { Metadata } from "next";
import Image from "next/image";
import CourseIcons from "@/components/CourseIcons";
import HomeReservation from "@/components/HomeReservation";
import MenuItemRow from "@/components/MenuItemRow";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import SiteFooter from "@/components/SiteFooter";
import { DINNER_MENU, RAW_ADVISORY, type MenuSection } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menus",
  description:
    "The dinner menu at La Victoria in downtown Tampa: botanas, crudo, tacos clásicos, platos fuertes, and postres.",
  alternates: { canonical: "/menus" },
};

const GOLD = "#F4D47C";
const MUTED = "rgba(252, 233, 199, 0.7)";

/** Clears the fixed nav, including while a course is still sliding into place. */
const JUMP_OFFSET = "150px";

interface Photo {
  src: string;
  alt: string;
  side: "left" | "right";
  /** Keeps the dish in frame where the crop is tight. */
  focus?: string;
}

/** The page's rhythm: courses in order, each with a photo of that course where we have one. */
const BLOCKS: { ids: string[]; photo?: Photo }[] = [
  {
    ids: ["botanas"],
    photo: {
      src: "/assets/photos/kitchen-salsas.jpg",
      alt: "Trio of salsas on a long dish beside guacamole in a stone molcajete",
      side: "left",
    },
  },
  {
    ids: ["crudo"],
    photo: {
      src: "/assets/photos/crudo-oysters.jpg",
      alt: "Oysters on the half shell over crushed ice with lemon and salsas",
      side: "right",
    },
  },
  { ids: ["tacos"] },
  {
    ids: ["platos-fuertes"],
    photo: {
      src: "/assets/photos/kitchen-stew-tortillas.jpg",
      alt: "Bowl of rich stew with blue corn tortillas, lemon and salsas on a wooden board",
      side: "left",
      focus: "30% 50%",
    },
  },
  {
    ids: ["complementos", "postres"],
    photo: {
      src: "/assets/photos/kitchen-sugared-pastry.jpg",
      alt: "Sugar-dusted churros on a wooden board with three dipping sauces",
      side: "right",
      focus: "45% 50%",
    },
  },
];

function Course({ section, columns = 1 }: { section: MenuSection; columns?: 1 | 3 }) {
  return (
    <div id={section.id} style={{ scrollMarginTop: JUMP_OFFSET }}>
      <h2 className="font-display text-[38px] md:text-[48px] font-normal tracking-[1px] leading-[1.1] text-cream">
        {section.title}
        {section.price && (
          <span className="font-body text-[18px] font-medium tracking-normal ml-3" style={{ color: GOLD }}>
            {section.price} each
          </span>
        )}
      </h2>
      <ul className={`mt-4 ${columns === 3 ? "md:grid md:grid-cols-3 md:gap-x-12" : ""}`}>
        {section.items.map((item) => (
          <MenuItemRow key={item.name} item={item} />
        ))}
      </ul>
    </div>
  );
}

function Block({ sections, photo }: { sections: MenuSection[]; photo?: Photo }) {
  if (!photo) {
    return (
      <ScrollReveal>
        {sections.map((section) => (
          <Course key={section.id} section={section} columns={3} />
        ))}
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
      <div className={photo.side === "right" ? "md:order-2" : undefined}>
        <div className="relative aspect-[4/3] md:aspect-[4/5] md:sticky md:top-[96px] overflow-hidden">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            loading="lazy"
            className="object-cover"
            style={{ objectPosition: photo.focus }}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-14">
        {sections.map((section) => (
          <Course key={section.id} section={section} />
        ))}
      </div>
    </ScrollReveal>
  );
}

export default function MenusPage() {
  return (
    <main id="main-content" style={{ background: "#221A0E" }}>
      <PageHero title="Our Menu" large />

      {/* ── Course links ── */}
      <CourseIcons />

      {/* ── Menu ── */}
      <div className="mx-auto max-w-[1200px] px-6 pt-16 md:pt-24 pb-14 flex flex-col gap-20 md:gap-28">
        {BLOCKS.map((block) => (
          <Block
            key={block.ids[0]}
            sections={DINNER_MENU.filter((section) => block.ids.includes(section.id))}
            photo={block.photo}
          />
        ))}
      </div>

      <p
        className="font-body text-[12px] italic leading-[1.6] text-center max-w-[720px] mx-auto px-6"
        style={{ color: MUTED }}
      >
        <span style={{ color: GOLD }}>*</span> {RAW_ADVISORY}
      </p>

      {/* ── Reservation ── */}
      <HomeReservation />

      <SiteFooter />
    </main>
  );
}
