"use client";

import { useEffect, useMemo, useState } from "react";
import { addDays, format } from "date-fns";
import { useRouter } from "next/navigation";
import { CalendarDays, ChevronDown, ChevronUp } from "lucide-react";
import Button from "@/components/ui/button";
import BookingProgress from "@/components/ui/booking-progress";
import FadeIn from "@/components/ui/fade-in";
import SectionHeading from "@/components/ui/section-heading";
import StatePanel from "@/components/ui/state-panel";
import { getErrorMessage } from "@/lib/utils/error-message";

type SlotGroup = "Morning" | "Day" | "Evening";

type Slot = {
  time24: string;
  price: number;
  status: "available" | "booked" | "blocked";
  group: SlotGroup;
};

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

function slotGroupFromHour(hour: number): SlotGroup {
  if (hour < 10) return "Morning";
  if (hour < 17) return "Day";
  return "Evening";
}

function priceForHour(hour: number) {
  if (hour < 10) return 800;
  if (hour < 17) return 1000;
  return 1200;
}

function hasSlotStarted(targetDate: Date, startHour: number, now = new Date()) {
  const slotStart = new Date(targetDate);
  slotStart.setHours(startHour, 0, 0, 0);
  return slotStart <= now;
}

function buildSlotsFromApi(data: {
  bookingSlots: BookingSlotApi[];
  blockedSlots: SlotBlockApi[];
}, targetDate: Date) {
  const nextSlots: Slot[] = [];

  for (let hour = 7; hour < 22; hour++) {
    if (hasSlotStarted(targetDate, hour)) {
      continue;
    }

    const isBooked = data.bookingSlots.some(
      (slot) => slot.startHour === hour && slot.endHour === hour + 1,
    );

    const isBlocked = data.blockedSlots.some(
      (slot) => slot.startHour === hour && slot.endHour === hour + 1,
    );

    nextSlots.push({
      time24: time24Range(hour, hour + 1),
      price: priceForHour(hour),
      status: isBooked ? "booked" : isBlocked ? "blocked" : "available",
      group: slotGroupFromHour(hour),
    });
  }

  return nextSlots;
}

function hourLabel(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`;
}

function time24Range(startHour: number, endHour: number) {
  return `${hourLabel(startHour)} - ${hourLabel(endHour)}`;
}

function to12HourRange(time24: string) {
  const [start, end] = time24.split(" - ");

  const convert = (value: string) => {
    const [hourStr, minute] = value.split(":");
    const hour = Number(hourStr);
    const suffix = hour >= 12 ? "PM" : "AM";
    const normalizedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${normalizedHour}:${minute} ${suffix}`;
  };

  return `${convert(start)} - ${convert(end)}`;
}

