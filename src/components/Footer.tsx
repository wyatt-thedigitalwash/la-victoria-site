import Link from "next/link";

const NAV_LINKS = [
  { label: "Menus", href: "/menus" },
  { label: "Reservations", href: "#" },
  { label: "Private Events", href: "/private-events" },
  { label: "Our Story", href: "/#story" },
  { label: "Visit", href: "/contact" },
];

export default function Footer() {
  return (
    <footer data-bg="deep" className="bg-deep border-t border-brass/8 pt-20 pb-10 md:pt-20 md:pb-10 px-6">
      <div className="mx-auto max-w-[1200px] flex flex-col items-center">
        {/* Arch SVG */}
        <svg
          viewBox="0 0 90 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[50px] mb-10 opacity-60"
          aria-hidden="true"
        >
          <line x1="45" y1="0" x2="45" y2="10" stroke="#B8976A" strokeWidth="1" />
          <line x1="41" y1="4" x2="49" y2="4" stroke="#B8976A" strokeWidth="1" />
          <path
            d="M15 100 L15 40 A30 30 0 0 1 75 40 L75 100"
            stroke="#B8976A"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M28 100 L28 50 A17 17 0 0 1 62 50 L62 100"
            stroke="#B8976A"
            strokeWidth="0.8"
            opacity="0.4"
            fill="none"
          />
          <ellipse
            cx="45"
            cy="55"
            rx="10"
            ry="14"
            stroke="#B8976A"
            strokeWidth="0.8"
            fill="none"
          />
          <line x1="15" y1="100" x2="15" y2="108" stroke="#B8976A" strokeWidth="1" />
          <line x1="75" y1="100" x2="75" y2="108" stroke="#B8976A" strokeWidth="1" />
          <line x1="12" y1="108" x2="78" y2="108" stroke="#B8976A" strokeWidth="1" />
        </svg>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-6 md:gap-9 mb-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-body text-[11px] font-medium tracking-[2px] uppercase text-sand transition-colors duration-300 hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social links */}
        <div className="flex gap-6 mb-10">
          <a
            href="#"
            className="font-body text-[13px] tracking-[1px] text-smoke transition-colors duration-300 hover:text-brass"
          >
            Instagram
          </a>
          <a
            href="#"
            className="font-body text-[13px] tracking-[1px] text-smoke transition-colors duration-300 hover:text-brass"
          >
            Facebook
          </a>
        </div>

        {/* Email signup */}
        <div className="w-full max-w-[400px] text-center mb-10">
          <p className="font-body text-[12px] text-smoke mb-4">
            Stay informed on openings, events, and seasonal menus
          </p>
          <div className="flex flex-col md:flex-row">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-surface border border-brass/15 md:border-r-0 text-cream font-body text-[13px] px-5 py-3.5 placeholder:text-smoke outline-none transition-colors duration-300 focus:border-brass/40"
            />
            <button
              type="button"
              className="bg-terracotta border border-terracotta text-cream font-body text-[11px] font-medium tracking-[2px] uppercase px-6 py-3.5 transition-colors duration-300 hover:bg-[#9B4A3F] hover:border-[#9B4A3F]"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="w-full flex flex-col md:flex-row md:justify-between items-center gap-3 pt-8 border-t border-brass/6">
          <span className="font-body text-[11px] text-smoke">
            &copy; 2026 La Victoria Tampa. All rights reserved.
          </span>
          <span className="font-body text-[11px] text-smoke">
            Website by{" "}
            <a
              href="https://thedigitalwash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass/60 transition-colors duration-300 hover:text-brass"
            >
              The Digital Wash
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
