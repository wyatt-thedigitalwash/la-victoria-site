import MenuItemRow from "@/components/MenuItemRow";
import ScrollReveal from "@/components/ScrollReveal";
import type { MenuGroup } from "@/lib/menu";

const GOLD = "#F4D47C";
const MUTED = "rgba(252, 233, 199, 0.7)";

/** A short single list, like Refrescos, that can share a row with another one. */
const isShort = (group: MenuGroup) =>
  group.sections.length === 1 && !group.sections[0].title && group.sections[0].items.length <= 5;

/** Pairs neighbouring short groups so each doesn't get a mostly empty row. */
function rows(groups: MenuGroup[]): MenuGroup[][] {
  const result: MenuGroup[][] = [];
  for (let i = 0; i < groups.length; i++) {
    if (isShort(groups[i]) && groups[i + 1] && isShort(groups[i + 1])) {
      result.push([groups[i], groups[i + 1]]);
      i++;
    } else {
      result.push([groups[i]]);
    }
  }
  return result;
}

function GroupTitle({ group }: { group: MenuGroup }) {
  return (
    <>
      <h2
        id={`${group.id}-title`}
        className="font-display text-[38px] md:text-[48px] font-normal tracking-[1px] leading-[1.1] text-cream"
      >
        {group.title}
      </h2>
      {group.intro && (
        <p className="font-body text-[15px] italic leading-[1.7] mt-3 max-w-[640px]" style={{ color: MUTED }}>
          {group.intro}
        </p>
      )}
    </>
  );
}

function Group({ group, half }: { group: MenuGroup; half: boolean }) {
  const titled = group.sections.some((section) => section.title);

  return (
    <section id={group.id} aria-labelledby={`${group.id}-title`} style={{ scrollMarginTop: "150px" }}>
      <GroupTitle group={group} />

      {titled ? (
        // Lists flow down two columns like a newspaper, so a long list
        // balances against several short ones instead of leaving a gap.
        <div className="mt-6 md:columns-2 md:gap-16">
          {group.sections.map((section) => (
            <div key={section.title} className="break-inside-avoid pb-12">
              <h3 className="font-mono text-[11px] tracking-[4px] uppercase" style={{ color: GOLD }}>
                {section.title}
                {section.note && (
                  <span className="tracking-[2px] normal-case ml-3" style={{ color: MUTED }}>
                    {section.note}
                  </span>
                )}
              </h3>
              <ul className="mt-2">
                {section.items.map((item, i) => (
                  <MenuItemRow key={`${item.name}-${i}`} item={item} level={4} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className={`mt-4 ${half ? "" : "md:grid md:grid-cols-2 md:gap-x-16"}`}>
          {group.sections[0].items.map((item, i) => (
            <MenuItemRow key={`${item.name}-${i}`} item={item} />
          ))}
        </ul>
      )}
    </section>
  );
}

/** Drinks and café menus: a big heading per group, its lists in two columns. */
export default function MenuGroups({ groups }: { groups: MenuGroup[] }) {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {rows(groups).map((row) => (
        <ScrollReveal
          key={row[0].id}
          className={row.length === 2 ? "grid grid-cols-1 md:grid-cols-2 gap-16" : undefined}
        >
          {row.map((group) => (
            <Group key={group.id} group={group} half={row.length === 2} />
          ))}
        </ScrollReveal>
      ))}
    </div>
  );
}
