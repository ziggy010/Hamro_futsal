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

type Props = { mobile?: boolean };

export default function AdminSidebarNav({ mobile = false }: Props) {
  const pathname = usePathname();

  if (mobile) {
    return (
      <div className="no-scrollbar overflow-x-auto">
        <div style={{ display: "flex", gap: "0.5rem", padding: "0.625rem 1rem", minWidth: "max-content" }}>
          {adminLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.375rem 0.875rem",
                  borderRadius: "999px",
                  border: `1px solid ${active ? "var(--accent)" : "var(--line)"}`,
                  background: active ? "rgba(184,255,59,0.07)" : "transparent",
                  color: active ? "var(--accent)" : "var(--fg-3)",
                  fontSize: "13px",
                  fontWeight: active ? 500 : 400,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "color .15s, background .15s, border-color .15s",
                }}
              >
                <link.icon size={13} />
                {link.title}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        border: "1px solid var(--line)",
        borderRadius: "20px",
        background: "var(--bg-soft)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ padding: "1.25rem 1.375rem", borderBottom: "1px solid var(--line)" }}>
        <span
          style={{
            fontFamily: "var(--f-mono)",
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--fg-dim)",
          }}
        >
          Admin
        </span>
        <p
          style={{
            fontSize: "17px",
            fontWeight: 600,
            color: "var(--fg)",
            letterSpacing: "-0.025em",
            marginTop: "0.375rem",
          }}
        >
          Navigation
        </p>
      </div>

      {/* Links */}
      <div style={{ padding: "0.5rem" }}>
        {adminLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 0.875rem",
                borderRadius: "14px",
                background: active ? "rgba(184,255,59,0.06)" : "transparent",
                textDecoration: "none",
                transition: "background .15s",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  border: `1px solid ${active ? "rgba(184,255,59,0.28)" : "var(--line)"}`,
                  background: active ? "rgba(184,255,59,0.05)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: active ? "var(--accent)" : "var(--fg-dim)",
                  flexShrink: 0,
                  transition: "border-color .15s, color .15s",
                }}
              >
                <link.icon size={15} />
              </div>
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: active ? "var(--accent)" : "var(--fg)",
                    lineHeight: 1.3,
                    transition: "color .15s",
                  }}
                >
                  {link.title}
                </p>
                <p style={{ fontSize: "11px", color: "var(--fg-dim)", marginTop: 2 }}>
                  {link.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
