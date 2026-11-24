"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, useReducedMotion } from "framer-motion";
import { CircleDot, Goal, House, MapPin, UserRound } from "lucide-react";
import { useNavigationProgress } from "@/components/layout/navigation-progress";
import { cn } from "@/lib/utils/cn";

const tabs = [
  { label: "Home", accessibleLabel: "Home", href: "/", icon: House },
  { label: "Futsal", accessibleLabel: "Book futsal", href: "/book", icon: Goal },
  {
    label: "Pickleball",
    accessibleLabel: "Book pickleball",
    href: "/book/pickleball",
    icon: CircleDot,
  },
  { label: "Contact", accessibleLabel: "Contact", href: "/contact", icon: MapPin },
  { label: "Account", accessibleLabel: "Account", href: "/account", icon: UserRound },
] as const;

export default function MobileBottomNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const { startLoading } = useNavigationProgress();
  const shouldReduceMotion = useReducedMotion();

  if (pathname.startsWith("/admin")) return null;

  const isBookingFollowUp =
    pathname.startsWith("/book/details") || pathname.startsWith("/book/success");
  const isPickleballFlow = searchParams.get("activity") === "PICKLEBALL";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/book") {
      return pathname === "/book" || (isBookingFollowUp && !isPickleballFlow);
    }
    if (href === "/book/pickleball") {
      return pathname.startsWith("/book/pickleball") || (isBookingFollowUp && isPickleballFlow);
    }
    if (href === "/account") {
      return pathname.startsWith("/account") || pathname === "/login" || pathname === "/signup";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <motion.nav
        aria-label="Mobile navigation"
        initial={shouldReduceMotion ? false : { y: 88, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 bottom-0 z-[90] border-t border-white/10 bg-[rgba(7,11,15,0.94)] shadow-[0_-18px_50px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto grid max-w-lg grid-cols-5 gap-1 px-2 pt-2">
          {tabs.map((tab) => {
            const active = isActive(tab.href);
            const href =
              tab.href === "/account" && !session?.user
                ? "/login?callbackUrl=/account"
                : tab.href;
            const Icon = tab.icon;

            return (
              <Link
                key={tab.href}
                href={href}
                aria-label={tab.accessibleLabel}
                aria-current={active ? "page" : undefined}
                onClick={() => {
                  if (!active) startLoading();
                }}
                className="min-w-0"
              >
                <motion.span
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.9, y: 1 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex min-h-[58px] flex-col items-center justify-center gap-1 overflow-hidden rounded-[18px] px-1"
                >
                  {active ? (
                    <motion.span
                      layoutId="mobile-nav-active"
                      className="absolute inset-0 rounded-[18px] border border-[#B8FF3B]/20 bg-[#B8FF3B]/[0.09] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_24px_rgba(184,255,59,0.08)]"
                      transition={{ type: "spring", stiffness: 430, damping: 34, mass: 0.7 }}
                    />
                  ) : null}

                  <motion.span
                    animate={
                      active && !shouldReduceMotion
                        ? { y: -1, scale: 1.08 }
                        : { y: 0, scale: 1 }
                    }
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "relative z-10 flex h-6 items-center justify-center",
                      active ? "text-[#B8FF3B]" : "text-[#7F8B9B]",
                    )}
                  >
                    <Icon size={20} strokeWidth={active ? 2.3 : 1.8} />
                    {active ? (
                      <span className="absolute -top-1 h-1 w-1 rounded-full bg-[#B8FF3B] shadow-[0_0_10px_rgba(184,255,59,0.9)]" />
                    ) : null}
                  </motion.span>

                  <span
                    className={cn(
                      "relative z-10 max-w-full truncate text-[10px] leading-none tracking-[-0.01em]",
                      active ? "font-semibold text-[#DFFF9A]" : "font-medium text-[#7F8B9B]",
                    )}
                  >
                    {tab.label}
                  </span>
                </motion.span>
              </Link>
            );
          })}
        </div>
      </motion.nav>
      <div
        aria-hidden="true"
        className="h-[calc(76px+env(safe-area-inset-bottom))] shrink-0 md:hidden"
      />
    </>
  );
}
