import Image from "next/image";
import Link from "next/link";
import BrandBorder from "@/components/BrandBorder";
import { ReserveButton } from "@/components/BrandButton";
import HeroBackground from "@/components/HeroBackground";
import Hours from "@/components/Hours";
import { NAV_LINKS, RESERVE } from "@/lib/restaurant";

const GOLD = "#F4D47C";
/** Holds AA on the brightest specks of the olive texture. */
const SOFT = "rgba(252, 233, 199, 0.85)";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=105+W+Tyler+Street+Tampa+FL+33602";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-[16px] tracking-[3px] uppercase mb-4" style={{ color: GOLD }}>
      {children}
    </p>
  );
}

const TEXT_LINK = "transition-opacity duration-300 hover:opacity-70";

export default function SiteFooter({ note, borderSide }: { note?: string; borderSide?: "below" }) {
  const explore = NAV_LINKS.filter((link) => link.href !== RESERVE.href);

  return (
    <>
      <BrandBorder side={borderSide} />
      <footer className="relative overflow-hidden">
        <HeroBackground lazy />

        <div className="relative z-10 mx-auto max-w-[1200px] px-6 pt-24 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr] gap-x-12 gap-y-12 text-center md:text-left">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start">
              <Link href="/" aria-label="La Victoria home">
                <Image
                  src="/assets/la-victoria-stacked-cream.svg"
                  alt=""
                  width={120}
                  height={177}
                  loading="lazy"
                />
              </Link>
              <ReserveButton className="mt-8" />
            </div>

            {/* Visit */}
            <div>
              <Label>Visit</Label>
              <address className="not-italic font-body text-[14px] leading-[1.7]" style={{ color: SOFT }}>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={TEXT_LINK}>
                  105 W Tyler Street
                  <br />
                  Tampa, FL 33602
                  <span className="sr-only"> (opens in Google Maps in a new tab)</span>
                </a>
              </address>
              <div className="flex flex-col gap-1 font-body text-[14px] mt-4" style={{ color: SOFT }}>
                <a href="mailto:operations@lavictoriatampa.com" className={TEXT_LINK}>
                  operations@lavictoriatampa.com
                </a>
                <a
                  href="https://www.instagram.com/lavictoriatampa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={TEXT_LINK}
                  aria-label="Follow La Victoria on Instagram (opens in new tab)"
                >
                  @lavictoriatampa
                </a>
              </div>
            </div>

            {/* Hours */}
            <div>
              <Hours variant="footer" />
            </div>

            {/* Explore */}
            <nav aria-label="Footer">
              <Label>Explore</Label>
              <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-1">
                {explore.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`inline-block py-1 font-body text-[11px] font-medium tracking-[1px] uppercase ${TEXT_LINK}`}
                      style={{ color: SOFT }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Legal */}
          <div
            className="flex flex-col md:flex-row md:justify-between gap-2 items-center mt-14 pt-6 font-body text-[12px] text-center"
            style={{ color: SOFT, borderTop: "1px solid rgba(244, 212, 124, 0.25)" }}
          >
            <p>
              &copy; 2026 La Victoria
              {note && <span className="block md:inline md:ml-4">{note}</span>}
            </p>
            <p>
              Site by{" "}
              <a
                href="https://thedigitalwash.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline underline-offset-2 ${TEXT_LINK}`}
              >
                The Digital Wash<span className="sr-only"> (opens in new tab)</span>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
