"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw, TriangleAlert } from "lucide-react";
import ExpireButton from "@/components/admin/ExpireButton";
import FadeIn from "@/components/ui/fade-in";
import StatePanel from "@/components/ui/state-panel";
import { getErrorMessage } from "@/lib/utils/error-message";
import { getOpenGameCutoffTime } from "../../lib/open-game-cutoff";

type BookingApi = {
  id: string;
  bookingType: "PRIVATE" | "OPEN";
  status:
    | "PRIVATE_CONFIRMED"
    | "OPEN_PENDING_FILL"
    | "OPEN_CONFIRMED"
    | "OPEN_EXPIRED"
    | "CANCELLED";
  bookingDate: string;
  playersCount: number;
  totalPrice: number;
  createdAt: string;
  paymentStatus: "PENDING" | "PAID";
  user: { id: string; name: string; phone: string };
  slots: { id: string; startHour: number; endHour: number; price: number }[];
  openGame?: {
    id: string;
    status: "PENDING_FILL" | "CONFIRMED" | "FULL" | "EXPIRED" | "CANCELLED";
    currentPlayers: number;
    maxPlayers: number;
  } | null;
};

type OpenGameApi = {
  id: string;
  status: "PENDING_FILL" | "CONFIRMED" | "FULL" | "EXPIRED" | "CANCELLED";
  currentPlayers: number;
  minPlayers: number;
  maxPlayers: number;
  cutoffTime: string;
  booking: {
    id: string;
    bookingDate: string;
    user: { id: string; name: string; phone: string };
    slots: { id: string; startHour: number; endHour: number; price: number }[];
  };
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
  if (status === "OPEN_PENDING_FILL") return "Waiting for players";
  if (status === "OPEN_CONFIRMED") return "Open confirmed";
  if (status === "OPEN_EXPIRED") return "Expired";
  return "Cancelled";
}

function openGameStatusColor(status: OpenGameApi["status"]): string {
  if (status === "CONFIRMED") return "var(--accent)";
  if (status === "FULL") return "#7EF7C1";
  if (status === "PENDING_FILL") return "#F4D35E";
  return "rgba(255,150,150,0.8)";
}

function openGameStatusLabel(status: OpenGameApi["status"]): string {
  if (status === "PENDING_FILL") return "Pending fill";
  if (status === "CONFIRMED") return "Confirmed";
  if (status === "FULL") return "Full";
  if (status === "EXPIRED") return "Expired";
  return "Cancelled";
}

