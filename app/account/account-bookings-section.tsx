"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import StatePanel from "@/components/ui/state-panel";
import { getErrorMessage } from "@/lib/utils/error-message";

type Slot = {
  id: string;
  startHour: number;
  endHour: number;
  price: number;
};

type Booking = {
  id: string;
  bookingType: "PRIVATE" | "OPEN";
  status: string;
  paymentStatus: "PENDING" | "PAID";
  bookingDate: string | Date;
  playersCount: number;
  totalPrice: number;
  slots: Slot[];
};

function hourTo12(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const normalized = hour % 12 === 0 ? 12 : hour % 12;
  return `${normalized}:00 ${suffix}`;
}

function formatSlotRange(slots: Slot[]) {
  if (!slots.length) return "Time unavailable";
  const sorted = [...slots].sort((a, b) => a.startHour - b.startHour);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  return `${hourTo12(first.startHour)} – ${hourTo12(last.endHour)}`;
}

function statusLabel(status: string) {
  if (status === "PRIVATE_CONFIRMED") return "Confirmed";
  if (status === "OPEN_PENDING_FILL") return "Waiting for players";
  if (status === "OPEN_CONFIRMED") return "Confirmed";
  if (status === "OPEN_EXPIRED") return "Expired";
  if (status === "CANCELLED") return "Cancelled";
  return status;
}

function paymentLabel(ps: "PENDING" | "PAID") {
  return ps === "PAID" ? "Paid" : "Pay at venue";
}

function statusColor(status: string) {
  if (status === "PRIVATE_CONFIRMED" || status === "OPEN_CONFIRMED") return "var(--accent)";
  if (status === "OPEN_PENDING_FILL") return "#F4D35E";
  return "rgba(255,150,150,0.8)";
}

function canCancelBooking(booking: Booking) {
  if (booking.status === "CANCELLED" || booking.status === "OPEN_EXPIRED" || booking.slots.length === 0)
    return false;
  const earliestStartHour = Math.min(...booking.slots.map((s) => s.startHour));
  const gameStart = new Date(booking.bookingDate);
  gameStart.setHours(earliestStartHour, 0, 0, 0);
  return gameStart.getTime() - Date.now() > 5 * 60 * 60 * 1000;
}

function hasBookingEnded(booking: Booking) {
  if (booking.slots.length === 0) return true;
  const latestEndHour = Math.max(...booking.slots.map((s) => s.endHour));
  const gameEnd = new Date(booking.bookingDate);
  gameEnd.setHours(latestEndHour, 0, 0, 0);
  return gameEnd <= new Date();
}

