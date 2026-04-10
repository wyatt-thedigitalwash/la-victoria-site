export default function MapPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-deep ${className}`}>
      {/* Olive glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,_rgba(124,101,51,0.12)_0%,_transparent_70%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #7C6533 0, #7C6533 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #7C6533 0, #7C6533 1px, transparent 1px, transparent 40px)",
        }}
      />

      {/* Street labels */}
      <span className="absolute top-[42%] left-[20%] font-body text-[9px] tracking-[1.5px] uppercase text-sand/30">
        W Tyler St
      </span>
      <span className="absolute top-[18%] left-[48%] font-body text-[9px] tracking-[1.5px] uppercase text-sand/30 origin-center -rotate-90">
        N Florida Ave
      </span>

      {/* Pulsing dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
        <div className="location-dot w-5 h-5 rounded-full bg-terracotta" />
        <span className="font-mono text-[11px] tracking-[2px] uppercase text-sand">
          La Victoria
        </span>
      </div>
    </div>
  );
}
