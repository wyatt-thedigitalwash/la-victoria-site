import { DINNER_MENU } from "@/lib/menu";

const BG = "#221A0E";

/**
 * Hand-drawn course icons in Badhorse's manner: solid shapes, soft corners,
 * knob-ended stems, and details cut out of the fill. Keyed by course id.
 */
const ICONS: Record<string, React.ReactNode> = {
  /* Molcajete and pestle */
  botanas: (
    <>
      <path d="M33 26L47 9" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <path d="M8 23H56C58 23 59.5 24.5 59 27C57 41 46 50 32 50C18 50 7 41 5 27C4.5 24.5 6 23 8 23Z" />
      <rect x="16" y="44" width="9" height="13" rx="3.5" />
      <rect x="39" y="44" width="9" height="13" rx="3.5" />
      <path d="M15 32C18 38 23 41 29 42" fill="none" stroke={BG} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  /* Oyster shell */
  crudo: (
    <>
      <path d="M32 58C28 58 26 55 22 51C12 44 6 35 6 26C6 14 18 6 32 6C46 6 58 14 58 26C58 35 52 44 42 51C38 55 36 58 32 58Z" />
      <g stroke={BG} strokeWidth="3" strokeLinecap="round">
        <path d="M32 45V15" />
        <path d="M25 43L18 20" />
        <path d="M39 43L46 20" />
      </g>
    </>
  ),
  /* Folded taco */
  tacos: (
    <>
      <circle cx="16" cy="29" r="8" />
      <circle cx="32" cy="20" r="9" />
      <circle cx="48" cy="29" r="8" />
      <path
        d="M6 50C6 36 18 27 32 27C46 27 58 36 58 50C58 52 57 53 55 53H9C7 53 6 52 6 50Z"
        stroke={BG}
        strokeWidth="3.5"
      />
      <path d="M16 45C18 40 23 37 29 36" fill="none" stroke={BG} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  /* Plate, fork and knife */
  "platos-fuertes": (
    <>
      <circle cx="32" cy="32" r="15" />
      <circle cx="32" cy="32" r="9" fill="none" stroke={BG} strokeWidth="2.6" />
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M5 8V18C5 23.5 13 23.5 13 18V8" strokeWidth="3" />
        <path d="M9 8V22" strokeWidth="3" />
        <path d="M9 22V55" strokeWidth="4.6" />
      </g>
      <path d="M52 9C52 6 55 5.5 56.5 7.5C60 12.5 61 24 59 31H56.6V54.7A2.3 2.3 0 0 1 52 54.7Z" />
    </>
  ),
  /* Chile */
  complementos: (
    <>
      <path d="M15 13C13 10 11 8 7 6" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M10 18C13 12 22 10 28 13C36 17 37 25 41 32C45 40 51 47 59 53C60 54 59 56 58 56C43 57 27 50 17 37C12 31 8 24 10 18Z" />
      <path d="M20 21C22 28 27 34 34 40" fill="none" stroke={BG} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  /* Crossed churros */
  postres: (
    <>
      <path d="M12 56L44 9" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
      <g stroke={BG} strokeWidth="2" strokeLinecap="round">
        <path d="M18.5 50.5L44 13" />
        <path d="M14.5 47.5L39.5 10.5" />
      </g>
      <path d="M52 56L20 9" stroke={BG} strokeWidth="18" strokeLinecap="round" />
      <path d="M52 56L20 9" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
      <g stroke={BG} strokeWidth="2" strokeLinecap="round">
        <path d="M45.5 50.5L20 13" />
        <path d="M49.5 47.5L24.5 10.5" />
      </g>
    </>
  ),
};

export default function CourseIcons() {
  return (
    <nav aria-label="Menu courses" className="px-6 pt-16 md:pt-20">
      <ul className="mx-auto max-w-[1000px] grid grid-cols-3 md:grid-cols-6 gap-x-3 gap-y-9">
        {DINNER_MENU.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="group flex flex-col items-center text-center text-cream">
              <svg
                viewBox="0 0 64 64"
                fill="currentColor"
                aria-hidden="true"
                className="w-14 h-14 md:w-16 md:h-16 transition-[color,translate] duration-500 ease-out group-hover:-translate-y-1 group-hover:text-brass group-focus-visible:text-brass"
              >
                {ICONS[section.id]}
              </svg>
              <span className="mt-3 font-display text-[clamp(11px,3.4vw,14px)] tracking-[1px] lg:text-[15px] lg:tracking-[1.5px] uppercase leading-tight text-brass">
                {section.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
