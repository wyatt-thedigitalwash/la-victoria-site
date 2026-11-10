import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { WALL_COLUMNS, WALL_PHOTOS, WALL_ROWS } from "@/lib/photo-wall";

/** One full pass of the mosaic. The track holds two so the loop has no visible seam. */
function Mosaic({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className={duplicate ? "photo-wall-duplicate" : undefined}
      aria-hidden={duplicate || undefined}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${WALL_COLUMNS}, var(--wall-cell))`,
        gridTemplateRows: `repeat(${WALL_ROWS}, var(--wall-cell))`,
        gap: "var(--wall-gap)",
        paddingRight: "var(--wall-gap)",
      }}
    >
      {WALL_PHOTOS.map((photo) => (
        <li
          key={photo.file}
          style={{
            // Inline so fill images stay inside their frame even before the CSS loads
            position: "relative",
            overflow: "hidden",
            gridColumn: `${photo.x + 1} / span ${photo.w}`,
            gridRow: `${photo.y + 1} / span ${photo.h}`,
          }}
        >
          <Image
            src={`/assets/photos/${photo.file}`}
            alt={duplicate ? "" : photo.alt}
            fill
            sizes="(max-width: 767px) 440px, 660px"
            loading="lazy"
            className="object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.04]"
          />
        </li>
      ))}
    </ul>
  );
}

/** Soft fade where the photos meet the screen edge. */
function EdgeFade({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 z-10"
      style={{
        [side]: 0,
        width: "clamp(20px, 6vw, 110px)",
        background: `linear-gradient(to ${side === "left" ? "right" : "left"}, #221A0E, transparent)`,
      }}
    />
  );
}

export default function PhotoWall() {
  return (
    <section
      aria-label="Photos of La Victoria"
      className="photo-wall pb-10"
      style={
        {
          // Sized to the screen: big on phones, and never taller than a short laptop
          "--wall-cell": "clamp(32px, min(3.4vw + 21px, 5svh), 52px)",
          "--wall-gap": "clamp(7px, 0.9vw, 13px)",
        } as React.CSSProperties
      }
    >
      <ScrollReveal className="relative">
        <EdgeFade side="left" />
        <EdgeFade side="right" />
        <div className="photo-wall-row">
          <div
            className="photo-wall-track"
            style={{ animationDuration: "170s", animationPlayState: "running" }}
          >
            <Mosaic />
            <Mosaic duplicate />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
