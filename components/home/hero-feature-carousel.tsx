"use client";

import { useEffect, useRef, useState } from "react";
import { Clock3, Sparkles, WalletCards } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const slides = [
  {
    eyebrow: "Available Slots Today",
    title: "NPR 1200/hr",
    text: "Evening prime hours",
    icon: WalletCards,
  },
  {
    eyebrow: "Fast Booking",
    title: "2 taps to reserve",
    text: "Built for mobile-first users",
    icon: Clock3,
  },
  {
    eyebrow: "Premium Setup",
    title: "Luxury feel",
    text: "Clean turf and better matchday flow",
    icon: Sparkles,
  },
];

export default function HeroFeatureCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 3200);

    return () => clearInterval(timer);
  }, [paused]);

  const goTo = (index: number) => setActive(index);

  const goNext = () => setActive((prev) => (prev + 1) % slides.length);

  const goPrev = () =>
    setActive((prev) => (prev - 1 + slides.length) % slides.length);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.changedTouches[0].clientX;

    if (touchStartX.current === null || touchEndX.current === null) return;

    const delta = touchStartX.current - touchEndX.current;

    if (Math.abs(delta) > 40) {
      if (delta > 0) goNext();
      else goPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="group relative w-[calc(100vw-56px)] max-w-[290px] overflow-hidden rounded-[24px] border border-white/12 bg-[rgba(20,24,30,0.28)] shadow-[0_20px_60px_rgba(0,0,0,0.26),0_0_30px_rgba(184,255,59,0.08)] backdrop-blur-2xl sm:rounded-[28px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_38%,rgba(255,255,255,0.02)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />
      <div className="pointer-events-none absolute -right-8 top-8 h-20 w-20 rounded-full bg-white/10 blur-2xl" />

      <div className="relative h-[150px] px-4 py-4 sm:h-[160px] sm:px-5">
        {slides.map((slide, index) => {
          const Icon = slide.icon;

          return (
            <div
              key={slide.title}
              className={cn(
                "absolute inset-0 px-5 py-4 transition-all duration-500",
                active === index
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0",
              )}
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.08] text-[#B8FF3B]">
                      <Icon size={16} />
                    </div>

                    <p className="truncate text-sm text-[#D7DEE7]">
                      {slide.eyebrow}
                    </p>
                  </div>

                  <div className="mt-1 flex items-center gap-1.5">
                    {slides.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        type="button"
                        aria-label={`Go to slide ${dotIndex + 1}`}
                        onClick={() => goTo(dotIndex)}
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          active === dotIndex
                            ? "w-5 bg-[#B8FF3B]"
                            : "w-2 bg-white/35 hover:bg-white/60",
                        )}
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-[2rem] font-semibold leading-none tracking-[-0.04em] text-white">
                    {slide.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#B8FF3B]">{slide.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
