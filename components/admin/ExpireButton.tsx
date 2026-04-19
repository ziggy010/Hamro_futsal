"use client";

import { useState } from "react";
import { RefreshCw, TimerReset } from "lucide-react";

export default function ExpireButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/open-games/expire");
      const data = await res.json();
      alert(`Expired ${data.expiredCount ?? 0} games`);
    } catch {
      alert("Failed to expire open games");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="group relative w-full overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04] px-5 py-4 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#B8FF3B]/30 hover:bg-[#B8FF3B]/[0.08] disabled:cursor-not-allowed disabled:opacity-70"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_42%,transparent_100%)] opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />
      <div className="pointer-events-none absolute -left-6 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-[#B8FF3B]/0 blur-2xl transition-all duration-300 group-hover:bg-[#B8FF3B]/15" />

      <div className="relative flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.05] text-[#B8FF3B] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          {loading ? (
            <RefreshCw size={18} className="animate-spin" />
          ) : (
            <TimerReset size={18} />
          )}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-white">
            {loading ? "Expiring games..." : "Expire Open Games"}
          </p>
          <p className="mt-1 text-xs leading-6 text-[#94A3B8]">
            Release unfilled games and free blocked time slots.
          </p>
        </div>
      </div>
    </button>
  );
}
