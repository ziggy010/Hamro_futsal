"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { addDays, format } from "date-fns";
import Link from "next/link";
import { CalendarDays, ChevronRight, Clock3, Lock } from "lucide-react";
import Button from "@/components/ui/button";
import StatePanel from "@/components/ui/state-panel";
import { getErrorMessage } from "@/lib/utils/error-message";

type BookingSlotApi = {
  id: string;
  slotDate: string;
  startHour: number;
  endHour: number;
  price: number;
  booking: {
    id: string;
    bookingType: "PRIVATE" | "OPEN";
    user: {
      name: string;
    };
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
  bookingType?: "Private" | "Open";
  customer?: string;
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

function priceForHour(hour: number) {
  if (hour < 10) return 800;
  if (hour < 17) return 1000;
  return 1200;
}

function statusClasses(status: SlotRow["status"]) {
  if (status === "available") {
    return "border-[#1E4D33] bg-[#10261B] text-[#7EF7C1]";
  }

  if (status === "booked") {
    return "border-[#476B0D] bg-[#22310D] text-[#B8FF3B]";
  }

  return "border-[#4D2A2F] bg-[#241519] text-[#FF9999]";
}

export default function AdminSlotsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState<SlotRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => addDays(new Date(), i));
  }, []);

  const targetDate = useMemo(() => {
    return format(selectedDate, "yyyy-MM-dd");
  }, [selectedDate]);

  const fetchSlots = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`/api/slots?date=${targetDate}`, {
        cache: "no-store",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to load slots");
      }

      const bookingSlots: BookingSlotApi[] = data.bookingSlots || [];
      const blockedSlots: SlotBlockApi[] = data.blockedSlots || [];

      const rows: SlotRow[] = [];

      for (let hour = 7; hour < 22; hour++) {
        const bookingSlot = bookingSlots.find(
          (slot) => slot.startHour === hour && slot.endHour === hour + 1,
        );

        const blockedSlot = blockedSlots.find(
          (slot) => slot.startHour === hour && slot.endHour === hour + 1,
        );

        if (bookingSlot) {
          rows.push({
            time: slotLabel(hour, hour + 1),
            startHour: hour,
            endHour: hour + 1,
            price: bookingSlot.price,
            status: "booked",
            bookingType:
              bookingSlot.booking.bookingType === "PRIVATE"
                ? "Private"
                : "Open",
            customer: bookingSlot.booking.user.name,
          });
        } else if (blockedSlot) {
          rows.push({
            time: slotLabel(hour, hour + 1),
            startHour: hour,
            endHour: hour + 1,
            price: priceForHour(hour),
            status: "blocked",
            customer: blockedSlot.reason,
            slotBlockId: blockedSlot.id,
          });
        } else {
          rows.push({
            time: slotLabel(hour, hour + 1),
            startHour: hour,
            endHour: hour + 1,
            price: priceForHour(hour),
            status: "available",
          });
        }
      }

      setSlots(rows);
    } catch (error: unknown) {
      setError(getErrorMessage(error, "Failed to load slots"));
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }, [targetDate]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const handleBlock = async (slot: SlotRow) => {
    try {
      const res = await fetch("/api/slots/block", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blockDate: targetDate,
          startHour: slot.startHour,
          endHour: slot.endHour,
          reason: "ADMIN_BLOCK",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to block slot");
      }

      fetchSlots();
    } catch (error: unknown) {
      alert(getErrorMessage(error, "Error blocking slot"));
    }
  };

  const handleUnblock = async (slotBlockId: string) => {
    try {
      const res = await fetch("/api/slots/unblock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slotBlockId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to unblock slot");
      }

      fetchSlots();
    } catch (error: unknown) {
      alert(getErrorMessage(error, "Error unblocking slot"));
    }
  };

  const availableCount = slots.filter(
    (slot) => slot.status === "available",
  ).length;
  const bookedCount = slots.filter((slot) => slot.status === "booked").length;
  const blockedCount = slots.filter((slot) => slot.status === "blocked").length;

  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-[#B8FF3B]">
            Admin
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
            Slots
          </h1>
          <p className="mt-2 text-[#94A3B8]">
            Manage availability, block time, and control the weekly schedule.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
          {weekDates.map((date) => {
            const isActive =
              format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

            return (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={`rounded-[16px] border px-3 py-3 text-sm transition ${
                  isActive
                    ? "border-[#B8FF3B] bg-[#B8FF3B] text-black"
                    : "border-white/10 bg-white/[0.04] text-white"
                }`}
              >
                <div className="text-xs">{format(date, "EEE")}</div>
                <div className="text-lg font-semibold">{format(date, "d")}</div>
              </button>
            );
          })}
        </div>

        {error && (
          <div className="mb-6">
            <StatePanel
              variant="error"
              eyebrow="Couldn’t load slots"
              title="The slot board didn’t load correctly"
              text={error}
              actions={
                <Button
                  variant="secondary"
                  className="rounded-[999px]"
                  onClick={() => fetchSlots()}
                >
                  Try Again
                </Button>
              }
            />
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div className="space-y-4">
              {loading ? (
                <StatePanel
                  variant="loading"
                  eyebrow="Loading"
                  title="Building the slot board"
                  text="We’re checking booked, blocked, and available time for the selected day."
                />
              ) : (
                slots.map((slot) => (
                  <div
                    key={`${targetDate}-${slot.startHour}-${slot.endHour}`}
                    className="card-strong p-5 transition-all duration-300 hover:border-white/14"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-lg font-semibold tracking-[-0.02em] text-white">
                            {slot.time}
                          </p>
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs ${statusClasses(
                              slot.status,
                            )}`}
                          >
                            {slot.status === "available"
                              ? "Available"
                              : slot.status === "booked"
                                ? "Booked"
                                : "Blocked"}
                          </span>

                          {slot.bookingType && (
                            <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[#D7DEE7]">
                              {slot.bookingType}
                            </span>
                          )}
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                          <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                            <Clock3 size={15} className="text-[#B8FF3B]" />
                            <span className="text-white">NPR {slot.price}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                            <Lock size={15} className="text-[#B8FF3B]" />
                            <span className="text-white">
                              {slot.customer || "No customer assigned"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                            <CalendarDays
                              size={15}
                              className="text-[#B8FF3B]"
                            />
                            <span className="text-white">
                              {format(selectedDate, "EEEE, MMM d")}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex w-full flex-col gap-3 lg:w-auto lg:min-w-[220px]">
                        {slot.status === "available" && (
                          <Button
                            variant="secondary"
                            className="rounded-[16px] px-4"
                            onClick={() => handleBlock(slot)}
                          >
                            Block Slot
                          </Button>
                        )}

                        {slot.status === "booked" && (
                          <>
                            <Button className="rounded-[16px] px-4">
                              View Booking
                            </Button>
                            <Button
                              variant="secondary"
                              className="rounded-[16px] px-4"
                            >
                              Cancel Booking
                            </Button>
                          </>
                        )}

                        {slot.status === "blocked" && slot.slotBlockId && (
                          <Button
                            className="rounded-[16px] px-4"
                            onClick={() => handleUnblock(slot.slotBlockId!)}
                          >
                            Unblock Slot
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-strong p-5">
              <p className="text-lg font-semibold text-white">Quick stats</p>

              <div className="mt-4 space-y-3">
                <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-sm text-[#94A3B8]">Available slots</p>
                  <p className="mt-1 text-2xl font-semibold text-white">
                    {availableCount}
                  </p>
                </div>

                <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-sm text-[#94A3B8]">Booked slots</p>
                  <p className="mt-1 text-2xl font-semibold text-white">
                    {bookedCount}
                  </p>
                </div>

                <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-sm text-[#94A3B8]">Blocked slots</p>
                  <p className="mt-1 text-2xl font-semibold text-white">
                    {blockedCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="card-strong p-5">
              <p className="text-lg font-semibold text-white">Admin links</p>

              <div className="mt-4 space-y-2">
                <Link
                  href="/admin"
                  className="flex items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:border-white/14"
                >
                  Dashboard
                  <ChevronRight size={16} className="text-[#94A3B8]" />
                </Link>

                <Link
                  href="/admin/bookings"
                  className="flex items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:border-white/14"
                >
                  Bookings
                  <ChevronRight size={16} className="text-[#94A3B8]" />
                </Link>

                <Link
                  href="/admin/open-games"
                  className="flex items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:border-white/14"
                >
                  Open Games
                  <ChevronRight size={16} className="text-[#94A3B8]" />
                </Link>

                <Link
                  href="/admin/sales"
                  className="flex items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:border-white/14"
                >
                  Sales
                  <ChevronRight size={16} className="text-[#94A3B8]" />
                </Link>
              </div>
            </div>

            <div className="card-strong p-5">
              <p className="text-lg font-semibold text-white">Notes</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-sm leading-6 text-[#94A3B8]">
                    Blocked slots are reserved for maintenance or admin-only
                    closure.
                  </p>
                </div>
                <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-sm leading-6 text-[#94A3B8]">
                    Booked slots cannot be blocked until the booking is
                    cancelled.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
