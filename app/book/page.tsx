"use client";

import { useEffect, useMemo, useState } from "react";
import { addDays, format } from "date-fns";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/button";
import FadeIn from "@/components/ui/fade-in";
import StatePanel from "@/components/ui/state-panel";
import { getErrorMessage } from "@/lib/utils/error-message";

/* ── types ───────────────────────────────────────────────────────── */
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

/* ── helpers ─────────────────────────────────────────────────────── */
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

function buildSlotsFromApi(
  data: { bookingSlots: BookingSlotApi[]; blockedSlots: SlotBlockApi[] },
  targetDate: Date,
): Slot[] {
  const nextSlots: Slot[] = [];
  for (let hour = 7; hour < 22; hour++) {
    if (hasSlotStarted(targetDate, hour)) continue;
    const isBooked = data.bookingSlots.some(
      (s) => s.startHour === hour && s.endHour === hour + 1,
    );
    const isBlocked = data.blockedSlots.some(
      (s) => s.startHour === hour && s.endHour === hour + 1,
    );
    nextSlots.push({
      time24: `${String(hour).padStart(2, "0")}:00 - ${String(hour + 1).padStart(2, "0")}:00`,
      price: priceForHour(hour),
      status: isBooked ? "booked" : isBlocked ? "blocked" : "available",
      group: slotGroupFromHour(hour),
    });
  }
  return nextSlots;
}

function to12HourRange(time24: string) {
  const [start, end] = time24.split(" - ");
  const conv = (v: string) => {
    const [hStr, m] = v.split(":");
    const h = Number(hStr);
    return `${h % 12 === 0 ? 12 : h % 12}:${m} ${h >= 12 ? "PM" : "AM"}`;
  };
  return `${conv(start)} – ${conv(end)}`;
}

const GROUP_HOURS: Record<SlotGroup, string> = {
  Morning: "7 AM – 10 AM",
  Day: "10 AM – 5 PM",
  Evening: "5 PM – 10 PM",
};

