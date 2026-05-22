import type { ReactNode } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  LoaderCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

type StatePanelProps = {
  variant?: "loading" | "error" | "empty" | "success";
  eyebrow?: string;
  title: string;
  text: string;
  actions?: ReactNode;
  className?: string;
};

function variantStyles(
  variant: NonNullable<StatePanelProps["variant"]>,
): {
  wrapper: string;
  iconWrap: string;
  icon: ReactNode;
} {
  if (variant === "error") {
    return {
      wrapper:
        "border-[#4D2A2F] bg-[linear-gradient(135deg,rgba(77,42,47,0.42),rgba(36,21,25,0.92))]",
      iconWrap: "border-[#4D2A2F] bg-[#241519] text-[#FFB4B4]",
      icon: <AlertTriangle size={18} />,
    };
  }

  if (variant === "success") {
    return {
      wrapper:
        "border-[#1E4D33] bg-[linear-gradient(135deg,rgba(30,77,51,0.3),rgba(16,38,27,0.9))]",
      iconWrap: "border-[#1E4D33] bg-[#10261B] text-[#7EF7C1]",
      icon: <CheckCircle2 size={18} />,
    };
  }

  if (variant === "loading") {
    return {
      wrapper:
        "border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(13,19,26,0.92))]",
      iconWrap: "border-white/10 bg-white/[0.05] text-[#B8FF3B]",
      icon: <LoaderCircle size={18} className="animate-spin" />,
    };
  }

  return {
    wrapper:
      "border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(13,19,26,0.92))]",
    iconWrap: "border-white/10 bg-white/[0.05] text-[#B8FF3B]",
    icon: <Sparkles size={18} />,
  };
}

export default function StatePanel({
  variant = "empty",
  eyebrow,
  title,
  text,
  actions,
  className,
}: StatePanelProps) {
  const styles = variantStyles(variant);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] md:p-6",
        styles.wrapper,
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)] opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />

      <div className="relative z-10 flex items-start gap-4">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] border",
            styles.iconWrap,
          )}
        >
          {styles.icon}
        </div>

        <div className="min-w-0 flex-1">
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.18em] text-[#B8FF3B]">
              {eyebrow}
            </p>
          )}
          <p className="mt-1 text-lg font-semibold text-white">{title}</p>
          <p className="mt-2 text-sm leading-7 text-[#94A3B8]">{text}</p>

          {actions && <div className="mt-5 flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </div>
      </div>
    </div>
  );
}
