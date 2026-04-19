import { cn } from "@/lib/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export default function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold transition-all duration-300 active:scale-[0.98] active:duration-150 disabled:cursor-not-allowed disabled:opacity-70 [&_svg]:transition-all [&_svg]:duration-300 hover:[&_svg]:translate-x-0.5 hover:[&_svg]:scale-[1.04] active:[&_svg]:scale-95",
        variant === "primary" &&
          "bg-[#B8FF3B] text-black shadow-[0_10px_26px_rgba(184,255,59,0.16),inset_0_1px_0_rgba(255,255,255,0.32)] hover:-translate-y-0.5 hover:bg-[#a8ef2d] hover:shadow-[0_18px_38px_rgba(184,255,59,0.26),0_0_0_1px_rgba(184,255,59,0.14)]",
        variant === "secondary" &&
          "border border-white/10 bg-white/[0.04] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.07] hover:shadow-[0_14px_28px_rgba(0,0,0,0.18)]",
        variant === "ghost" &&
          "text-white hover:bg-white/[0.06] hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)]",
        className,
      )}
      {...props}
    />
  );
}
