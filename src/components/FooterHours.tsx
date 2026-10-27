import { HOURS } from "@/lib/restaurant";

/** Compact opening hours for the footers. */
export default function FooterHours() {
  return (
    <dl
      className="mt-6 grid grid-cols-[auto_auto] gap-x-5 gap-y-1 font-mono text-[10px] tracking-[2px] uppercase"
      aria-label="Hours"
    >
      {HOURS.map((row) => (
        <div key={row.days} className="contents">
          <dt className="text-left" style={{ color: "rgba(244, 212, 124, 0.8)" }}>
            {row.days}
          </dt>
          <dd className="text-right" style={{ color: "rgba(252, 233, 199, 0.6)" }}>
            {row.time}
          </dd>
        </div>
      ))}
    </dl>
  );
}
