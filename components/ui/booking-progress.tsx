"use client";

import { cn } from "@/lib/utils/cn";

type BookingProgressProps = {
  currentStep: 1 | 2 | 3;
};

const steps = [
  {
    number: 1,
    title: "Select Slot",
    description: "Pick your date and time",
  },
  {
    number: 2,
    title: "Your Details",
    description: "Choose game type and confirm",
  },
  {
    number: 3,
    title: "Confirmed",
    description: "Review the final booking",
  },
] as const;

export default function BookingProgress({
  currentStep,
}: BookingProgressProps) {
  return (
    <div className="mt-6 grid gap-3 rounded-[28px] border border-white/10 bg-[rgba(10,14,19,0.56)] p-4 shadow-[0_14px_36px_rgba(0,0,0,0.18)] backdrop-blur-xl md:grid-cols-3 md:p-5">
      {steps.map((step) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;

        return (
          <div
            key={step.number}
            className={cn(
              "rounded-[22px] border px-4 py-4 transition-all duration-300",
              isActive
                ? "border-[#B8FF3B] bg-[#18220C] shadow-[0_12px_30px_rgba(184,255,59,0.08)]"
                : isCompleted
                  ? "border-[#476B0D] bg-[#16200A]"
                  : "border-white/10 bg-white/[0.03]",
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                  isActive
                    ? "border-[#B8FF3B] bg-[#B8FF3B] text-black"
                    : isCompleted
                      ? "border-[#476B0D] bg-[#22310D] text-[#B8FF3B]"
                      : "border-white/10 bg-white/[0.04] text-[#94A3B8]",
                )}
              >
                {step.number}
              </div>

              <div>
                <p
                  className={cn(
                    "text-sm font-medium",
                    isActive || isCompleted ? "text-white" : "text-[#C9D2DC]",
                  )}
                >
                  {step.title}
                </p>
                <p className="mt-1 text-xs text-[#94A3B8]">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
