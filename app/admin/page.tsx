"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";
import FadeIn from "@/components/ui/fade-in";
import StatePanel from "@/components/ui/state-panel";
import { getErrorMessage } from "@/lib/utils/error-message";

type BookingApi = {
  id: string;
  status:
    | "PRIVATE_CONFIRMED"
    | "OPEN_PENDING_FILL"
    | "OPEN_CONFIRMED"
    | "OPEN_EXPIRED"
    | "CANCELLED";
  bookingDate: string;
  totalPrice: number;
  createdAt: string;
  paymentStatus: "PENDING" | "PAID";
  user: { id: string; name: string; phone: string };
  slots: { id: string; startHour: number; endHour: number; price: number }[];
};

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
}

function hourTo12(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const normalized = hour % 12 === 0 ? 12 : hour % 12;
  return `${normalized}:00 ${suffix}`;
}

function formatSlotRange(slots: { startHour: number; endHour: number }[] | undefined) {
  if (!slots?.length) return "Time unavailable";
  const sorted = [...slots].sort((a, b) => a.startHour - b.startHour);
  return `${hourTo12(sorted[0].startHour)} – ${hourTo12(sorted[sorted.length - 1].endHour)}`;
}

function bookingStatusColor(status: BookingApi["status"]): string {
  if (status === "PRIVATE_CONFIRMED" || status === "OPEN_CONFIRMED") return "var(--accent)";
  if (status === "OPEN_PENDING_FILL") return "#F4D35E";
  return "rgba(255,150,150,0.8)";
}

function bookingStatusLabel(status: BookingApi["status"]): string {
  if (status === "PRIVATE_CONFIRMED") return "Confirmed";
  if (status === "OPEN_PENDING_FILL") return "Pending";
  if (status === "OPEN_CONFIRMED") return "Confirmed";
  if (status === "OPEN_EXPIRED") return "Expired";
  return "Cancelled";
}

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
    <span
      style={{
        fontFamily: "var(--f-mono)",
        fontSize: "10px",
        letterSpacing: "0.12em",
        textTransform: "uppercase" as const,
        color: "var(--fg-dim)",
        display: "block",
      }}
    >
      {children}
    </span>
  );
}

