import { HOURS } from "@/lib/restaurant";

/**
 * Opening hours for each concept.
 * hero: one centered line per concept (rows stack on mobile).
 * footer: compact day/time grid per concept.
 */
export default function Hours({ variant }: { variant: "hero" | "footer" }) {
  if (variant === "hero") {
    return (
      <div className="flex flex-col items-center gap-5">
        {HOURS.map((group) => (
          <div key={group.name} className="flex flex-col items-center">
            <p className="font-mono text-[11px] md:text-[12px] font-bold tracking-[3px] uppercase mb-2.5" style={{ color: "#F4D47C" }}>
              {group.name}
            </p>
            <p className="flex flex-col md:flex-row md:items-center gap-y-1 font-body text-[13px] font-normal tracking-[0.5px]">
              {group.rows.map((row, i) => (
                <span key={row.days} className="whitespace-nowrap">
                  {i > 0 && (
                    <span className="hidden md:inline mx-3" style={{ color: "rgba(244, 212, 124, 0.5)" }} aria-hidden="true">
                      &middot;
                    </span>
                  )}
                  <span style={{ color: "rgba(252, 233, 199, 0.6)" }}>{row.days}</span>
                  <span style={{ color: "#FCE9C7" }}>&ensp;{row.time}</span>
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col md:flex-row items-center md:items-start justify-center gap-5 md:gap-10">
      {HOURS.map((group) => (
        <div key={group.name} className="flex flex-col items-center">
          <p className="font-mono text-[10px] font-bold tracking-[2.5px] uppercase mb-2" style={{ color: "rgba(244, 212, 124, 0.8)" }}>
            {group.name}
          </p>
          <dl
            className="grid grid-cols-[auto_auto] gap-x-5 gap-y-1 font-mono text-[10px] tracking-[2px] uppercase"
            aria-label={`${group.name} hours`}
          >
            {group.rows.map((row) => (
              <div key={row.days} className="contents">
                <dt className="text-left" style={{ color: "rgba(252, 233, 199, 0.5)" }}>
                  {row.days}
                </dt>
                <dd className="text-right" style={{ color: "rgba(252, 233, 199, 0.65)" }}>
                  {row.time}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