function timeUntil(dateString: string) {
  const diff = new Date(dateString).getTime() - Date.now();
  if (diff <= 0) return "Cutoff passed";
  const hours = Math.floor(diff / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  if (hours <= 0) return `${minutes} min left`;
  if (minutes === 0) return `${hours} hr left`;
  return `${hours} hr ${minutes} min left`;
}

function getEffectiveCutoffTime(game: OpenGameApi) {
  return getOpenGameCutoffTime(new Date(game.booking.bookingDate), game.booking.slots);
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
  { title: "Open Games", description: "Track fill status and intervene before cutoffs.", href: "/admin/open-games" },
  { title: "Slots", description: "Block time, reopen slots, review the schedule.", href: "/admin/slots" },
  { title: "Sales", description: "Collected revenue, pending payments, daily totals.", href: "/admin/sales" },
];

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<BookingApi[]>([]);
  const [openGames, setOpenGames] = useState<OpenGameApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setError("");
      const [bookingsRes, openGamesRes] = await Promise.all([
        fetch("/api/bookings", { cache: "no-store" }),
        fetch("/api/open-games", { cache: "no-store" }),
      ]);
      const bookingsData = await bookingsRes.json();
      const openGamesData = await openGamesRes.json();
      if (!bookingsRes.ok) throw new Error(bookingsData?.error || "Failed to load bookings");
      if (!openGamesRes.ok) throw new Error(openGamesData?.error || "Failed to load open games");
      setBookings(bookingsData.bookings || []);
      setOpenGames(openGamesData.openGames || []);
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

  const activeOpenGames = useMemo(() =>
    openGames.filter((g) => g.status === "PENDING_FILL" || g.status === "CONFIRMED" || g.status === "FULL"),
    [openGames]);

  const expiryNowGames = useMemo(() => {
    const now = new Date();
    return activeOpenGames.filter((g) => {
      const cutoff = getEffectiveCutoffTime(g);
      return g.status === "PENDING_FILL" && g.currentPlayers < g.minPlayers && cutoff <= now;
    });
  }, [activeOpenGames]);

  const pendingFillGames = useMemo(() =>
    activeOpenGames.filter((g) => g.status === "PENDING_FILL"), [activeOpenGames]);

  const totalPlayersToday = useMemo(() =>
    activeTodaysBookings.reduce((sum, b) => sum + b.playersCount, 0), [activeTodaysBookings]);

  const recentBookings = useMemo(() => [...bookings].slice(0, 6), [bookings]);

  const openGamesWatchlist = useMemo(() =>
    [...activeOpenGames]
      .sort((a, b) => getEffectiveCutoffTime(a).getTime() - getEffectiveCutoffTime(b).getTime())
      .slice(0, 6),
    [activeOpenGames]);

  const stats = [
    { label: "Revenue today", value: `NPR ${todaysSales.toLocaleString()}` },
    { label: "Players today", value: String(totalPlayersToday) },
    { label: "Needs expiry", value: String(expiryNowGames.length) },
    { label: "Pending fill", value: String(pendingFillGames.length) },
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
            Monitor today&apos;s bookings, live open games, revenue, and the next actions that keep the venue running.
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

          {/* Row 1: Actions + Watchlist */}
          <div className="grid gap-6 lg:grid-cols-2 items-start">

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

                {/* Expire button */}
                <div style={{ padding: "1.375rem 1.75rem", borderBottom: "1px solid var(--line)" }}>
                  <ExpireButton />
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
                      <span style={{ fontSize: "13px", color: "var(--fg-3)" }}>Needs expiry now</span>
                      <span style={{ fontFamily: "var(--f-mono)", fontSize: "13px", color: expiryNowGames.length > 0 ? "rgba(255,150,150,0.85)" : "var(--fg-dim)" }}>
                        {expiryNowGames.length}
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

            {/* Watchlist panel */}
            <FadeIn delay={0.1}>
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
                    <span className="eyebrow">Watchlist</span>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.03em", marginTop: "0.375rem" }}>
                      Open games needing attention
                    </p>
                  </div>
                  <Link href="/admin/open-games" className="btn-text" style={{ fontSize: "13px" }}>
                    Manage all
                  </Link>
                </div>

                <div style={{ padding: "0 1.75rem" }}>
                  {loading ? (
                    <div style={{ padding: "2rem 0" }}>
                      <StatePanel
                        variant="loading"
                        title="Loading game watchlist"
                        text="Checking cutoff pressure and fill status."
                        className="rounded-[20px] p-5 shadow-none"
                      />
                    </div>
                  ) : openGamesWatchlist.length === 0 ? (
                    <div style={{ padding: "2rem 0" }}>
                      <StatePanel
                        title="No active open games right now"
                        text="Once hosts publish new open matches, they'll appear here."
                        className="rounded-[20px] p-5 shadow-none"
                      />
                    </div>
                  ) : (
                    openGamesWatchlist.map((game) => {
                      const remaining = game.maxPlayers - game.currentPlayers;
                      const effectiveCutoff = getEffectiveCutoffTime(game);
                      const urgent =
                        effectiveCutoff.getTime() - Date.now() <= 2 * 60 * 60 * 1000 &&
                        effectiveCutoff > new Date();
                      const needsExpiryNow =
                        game.status === "PENDING_FILL" &&
                        game.currentPlayers < game.minPlayers &&
                        effectiveCutoff <= new Date();

                      return (
                        <div
                          key={game.id}
                          style={{
                            borderTop: "1px solid var(--line)",
                            padding: "1.25rem 0",
                          }}
                        >
                          {/* Time + status */}
                          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                            <p style={{ fontSize: "clamp(16px,1.8vw,20px)", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.03em" }}>
                              {formatSlotRange(game.booking.slots)}
                            </p>
                            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                              <StatusBadge color={openGameStatusColor(game.status)}>
                                {openGameStatusLabel(game.status)}
                              </StatusBadge>
                              {needsExpiryNow && (
                                <StatusBadge color="rgba(255,150,150,0.85)">Expire now</StatusBadge>
                              )}
                              {urgent && !needsExpiryNow && (
                                <StatusBadge color="#F4D35E">Urgent cutoff</StatusBadge>
                              )}
                            </div>
                          </div>

                          {/* Host + date */}
                          <p style={{ fontSize: "12px", color: "var(--fg-dim)" }}>
                            Host: {game.booking.user.name} &middot;{" "}
                            {new Date(game.booking.bookingDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                          </p>

                          {/* Meta strip */}
                          <div
                            style={{
                              marginTop: "0.875rem",
                              paddingTop: "0.875rem",
                              borderTop: "1px solid var(--line-soft, rgba(255,255,255,0.06))",
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "1.25rem",
                            }}
                          >
                            {[
                              { label: "Players", value: `${game.currentPlayers} / ${game.maxPlayers}` },
                              { label: "Spots left", value: remaining > 0 ? `${remaining}` : "Full" },
                              { label: "Minimum", value: `${game.minPlayers}` },
                              {
                                label: needsExpiryNow ? "Action" : "Cutoff",
                                value: needsExpiryNow ? "Expire and reopen" : timeUntil(effectiveCutoff.toISOString()),
                              },
                            ].map((item) => (
                              <div key={item.label}>
                                <MetaLabel>{item.label}</MetaLabel>
                                <span style={{ fontSize: "13px", color: "var(--fg-3)", marginTop: 3, display: "block" }}>
                                  {item.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  )}
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
                              {booking.user.name} &middot; {booking.bookingType} &middot; {booking.playersCount} players
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
                    { label: "Pending fill open games", value: pendingFillGames.length },
                    {
                      label: "Confirmed or full open games",
                      value: activeOpenGames.filter((g) => g.status === "CONFIRMED" || g.status === "FULL").length,
                    },
                    {
                      label: "Need attention (expiry)",
                      value: expiryNowGames.length,
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

                {/* Alert: needs expiry */}
                {expiryNowGames.length > 0 && (
                  <div style={{ padding: "1rem 1.75rem", borderTop: "1px solid var(--line)" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.625rem",
                        padding: "0.75rem 1rem",
                        borderRadius: "12px",
                        border: "1px solid rgba(255,100,100,0.18)",
                        background: "rgba(255,80,80,0.04)",
                      }}
                    >
                      <TriangleAlert size={13} style={{ color: "rgba(255,150,150,0.85)", marginTop: 2, flexShrink: 0 }} />
                      <p style={{ fontSize: "12px", color: "rgba(255,150,150,0.85)", lineHeight: 1.55 }}>
                        {expiryNowGames.length} open game{expiryNowGames.length > 1 ? "s" : ""} passed the 4-hour cutoff without enough players. Expire them to reopen the slots.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

        </div>
      </section>
    </main>
  );
}
