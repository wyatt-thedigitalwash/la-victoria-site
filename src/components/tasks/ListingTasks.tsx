"use client";

import { useEffect, useState } from "react";
import { LISTING_TASKS } from "@/lib/listing-tasks";

/**
 * The checklist itself. Ticks are saved in this browser only (localStorage),
 * so each person sees their own progress on their own device.
 */
const KEY = "lv-tasks-v1";
const ids = LISTING_TASKS.map((t) => t.id);
const total = ids.length;

export default function ListingTasks() {
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      // Reading browser storage has to wait for the client; the first paint
      // is the empty list either way.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setDone(JSON.parse(saved));
    } catch {}
  }, []);

  const toggle = (id: string) =>
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });

  const count = ids.filter((id) => done[id]).length;

  return (
    <>
      <div
        className="sticky z-10 py-4 backdrop-blur-md"
        style={{
          top: "calc(var(--banner-height, 0px) + 56px)",
          background: "rgba(255, 255, 255, 0.94)",
          borderBottom: "1px solid rgba(16, 14, 4, 0.12)",
        }}
      >
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-body text-[22px] font-light tabular-nums" style={{ color: "#100E04" }}>
            {count} of {total} done
          </p>
          <p className="font-mono text-[11px] tracking-[3px] uppercase" style={{ color: "#7C6533" }}>
            Listings
          </p>
        </div>
        <div className="mt-3 h-[2px]" style={{ background: "rgba(16, 14, 4, 0.1)" }}>
          <div
            className="h-full transition-[width] duration-700 ease-out"
            style={{ width: `${(100 * count) / total}%`, background: "#4D1807" }}
          />
        </div>
      </div>

      <ul className="mt-8 grid gap-3">
        {LISTING_TASKS.map((t) => {
          const isDone = !!done[t.id];
          return (
            <li
              key={t.id}
              className="flex gap-4 p-5 transition-colors duration-500"
              style={{
                border: `1px solid ${isDone ? "rgba(124, 101, 51, 0.55)" : "rgba(16, 14, 4, 0.15)"}`,
                background: isDone ? "rgba(124, 101, 51, 0.06)" : "rgba(255, 255, 255, 0.35)",
              }}
            >
              <input
                id={`task-${t.id}`}
                type="checkbox"
                checked={isDone}
                onChange={() => toggle(t.id)}
                className="mt-[3px] h-5 w-5 shrink-0 cursor-pointer accent-[#4D1807]"
              />
              <div className="min-w-0">
                <label
                  htmlFor={`task-${t.id}`}
                  className={`cursor-pointer font-body text-[16px] font-medium leading-[1.5] transition-opacity duration-500 ${isDone ? "line-through opacity-50" : ""}`}
                  style={{ color: "#100E04" }}
                >
                  {t.title}
                </label>
                <ol className="mt-3 grid gap-2">
                  {t.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 font-body text-[14px] font-normal leading-[1.7]" style={{ color: "rgba(16, 14, 4, 0.75)" }}>
                      <span className="font-mono text-[11px] shrink-0 pt-[4px] w-5 tabular-nums" style={{ color: "#4D1807" }}>
                        {i + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                {t.note ? (
                  <p className="mt-3 font-body text-[13px] font-normal italic leading-[1.7]" style={{ color: "#7C6533" }}>
                    {t.note}
                  </p>
                ) : null}
                {t.links?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {t.links.map(([label, href]) => (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} (opens in new tab)`}
                        className="font-mono text-[11px] tracking-[2px] uppercase px-4 py-2 transition-colors duration-300 hover:bg-[#4D1807] hover:text-[#FCE9C7]"
                        style={{ color: "#4D1807", border: "1px solid rgba(77, 24, 7, 0.45)" }}
                      >
                        {label} ↗
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
