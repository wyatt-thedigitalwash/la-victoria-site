"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Small persistent marker so nobody mistakes the private walkthrough for the
 * live site. Sits bottom-left, out of the way of the design.
 */
export default function PreviewBadge() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function signOut() {
    await fetch("/api/preview-login", { method: "DELETE" });
    router.replace("/preview/login");
    router.refresh();
  }

  return (
    <div className="fixed bottom-5 left-5 z-[60] flex items-center gap-2">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[10px] tracking-[2px] uppercase backdrop-blur-md transition-colors duration-300"
        style={{
          background: "rgba(34, 26, 14, 0.82)",
          borderColor: "rgba(244, 212, 124, 0.3)",
          color: "#F4D47C",
        }}
      >
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: "#B85A4A" }}
          aria-hidden="true"
        />
        Private Preview
      </button>

      {open && (
        <button
          type="button"
          onClick={signOut}
          className="rounded-full border px-4 py-2 font-mono text-[10px] tracking-[2px] uppercase backdrop-blur-md transition-colors duration-300"
          style={{
            background: "rgba(34, 26, 14, 0.82)",
            borderColor: "rgba(244, 212, 124, 0.18)",
            color: "rgba(252, 233, 199, 0.7)",
          }}
        >
          Sign out
        </button>
      )}
    </div>
  );
}
