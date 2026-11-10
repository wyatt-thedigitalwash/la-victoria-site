import Link from "next/link";
import { RESERVE } from "@/lib/restaurant";

/** Base classes for anything wearing a ButtonFace, so a real <button> can use it too. */
export const BUTTON_CLASS =
  "group relative inline-flex items-center justify-center cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";

const TONES = {
  /** For olive and dark backgrounds. */
  cream: { line: "#FCE9C7", hoverText: "#221A0E" },
  /** For white backgrounds. */
  dark: { line: "#4D1807", hoverText: "#FCE9C7" },
};

export type Tone = keyof typeof TONES;

/** The look of a button: a thin outline that fills in on hover. */
export function ButtonFace({
  children,
  tone = "cream",
  small = false,
  flush = false,
}: {
  children: React.ReactNode;
  tone?: Tone;
  small?: boolean;
  /** No outline of its own, for a button sitting inside a bordered row. */
  flush?: boolean;
}) {
  const { line, hoverText } = TONES[tone];

  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 transition-[background-color] duration-300 group-hover:bg-[var(--btn-line)] group-focus-visible:bg-[var(--btn-line)]"
        style={
          { "--btn-line": line, border: flush ? undefined : `1px solid ${line}` } as React.CSSProperties
        }
      />
      <span
        className={`relative font-body font-medium uppercase leading-none whitespace-nowrap text-[var(--btn-text)] transition-colors duration-300 group-hover:text-[var(--btn-hover)] group-focus-visible:text-[var(--btn-hover)] ${
          small ? "text-[11px] tracking-[0.8px] px-5 py-3" : "text-[12px] tracking-[1px] px-9 py-[18px]"
        }`}
        style={
          {
            "--btn-text": line,
            "--btn-hover": hoverText,
          } as React.CSSProperties
        }
      >
        {children}
      </span>
    </>
  );
}

export default function BrandButton({
  href,
  children,
  tone,
  small,
  external = false,
  ariaLabel,
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  tone?: Tone;
  small?: boolean;
  external?: boolean;
  ariaLabel?: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={`${BUTTON_CLASS} ${className}`}
    >
      <ButtonFace tone={tone} small={small}>
        {children}
      </ButtonFace>
    </Link>
  );
}

export function ReserveButton({
  small,
  className,
  onClick,
}: {
  small?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <BrandButton
      href={RESERVE.href}
      external={RESERVE.external}
      ariaLabel={RESERVE.external ? "Reserve a table on OpenTable (opens in new tab)" : undefined}
      small={small}
      className={className}
      onClick={onClick}
    >
      Reserve a Table
    </BrandButton>
  );
}