export default function BookingPage() {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [openGroup, setOpenGroup] = useState<SlotGroup>("Evening");
  const slotGroups: SlotGroup[] = ["Morning", "Day", "Evening"];
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [slotsError, setSlotsError] = useState("");
  const [slotsByDate, setSlotsByDate] = useState<Record<string, Slot[]>>({});

  const dates = useMemo(
    () => Array.from({ length: 7 }).map((_, i) => addDays(new Date(), i)),
    [],
  );

  const fetchSlotsForDate = async (date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    const res = await fetch(`/api/slots?date=${dateKey}`, {
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || "Failed to load slots");
    }

    return buildSlotsFromApi(
      {
        bookingSlots: data.bookingSlots || [],
        blockedSlots: data.blockedSlots || [],
      },
      date,
    );
  };

  useEffect(() => {
    const loadCurrentDate = async (shouldResetSelection = true) => {
      const dateKey = format(selectedDate, "yyyy-MM-dd");

      try {
        setSlotsError("");

        const fetchedSlots = await fetchSlotsForDate(selectedDate);

        setSlotsByDate((prev) => ({
          ...prev,
          [dateKey]: fetchedSlots,
        }));

        setSlots(fetchedSlots);

        if (shouldResetSelection) {
          setSelectedSlots([]);
          return;
        }

        setSelectedSlots((prev) =>
          prev.filter((selectedTime) =>
            fetchedSlots.some(
              (slot) =>
                slot.time24 === selectedTime && slot.status === "available",
            ),
          ),
        );
      } catch (error: unknown) {
        setSlotsError(getErrorMessage(error, "Failed to load slots"));
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    setLoadingSlots(true);
    loadCurrentDate(true);

    const interval = setInterval(() => {
      loadCurrentDate(false);
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedDate]);

  useEffect(() => {
    const preloadDates = async () => {
      const missingDates = dates
        .map((date) => format(date, "yyyy-MM-dd"))
        .filter((dateKey) => !slotsByDate[dateKey]);

      if (missingDates.length === 0) return;

      for (const dateKey of missingDates) {
        try {
          const matchingDate = dates.find(
            (date) => format(date, "yyyy-MM-dd") === dateKey,
          );

          if (!matchingDate) continue;

          const fetchedSlots = await fetchSlotsForDate(matchingDate);

          setSlotsByDate((prev) => {
            if (prev[dateKey]) return prev;
            return {
              ...prev,
              [dateKey]: fetchedSlots,
            };
          });
        } catch {
          continue;
        }
      }
    };

    preloadDates();
  }, [dates, slotsByDate]);

  const groupedSlots: Record<SlotGroup, Slot[]> = useMemo(
    () => ({
      Morning: slots.filter((slot) => slot.group === "Morning"),
      Day: slots.filter((slot) => slot.group === "Day"),
      Evening: slots.filter((slot) => slot.group === "Evening"),
    }),
    [slots],
  );

  const toggleSlot = (slot: Slot) => {
    if (slot.status === "booked" || slot.status === "blocked") return;

    setSelectedSlots((prev) => {
      if (prev.includes(slot.time24)) {
        return [];
      }

      if (prev.length === 0) {
        return [slot.time24];
      }

      if (prev.length === 1) {
        const firstIndex = slots.findIndex((s) => s.time24 === prev[0]);
        const secondIndex = slots.findIndex((s) => s.time24 === slot.time24);
        const isAdjacent =
          secondIndex === firstIndex + 1 || secondIndex === firstIndex - 1;
        const firstSlot = slots[firstIndex];

        if (
          isAdjacent &&
          firstSlot?.status === "available" &&
          slot.status === "available"
        ) {
          return [prev[0], slot.time24];
        }

        return [slot.time24];
      }

      return [slot.time24];
    });
  };

  const selectedSlotData = slots.filter((slot) =>
    selectedSlots.includes(slot.time24),
  );

  const sortedSelectedSlots = [...selectedSlotData].sort((a, b) =>
    a.time24.localeCompare(b.time24),
  );

  const total = selectedSlotData.reduce((sum, slot) => sum + slot.price, 0);

  const handleContinue = () => {
    if (sortedSelectedSlots.length === 0) return;

    const params = new URLSearchParams({
      date: format(selectedDate, "yyyy-MM-dd"),
      slots: JSON.stringify(
        sortedSelectedSlots.map((slot) => ({
          time: to12HourRange(slot.time24),
          price: slot.price,
        })),
      ),
      total: String(total),
    });

    router.push(`/book/details?${params.toString()}`);
  };

  return (
    <main className="min-h-screen pb-28">
      <section className="container py-8 md:py-12">
        <FadeIn>
          <SectionHeading
            eyebrow="Booking"
            title="Choose your date and slot"
            text="Start with your preferred time. Private or open game options come in the next step."
          />
          <BookingProgress currentStep={1} />
        </FadeIn>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
          <div className="space-y-6">
            <FadeIn delay={0.06}>
              <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-2xl md:p-6">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_45%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />
                <div className="pointer-events-none absolute -left-8 top-10 h-24 w-24 rounded-full bg-[#B8FF3B]/8 blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-[1.7rem] font-semibold leading-none tracking-[-0.03em] text-white">
                        Choose a date
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                        Pick the day you want to play. Only today and future
                        dates are available.
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[#D7DEE7] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                        <CalendarDays size={14} className="text-[#B8FF3B]" />
                      </span>
                      <span>7 AM – 10 PM</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
                    {dates.map((date) => {
                      const isActive =
                        format(date, "yyyy-MM-dd") ===
                        format(selectedDate, "yyyy-MM-dd");

                      return (
                        <button
                          key={date.toISOString()}
                          type="button"
                          onClick={() => setSelectedDate(date)}
                          className={`group relative overflow-hidden rounded-[24px] border px-4 py-4 text-sm transition-all duration-300 ${
                            isActive
                              ? "border-[#B8FF3B] bg-[#B8FF3B] text-black shadow-[0_16px_38px_rgba(184,255,59,0.22)]"
                              : "border-white/10 bg-white/[0.04] text-[#D7DEE7] hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/[0.07]"
                          }`}
                        >
                          {!isActive && (
                            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_52%)] opacity-70" />
                          )}

                          <span className="relative block text-[11px] uppercase tracking-[0.18em] opacity-80">
                            {format(date, "EEE")}
                          </span>

                          <span className="relative mt-2 block text-[1.75rem] font-semibold leading-none tracking-[-0.04em]">
                            {format(date, "d")}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                    <div className="grid gap-3 text-sm text-[#C9D2DC] md:grid-cols-3">
                      <div>
                        <p className="font-medium text-white">How it works</p>
                        <p className="mt-2 leading-7 text-[#94A3B8]">
                          Choose one hour or two continuous hours, then finish
                          the booking in the next step.
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-white">Open or private</p>
                        <p className="mt-2 leading-7 text-[#94A3B8]">
                          You will choose later whether the game stays private
                          or opens for others to join.
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-white">Payment</p>
                        <p className="mt-2 leading-7 text-[#94A3B8]">
                          No online payment yet. Booking is reserved now and
                          payment is handled at the venue.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-2xl md:p-6">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_45%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />
                <div className="pointer-events-none absolute -right-10 top-16 h-28 w-28 rounded-full bg-[#B8FF3B]/8 blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-[1.7rem] font-semibold leading-none tracking-[-0.03em] text-white">
                        Choose a slot
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                        Select one hour or two continuous hours. Timings are
                        grouped to make browsing easier.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#94A3B8]">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] text-[#C9D2DC] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                        <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
                        Available
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] text-[#C9D2DC] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                        <span className="h-2 w-2 rounded-full bg-[#B8FF3B]" />
                        Selected
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] text-[#C9D2DC] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                        <span className="h-2 w-2 rounded-full bg-[#ff6b6b]" />
                        Booked
                      </span>
                    </div>
                  </div>

                  {slotsError && (
                    <div className="mb-4">
                      <StatePanel
                        variant="error"
                        eyebrow="Couldn’t load slots"
                        title="Today’s slot grid is temporarily unavailable"
                        text={slotsError}
                        actions={
                          <Button
                            variant="secondary"
                            className="rounded-[999px]"
                            onClick={() => {
                              setLoadingSlots(true);
                              setSlotsError("");
                              setSelectedSlots([]);
                              setSelectedDate(new Date(selectedDate));
                            }}
                          >
                            Try Again
                          </Button>
                        }
                        className="rounded-[24px] p-4 shadow-none"
                      />
                    </div>
                  )}

                  <div className="space-y-4">
                    {slotGroups.map((group: SlotGroup) => {
                      const groupSlots: Slot[] = groupedSlots[group];
                      const isOpen = openGroup === group;

                      return (
                        <div
                          key={group}
                          className="overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035]"
                        >
                          <button
                            type="button"
                            onClick={() => setOpenGroup(group)}
                            className="group flex w-full items-center justify-between px-4 py-4 text-left transition-all duration-300 hover:bg-white/[0.045] md:px-5"
                          >
                            <div>
                              <p className="text-[1.1rem] font-medium tracking-[-0.02em] text-white">
                                {group}
                              </p>
                              <p className="mt-1 text-sm text-[#94A3B8]">
                                {group === "Morning"
                                  ? "7 AM – 10 AM"
                                  : group === "Day"
                                    ? "10 AM – 5 PM"
                                    : "5 PM – 10 PM"}
                              </p>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-[#D7DEE7] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                                {groupSlots.length} slots
                              </span>

                              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#B8FF3B] transition-transform duration-300 group-hover:scale-[1.04]">
                                {isOpen ? (
                                  <ChevronUp size={18} />
                                ) : (
                                  <ChevronDown size={18} />
                                )}
                              </div>
                            </div>
                          </button>

                          {isOpen && (
                            <div className="border-t border-white/10 px-3 pb-3 pt-3 md:px-4">
                              {loadingSlots ? (
                                <StatePanel
                                  variant="loading"
                                  title="Loading slots"
                                  text="Checking the latest availability for this time range."
                                  className="rounded-[20px] p-4 shadow-none"
                                />
                              ) : groupSlots.length === 0 ? (
                                <StatePanel
                                  title="No upcoming slots left here"
                                  text="This time range is already finished for today or fully unavailable right now."
                                  className="rounded-[20px] p-4 shadow-none"
                                />
                              ) : (
                                <div className="space-y-2">
                                  {groupSlots.map((slot: Slot) => {
                                    const selected = selectedSlots.includes(
                                      slot.time24,
                                    );
                                    const isUnavailable =
                                      slot.status === "booked" ||
                                      slot.status === "blocked";

                                    return (
                                      <button
                                        key={slot.time24}
                                        type="button"
                                        onClick={() => toggleSlot(slot)}
                                        disabled={isUnavailable}
                                        className={`w-full rounded-[20px] border px-4 py-3 text-left transition-all duration-300 ${
                                          isUnavailable
                                            ? "cursor-not-allowed border-[#3B2327] bg-[#1A1114] opacity-70"
                                            : selected
                                              ? "border-[#B8FF3B] bg-[#18220C] shadow-[0_10px_24px_rgba(184,255,59,0.08)]"
                                              : "border-white/10 bg-white/[0.04] hover:border-white/15 hover:bg-white/[0.07]"
                                        }`}
                                      >
                                        <div className="flex items-center justify-between gap-3 whitespace-nowrap">
                                          <div>
                                            <p className="text-sm font-medium tracking-[-0.01em] text-white md:text-base">
                                              {to12HourRange(slot.time24)}
                                            </p>
                                          </div>

                                          <div className="flex items-center gap-3">
                                            <p className="text-sm text-[#D7DEE7]">
                                              NPR {slot.price}
                                            </p>

                                            {slot.status === "booked" ? (
                                              <span className="inline-flex rounded-full border border-[#4D2A2F] bg-[#241519] px-2.5 py-1 text-[11px] font-medium text-[#FF9999]">
                                                Booked
                                              </span>
                                            ) : slot.status === "blocked" ? (
                                              <span className="inline-flex rounded-full border border-[#4D2A2F] bg-[#241519] px-2.5 py-1 text-[11px] font-medium text-[#FF9999]">
                                                Blocked
                                              </span>
                                            ) : selected ? (
                                              <span className="inline-flex rounded-full border border-[#476B0D] bg-[#22310D] px-2.5 py-1 text-[11px] font-medium text-[#B8FF3B]">
                                                Selected
                                              </span>
                                            ) : (
                                              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-[#D7DEE7]">
                                                Available
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="space-y-6">
            <FadeIn delay={0.14}>
              <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-2xl md:p-6 lg:sticky lg:top-24">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_45%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />
                <div className="pointer-events-none absolute -right-10 bottom-12 h-28 w-28 rounded-full bg-[#B8FF3B]/8 blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-6">
                    <p className="section-eyebrow">Booking summary</p>
                    <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                      Review your selected date, slot, and total before moving
                      to the next step.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04]">
                      <div className="px-4 py-4">
                        <p className="text-sm text-[#94A3B8]">Selected date</p>
                        <p className="mt-2 text-[1.35rem] font-semibold tracking-[-0.03em] text-white">
                          {format(selectedDate, "EEEE, MMM d")}
                        </p>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04]">
                      <div className="px-4 py-4">
                        <p className="text-sm text-[#94A3B8]">Selected slots</p>

                        {sortedSelectedSlots.length > 0 ? (
                          <div className="mt-3 space-y-2">
                            {sortedSelectedSlots.map((slot) => (
                              <div
                                key={slot.time24}
                                className="flex items-center justify-between rounded-[18px] border border-white/10 bg-[#121821] px-3 py-3"
                              >
                                <span className="text-sm font-medium text-white">
                                  {to12HourRange(slot.time24)}
                                </span>
                                <span className="text-sm text-[#94A3B8]">
                                  NPR {slot.price}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-3 rounded-[18px] border border-white/10 bg-[#121821] px-3 py-3">
                            <p className="text-sm text-[#94A3B8]">
                              No slot selected yet.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04]">
                      <div className="px-4 py-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-[#94A3B8]">Duration</p>
                          <p className="font-medium text-white">
                            {selectedSlots.length} hour
                            {selectedSlots.length > 1 ? "s" : ""}
                          </p>
                        </div>

                        <div className="mt-4 h-px bg-white/8" />

                        <div className="mt-4 flex items-end justify-between">
                          <p className="text-sm text-[#94A3B8]">Total</p>
                          <p className="text-[2rem] font-semibold tracking-[-0.04em] text-white">
                            NPR {total}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04]">
                      <div className="px-4 py-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm text-[#94A3B8]">Progress</p>
                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[#D7DEE7]">
                            {selectedSlots.length === 0
                              ? "Choose slot to continue"
                              : "Ready for details"}
                          </span>
                        </div>

                        <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                          {selectedSlots.length === 0
                            ? "Pick at least one available slot to unlock the next step."
                            : "Your date and time are selected. Continue to add game details and confirm the booking."}
                        </p>
                      </div>
                    </div>

                    <Button
                      className="w-full rounded-[999px] py-[16px] text-base shadow-[0_14px_34px_rgba(184,255,59,0.20)]"
                      disabled={selectedSlots.length === 0 || loadingSlots}
                      onClick={handleContinue}
                    >
                      Continue
                    </Button>

                    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4">
                      <p className="text-xs leading-7 text-[#94A3B8]">
                        In the next step, you’ll choose whether this is a
                        private game or an open game.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {selectedSlots.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0B0F14]/92 backdrop-blur-xl lg:hidden">
          <div className="container flex items-center justify-between gap-4 py-4">
            <div>
              <p className="text-xs text-[#94A3B8]">
                {format(selectedDate, "EEE, MMM d")}
              </p>
              <p className="text-sm text-[#94A3B8]">
                {selectedSlots.length} hour
                {selectedSlots.length > 1 ? "s" : ""} selected
              </p>
              <p className="text-lg font-semibold tracking-[-0.02em] text-white">
                NPR {total}
              </p>
            </div>

            <Button onClick={handleContinue} disabled={loadingSlots}>
              Continue
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
