/**
 * Border centered on the line between the olive texture and the dark
 * page, swelling out to both sides. Colonial arch shapes echo the logo, each
 * holding a four-petal Talavera flower; soft tips follow Badhorse's corners.
 */
/** Brand olive: sits between the two backgrounds, so the border blends in. */
const BAND = "#7C6533";

const PETAL = "M0 -1.2C4.2 -4.4 4.2 -8.6 0 -12.5C-4.2 -8.6 -4.2 -4.4 0 -1.2Z";
const STAR = "M0 -4.6Q0 0 4.6 0Q0 0 0 4.6Q0 0 -4.6 0Q0 0 0 -4.6Z";

const TILE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 44" width="140" height="44">
<path fill="${BAND}" stroke="${BAND}" stroke-width="1.2" stroke-linejoin="round" d="M-37 16C-15 16 13 16 24 11C30 7.5 32 4 35 1.5C38 4 40 7.5 46 11C57 16 85 16 105 16C127 16 153 16 164 11V33C153 28 127 28 105 28C85 28 57 28 46 33C40 36.5 38 40 35 42.5C32 40 30 36.5 24 33C13 28 -15 28 -37 28Z"/>
<g fill="#221A0E">
<g transform="translate(35 22)">${[0, 90, 180, 270].map((a) => `<path transform="rotate(${a})" d="${PETAL}"/>`).join("")}</g>
<path transform="translate(105 22)" d="${STAR}"/>
</g></svg>`;

const HEIGHT = "clamp(24px, 2.1vw, 30px)";

/**
 * Where it sits against the line. "above" and "below" rest the band's own edge
 * on the line (it spans 35-65% of the tile), so a white section meets the band
 * directly, with no olive showing between them.
 */
const OFFSET = { center: "-50%", above: "-64%", below: "-36%" };

/** Render between the two sections. It takes no space, so the sections still touch. */
export default function BrandBorder({ side = "center" }: { side?: keyof typeof OFFSET }) {
  return (
    <div aria-hidden="true" className="pointer-events-none relative z-20 h-0">
      <div
        className="absolute inset-x-0"
        style={{
          height: HEIGHT,
          transform: `translateY(${OFFSET[side]})`,
          // Tiles join on plain band, and the stripe behind covers any hairline there.
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(TILE)}"), linear-gradient(transparent 38%, ${BAND} 38%, ${BAND} 62%, transparent 62%)`,
          backgroundSize: "auto 100%, 100% 100%",
          backgroundRepeat: "round no-repeat, no-repeat",
        }}
      />
    </div>
  );
}
