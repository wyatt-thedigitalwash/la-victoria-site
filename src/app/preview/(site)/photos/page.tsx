import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import PhotoGrid, { type Photo } from "@/components/PhotoGrid";

export const metadata: Metadata = {
  title: "Photos",
  description:
    "A first look inside La Victoria — the cantina bar, crudo counter, dining room, and private dining spaces.",
};

const PHOTOS: readonly Photo[] = [
  {
    src: "/assets/the-dining-room.jpg",
    alt: "The main dining room with dark marble tables, scalloped ceiling tiles, and candlelight",
    label: "The Dining Room",
    caption:
      "Dark marble, scalloped ceiling tiles, and low candlelight across the main room.",
    wide: true,
  },
  {
    src: "/assets/cantina-bar.jpg",
    alt: "The green marble cantina bar with backlit bottle wall and ribbed glass pendants",
    label: "The Cantina Bar",
    caption: "Green marble, a backlit bottle wall, and ribbed glass pendants.",
  },
  {
    src: "/assets/crudo-counter.jpg",
    alt: "The crudo counter with fresh seafood display and chefs preparing dishes",
    label: "The Crudo Counter",
    caption: "Seafood on ice, prepared in front of you at the raw bar.",
  },
  {
    src: "/assets/kitchen.jpg",
    alt: "Wood-fired kitchen with open flames and plated dishes at La Victoria",
    label: "Kitchen",
    caption: "Open flame, wood smoke, and heritage recipes plated with precision.",
  },
  {
    src: "/assets/crudo.jpg",
    alt: "Fresh crudo preparations with citrus and microgreens at the raw bar",
    label: "Crudo",
    caption: "Coastal Mexican tradition — citrus, chile, and restraint.",
  },
  {
    src: "/assets/private-dining.jpg",
    alt: "The private dining room with sheer curtain dividers and intimate table setting",
    label: "Private Dining",
    caption: "Sheer curtain dividers for a room within the room.",
  },
  {
    src: "/assets/cantina.jpg",
    alt: "Mezcal cocktails and agave spirits at the green marble cantina bar",
    label: "Cantina",
    caption: "Curated agave spirits and artisanal cocktails.",
  },
] as const;

export default function PhotosPage() {
  return (
    <main id="main-content" className="bg-deep">
      {/* -- Header -- */}
      <section data-bg="deep" className="px-6 pb-16 pt-[160px] text-center md:px-12 md:pt-[200px]">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[4px] text-brass">
            Photos
          </p>
          <h1 className="mx-auto mt-5 max-w-[760px] font-body text-[clamp(30px,4.5vw,52px)] font-light italic leading-[1.3] text-cream">
            An atmosphere you feel before you see
          </h1>
          <p className="mx-auto mt-6 max-w-[560px] font-body text-[15px] leading-[1.8] text-sand">
            Three rooms, one destination. Select any photo to view it full size.
          </p>
        </ScrollReveal>
      </section>

      {/* -- Grid -- */}
      <section data-bg="deep" className="pb-[140px] pt-0">
        <PhotoGrid photos={PHOTOS} />
      </section>
    </main>
  );
}
