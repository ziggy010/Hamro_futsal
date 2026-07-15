"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CircleDollarSign, CreditCard, ReceiptText, Wallet } from "lucide-react";
import FadeIn from "@/components/ui/fade-in";
import StatePanel from "@/components/ui/state-panel";
import { getErrorMessage } from "@/lib/utils/error-message";

type Booking = {
  id: string;
  bookingType: "PRIVATE" | "OPEN";
  totalPrice: number;
  createdAt: string;
  paymentStatus: "PENDING" | "PAID";
  user: { name: string };
};

type SalesResponse = {
  success: boolean;
  totalRevenue: number;
  collectedRevenue: number;
  pendingRevenue: number;
  privateRevenue: number;
  openRevenue: number;
  bookings: Booking[];
};

function StatusBadge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: "11px",
        fontWeight: 500,
        padding: "3px 10px",
        borderRadius: "999px",
        border: "1px solid rgba(255,255,255,0.1)",
        color,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function MetaLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: "var(--f-mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--fg-dim)", display: "block" }}>
      {children}
    </span>
  );
}

const quickLinks = [
  { label: "Dashboard", href: "/admin" },
  { label: "Bookings", href: "/admin/bookings" },
  { label: "Open Games", href: "/admin/open-games" },
];

export default function AdminSalesPage() {
  const [data, setData] = useState<SalesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSales = async () => {
    try {
      setError("");
      const res = await fetch("/api/admin/sales", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load sales");
      setData(json);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to load sales"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSales(); }, []);

  const bookingCount = data?.bookings.length ?? 0;
  const paidCount = useMemo(() => data?.bookings.filter((b) => b.paymentStatus === "PAID").length ?? 0, [data]);
  const pendingCount = useMemo(() => data?.bookings.filter((b) => b.paymentStatus === "PENDING").length ?? 0, [data]);

  const headerStats = [
    { label: "Total revenue", value: `NPR ${(data?.totalRevenue ?? 0).toLocaleString()}` },
    { label: "Collected", value: `NPR ${(data?.collectedRevenue ?? 0).toLocaleString()}` },
    { label: "Pending", value: `NPR ${(data?.pendingRevenue ?? 0).toLocaleString()}` },
    { label: "Bookings", value: String(bookingCount) },
  ];

  const revenueCards = [
    { title: "Collected today", value: `NPR ${(data?.collectedRevenue ?? 0).toLocaleString()}`, meta: `${paidCount} paid booking${paidCount === 1 ? "" : "s"}`, icon: CircleDollarSign },
    { title: "Pending today", value: `NPR ${(data?.pendingRevenue ?? 0).toLocaleString()}`, meta: `${pendingCount} booking${pendingCount === 1 ? "" : "s"} still unpaid`, icon: CreditCard },
    { title: "Private revenue", value: `NPR ${(data?.privateRevenue ?? 0).toLocaleString()}`, meta: "Private-game contribution", icon: ReceiptText },
    { title: "Open revenue", value: `NPR ${(data?.openRevenue ?? 0).toLocaleString()}`, meta: "Open-game contribution", icon: Wallet },
  ];

  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">

        {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
        <FadeIn>
          <span className="eyebrow">Admin</span>
          <h1
            style={{
              fontFamily: "var(--f-sans)",
              fontWeight: 700,
              fontSize: "clamp(2rem,4.5vw,3.8rem)",
              letterSpacing: "-0.055em",
              lineHeight: 0.96,
              color: "var(--fg)",
              marginTop: "1rem",
            }}
          >
            Sales overview.
          </h1>
          <p style={{ marginTop: "1rem", fontSize: "16px", lineHeight: 1.7, color: "var(--fg-3)", maxWidth: "52ch" }}>
            Track today&apos;s collected revenue, pending payments, and the booking mix driving venue income.
          </p>
        </FadeIn>

        {/* ── STATS STRIP ─────────────────────────────────────────────── */}
        <FadeIn delay={0.05}>
          <div
            style={{
              marginTop: "2rem",
              display: "grid",
              gridTemplateColumns: `repeat(${headerStats.length}, 1fr)`,
              borderTop: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
              marginBottom: "2rem",
            }}
          >
            {headerStats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "1rem 0",
                  paddingLeft: i === 0 ? 0 : "1.25rem",
                  paddingRight: i === headerStats.length - 1 ? 0 : "1.25rem",
                  borderRight: i < headerStats.length - 1 ? "1px solid var(--line)" : undefined,
                }}
              >
                <span style={{ fontFamily: "var(--f-mono)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-dim)", display: "block", marginBottom: "0.375rem" }}>
                  {s.label}
                </span>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: "clamp(18px,2vw,28px)", fontWeight: 600, letterSpacing: "-0.04em", color: "var(--fg)", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── ERROR ───────────────────────────────────────────────────── */}
        {error && (
          <div style={{ marginBottom: "1.5rem" }}>
            <StatePanel
              variant="error"
              eyebrow="Couldn't load sales"
              title="The sales dashboard is temporarily unavailable"
              text={error}
              actions={
                <Link href="/admin/bookings">
                  <span className="btn btn-ghost btn-sm">Check bookings instead</span>
                </Link>
              }
            />
          </div>
        )}

        {loading ? (
          <StatePanel
            variant="loading"
            eyebrow="Loading"
            title="Calculating today's revenue"
            text="Pulling bookings, payment states, and today's collection totals."
          />
        ) : data ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Revenue breakdown cards */}
            <FadeIn delay={0.08}>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {revenueCards.map((item) => (
                  <div
                    key={item.title}
                    style={{ border: "1px solid var(--line)", borderRadius: "16px", background: "var(--bg-soft)", padding: "1.25rem" }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
                      <div>
                        <MetaLabel>{item.title}</MetaLabel>
                        <p style={{ fontFamily: "var(--f-mono)", fontSize: "clamp(20px,2vw,26px)", fontWeight: 600, letterSpacing: "-0.04em", color: "var(--fg)", marginTop: "0.5rem", fontVariantNumeric: "tabular-nums" }}>
                          {item.value}
                        </p>
                        <p style={{ fontSize: "12px", color: "var(--fg-dim)", marginTop: "0.375rem" }}>{item.meta}</p>
                      </div>
                      <div style={{ width: 36, height: 36, borderRadius: "10px", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fg-dim)", flexShrink: 0 }}>
                        <item.icon size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Revenue mix + Quick links */}
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] items-start">

              {/* Revenue mix */}
              <FadeIn delay={0.12}>
                <div style={{ border: "1px solid var(--line)", borderRadius: "20px", background: "var(--bg-soft)", overflow: "hidden" }}>
                  <div style={{ padding: "1.375rem 1.75rem", borderBottom: "1px solid var(--line)" }}>
                    <span className="eyebrow">Revenue mix</span>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.03em", marginTop: "0.375rem" }}>
                      Where today&apos;s revenue came from
                    </p>
                  </div>
                  <div style={{ padding: "0 1.75rem" }}>
                    {[
                      { label: "Private games", value: `NPR ${(data.privateRevenue).toLocaleString()}`, note: "Exclusive bookings and larger single-party revenue" },
                      { label: "Open games", value: `NPR ${(data.openRevenue).toLocaleString()}`, note: "Community fill and extra participation on open slots" },
                      {
                        label: "Collection health",
                        value: bookingCount > 0 ? `${Math.round((paidCount / bookingCount) * 100)}% paid` : "No bookings",
                        note: pendingCount > 0 ? `${pendingCount} unpaid booking${pendingCount > 1 ? "s" : ""} to follow up before the day closes` : "All tracked bookings are already marked paid",
                      },
                    ].map((item, i) => (
                      <div
                        key={item.label}
                        style={{
                          borderTop: i > 0 ? "1px solid var(--line)" : undefined,
                          padding: "1.125rem 0",
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          gap: "1rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <MetaLabel>{item.label}</MetaLabel>
                          <p style={{ fontSize: "12px", color: "var(--fg-dim)", marginTop: "0.375rem", lineHeight: 1.55 }}>{item.note}</p>
                        </div>
                        <span style={{ fontFamily: "var(--f-mono)", fontSize: "15px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Quick links */}
              <FadeIn delay={0.14}>
                <div style={{ border: "1px solid var(--line)", borderRadius: "20px", background: "var(--bg-soft)", overflow: "hidden" }}>
                  <div style={{ padding: "1.375rem 1.75rem", borderBottom: "1px solid var(--line)" }}>
                    <span className="eyebrow">Navigation</span>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.03em", marginTop: "0.375rem" }}>
                      Move between admin tools
                    </p>
                  </div>
                  <div style={{ padding: "0 1.75rem" }}>
                    {quickLinks.map((link, i) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "0.75rem",
                          padding: "1rem 0",
                          borderTop: i > 0 ? "1px solid var(--line)" : undefined,
                          textDecoration: "none",
                        }}
                      >
                        <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--fg)" }}>{link.label}</span>
                        <ArrowRight size={14} style={{ color: "var(--fg-dim)", flexShrink: 0 }} />
                      </Link>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Booking ledger */}
            <FadeIn delay={0.18}>
              <div style={{ border: "1px solid var(--line)", borderRadius: "20px", background: "var(--bg-soft)", overflow: "hidden" }}>
                <div style={{ padding: "1.375rem 1.75rem", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span className="eyebrow">Booking ledger</span>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.03em", marginTop: "0.375rem" }}>
                      Today&apos;s revenue activity
                    </p>
                  </div>
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: "28px", fontWeight: 600, letterSpacing: "-0.04em", color: "var(--fg-dim)", lineHeight: 1 }}>
                    {bookingCount}
                  </span>
                </div>

                <div style={{ padding: "0 1.75rem" }}>
                  {data.bookings.length === 0 ? (
                    <div style={{ padding: "2rem 0" }}>
                      <StatePanel
                        title="No sales recorded for today"
                        text="As bookings are created for today, they'll appear here with payment status and amount."
                        className="rounded-[20px] p-5 shadow-none"
                      />
                    </div>
                  ) : (
                    data.bookings.map((booking) => (
                      <div
                        key={booking.id}
                        style={{ borderTop: "1px solid var(--line)", padding: "1.125rem 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.375rem" }}>
                            <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--fg)" }}>{booking.user.name}</p>
                            <StatusBadge color="var(--fg-dim)">{booking.bookingType === "PRIVATE" ? "Private" : "Open"}</StatusBadge>
                            <StatusBadge color={booking.paymentStatus === "PAID" ? "var(--accent)" : "#F4D35E"}>
                              {booking.paymentStatus === "PAID" ? "Paid" : "Pending"}
                            </StatusBadge>
                          </div>
                          <p style={{ fontSize: "12px", color: "var(--fg-dim)" }}>
                            {new Date(booking.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                        <span style={{ fontFamily: "var(--f-mono)", fontSize: "15px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                          NPR {booking.totalPrice.toLocaleString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        ) : null}
      </section>
    </main>
  );
}
