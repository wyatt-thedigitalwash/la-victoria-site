import BrandBorder from "@/components/BrandBorder";
import HeroBackground from "@/components/HeroBackground";

/** The hero for inner pages: a Badhorse title on the olive texture, closed by the cream border. */
export default function PageHero({
  title,
  children,
  background = <HeroBackground />,
  tall = false,
  large = false,
  borderSide,
  border = true,
}: {
  title: string;
  /** Intro text or a button under the title. */
  children?: React.ReactNode;
  /** Replaces the olive texture, e.g. with a photo. */
  background?: React.ReactNode;
  /** Fills the screen, for pages with little else on them. */
  tall?: boolean;
  /** For one-word titles. */
  large?: boolean;
  borderSide?: "above";
  /** Off for pages where nothing follows the hero. */
  border?: boolean;
}) {
  const fadeIn = (delay: string) => ({ animationDuration: "0.6s", animationDelay: delay });

  return (
    <>
      <section
        data-nav-hero
        className="relative flex items-center justify-center overflow-hidden px-6 pt-28 pb-14"
        style={{ minHeight: !tall ? "46vh" : border ? "calc(100dvh - 56px)" : "100dvh" }}
      >
        {background}
        <div className="relative z-10 flex flex-col items-center text-center max-w-[760px]">
          <h1
            className={`hero-word font-display font-normal leading-[1.05] text-balance text-cream ${
              large ? "text-[clamp(64px,13vw,112px)]" : "text-[clamp(44px,7.5vw,84px)]"
            }`}
            style={fadeIn("0s")}
          >
            {title}
          </h1>
          {children && (
            <div className="hero-word mt-6" style={fadeIn("0.18s")}>
              {children}
            </div>
          )}
        </div>
      </section>
      {border && <BrandBorder side={borderSide} />}
    </>
  );
}
