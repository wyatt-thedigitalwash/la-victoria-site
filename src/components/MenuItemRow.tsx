import type { MenuItem } from "@/lib/menu";

const GOLD = "#F4D47C";
const MUTED = "rgba(252, 233, 199, 0.7)";

export default function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <li className="py-5" style={{ borderBottom: "1px solid rgba(124, 101, 51, 0.2)" }}>
      <div className="flex items-baseline gap-3">
        <h3 className="font-body text-[17px] md:text-[18px] font-medium leading-snug text-cream">
          {item.name}
          {item.raw && <span style={{ color: GOLD }}>*</span>}
        </h3>
        {item.price && (
          <>
            <span
              className="flex-1 min-w-[20px] -translate-y-1 border-b border-dotted"
              style={{ borderColor: "rgba(244, 212, 124, 0.25)" }}
              aria-hidden="true"
            />
            <span className="font-body text-[16px] font-medium whitespace-nowrap" style={{ color: GOLD }}>
              {item.price}
            </span>
          </>
        )}
      </div>

      {item.options && (
        <p className="font-mono text-[11px] tracking-[1.5px] uppercase mt-2" style={{ color: GOLD }}>
          {item.options.map((option, i) => (
            <span key={option.name}>
              {i > 0 && <span aria-hidden="true">&ensp;&middot;&ensp;</span>}
              <span className="whitespace-nowrap">
                {option.name} {option.price}
              </span>
            </span>
          ))}
        </p>
      )}

      {item.desc && (
        <p className="font-body text-[14px] leading-[1.5] mt-1.5" style={{ color: MUTED }}>
          {item.desc}
        </p>
      )}

      {item.addOns?.map((addOn) => (
        <p key={addOn.name} className="font-body text-[14px] leading-[1.5] mt-1.5" style={{ color: MUTED }}>
          {addOn.name} <span style={{ color: GOLD }}>{addOn.price}</span>
        </p>
      ))}
    </li>
  );
}