function BookingRow({ booking, past, onCancel, cancelling }: {
  booking: Booking;
  past?: boolean;
  onCancel?: (id: string) => void;
  cancelling?: string;
}) {
  const canCancel = !past && onCancel && canCancelBooking(booking);

  return (
    <div
      style={{
        borderTop: "1px solid var(--line)",
        padding: "1.375rem 0",
        opacity: past ? 0.65 : 1,
      }}
    >
      {/* Top row: date badge + status pills */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "0.875rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <CalendarDays size={13} style={{ color: "var(--fg-dim)" }} />
          <span style={{ fontFamily: "var(--f-mono)", fontSize: "11px", color: "var(--fg-dim)", letterSpacing: "0.06em" }}>
            {format(new Date(booking.bookingDate), "EEE, MMM d")}
          </span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              padding: "3px 10px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.1)",
              color: statusColor(booking.status),
            }}
          >
            {statusLabel(booking.status)}
          </span>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              padding: "3px 10px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.1)",
              color: booking.paymentStatus === "PAID" ? "var(--accent)" : "#F4D35E",
            }}
          >
            {paymentLabel(booking.paymentStatus)}
          </span>
        </div>
      </div>

      {/* Time — large */}
      <p style={{ fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 600, letterSpacing: "-0.04em", color: "var(--fg)", fontFamily: "var(--f-sans)" }}>
        {formatSlotRange(booking.slots)}
      </p>

      {/* Meta row */}
      <div
        style={{
          marginTop: "0.875rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          paddingTop: "0.875rem",
          borderTop: "1px solid var(--line-soft, rgba(255,255,255,0.06))",
        }}
      >
        <div>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--fg-dim)", display: "block" }}>Type</span>
          <span style={{ fontSize: "13px", color: "var(--fg-3)", marginTop: 3, display: "block" }}>
            {booking.bookingType === "PRIVATE" ? "Private" : "Open"}
          </span>
        </div>
        <div>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--fg-dim)", display: "block" }}>Players</span>
          <span style={{ fontSize: "13px", color: "var(--fg-3)", marginTop: 3, display: "block" }}>{booking.playersCount}</span>
        </div>
        <div>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--fg-dim)", display: "block" }}>Total</span>
          <span style={{ fontSize: "13px", color: "var(--fg-3)", marginTop: 3, display: "block", fontVariantNumeric: "tabular-nums" }}>
            NPR {booking.totalPrice.toLocaleString()}
          </span>
        </div>
        {!past && (
          <div>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--fg-dim)", display: "block" }}>Cancel window</span>
            <span style={{ fontSize: "13px", color: canCancelBooking(booking) ? "var(--fg-3)" : "rgba(255,150,150,0.7)", marginTop: 3, display: "block" }}>
              {canCancelBooking(booking) ? "Still open" : "Locked"}
            </span>
          </div>
        )}

        {/* Cancel action */}
        {!past && onCancel && (
          <div style={{ marginLeft: "auto", alignSelf: "flex-end" }}>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => onCancel(booking.id)}
              disabled={!canCancel || cancelling === booking.id}
              style={{ opacity: !canCancel ? 0.4 : 1 }}
            >
              {cancelling === booking.id ? "Cancelling..." : "Cancel"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AccountBookingsSection({
  initialBookings,
}: {
  initialBookings: Booking[];
}) {
  const [bookings, setBookings] = useState(
    initialBookings.filter(
      (b) => b.status !== "CANCELLED" && b.status !== "OPEN_EXPIRED",
    ),
  );
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState("");

  const activeBookings = bookings.filter((b) => !hasBookingEnded(b));
  const pastBookings = bookings.filter((b) => hasBookingEnded(b));

  const handleCancel = async (bookingId: string) => {
    const confirmed = window.confirm("Cancel this booking? This will free the slot for others.");
    if (!confirmed) return;

    try {
      setCancellingId(bookingId);
      setError("");

      const res = await fetch("/api/bookings/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to cancel booking");

      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Something went wrong."));
    } finally {
      setCancellingId("");
    }
  };

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
          <span className="eyebrow">My bookings</span>
          <p style={{ fontSize: "18px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.03em", marginTop: "0.375rem" }}>
            Reserved slots
          </p>
          <p style={{ fontSize: "13px", color: "var(--fg-3)", marginTop: 4, lineHeight: 1.5 }}>
            Cancellations are available up until 5 hours before the game starts.
          </p>
        </div>
        <div>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--fg-dim)", display: "block" }}>Active</span>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: "32px", fontWeight: 600, letterSpacing: "-0.04em", color: "var(--fg)", lineHeight: 1 }}>
            {activeBookings.length}
          </span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ padding: "1rem 1.75rem", borderBottom: "1px solid var(--line)" }}>
          <div style={{ padding: "0.75rem 1rem", borderRadius: "12px", border: "1px solid rgba(255,100,100,0.22)", background: "rgba(255,80,80,0.05)" }}>
            <p style={{ fontSize: "13px", color: "rgba(255,150,150,0.9)", margin: 0 }}>{error}</p>
          </div>
        </div>
      )}

      {/* Active bookings */}
      <div style={{ padding: "0 1.75rem" }}>
        {activeBookings.length === 0 ? (
          <div style={{ padding: "2.5rem 0" }}>
            <StatePanel
              eyebrow="No active bookings"
              title="Your next booking will show up here"
              text="Reserve a slot and it will appear here with date, type, payment status, and cancellation options."
              className="rounded-[20px] p-5 shadow-none"
            />
          </div>
        ) : (
          activeBookings.map((booking) => (
            <BookingRow
              key={booking.id}
              booking={booking}
              onCancel={handleCancel}
              cancelling={cancellingId}
            />
          ))
        )}
      </div>

      {/* Past bookings */}
      {pastBookings.length > 0 && (
        <div style={{ borderTop: "1px solid var(--line)" }}>
          <div style={{ padding: "1.375rem 1.75rem", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
            <div>
              <span className="eyebrow">Booking history</span>
              <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.02em", marginTop: "0.375rem" }}>Past bookings</p>
            </div>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: "26px", fontWeight: 600, letterSpacing: "-0.04em", color: "var(--fg-dim)" }}>
              {pastBookings.length}
            </span>
          </div>
          <div style={{ padding: "0 1.75rem" }}>
            {pastBookings.map((booking) => (
              <BookingRow key={booking.id} booking={booking} past />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
