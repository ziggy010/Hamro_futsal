"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, User, CalendarDays, LogOut } from "lucide-react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { useNavigationProgress } from "@/components/layout/navigation-progress";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

const links = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Book", href: "/book" },
  { label: "Games", href: "/games" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startLoading } = useNavigationProgress();
  const accountRef = useRef<HTMLDivElement | null>(null);
  const search = searchParams.toString();
  const currentUrl = `${pathname}${search ? `?${search}` : ""}`;
  const authHref =
    pathname === "/login" || pathname === "/signup"
      ? ""
      : `?callbackUrl=${encodeURIComponent(currentUrl)}`;

  const avatarLetter = (session?.user?.name || session?.user?.email || "A")
    .trim()
    .charAt(0)
    .toUpperCase();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    setOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!accountRef.current) return;
      if (!accountRef.current.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = session?.user?.name || session?.user?.email || "Account";

  const handleSignOut = async () => {
    try {
      setAccountOpen(false);
      setOpen(false);
      setIsSigningOut(true);
      startLoading();
      await signOut({ callbackUrl: "/" });
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="container pt-3 md:pt-4">
        <div className="rounded-[24px] border border-white/10 bg-[rgba(10,14,19,0.72)] shadow-[0_10px_40px_rgba(0,0,0,0.22)] backdrop-blur-2xl md:rounded-[28px]">
          <div className="flex items-center justify-between gap-3 px-3 py-3 md:px-5">
            <Link
              href="/"
              onClick={() => {
                if (!isActive("/")) startLoading();
              }}
              className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
            >
              <div className="relative transition-transform duration-300 group-hover:scale-[1.05]">
                <div className="absolute inset-0 rounded-full bg-[#B8FF3B]/0 blur-xl transition-all duration-300 group-hover:bg-[#B8FF3B]/20" />

                <Image
                  src="/logo.png"
                  alt="Hamro Futsal"
                  width={48}
                  height={48}
                  className="relative h-10 w-10 object-contain sm:h-11 sm:w-11"
                  priority
                />
              </div>

              <div className="min-w-0 leading-none">
                <p className="truncate text-[13px] font-semibold tracking-[0.06em] text-white transition-colors duration-300 group-hover:text-[#B8FF3B] sm:text-[15px] sm:tracking-[0.08em]">
                  HAMRO FUTSAL
                </p>
                <p className="mt-1 truncate text-[10px] text-[#94A3B8] sm:text-[11px]">
                  Luxury sports club
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 md:flex">
              {links.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      if (!active) startLoading();
                    }}
                    className={cn(
                      "relative rounded-full px-4 py-2.5 text-sm transition-all duration-300",
                      active
                        ? "bg-white/[0.08] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),0_8px_20px_rgba(0,0,0,0.16)]"
                        : "text-[#AAB4C3] hover:bg-white/[0.05] hover:text-white",
                    )}
                  >
                    {active && (
                      <span className="absolute left-1/2 top-[6px] h-1 w-1 -translate-x-1/2 rounded-full bg-[#B8FF3B]" />
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              {status === "loading" ? (
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-white">
                  Loading...
                </div>
              ) : session?.user ? (
                <div className="relative" ref={accountRef}>
                  <button
                    type="button"
                    onClick={() => setAccountOpen((prev) => !prev)}
                    className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2.5 text-white transition-all duration-300 hover:border-white/15 hover:bg-white/[0.07]"
                  >
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#B8FF3B]/20 bg-[linear-gradient(135deg,rgba(184,255,59,0.22),rgba(184,255,59,0.08))] text-sm font-semibold text-[#DFFF9A] shadow-[0_8px_24px_rgba(184,255,59,0.18)]">
                      <span>{avatarLetter}</span>
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-[#0B0F14] bg-[#B8FF3B]" />
                    </div>

                    <div className="hidden text-left lg:block">
                      <p className="max-w-[150px] truncate text-sm font-medium text-white">
                        {displayName}
                      </p>
                      <p className="text-[11px] text-[#94A3B8]">Account</p>
                    </div>

                    <ChevronDown
                      size={16}
                      className={cn(
                        "text-[#94A3B8] transition-transform duration-300",
                        accountOpen && "rotate-180",
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {accountOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.98, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -8, scale: 0.985, filter: "blur(4px)" }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute right-0 top-[calc(100%+12px)] w-[248px] overflow-hidden rounded-[24px] border border-white/10 bg-[rgba(10,14,19,0.92)] shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
                      >
                        <div className="border-b border-white/10 bg-white/[0.02] px-4 py-4">
                          <p className="truncate text-sm font-medium text-white">
                            {displayName}
                          </p>
                          <p className="mt-1 truncate text-xs text-[#94A3B8]">
                            {session.user.email}
                          </p>
                        </div>

                        <div className="p-2">
                          <Link
                            href="/account"
                            onClick={() => {
                              setAccountOpen(false);
                              if (!isActive("/account")) startLoading();
                            }}
                            className="group flex items-center gap-3 rounded-[18px] px-3 py-3 text-sm text-white transition-all duration-300 hover:bg-white/[0.06]"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.04] text-[#B8FF3B] transition-all duration-300 group-hover:border-[#B8FF3B]/20 group-hover:bg-[#B8FF3B]/10">
                              <User size={16} />
                            </div>
                            <span>My Account</span>
                          </Link>

                          <Link
                            href="/book"
                            onClick={() => {
                              setAccountOpen(false);
                              if (!isActive("/book")) startLoading();
                            }}
                            className="group flex items-center gap-3 rounded-[18px] px-3 py-3 text-sm text-white transition-all duration-300 hover:bg-white/[0.06]"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.04] text-[#B8FF3B] transition-all duration-300 group-hover:border-[#B8FF3B]/20 group-hover:bg-[#B8FF3B]/10">
                              <CalendarDays size={16} />
                            </div>
                            <span>Book a Slot</span>
                          </Link>

                          <button
                            type="button"
                            onClick={handleSignOut}
                            disabled={isSigningOut}
                            className="group flex w-full items-center gap-3 rounded-[18px] px-3 py-3 text-left text-sm text-[#FFB4B4] transition-all duration-300 hover:bg-white/[0.06]"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.04] text-[#FF8F8F] transition-all duration-300 group-hover:border-[#FF8F8F]/20 group-hover:bg-[#FF8F8F]/10">
                              <LogOut size={16} />
                            </div>
                            <span>{isSigningOut ? "Logging out..." : "Logout"}</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link
                    href={`/login${authHref}`}
                    onClick={() => startLoading()}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-white transition-all duration-300 hover:border-white/15 hover:bg-white/[0.08]"
                  >
                    Login
                  </Link>

                  <Link
                    href={`/signup${authHref}`}
                    onClick={() => startLoading()}
                    className="rounded-full bg-[#B8FF3B] px-6 py-2.5 text-sm !text-black tracking-[-0.01em] shadow-[0_10px_30px_rgba(184,255,59,0.25)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#a9ef36] hover:shadow-[0_16px_40px_rgba(184,255,59,0.35)] active:translate-y-[0px]"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.05] text-white transition hover:bg-white/[0.08] md:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden border-t border-white/10 md:hidden"
              >
                <motion.div
                  initial={{ y: -10, opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -8, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="px-3 pb-3 pt-3 sm:px-4 sm:pb-4"
                >
                  <div className="space-y-2">
                    {links.map((link) => {
                      const active = isActive(link.href);

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => {
                            setOpen(false);
                            if (!active) startLoading();
                          }}
                          className={cn(
                            "block rounded-[20px] px-4 py-3 text-sm transition-all duration-300",
                            active
                              ? "border border-[#4A7010] bg-[#1D2A0D] text-[#B8FF3B]"
                              : "border border-white/10 bg-white/[0.04] text-[#D7DEE7] hover:bg-white/[0.07]",
                          )}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-4 space-y-2">
                    {status === "loading" ? (
                      <div className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white">
                        Loading...
                      </div>
                    ) : session?.user ? (
                      <>
                        <div className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#B8FF3B]/20 bg-[linear-gradient(135deg,rgba(184,255,59,0.22),rgba(184,255,59,0.08))] text-sm font-semibold text-[#DFFF9A] shadow-[0_8px_24px_rgba(184,255,59,0.18)]">
                              <span>{avatarLetter}</span>
                              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-[#0B0F14] bg-[#B8FF3B]" />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-white">
                                {displayName}
                              </p>
                              <p className="mt-1 truncate text-xs text-[#94A3B8]">
                                {session.user.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        <Link
                          href="/account"
                          onClick={() => {
                            setOpen(false);
                            if (!isActive("/account")) startLoading();
                          }}
                          className="block rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:bg-white/[0.07]"
                        >
                          My Account
                        </Link>

                        <Link
                          href="/book"
                          onClick={() => {
                            setOpen(false);
                            if (!isActive("/book")) startLoading();
                          }}
                        >
                          <Button className="w-full rounded-full py-3 shadow-[0_14px_34px_rgba(184,255,59,0.20)] !text-black">
                            Book a Slot
                          </Button>
                        </Link>

                        <button
                          type="button"
                          onClick={handleSignOut}
                          disabled={isSigningOut}
                          className="block w-full rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-[#FFB4B4] transition hover:bg-white/[0.07]"
                        >
                          {isSigningOut ? "Logging out..." : "Logout"}
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href={`/login${authHref}`}
                          onClick={() => {
                            setOpen(false);
                            startLoading();
                          }}
                          className="block rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:bg-white/[0.07]"
                        >
                          Login
                        </Link>

                        <Link
                          href={`/signup${authHref}`}
                          onClick={() => {
                            setOpen(false);
                            startLoading();
                          }}
                        >
                          <Button className="w-full rounded-full py-3 shadow-[0_14px_34px_rgba(184,255,59,0.20)] !text-black">
                            Sign Up
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
