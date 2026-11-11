"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { addDays, format } from "date-fns";
import { useRouter } from "next/navigation";
import StatePanel from "@/components/ui/state-panel";
import { getHourlyRate, type ActivityType } from "@/lib/pricing";
import { getErrorMessage } from "@/lib/utils/error-message";

type BookingSlotApi = {
  id: string;
  slotDate: string;
  startHour: number;
  endHour: number;
  price: number;
  booking: {
    id: string;
    user: { name: string };
  };
};

type SlotBlockApi = {
  id: string;
  blockDate: string;
  startHour: number;
  endHour: number;
  reason: "MAINTENANCE" | "ADMIN_BLOCK" | "PRIVATE_EVENT" | "OTHER";
  note?: string | null;
};

type SlotRow = {
  time: string;
  startHour: number;
  endHour: number;
  price: number;
  status: "available" | "booked" | "blocked";
  customer?: string;
  bookingId?: string;
  slotBlockId?: string;
};

function hourTo12(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const normalized = hour % 12 === 0 ? 12 : hour % 12;
  return `${normalized}:00 ${suffix}`;
}

function slotLabel(startHour: number, endHour: number) {
  return `${hourTo12(startHour)} – ${hourTo12(endHour)}`;
}

function slotStatusColor(status: SlotRow["status"]): string {
  if (status === "available") return "#7EF7C1";
  if (status === "booked") return "var(--accent)";
  return "rgba(255,150,150,0.8)";
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

export default function AdminSlotsPage() {
  const router = useRouter();
  const [activity, setActivity] = useState<ActivityType>("FUTSAL");
  const [courtNumber, setCourtNumber] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState<SlotRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [processingKey, setProcessingKey] = useState("");
  const [bookingSlot, setBookingSlot] = useState<SlotRow | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"PENDING" | "PAID">("PENDING");
  const hourlyRate = getHourlyRate(activity);

  const weekDates = useMemo(() => Array.from({ length: 7 }).map((_, i) => addDays(new Date(), i)), []);
  const targetDate = useMemo(() => format(selectedDate, "yyyy-MM-dd"), [selectedDate]);

  const fetchSlots = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const params = new URLSearchParams({
        date: targetDate,
        activity,
        court: String(courtNumber),
      });
      const res = await fetch(`/api/slots?${params.toString()}`, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load slots");

      const bookingSlots: BookingSlotApi[] = data.bookingSlots || [];
      const blockedSlots: SlotBlockApi[] = data.blockedSlots || [];

      const rows: SlotRow[] = [];
      for (let hour = 6; hour < 22; hour++) {
        const bookingSlot = bookingSlots.find((s) => s.startHour === hour && s.endHour === hour + 1);
        const blockedSlot = blockedSlots.find((s) => s.startHour === hour && s.endHour === hour + 1);

        if (bookingSlot) {
          rows.push({
            time: slotLabel(hour, hour + 1),
            startHour: hour,
            endHour: hour + 1,
            price: bookingSlot.price,
            status: "booked",
            customer: bookingSlot.booking.user.name,
            bookingId: bookingSlot.booking.id,
          });
        } else if (blockedSlot) {
          rows.push({
            time: slotLabel(hour, hour + 1),
            startHour: hour,
            endHour: hour + 1,
            price: hourlyRate,
            status: "blocked",
            customer: blockedSlot.reason,
            slotBlockId: blockedSlot.id,
          });
        } else {
          rows.push({
            time: slotLabel(hour, hour + 1),
            startHour: hour,
            endHour: hour + 1,
            price: hourlyRate,
            status: "available",
          });
        }
      }
      setSlots(rows);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to load slots"));
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }, [targetDate, activity, courtNumber, hourlyRate]);

  useEffect(() => { fetchSlots(); }, [fetchSlots]);

  const handleBlock = async (slot: SlotRow) => {
    try {
      const key = `${slot.startHour}-${slot.endHour}-block`;
      setProcessingKey(key);
      setActionError("");
      setActionMessage("");
      const res = await fetch("/api/slots/block", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blockDate: targetDate,
          startHour: slot.startHour,
          endHour: slot.endHour,
          reason: "ADMIN_BLOCK",
          activity,
          courtNumber,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to block slot");
      setActionMessage(`Blocked ${slot.time}.`);
      await fetchSlots();
    } catch (err: unknown) {
      setActionError(getErrorMessage(err, "Error blocking slot"));
    } finally {
      setProcessingKey("");
    }
  };

  const openBookingForm = (slot: SlotRow) => {
    setBookingSlot(slot);
    setCustomerName("");
    setCustomerPhone("");
    setPaymentStatus("PENDING");
    setActionError("");
  };

  const handleAdminBooking = async () => {
    if (!bookingSlot) return;
    try {
      setProcessingKey(`${bookingSlot.startHour}-${bookingSlot.endHour}-book`);
      setActionError("");
      setActionMessage("");
      const res = await fetch("/api/admin/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customerName,
          phone: customerPhone,
          bookingDate: targetDate,
          startHour: bookingSlot.startHour,
          endHour: bookingSlot.endHour,
          activity,
          courtNumber,
          paymentStatus,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create booking");
      setActionMessage(`Booked ${bookingSlot.time} for ${customerName.trim()}.`);
      setBookingSlot(null);
      await fetchSlots();
    } catch (err: unknown) {
      setActionError(getErrorMessage(err, "Error creating booking"));
    } finally {
      setProcessingKey("");
    }
  };

  const handleUnblock = async (slotBlockId: string) => {
    try {
      setProcessingKey(`${slotBlockId}-unblock`);
      setActionError("");
      setActionMessage("");
      const res = await fetch("/api/slots/unblock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotBlockId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to unblock slot");
      setActionMessage("Slot reopened successfully.");
      await fetchSlots();
    } catch (err: unknown) {
      setActionError(getErrorMessage(err, "Error unblocking slot"));
    } finally {
      setProcessingKey("");
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Cancel this booking?")) return;
    try {
      setProcessingKey(`${bookingId}-cancel`);
      setActionError("");
      setActionMessage("");
      const res = await fetch("/api/bookings/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to cancel booking");
      setActionMessage("Booking cancelled and slot reopened.");
      await fetchSlots();
    } catch (err: unknown) {
      setActionError(getErrorMessage(err, "Error cancelling booking"));
    } finally {
      setProcessingKey("");
    }
  };

  const availableCount = slots.filter((s) => s.status === "available").length;
  const bookedCount = slots.filter((s) => s.status === "booked").length;
  const blockedCount = slots.filter((s) => s.status === "blocked").length;

  const stats = [
    { label: "Available", value: availableCount, color: "#7EF7C1" },
    { label: "Booked", value: bookedCount, color: "var(--accent)" },
    { label: "Blocked", value: blockedCount, color: "rgba(255,150,150,0.8)" },
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
          Slots.
        </h1>
        <p style={{ marginTop: "1rem", fontSize: "16px", lineHeight: 1.7, color: "var(--fg-3)", maxWidth: "52ch" }}>
          Manage futsal and both pickleball courts, create customer bookings, or block unavailable time.
        </p>

        <div className="mt-8 rounded-[20px] border border-white/10 bg-white/[0.025] p-3 sm:p-4">
          <span className="eyebrow">Activity and court</span>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {[
              { activity: "FUTSAL" as const, court: 1, label: "Futsal" },
              { activity: "PICKLEBALL" as const, court: 1, label: "Pickleball · Court 1" },
              { activity: "PICKLEBALL" as const, court: 2, label: "Pickleball · Court 2" },
            ].map((option) => {
              const active = activity === option.activity && courtNumber === option.court;
              return (
                <button
                  key={`${option.activity}-${option.court}`}
                  type="button"
                  onClick={() => {
                    setActivity(option.activity);
                    setCourtNumber(option.court);
                    setActionMessage("");
                    setActionError("");
                  }}
                  className={`rounded-[16px] border px-4 py-3 text-left text-sm font-medium transition ${active ? "border-[#B8FF3B] bg-[#B8FF3B]/10 text-[#B8FF3B]" : "border-white/10 bg-white/[0.025] text-[#94A3B8] hover:border-white/20 hover:text-white"}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── DAY PICKER ──────────────────────────────────────────────── */}
        <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.5rem" }}>
          {weekDates.map((date) => {
            const isActive = format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
            return (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() => setSelectedDate(date)}
                style={{
                  borderRadius: "14px",
                  border: `1px solid ${isActive ? "var(--accent)" : "var(--line)"}`,
                  background: isActive ? "var(--accent)" : "var(--bg-soft)",
                  color: isActive ? "#000" : "var(--fg)",
                  padding: "0.625rem 0.25rem",
                  cursor: "pointer",
                  transition: "all .15s",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "10px", fontFamily: "var(--f-mono)", letterSpacing: "0.06em", textTransform: "uppercase", opacity: isActive ? 0.7 : 1 }}>
                  {format(date, "EEE")}
                </div>
                <div style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2, marginTop: "0.2rem" }}>
                  {format(date, "d")}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── STATS STRIP ─────────────────────────────────────────────── */}
        <div
          style={{
            marginTop: "2rem",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
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
              <span style={{ fontFamily: "var(--f-mono)", fontSize: "clamp(24px,2.5vw,36px)", fontWeight: 600, letterSpacing: "-0.04em", color: s.color, lineHeight: 1 }}>
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
              eyebrow="Couldn't load slots"
              title="The slot board didn't load correctly"
              text={error}
              actions={
                <button className="btn btn-ghost btn-sm" onClick={() => fetchSlots()}>
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

        {/* ── SLOT LIST ───────────────────────────────────────────────── */}
        <div style={{ border: "1px solid var(--line)", borderRadius: "20px", background: "var(--bg-soft)", overflow: "hidden" }}>
          <div style={{ padding: "1.375rem 1.75rem", borderBottom: "1px solid var(--line)" }}>
            <span className="eyebrow">Schedule</span>
            <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--fg)", marginTop: "0.25rem" }}>
              {format(selectedDate, "EEEE, MMMM d")}
              <span style={{ color: "var(--accent)", marginLeft: "0.5rem" }}>
                · {activity === "PICKLEBALL" ? `Pickleball Court ${courtNumber}` : "Futsal"}
              </span>
            </p>
          </div>

          <div style={{ padding: "0 1.75rem" }}>
            {loading ? (
              <div style={{ padding: "2rem 0" }}>
                <StatePanel
                  variant="loading"
                  title="Building the slot board"
                  text="Checking booked, blocked, and available time for the selected day."
                  className="rounded-[20px] p-5 shadow-none"
                />
              </div>
            ) : (
              slots.map((slot) => (
                <div
                  key={`${targetDate}-${slot.startHour}-${slot.endHour}`}
                  style={{ borderTop: "1px solid var(--line)", padding: "1.25rem 0" }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                    {/* Left: time + status + info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.625rem" }}>
                        <p style={{ fontSize: "clamp(16px,1.8vw,20px)", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.03em" }}>
                          {slot.time}
                        </p>
                        <StatusBadge color={slotStatusColor(slot.status)}>
                          {slot.status === "available" ? "Available" : slot.status === "booked" ? "Booked" : "Blocked"}
                        </StatusBadge>
                      </div>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
                        <div>
                          <span style={{ fontFamily: "var(--f-mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-dim)", display: "block" }}>
                            Rate
                          </span>
                          <span style={{ fontSize: "13px", color: "var(--fg-3)", marginTop: 2, display: "block", fontVariantNumeric: "tabular-nums" }}>
                            NPR {slot.price.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span style={{ fontFamily: "var(--f-mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-dim)", display: "block" }}>
                            {slot.status === "booked" ? "Customer" : slot.status === "blocked" ? "Reason" : "Status"}
                          </span>
                          <span style={{ fontSize: "13px", color: "var(--fg-3)", marginTop: 2, display: "block" }}>
                            {slot.customer || "Open for booking"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: actions */}
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignSelf: "flex-start" }}>
                      {slot.status === "available" && (
                        <>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => openBookingForm(slot)}
                          >
                            Book for customer
                          </button>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleBlock(slot)}
                            disabled={processingKey === `${slot.startHour}-${slot.endHour}-block`}
                          >
                            {processingKey === `${slot.startHour}-${slot.endHour}-block` ? "Blocking..." : "Block slot"}
                          </button>
                        </>
                      )}

                      {slot.status === "booked" && (
                        <>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() =>
                              slot.bookingId &&
                              router.push(`/admin/bookings?search=${encodeURIComponent(slot.bookingId)}`)
                            }
                            disabled={!slot.bookingId}
                          >
                            View booking
                          </button>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => slot.bookingId && handleCancelBooking(slot.bookingId)}
                            disabled={!slot.bookingId || processingKey === `${slot.bookingId}-cancel`}
                          >
                            {processingKey === `${slot.bookingId}-cancel` ? "Cancelling..." : "Cancel"}
                          </button>
                        </>
                      )}

                      {slot.status === "blocked" && slot.slotBlockId && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleUnblock(slot.slotBlockId!)}
                          disabled={processingKey === `${slot.slotBlockId}-unblock`}
                        >
                          {processingKey === `${slot.slotBlockId}-unblock` ? "Unblocking..." : "Unblock slot"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Notes footer */}
          <div style={{ borderTop: "1px solid var(--line)", padding: "1.25rem 1.75rem" }}>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-dim)", display: "block", marginBottom: "0.625rem" }}>
              Notes
            </span>
            <p style={{ fontSize: "12px", color: "var(--fg-dim)", lineHeight: 1.65 }}>
              Blocked slots are reserved for maintenance or admin closure. Booked slots cannot be blocked until the booking is cancelled first.
            </p>
          </div>
        </div>

      </section>

      {bookingSlot && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={(event) => { if (event.currentTarget === event.target) setBookingSlot(null); }}>
          <div role="dialog" aria-modal="true" aria-labelledby="admin-booking-title" className="w-full max-w-lg rounded-[26px] border border-white/10 bg-[#10161D] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.55)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="eyebrow">Venue booking</span>
                <h2 id="admin-booking-title" className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white">Book for a customer</h2>
                <p className="mt-2 text-sm leading-6 text-[#94A3B8]">
                  {activity === "PICKLEBALL" ? `Pickleball Court ${courtNumber}` : "Futsal"} · {format(selectedDate, "EEE, MMM d")} · {bookingSlot.time}
                </p>
              </div>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setBookingSlot(null)}>Close</button>
            </div>

            <div className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm text-[#AAB4C3]">
                Customer name
                <input autoFocus value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Full name" className="rounded-[14px] border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none transition focus:border-[#B8FF3B]" />
              </label>
              <label className="grid gap-2 text-sm text-[#AAB4C3]">
                Phone number
                <input type="tel" value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} placeholder="98XXXXXXXX" className="rounded-[14px] border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none transition focus:border-[#B8FF3B]" />
              </label>
              <div>
                <span className="text-sm text-[#AAB4C3]">Payment</span>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(["PENDING", "PAID"] as const).map((status) => (
                    <button key={status} type="button" onClick={() => setPaymentStatus(status)} className={`rounded-[14px] border px-4 py-3 text-sm transition ${paymentStatus === status ? "border-[#B8FF3B] bg-[#B8FF3B]/10 text-[#B8FF3B]" : "border-white/10 text-[#94A3B8]"}`}>
                      {status === "PAID" ? "Already paid" : "Pay at venue"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {actionError && <p className="mt-4 rounded-[14px] border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300">{actionError}</p>}

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.14em] text-[#6F7D90]">Total</span>
                <strong className="mt-1 block text-xl text-white">NPR {hourlyRate.toLocaleString()}</strong>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAdminBooking}
                disabled={!customerName.trim() || !customerPhone.trim() || processingKey.endsWith("-book")}
              >
                {processingKey.endsWith("-book") ? "Booking..." : "Confirm booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