/* ── page ────────────────────────────────────────────────────────── */
export default function BookingPage() {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [openGroup, setOpenGroup] = useState<SlotGroup>("Evening");
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
    const res = await fetch(`/api/slots?date=${dateKey}`, { cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to load slots");
    return buildSlotsFromApi(
      { bookingSlots: data.bookingSlots || [], blockedSlots: data.blockedSlots || [] },
      date,
    );
  };

  useEffect(() => {
    const load = async (resetSelection = true) => {
      const dateKey = format(selectedDate, "yyyy-MM-dd");
      try {
        setSlotsError("");
        const fetched = await fetchSlotsForDate(selectedDate);
        setSlotsByDate((prev) => ({ ...prev, [dateKey]: fetched }));
        setSlots(fetched);
        if (resetSelection) {
          setSelectedSlots([]);
        } else {
          setSelectedSlots((prev) =>
            prev.filter((t) => fetched.some((s) => s.time24 === t && s.status === "available")),
          );
        }
      } catch (error: unknown) {
        setSlotsError(getErrorMessage(error, "Failed to load slots"));
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };
    setLoadingSlots(true);
    load(true);
    const interval = setInterval(() => load(false), 10_000);
    return () => clearInterval(interval);
  }, [selectedDate]);

  useEffect(() => {
    const preload = async () => {
      const missing = dates
        .map((d) => format(d, "yyyy-MM-dd"))
        .filter((k) => !slotsByDate[k]);
      for (const dateKey of missing) {
        try {
          const match = dates.find((d) => format(d, "yyyy-MM-dd") === dateKey);
          if (!match) continue;
          const fetched = await fetchSlotsForDate(match);
          setSlotsByDate((prev) => (prev[dateKey] ? prev : { ...prev, [dateKey]: fetched }));
        } catch {
          continue;
        }
      }
    };
    preload();
  }, [dates, slotsByDate]);

  const groupedSlots = useMemo(
    () => ({
      Morning: slots.filter((s) => s.group === "Morning"),
      Day:     slots.filter((s) => s.group === "Day"),
      Evening: slots.filter((s) => s.group === "Evening"),
    }),
    [slots],
  );

  const toggleSlot = (slot: Slot) => {
    if (slot.status !== "available") return;
    setSelectedSlots((prev) => {
      if (prev.includes(slot.time24)) return [];
      if (prev.length === 0) return [slot.time24];
      if (prev.length === 1) {
        const aIdx = slots.findIndex((s) => s.time24 === prev[0]);
        const bIdx = slots.findIndex((s) => s.time24 === slot.time24);
        const adj = Math.abs(aIdx - bIdx) === 1;
        if (adj && slots[aIdx]?.status === "available") return [prev[0], slot.time24];
        return [slot.time24];
      }
      return [slot.time24];
    });
  };

  const selectedSlotData = slots.filter((s) => selectedSlots.includes(s.time24));
  const sortedSelected = [...selectedSlotData].sort((a, b) => a.time24.localeCompare(b.time24));
  const total = selectedSlotData.reduce((sum, s) => sum + s.price, 0);
  const fmtDate = format(selectedDate, "EEEE, MMM d");

  const handleContinue = () => {
    if (sortedSelected.length === 0) return;
    const params = new URLSearchParams({
      date: format(selectedDate, "yyyy-MM-dd"),
      slots: JSON.stringify(sortedSelected.map((s) => ({ time: to12HourRange(s.time24), price: s.price }))),
      total: String(total),
    });
    router.push(`/book/details?${params.toString()}`);
  };

  const slotGroups: SlotGroup[] = ["Morning", "Day", "Evening"];

  return (
    <main className="min-h-screen pb-28">
      <section className="container" style={{ paddingTop: "clamp(32px,4vw,64px)", paddingBottom: "clamp(48px,5vw,80px)" }}>

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <FadeIn>
          <span className="eyebrow eyebrow--accent" style={{ marginBottom: 16, display: "inline-flex" }}>
            <span className="num">B</span>
            Booking
          </span>
          <h1 style={{ fontFamily: "var(--f-sans)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, fontSize: "clamp(38px,5.4vw,72px)", margin: "16px 0 0", color: "var(--fg)" }}>
            Pick your date<br />and slot.
          </h1>
          <p style={{ marginTop: 24, fontSize: "clamp(15px,1.2vw,18px)", lineHeight: 1.6, color: "var(--fg-3)", maxWidth: "56ch" }}>
            Start with your preferred time. Private or open game options come in the next step.
          </p>
        </FadeIn>

        {/* ── PROGRESS ────────────────────────────────────────────── */}
        <FadeIn>
          <div className="book-progress" style={{ marginTop: 40 }}>
            {[
              { n: "1", label: "Date & slot", active: true },
              { n: "2", label: "Game details", active: false },
              { n: "3", label: "Confirm",      active: false },
            ].map((step) => (
              <div key={step.n} className="book-progress-step" data-active={step.active ? "true" : undefined}>
                <div className="n">{step.n}</div>
                {step.label}
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── MAIN GRID ───────────────────────────────────────────── */}
        <div className="book-grid">

          {/* LEFT — date + slots ──────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

            {/* Date picker */}
            <FadeIn>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 16 }}>
                  <h2 style={{ fontFamily: "var(--f-sans)", fontWeight: 600, fontSize: 22, letterSpacing: "-0.025em", color: "var(--fg)", margin: 0 }}>
                    Choose a date
                  </h2>
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--fg-dim)" }}>
                    Next 7 days
                  </span>
                </div>
                <div className="date-strip">
                  {dates.map((d, i) => {
                    const isActive = format(d, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
                    return (
                      <button
                        key={d.toISOString()}
                        type="button"
                        className="date-cell"
                        data-active={isActive ? "true" : undefined}
                        onClick={() => { setSelectedDate(d); setSelectedSlots([]); }}
                      >
                        <div className="date-cell-dow">
                          {i === 0 ? "Today" : format(d, "EEE")}
                        </div>
                        <div className="date-cell-day">{format(d, "d")}</div>
                        <div className="date-cell-month">{format(d, "MMM")}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </FadeIn>

            {/* Slot picker */}
            <FadeIn>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
                  <h2 style={{ fontFamily: "var(--f-sans)", fontWeight: 600, fontSize: 22, letterSpacing: "-0.025em", color: "var(--fg)", margin: 0 }}>
                    Choose a slot
                  </h2>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span className="chip">
                      <span className="dot" style={{ background: "#22c55e" }} />Available
                    </span>
                    <span className="chip chip--accent">
                      <span className="dot" style={{ background: "var(--accent)" }} />Selected
                    </span>
                    <span className="chip chip--danger">
                      <span className="dot" style={{ background: "var(--danger)" }} />Booked
                    </span>
                  </div>
                </div>

                {slotsError && (
                  <div style={{ marginBottom: 16 }}>
                    <StatePanel
                      variant="error"
                      eyebrow="Couldn't load slots"
                      title="Slot grid temporarily unavailable"
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

                <div className="slot-section">
                  {slotGroups.map((group) => {
                    const groupSlots = groupedSlots[group];
                    const isOpen = openGroup === group;
                    const availCount = groupSlots.filter((s) => s.status === "available").length;

                    return (
                      <div
                        key={group}
                        className="slot-group"
                        data-open={isOpen ? "true" : undefined}
                      >
                        <button
                          type="button"
                          className="slot-group-head"
                          onClick={() => setOpenGroup(isOpen ? ("" as SlotGroup) : group)}
                        >
                          <div className="slot-group-head-text">
                            <span className="slot-group-name">{group}</span>
                            <span className="slot-group-hours">{GROUP_HOURS[group]}</span>
                          </div>
                          <div className="slot-group-meta">
                            <span className="slot-group-count">
                              {availCount} avail · {groupSlots.length} total
                            </span>
                            <span className="slot-group-chevron">
                              {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </span>
                          </div>
                        </button>

                        {isOpen && (
                          <div className="slot-group-body">
                            {loadingSlots ? (
                              <StatePanel
                                variant="loading"
                                title="Loading slots"
                                text="Checking latest availability."
                                className="rounded-[20px] p-4 shadow-none"
                              />
                            ) : groupSlots.length === 0 ? (
                              <StatePanel
                                title="No slots available"
                                text="This time range is finished for today or fully unavailable."
                                className="rounded-[20px] p-4 shadow-none"
                              />
                            ) : (
                              groupSlots.map((slot) => {
                                const isSel    = selectedSlots.includes(slot.time24);
                                const isBooked = slot.status === "booked";
                                const isBlocked = slot.status === "blocked";
                                const isUnavail = isBooked || isBlocked;
                                return (
                                  <button
                                    key={slot.time24}
                                    type="button"
                                    className="slot"
                                    data-selected={isSel ? "true" : undefined}
                                    data-booked={isUnavail ? "true" : undefined}
                                    disabled={isUnavail}
                                    onClick={() => toggleSlot(slot)}
                                  >
                                    <span className="slot-time">{to12HourRange(slot.time24)}</span>
                                    <span className="slot-meta">
                                      <span className="slot-price">NPR {slot.price}</span>
                                      <span className="slot-status">
                                        {isBooked || isBlocked ? "Booked" : isSel ? "Selected" : "Open"}
                                      </span>
                                    </span>
                                  </button>
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT — summary ──────────────────────────────────────── */}
          <FadeIn>
            <div className="summary">
              <div className="summary-head">
                <span className="eyebrow" style={{ display: "inline-flex", marginBottom: 8 }}>
                  Booking summary
                </span>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--fg-3)", margin: 0, marginTop: 8 }}>
                  Review your date, slots, and total before continuing.
                </p>
              </div>

              <div className="summary-body">
                <div className="summary-row">
                  <span className="summary-row-label">Date</span>
                  <span className="summary-row-value">{fmtDate}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-row-label">Duration</span>
                  <span className="summary-row-value">
                    {sortedSelected.length} hour{sortedSelected.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="summary-row">
                  <span className="summary-row-label">Format</span>
                  <span className="summary-row-value">5-a-side · Pay at venue</span>
                </div>

                <div className="summary-divider" />

                <div>
                  <div className="summary-row-label" style={{ marginBottom: 12 }}>Selected slots</div>
                  {sortedSelected.length === 0 ? (
                    <div className="summary-slot" style={{ color: "var(--fg-dim)" }}>
                      No slot selected
                    </div>
                  ) : (
                    <div className="summary-slot-list">
                      {sortedSelected.map((s) => (
                        <div className="summary-slot" key={s.time24}>
                          <span style={{ color: "var(--fg)" }}>{to12HourRange(s.time24)}</span>
                          <span className="mono-md">NPR {s.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="summary-total">
                  <span className="label">Total</span>
                  <span className="amount">
                    <span style={{ fontSize: 14, color: "var(--fg-dim)", fontWeight: 500, marginRight: 6, letterSpacing: 0 }}>NPR</span>
                    {total.toLocaleString()}
                  </span>
                </div>

                <button
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%", justifyContent: "center" }}
                  disabled={sortedSelected.length === 0}
                  onClick={handleContinue}
                >
                  Continue to details
                  <span className="arrow"><ArrowRight size={14} /></span>
                </button>

                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "12px 14px", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, background: "rgba(255,255,255,0.02)" }}>
                  <Sparkles size={14} style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }} />
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "var(--fg-3)" }}>
                    No payment yet. Choose private or open game in the next step.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── MOBILE STICKY CTA ───────────────────────────────────────── */}
      {selectedSlots.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#08090c]/90 backdrop-blur-xl lg:hidden">
          <div className="container flex items-center justify-between gap-4 py-4">
            <div>
              <p style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-dim)", margin: 0 }}>
                {format(selectedDate, "EEE, MMM d")}
              </p>
              <p style={{ fontSize: 13, color: "var(--fg-3)", margin: "4px 0 0" }}>
                {selectedSlots.length} hour{selectedSlots.length > 1 ? "s" : ""} selected
              </p>
              <p style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.03em", color: "var(--fg)", margin: "2px 0 0" }}>
                NPR {total.toLocaleString()}
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleContinue}
              disabled={loadingSlots}
            >
              Continue <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
