"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarDays, Clock3, Wallet } from "lucide-react";
import Button from "@/components/ui/button";
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

  return `${hourTo12(first.startHour)} - ${hourTo12(last.endHour)}`;
}

function statusClasses(status: string) {
  if (status === "PRIVATE_CONFIRMED" || status === "OPEN_CONFIRMED") {
    return "border-[#1E4D33] bg-[#10261B] text-[#7EF7C1]";
  }

  if (status === "OPEN_PENDING_FILL") {
    return "border-[#6C5A14] bg-[#2B2411] text-[#F4D35E]";
  }

  return "border-[#4D2A2F] bg-[#241519] text-[#FF9999]";
}

function paymentClasses(paymentStatus: "PENDING" | "PAID") {
  if (paymentStatus === "PAID") {
    return "border-[#1E4D33] bg-[#10261B] text-[#7EF7C1]";
  }

  return "border-[#6C5A14] bg-[#2B2411] text-[#F4D35E]";
}

function statusLabel(status: string) {
  if (status === "PRIVATE_CONFIRMED") return "Confirmed";
  if (status === "OPEN_PENDING_FILL") return "Waiting for players";
  if (status === "OPEN_CONFIRMED") return "Confirmed";
  if (status === "OPEN_EXPIRED") return "Expired";
  if (status === "CANCELLED") return "Cancelled";
  return status;
}

function paymentLabel(paymentStatus: "PENDING" | "PAID") {
  if (paymentStatus === "PAID") return "Paid";
  return "Pay at venue";
}

function canCancelBooking(booking: Booking) {
  if (
    booking.status === "CANCELLED" ||
    booking.status === "OPEN_EXPIRED" ||
    booking.slots.length === 0
  ) {
    return false;
  }

  const earliestStartHour = Math.min(
    ...booking.slots.map((slot) => slot.startHour),
  );
  const gameStart = new Date(booking.bookingDate);
  gameStart.setHours(earliestStartHour, 0, 0, 0);

  return gameStart.getTime() - Date.now() > 5 * 60 * 60 * 1000;
}

export default function AccountBookingsSection({
  initialBookings,
}: {
  initialBookings: Booking[];
}) {
  const [bookings, setBookings] = useState(
    initialBookings.filter(
      (booking) =>
        booking.status !== "CANCELLED" && booking.status !== "OPEN_EXPIRED",
    ),
  );
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState("");

  const handleCancel = async (bookingId: string) => {
    const confirmed = window.confirm(
      "Cancel this booking? This will free the slot for others.",
    );

    if (!confirmed) return;

    try {
      setCancellingId(bookingId);
      setError("");

      const res = await fetch("/api/bookings/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to cancel booking");
      }

      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Something went wrong"));
    } finally {
      setCancellingId("");
    }
  };

  return (
    <div className="rounded-[30px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] md:p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-[#B8FF3B]">
            My bookings
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            Reserved slots
          </p>
          <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
            You can cancel active bookings only when the game is still more
            than 5 hours away.
          </p>
        </div>

        <div className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3">
          <p className="text-sm text-[#94A3B8]">Active bookings</p>
          <p className="mt-1 text-lg font-semibold text-white">
            {bookings.length}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4">
          <StatePanel
            variant="error"
            eyebrow="Couldn’t update booking"
            title="That cancellation didn’t go through"
            text={error}
            className="rounded-[24px] p-4 shadow-none"
          />
        </div>
      )}

      {bookings.length === 0 ? (
        <StatePanel
          eyebrow="No active bookings"
          title="Your next booking will show up here"
          text="When you reserve a slot, this section will show the date, booking type, payment status, and whether cancellation is still available."
          className="rounded-[24px] p-5 shadow-none"
        />
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const canCancel = canCancelBooking(booking);

            return (
              <div
                key={booking.id}
                className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-[#C9D2DC]">
                      <CalendarDays size={13} className="text-[#B8FF3B]" />
                      {format(new Date(booking.bookingDate), "EEEE, MMM d")}
                    </div>

                    <p className="mt-4 text-[1.4rem] font-semibold tracking-[-0.03em] text-white">
                      {formatSlotRange(booking.slots)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs ${statusClasses(
                        booking.status,
                      )}`}
                    >
                      {statusLabel(booking.status)}
                    </span>

                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs ${paymentClasses(
                        booking.paymentStatus,
                      )}`}
                    >
                      {paymentLabel(booking.paymentStatus)}
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[20px] border border-white/10 bg-[#121821] px-4 py-3">
                    <p className="text-sm text-[#94A3B8]">Type</p>
                    <p className="mt-1 text-white">
                      {booking.bookingType === "PRIVATE"
                        ? "Private Game"
                        : "Open Game"}
                    </p>
                  </div>

                  <div className="rounded-[20px] border border-white/10 bg-[#121821] px-4 py-3">
                    <p className="text-sm text-[#94A3B8]">Players</p>
                    <p className="mt-1 text-white">{booking.playersCount}</p>
                  </div>

                  <div className="rounded-[20px] border border-white/10 bg-[#121821] px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                      <Clock3 size={13} className="text-[#B8FF3B]" />
                      Cancellation
                    </div>
                    <p className="mt-1 text-white">
                      {canCancel ? "Still open" : "5-hour lock window"}
                    </p>
                  </div>

                  <div className="rounded-[20px] border border-white/10 bg-[#121821] px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                      <Wallet size={13} className="text-[#B8FF3B]" />
                      Total
                    </div>
                    <p className="mt-1 text-white">NPR {booking.totalPrice}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-[#94A3B8]">
                    {canCancel
                      ? "You can still cancel this booking."
                      : "This booking is inside the 5-hour lock window."}
                  </p>

                  <Button
                    variant="secondary"
                    className="rounded-[14px]"
                    onClick={() => handleCancel(booking.id)}
                    disabled={!canCancel || cancellingId === booking.id}
                  >
                    {cancellingId === booking.id
                      ? "Cancelling..."
                      : "Cancel Booking"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
