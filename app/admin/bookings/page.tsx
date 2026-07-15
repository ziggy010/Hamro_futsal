"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CalendarDays, Phone, Search, User } from "lucide-react";
import StatePanel from "@/components/ui/state-panel";
import { getErrorMessage } from "@/lib/utils/error-message";

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
  paymentStatus: "PENDING" | "PAID";
  paidAt?: string | null;
  totalPrice: number;
  createdAt: string;
  user: { id: string; name: string; phone: string; email?: string | null };
  slots: { id: string; startHour: number; endHour: number; price: number }[];
  openGame?: {
    id: string;
    status: "PENDING_FILL" | "CONFIRMED" | "FULL" | "EXPIRED" | "CANCELLED";
    currentPlayers: number;
    maxPlayers: number;
  } | null;
};

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

function formatDateLabel(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function isBookingFinished(booking: BookingApi) {
  const now = new Date();
  const bookingDate = new Date(booking.bookingDate);
  bookingDate.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (bookingDate.getTime() < today.getTime()) return true;
  if (bookingDate.getTime() > today.getTime()) return false;
  const lastEndHour = Math.max(...booking.slots.map((s) => s.endHour));
  return now.getHours() >= lastEndHour;
}

function statusColor(status: BookingApi["status"]): string {
  if (status === "PRIVATE_CONFIRMED" || status === "OPEN_CONFIRMED") return "var(--accent)";
  if (status === "OPEN_PENDING_FILL") return "#F4D35E";
  return "rgba(255,150,150,0.8)";
}

function statusLabel(status: BookingApi["status"]): string {
  if (status === "PRIVATE_CONFIRMED") return "Confirmed";
  if (status === "OPEN_PENDING_FILL") return "Pending Fill";
  if (status === "OPEN_CONFIRMED") return "Open Confirmed";
  if (status === "OPEN_EXPIRED") return "Expired";
  return "Cancelled";
}

function canManageBooking(booking: BookingApi) {
  return booking.status !== "CANCELLED" && booking.status !== "OPEN_EXPIRED";
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

export default function AdminBookingsPage() {
  const searchParams = useSearchParams();
  const [bookings, setBookings] = useState<BookingApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [processingId, setProcessingId] = useState("");
  const [search, setSearch] = useState("");
  const [showFinishedBookings, setShowFinishedBookings] = useState(false);
  const [typeFilter, setTypeFilter] = useState<"ALL" | "PRIVATE" | "OPEN">("ALL");
  const [dateFilter, setDateFilter] = useState<"ALL" | "TODAY">("ALL");

  const fetchBookings = async () => {
    try {
      setError("");
      const res = await fetch("/api/bookings", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load bookings");
      setBookings(data.bookings || []);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to load bookings"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam) setSearch(searchParam);
  }, [searchParams]);

  const handleMarkPaid = async (bookingId: string) => {
    try {
      setProcessingId(bookingId);
      setActionError("");
      setActionMessage("");
      const res = await fetch("/api/bookings/mark-paid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to mark paid");
      setActionMessage("Booking marked as paid.");
      await fetchBookings();
    } catch (err: unknown) {
      setActionError(getErrorMessage(err, "Error marking payment"));
    } finally {
      setProcessingId("");
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Cancel this booking?")) return;
    try {
      setProcessingId(bookingId);
      setActionError("");
      setActionMessage("");
      const res = await fetch("/api/bookings/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to cancel");
      setActionMessage("Booking cancelled successfully.");
      await fetchBookings();
    } catch (err: unknown) {
      setActionError(getErrorMessage(err, "Error cancelling booking"));
    } finally {
      setProcessingId("");
    }
  };

  const filteredBookings = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.user.name.toLowerCase().includes(search.toLowerCase()) ||
        booking.user.phone.includes(search) ||
        booking.id.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "ALL" || booking.bookingType === typeFilter;
      let matchesDate = true;
      if (dateFilter === "TODAY") {
        const bd = new Date(booking.bookingDate);
        bd.setHours(0, 0, 0, 0);
        matchesDate = bd.getTime() === today.getTime();
      }
      return matchesSearch && matchesType && matchesDate;
    });
  }, [bookings, search, typeFilter, dateFilter]);

  const activeBookings = useMemo(() => filteredBookings.filter((b) => !isBookingFinished(b)), [filteredBookings]);
  const finishedBookings = useMemo(() => filteredBookings.filter((b) => isBookingFinished(b)), [filteredBookings]);

  const todaysBookingsCount = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return bookings.filter((b) => {
      const bd = new Date(b.bookingDate);
      bd.setHours(0, 0, 0, 0);
      return bd.getTime() === today.getTime();
    }).length;
  }, [bookings]);

  const privateCount = useMemo(() => bookings.filter((b) => b.bookingType === "PRIVATE").length, [bookings]);
  const openCount = useMemo(() => bookings.filter((b) => b.bookingType === "OPEN").length, [bookings]);

  const filterBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: "0.375rem 0.875rem",
    borderRadius: "999px",
    border: `1px solid ${active ? "var(--fg-3)" : "var(--line)"}`,
    background: active ? "rgba(255,255,255,0.07)" : "transparent",
    color: active ? "var(--fg)" : "var(--fg-dim)",
    fontSize: "13px",
    cursor: "pointer",
    transition: "all .15s",
  });

  function BookingCard({ booking, past }: { booking: BookingApi; past?: boolean }) {
    const canManage = canManageBooking(booking);
    return (
      <div
        style={{
          borderTop: "1px solid var(--line)",
          padding: "1.375rem 0",
          opacity: past ? 0.6 : 1,
        }}
      >
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "0.875rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <p style={{ fontSize: "clamp(16px,1.8vw,20px)", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.03em" }}>
              {formatSlotRange(booking.slots)}
            </p>
            <StatusBadge color={statusColor(booking.status)}>{statusLabel(booking.status)}</StatusBadge>
            <StatusBadge color={booking.paymentStatus === "PAID" ? "var(--accent)" : "#F4D35E"}>
              {booking.paymentStatus === "PAID" ? "Paid" : "Pending"}
            </StatusBadge>
          </div>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: "16px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
            NPR {booking.totalPrice.toLocaleString()}
          </span>
        </div>

        {/* Contact row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", marginBottom: "0.875rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <User size={12} style={{ color: "var(--fg-dim)" }} />
            <span style={{ fontSize: "13px", color: "var(--fg-3)" }}>{booking.user.name}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <Phone size={12} style={{ color: "var(--fg-dim)" }} />
            <span style={{ fontSize: "13px", color: "var(--fg-3)" }}>{booking.user.phone}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <CalendarDays size={12} style={{ color: "var(--fg-dim)" }} />
            <span style={{ fontSize: "13px", color: "var(--fg-3)" }}>{formatDateLabel(booking.bookingDate)}</span>
          </div>
        </div>

        {/* Meta + actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "6px", border: "1px solid var(--line)", color: "var(--fg-dim)" }}>
              {booking.bookingType === "PRIVATE" ? "Private" : "Open"}
            </span>
            <span style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "6px", border: "1px solid var(--line)", color: "var(--fg-dim)" }}>
              {booking.playersCount} players
            </span>
            <span style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "6px", border: "1px solid var(--line)", color: "var(--fg-dim)", fontFamily: "var(--f-mono)" }}>
              {booking.id.slice(0, 10)}
            </span>
          </div>

          {!past && (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {booking.paymentStatus === "PENDING" && canManage ? (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleMarkPaid(booking.id)}
                  disabled={processingId === booking.id}
                >
                  {processingId === booking.id ? "Updating..." : "Mark paid"}
                </button>
              ) : (
                <button className="btn btn-ghost btn-sm" disabled>
                  {booking.paymentStatus === "PAID" ? "Paid" : "Inactive"}
                </button>
              )}
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => handleCancelBooking(booking.id)}
                disabled={!canManage || processingId === booking.id}
                style={{ opacity: !canManage ? 0.4 : 1 }}
              >
                {processingId === booking.id ? "Updating..." : canManage ? "Cancel" : "Inactive"}
              </button>
            </div>
          )}

          {past && booking.paymentStatus === "PENDING" && canManage && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleMarkPaid(booking.id)}
              disabled={processingId === booking.id}
            >
              {processingId === booking.id ? "Updating..." : "Mark paid"}
            </button>
          )}
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Today", value: todaysBookingsCount },
    { label: "Private", value: privateCount },
    { label: "Open", value: openCount },
  ];

  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">

        {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
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
          Bookings.
        </h1>
        <p style={{ marginTop: "1rem", fontSize: "16px", lineHeight: 1.7, color: "var(--fg-3)", maxWidth: "52ch" }}>
          Track, filter, and manage all reservations from one place.
        </p>

        {/* ── STATS STRIP ─────────────────────────────────────────────── */}
        <div
          style={{
            marginTop: "2rem",
            display: "grid",
            gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            marginBottom: "2rem",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: "1rem 0",
                paddingLeft: i === 0 ? 0 : "1.25rem",
                paddingRight: i === stats.length - 1 ? 0 : "1.25rem",
                borderRight: i < stats.length - 1 ? "1px solid var(--line)" : undefined,
              }}
            >
              <span style={{ fontFamily: "var(--f-mono)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-dim)", display: "block", marginBottom: "0.375rem" }}>
                {s.label}
              </span>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: "clamp(24px,2.5vw,36px)", fontWeight: 600, letterSpacing: "-0.04em", color: "var(--fg)", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* ── FEEDBACK ────────────────────────────────────────────────── */}
        {error && (
          <div style={{ marginBottom: "1.5rem" }}>
            <StatePanel
              variant="error"
              eyebrow="Couldn't load bookings"
              title="The booking list is temporarily unavailable"
              text={error}
              actions={
                <button className="btn btn-ghost btn-sm" onClick={() => { setLoading(true); fetchBookings(); }}>
                  Try again
                </button>
              }
            />
          </div>
        )}
        {actionError && (
          <div style={{ marginBottom: "1.25rem", padding: "0.75rem 1rem", borderRadius: "12px", border: "1px solid rgba(255,100,100,0.2)", background: "rgba(255,80,80,0.04)" }}>
            <p style={{ fontSize: "13px", color: "rgba(255,150,150,0.9)", margin: 0 }}>{actionError}</p>
          </div>
        )}
        {actionMessage && (
          <div style={{ marginBottom: "1.25rem", padding: "0.75rem 1rem", borderRadius: "12px", border: "1px solid rgba(184,255,59,0.18)", background: "rgba(184,255,59,0.04)" }}>
            <p style={{ fontSize: "13px", color: "var(--accent)", margin: 0 }}>{actionMessage}</p>
          </div>
        )}

        {/* ── SEARCH + FILTERS ────────────────────────────────────────── */}
        <div style={{ border: "1px solid var(--line)", borderRadius: "16px", background: "var(--bg-soft)", padding: "1.125rem 1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", alignItems: "center" }}>
            {/* Search */}
            <div style={{ position: "relative", flex: "1 1 240px", maxWidth: "360px" }}>
              <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--fg-dim)", pointerEvents: "none" }} />
              <input
                type="text"
                placeholder="Search by name, phone, or ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                  background: "var(--bg)",
                  padding: "0.5rem 0.875rem 0.5rem 2.25rem",
                  fontSize: "13px",
                  color: "var(--fg)",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
              />
            </div>

            {/* Filter pills */}
            <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
              {(["ALL", "PRIVATE", "OPEN"] as const).map((f) => (
                <button key={f} onClick={() => setTypeFilter(f)} style={filterBtnStyle(typeFilter === f)}>
                  {f === "ALL" ? "All types" : f === "PRIVATE" ? "Private" : "Open"}
                </button>
              ))}
              <button
                onClick={() => setDateFilter(dateFilter === "TODAY" ? "ALL" : "TODAY")}
                style={filterBtnStyle(dateFilter === "TODAY")}
              >
                Today
              </button>
            </div>
          </div>
        </div>

        {/* ── BOOKING LIST ────────────────────────────────────────────── */}
        <div style={{ border: "1px solid var(--line)", borderRadius: "20px", background: "var(--bg-soft)", overflow: "hidden" }}>
          <div style={{ padding: "1.375rem 1.75rem", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <span className="eyebrow">Results</span>
              <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--fg)", marginTop: "0.25rem" }}>
                {filteredBookings.length} booking{filteredBookings.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          <div style={{ padding: "0 1.75rem" }}>
            {loading ? (
              <div style={{ padding: "2rem 0" }}>
                <StatePanel
                  variant="loading"
                  title="Checking booking activity"
                  text="Pulling the latest bookings, statuses, and payment state."
                  className="rounded-[20px] p-5 shadow-none"
                />
              </div>
            ) : filteredBookings.length === 0 ? (
              <div style={{ padding: "2rem 0" }}>
                <StatePanel
                  title="No bookings match these filters"
                  text="Try changing the search text or filter pills to widen the booking list."
                  className="rounded-[20px] p-5 shadow-none"
                />
              </div>
            ) : (
              <>
                {activeBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </>
            )}
          </div>

          {/* Finished bookings toggle */}
          {!loading && finishedBookings.length > 0 && (
            <div style={{ borderTop: "1px solid var(--line)" }}>
              <button
                type="button"
                onClick={() => setShowFinishedBookings((prev) => !prev)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.125rem 1.75rem",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div>
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-dim)" }}>
                    Booking history
                  </span>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--fg)", marginTop: "0.25rem" }}>
                    {finishedBookings.length} finished booking{finishedBookings.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <span className="btn-text" style={{ fontSize: "13px" }}>
                  {showFinishedBookings ? "Hide" : "Show"}
                </span>
              </button>

              {showFinishedBookings && (
                <div style={{ padding: "0 1.75rem", borderTop: "1px solid var(--line)" }}>
                  {finishedBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} past />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
