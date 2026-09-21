import Image from "next/image";

/** Minimal footer for standalone public pages while the full site is in preview. */
export default function SimpleFooter({ note }: { note?: string }) {
  return (
    <footer className="flex flex-col items-center text-center px-6 pt-10 pb-10">
      <div
        className="w-full max-w-[200px] mb-16"
        style={{ height: "1px", background: "rgba(124, 101, 51, 0.15)" }}
        aria-hidden="true"
      />
      <Image
        src="/assets/La-Victoria-icon-beige.webp"
        alt="La Victoria icon"
        width={40}
        height={40}
        loading="lazy"
        className="mb-6"
      />
      <a
        href="https://www.instagram.com/lavictoriatampa/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[11px] tracking-[2px] uppercase transition-opacity duration-300 hover:opacity-70"
        style={{ color: "#F4D47C" }}
        aria-label="Follow La Victoria on Instagram (opens in new tab)"
      >
        Instagram
      </a>
      <p
        className="font-body text-[13px] font-normal mt-4"
        style={{ color: "rgba(252, 233, 199, 0.6)" }}
      >
        105 W Tyler Street, Tampa, FL 33602
      </p>
      <a
        href="mailto:operations@lavictoriatampa.com"
        className="font-body text-[13px] font-normal mt-1 transition-opacity duration-300 hover:opacity-80"
        style={{ color: "rgba(252, 233, 199, 0.6)" }}
      >
        operations@lavictoriatampa.com
      </a>
      {note && (
        <p
          className="font-body text-[13px] font-normal mt-6"
          style={{ color: "rgba(252, 233, 199, 0.55)" }}
        >
          {note}
        </p>
      )}
      <p
        className={`font-body text-[13px] font-normal ${note ? "mt-2" : "mt-6"}`}
        style={{ color: "rgba(252, 233, 199, 0.55)" }}
      >
        &copy; 2026 La Victoria
      </p>
    </footer>
  );
}
