import Image from "next/image";

/**
 * LaVictoria_Wordmark_Tagline_Cream.svg from the brand kit, split into layers
 * that share its viewBox. Stacked, they match the original exactly, and each
 * tagline word can fade in on its own after the wordmark. All timing lives
 * here; the keyframes are in globals.css.
 */
const WORDS = [
  { name: "Kitchen", src: "/assets/hero/la-victoria-kitchen-cream.svg", delay: "0.35s" },
  { name: "Crudo", src: "/assets/hero/la-victoria-crudo-cream.svg", delay: "0.5s" },
  { name: "Cantina", src: "/assets/hero/la-victoria-cantina-cream.svg", delay: "0.65s" },
] as const;

export default function HeroLogo() {
  return (
    <div className="relative w-[min(88vw,520px)] md:w-[640px] aspect-[610.913/239.663]">
      <Image
        src="/assets/hero/la-victoria-wordmark-cream.svg"
        alt="La Victoria"
        fill
        priority
        className="hero-wordmark"
        style={{ animationDuration: "0.9s" }}
      />
      {WORDS.map((word) => (
        <Image
          key={word.name}
          src={word.src}
          alt={word.name}
          fill
          priority
          className="hero-word"
          style={{ animationDuration: "0.6s", animationDelay: word.delay }}
        />
      ))}
    </div>
  );
}