const quickLinks = [
  { title: "Bookings", description: "Manage confirmations and customer details.", href: "/admin/bookings" },
  { title: "Slots", description: "Block time, reopen slots, review the schedule.", href: "/admin/slots" },
  { title: "Sales", description: "Collected revenue, pending payments, daily totals.", href: "/admin/sales" },
];

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<BookingApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setError("");
      const bookingsRes = await fetch("/api/bookings", { cache: "no-store" });
      const bookingsData = await bookingsRes.json();
      if (!bookingsRes.ok) throw new Error(bookingsData?.error || "Failed to load bookings");
      setBookings(bookingsData.bookings || []);
    } catch (fetchError: unknown) {
      setError(getErrorMessage(fetchError, "Failed to load dashboard data"));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchDashboardData(); }, []);

  const todayStart = useMemo(() => startOfToday(), []);
  const todayEnd = useMemo(() => endOfToday(), []);

  const todaysBookings = useMemo(() =>
    bookings.filter((b) => {
      const d = new Date(b.bookingDate);
      return d >= todayStart && d <= todayEnd;
    }), [bookings, todayStart, todayEnd]);

  const activeTodaysBookings = useMemo(() =>
    todaysBookings.filter((b) => b.status !== "CANCELLED" && b.status !== "OPEN_EXPIRED"),
    [todaysBookings]);

  const todaysSales = useMemo(() =>
    activeTodaysBookings.reduce((sum, b) => sum + b.totalPrice, 0), [activeTodaysBookings]);

  const todaysCollected = useMemo(() =>
    activeTodaysBookings.filter((b) => b.paymentStatus === "PAID")
      .reduce((sum, b) => sum + b.totalPrice, 0), [activeTodaysBookings]);

  const pendingPaymentsCount = useMemo(() =>
    activeTodaysBookings.filter((b) => b.paymentStatus === "PENDING").length, [activeTodaysBookings]);

  const recentBookings = useMemo(() => [...bookings].slice(0, 6), [bookings]);

  const stats = [
    { label: "Revenue today", value: `NPR ${todaysSales.toLocaleString()}` },
    { label: "Collected today", value: `NPR ${todaysCollected.toLocaleString()}` },
    { label: "Active bookings", value: String(activeTodaysBookings.length) },
    { label: "Pending payments", value: String(pendingPaymentsCount) },
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
              fontSize: "clamp(2.2rem,5vw,4.2rem)",
              letterSpacing: "-0.055em",
              lineHeight: 0.96,
              color: "var(--fg)",
              marginTop: "1rem",
              maxWidth: "22ch",
            }}
          >
            Operations dashboard.
          </h1>
          <p style={{ marginTop: "1.25rem", fontSize: "17px", lineHeight: 1.7, color: "var(--fg-3)", maxWidth: "52ch" }}>
            Monitor today&apos;s bookings, revenue, payments, and the next actions that keep the venue running.
          </p>
        </FadeIn>

        {/* ── STATS STRIP ─────────────────────────────────────────────── */}
        <FadeIn delay={0.06}>
          <div
            style={{
              marginTop: "2.5rem",
              display: "grid",
              gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
              borderTop: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "1.25rem 0",
                  paddingLeft: i === 0 ? 0 : "1.25rem",
                  paddingRight: i === stats.length - 1 ? 0 : "1.25rem",
                  borderRight: i < stats.length - 1 ? "1px solid var(--line)" : undefined,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--fg-dim)",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  {s.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: "clamp(22px,2.5vw,34px)",
                    fontWeight: 600,
                    letterSpacing: "-0.04em",
                    color: "var(--fg)",
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── ERROR ───────────────────────────────────────────────────── */}
        {error && (
          <div style={{ marginTop: "1.5rem" }}>
            <StatePanel
              variant="error"
              eyebrow="Couldn't load dashboard"
              title="The operations dashboard is temporarily unavailable"
              text={error}
              actions={
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => { setRefreshing(true); fetchDashboardData(); }}
                >
                  Try again
                </button>
              }
            />
          </div>
        )}

        {/* ── MAIN GRID ───────────────────────────────────────────────── */}
        <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* Row 1: Actions */}
          <div>

            {/* Actions panel */}
            <FadeIn delay={0.08}>
              <div style={{ border: "1px solid var(--line)", borderRadius: "20px", background: "var(--bg-soft)", overflow: "hidden" }}>
                <div
                  style={{
                    padding: "1.375rem 1.75rem",
                    borderBottom: "1px solid var(--line)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <span className="eyebrow">Actions</span>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.03em", marginTop: "0.375rem" }}>
                      Today&apos;s admin controls
                    </p>
                  </div>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => { setRefreshing(true); fetchDashboardData(); }}
                  >
                    <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
                    Refresh
                  </button>
                </div>

                {/* Follow-up focus */}
                <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid var(--line)" }}>
                  <MetaLabel>Manual follow-up focus</MetaLabel>
                  <div style={{ marginTop: "0.875rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "13px", color: "var(--fg-3)" }}>Pending payments</span>
                      <span style={{ fontFamily: "var(--f-mono)", fontSize: "13px", color: pendingPaymentsCount > 0 ? "#F4D35E" : "var(--fg-dim)" }}>
                        {pendingPaymentsCount}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "13px", color: "var(--fg-3)" }}>Collected today</span>
                      <span style={{ fontFamily: "var(--f-mono)", fontSize: "13px", color: "var(--fg)" }}>
                        NPR {todaysCollected.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick links */}
                <div style={{ padding: "0 1.75rem" }}>
                  {quickLinks.map((link, i) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                        padding: "1rem 0",
                        borderTop: i > 0 ? "1px solid var(--line)" : undefined,
                        textDecoration: "none",
                      }}
                    >
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--fg)" }}>{link.title}</p>
                        <p style={{ fontSize: "12px", color: "var(--fg-dim)", marginTop: 2 }}>{link.description}</p>
                      </div>
                      <ArrowRight size={14} style={{ color: "var(--fg-dim)", flexShrink: 0 }} />
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>

          </div>

          {/* Row 2: Recent bookings + Daily signals */}
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-start">

            {/* Recent bookings */}
            <FadeIn delay={0.12}>
              <div style={{ border: "1px solid var(--line)", borderRadius: "20px", background: "var(--bg-soft)", overflow: "hidden" }}>
                <div
                  style={{
                    padding: "1.375rem 1.75rem",
                    borderBottom: "1px solid var(--line)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span className="eyebrow">Activity</span>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.03em", marginTop: "0.375rem" }}>
                      Recent bookings
                    </p>
                  </div>
                  <Link href="/admin/bookings" className="btn-text" style={{ fontSize: "13px" }}>
                    View all
                  </Link>
                </div>

                <div style={{ padding: "0 1.75rem" }}>
                  {loading ? (
                    <div style={{ padding: "2rem 0" }}>
                      <StatePanel
                        variant="loading"
                        title="Loading booking activity"
                        text="Pulling the most recent reservations."
                        className="rounded-[20px] p-5 shadow-none"
                      />
                    </div>
                  ) : recentBookings.length === 0 ? (
                    <div style={{ padding: "2rem 0" }}>
                      <StatePanel
                        title="No recent bookings yet"
                        text="Once new reservations start coming in, this panel will show the latest activity."
                        className="rounded-[20px] p-5 shadow-none"
                      />
                    </div>
                  ) : (
                    recentBookings.map((booking) => (
                      <div key={booking.id} style={{ borderTop: "1px solid var(--line)", padding: "1.125rem 0" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                              <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.02em" }}>
                                {formatSlotRange(booking.slots)}
                              </p>
                              <StatusBadge color={bookingStatusColor(booking.status)}>
                                {bookingStatusLabel(booking.status)}
                              </StatusBadge>
                              <StatusBadge color={booking.paymentStatus === "PAID" ? "var(--accent)" : "#F4D35E"}>
                                {booking.paymentStatus === "PAID" ? "Paid" : "Pending"}
                              </StatusBadge>
                            </div>
                            <p style={{ fontSize: "12px", color: "var(--fg-dim)", marginTop: 5 }}>
                              {booking.user.name} &middot; {new Date(booking.bookingDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </p>
                          </div>
                          <span style={{ fontFamily: "var(--f-mono)", fontSize: "13px", color: "var(--fg-3)", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
                            NPR {booking.totalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </FadeIn>

            {/* Daily signals */}
            <FadeIn delay={0.14}>
              <div style={{ border: "1px solid var(--line)", borderRadius: "20px", background: "var(--bg-soft)", overflow: "hidden" }}>
                <div style={{ padding: "1.375rem 1.75rem", borderBottom: "1px solid var(--line)" }}>
                  <span className="eyebrow">Snapshot</span>
                  <p style={{ fontSize: "18px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.03em", marginTop: "0.375rem" }}>
                    Daily operating signals
                  </p>
                </div>
                <div style={{ padding: "0 1.75rem" }}>
                  {[
                    { label: "Total bookings in system", value: bookings.length },
                    { label: "Today's active bookings", value: activeTodaysBookings.length },
                    {
                      label: "Pending payments today",
                      value: pendingPaymentsCount,
                    },
                    {
                      label: "Paid bookings today",
                      value: activeTodaysBookings.filter((b) => b.paymentStatus === "PAID").length,
                    },
                  ].map((item, i) => (
                    <div
                      key={item.label}
                      style={{
                        borderTop: i > 0 ? "1px solid var(--line)" : undefined,
                        padding: "1rem 0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                      }}
                    >
                      <span style={{ fontSize: "13px", color: "var(--fg-3)", flex: 1, lineHeight: 1.45 }}>{item.label}</span>
                      <span
                        style={{
                          fontFamily: "var(--f-mono)",
                          fontSize: "20px",
                          fontWeight: 600,
                          letterSpacing: "-0.03em",
                          color: "var(--fg)",
                          fontVariantNumeric: "tabular-nums",
                          flexShrink: 0,
                        }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>
    </main>
  );
}
