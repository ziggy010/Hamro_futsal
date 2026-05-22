"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarClock,
  LayoutDashboard,
  ReceiptText,
  ShieldCheck,
  Users,
} from "lucide-react";

const adminLinks = [
  {
    title: "Dashboard",
    description: "Venue pulse and watchlist",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Bookings",
    description: "Reservations and payments",
    href: "/admin/bookings",
    icon: CalendarClock,
  },
  {
    title: "Open Games",
    description: "Cutoffs and player fill",
    href: "/admin/open-games",
    icon: Users,
  },
  {
    title: "Slots",
    description: "Availability and blocking",
    href: "/admin/slots",
    icon: ShieldCheck,
  },
  {
    title: "Sales",
    description: "Revenue and collection",
    href: "/admin/sales",
    icon: ReceiptText,
  },
];

type Props = {
  mobile?: boolean;
};

export default function AdminSidebarNav({ mobile = false }: Props) {
  const pathname = usePathname();

  if (mobile) {
    return (
      <div className="no-scrollbar overflow-x-auto">
        <div className="flex min-w-max gap-3 px-4 py-3">
          {adminLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                  active
                    ? "border-[#B8FF3B] bg-[#18220C] text-[#B8FF3B]"
                    : "border-white/10 bg-white/[0.04] text-white hover:border-white/14 hover:bg-white/[0.06]"
                }`}
              >
                <link.icon size={15} />
                {link.title}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[30px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(18,22,28,0.24)] px-4 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-xl">
        <span className="h-2.5 w-2.5 rounded-full bg-[#B8FF3B] shadow-[0_0_14px_rgba(184,255,59,0.55)]" />
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#B8FF3B]">
          Admin nav
        </span>
      </div>

      <p className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-white">
        Move around faster
      </p>
      <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
        Keep every admin page one click away instead of hunting for links in
        different panels.
      </p>

      <div className="mt-5 space-y-3">
        {adminLinks.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-[22px] border p-4 transition ${
                active
                  ? "border-[#B8FF3B] bg-[#18220C] shadow-[0_0_0_1px_rgba(184,255,59,0.08)]"
                  : "border-white/10 bg-white/[0.04] hover:border-white/14 hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] border ${
                    active
                      ? "border-[#3F5D10] bg-[#22310D] text-[#B8FF3B]"
                      : "border-white/10 bg-white/[0.05] text-white"
                  }`}
                >
                  <link.icon size={18} />
                </div>

                <div>
                  <p
                    className={`text-sm font-medium ${
                      active ? "text-[#B8FF3B]" : "text-white"
                    }`}
                  >
                    {link.title}
                  </p>
                  <p className="mt-1 text-xs leading-6 text-[#94A3B8]">
                    {link.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
