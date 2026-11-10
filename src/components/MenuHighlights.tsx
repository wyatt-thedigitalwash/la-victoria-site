import BrandButton from "@/components/BrandButton";
import ScrollReveal from "@/components/ScrollReveal";
import { DINNER_MENU, MENU_HIGHLIGHTS, RAW_ADVISORY } from "@/lib/menu";

const GOLD = "#F4D47C";
const MUTED = "rgba(252, 233, 199, 0.7)";

const allItems = DINNER_MENU.flatMap((section) => section.items);
const highlights = MENU_HIGHLIGHTS.flatMap(
  (name) => allItems.find((item) => item.name === name) ?? []
);

export default function MenuHighlights() {
  return (
    <section className="px-6 pt-20 pb-16">
      <div className="mx-auto max-w-[760px]">
        <ScrollReveal className="triptych-heading mb-10">
          <h2 className="flex flex-col items-center text-center font-normal">
            <span className="triptych-line font-display text-[clamp(36px,11.8vw,46px)] md:text-[64px] leading-[1.2] text-cream">
              Signature Dishes
            </span>
          </h2>
        </ScrollReveal>

        <ul>
          {highlights.map((item, i) => (
            <li key={item.name} style={{ borderBottom: "1px solid rgba(124, 101, 51, 0.2)" }}>
              <ScrollReveal delay={i * 100} className="py-6">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-body text-[17px] md:text-[18px] font-medium leading-snug text-cream">
                    {item.name}
                    {item.raw && <span style={{ color: GOLD }}>*</span>}
                  </h3>
                  <span
                    className="flex-1 min-w-[20px] -translate-y-1 border-b border-dotted"
                    style={{ borderColor: "rgba(244, 212, 124, 0.25)" }}
                    aria-hidden="true"
                  />
                  <span className="font-body text-[18px] font-medium" style={{ color: GOLD }}>
                    {item.price}
                  </span>
                </div>
                <p className="font-body text-[14px] leading-[1.5] mt-1.5" style={{ color: MUTED }}>
                  {item.desc}
                </p>
              </ScrollReveal>
            </li>
          ))}
        </ul>

        <div className="flex justify-center mt-12">
          <BrandButton href="/menus">View Full Menu</BrandButton>
        </div>

        {highlights.some((item) => item.raw) && (
          <p className="font-body text-[12px] italic leading-[1.6] text-center mt-10" style={{ color: MUTED }}>
            <span style={{ color: GOLD }}>*</span> {RAW_ADVISORY}
          </p>
        )}
      </div>
    </section>
  );
}
