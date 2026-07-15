"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Lock, Users, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import FadeIn from "@/components/ui/fade-in";
import { useSession } from "next-auth/react";
import { getErrorMessage } from "@/lib/utils/error-message";

type Slot = {
  time: string;
  startHour?: number;
  endHour?: number;
  price: number;
};

type Props = {
  dateParam?: string;
  slots: Slot[];
  total: number;
  initialUser?: {
    name: string;
    phone: string;
  };
};

const PRIVATE_GAME_PLAYERS = 10;
const OPEN_GAME_DEFAULT_PLAYERS = 1;

/* ── small design helpers ────────────────────────────────────────── */

function RowLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--f-mono)",
        fontSize: "10px",
        letterSpacing: "0.14em",
        textTransform: "uppercase" as const,
        color: "var(--fg-dim)",
      }}
    >
      {children}
    </span>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <span
        style={{
          fontFamily: "var(--f-mono)",
          fontSize: "11px",
          letterSpacing: "0.16em",
          textTransform: "uppercase" as const,
          color: "var(--fg-dim)",
        }}
      >
        {label}
      </span>
      <div style={{ marginTop: "0.75rem", height: 1, background: "var(--line)" }} />
    </div>
  );
}

/* ── main component ──────────────────────────────────────────────── */

export default function BookingDetailsClient({
  dateParam,
  slots,
  total,
  initialUser,
}: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [fullName, setFullName] = useState(initialUser?.name || "");
  const [phone, setPhone] = useState(initialUser?.phone || "");
  const [gameType, setGameType] = useState<"private" | "open">("private");
  const [playersCount, setPlayersCount] = useState(PRIVATE_GAME_PLAYERS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function convertTimeToHour(value?: string) {
    if (!value) return 0;
    const safeValue = value.trim();
    if (!safeValue) return 0;
    const parts = safeValue.split(" ");
    if (parts.length < 2) return 0;
    const time = parts[0];
    const period = parts[1].toUpperCase();
    const [rawHour] = time.split(":");
    let hour = Number(rawHour);
    if (Number.isNaN(hour)) return 0;
    if (period === "AM") { if (hour === 12) hour = 0; }
    else if (period === "PM") { if (hour !== 12) hour += 12; }
    return hour;
  }

  function parseSlotTimeRange(timeRange?: string) {
    if (!timeRange) return { startHour: 0, endHour: 0 };
    const parts = timeRange.split(/\s*[\u2013\u2014-]\s*/).map((p) => p.trim());
    if (parts.length !== 2) return { startHour: 0, endHour: 0 };
    return { startHour: convertTimeToHour(parts[0]), endHour: convertTimeToHour(parts[1]) };
  }

  const parsedDate = dateParam ? new Date(dateParam) : null;
  const remainingPlayersNeeded = Math.max(0, 10 - playersCount);
  const trimmedFullName = fullName.trim();
  const trimmedPhone = phone.trim();
  const phoneInvalid = trimmedPhone.length > 0 && !/^[0-9+\-\s]{7,15}$/.test(trimmedPhone);

  useEffect(() => {
    if (session?.user?.name && !initialUser?.name && !fullName) {
      setFullName(session.user.name);
    }
  }, [session, initialUser?.name, fullName]);

  const handleConfirm = async () => {
    try {
      setSubmitError("");
      setIsSubmitting(true);

      const formattedSlots = slots
        .map((slot) => {
          const parsedTime = parseSlotTimeRange(slot?.time);
          const startHour = Number.isInteger(slot.startHour)
            ? Number(slot.startHour)
            : parsedTime.startHour;
          const endHour = Number.isInteger(slot.endHour)
            ? Number(slot.endHour)
            : parsedTime.endHour;

          return { startHour, endHour, price: slot.price };
        })
        .filter((slot) => slot.startHour < slot.endHour);

      if (formattedSlots.length === 0) {
        setSubmitError("Invalid slot time. Please go back and select the slot again.");
        setIsSubmitting(false);
        return;
      }
      if (!trimmedFullName) { setSubmitError("Please enter your full name."); setIsSubmitting(false); return; }
      if (!trimmedPhone) { setSubmitError("Please enter your phone number."); setIsSubmitting(false); return; }
      if (phoneInvalid) { setSubmitError("Please enter a valid phone number."); setIsSubmitting(false); return; }

      const res = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedFullName,
          phone: trimmedPhone,
          bookingDate: dateParam,
          bookingType: gameType.toUpperCase(),
          playersCount,
          totalPrice: total,
          slots: formattedSlots,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.error === "One or more selected slots are already booked") {
          setSubmitError("One of your selected slots was just booked. Please choose another.");
        } else if (data?.error === "One or more selected slots are blocked") {
          setSubmitError("One of your selected slots is not available anymore.");
        } else if (data?.error === "You must be logged in to book a slot") {
          setSubmitError("Please log in before booking.");
        } else {
          setSubmitError(
            data?.details
              ? `${data?.error || "Booking failed"}: ${data.details}`
              : data?.error || "Booking failed. Please try again.",
          );
        }
        return;
      }

      const bookingId = data?.booking?.id;
      if (!bookingId) { setSubmitError("Booking was created, but confirmation details were missing."); return; }

      setIsRedirecting(true);
      router.replace(`/book/success?bookingId=${encodeURIComponent(bookingId)}`);
    } catch (error: unknown) {
      setSubmitError(getErrorMessage(error, "Something went wrong while creating the booking."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const canConfirm =
    !!fullName && !!phone && !phoneInvalid && slots.length > 0 && !isSubmitting && !isRedirecting;

  const STEPS = [
    { n: "01", label: "Pick a slot", done: true, active: false },
    { n: "02", label: "Your details", done: false, active: true },
    { n: "03", label: "Confirmed", done: false, active: false },
  ];

  return (
    <main className="min-h-screen">

      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <section className="container pt-12 pb-10 md:pt-20 md:pb-14">
        <FadeIn>
          <span className="eyebrow">Step 02 · Details</span>
          <h1
            style={{
              fontFamily: "var(--f-sans)",
              fontWeight: 700,
              fontSize: "clamp(2.4rem,5.5vw,4.8rem)",
              letterSpacing: "-0.055em",
              lineHeight: 0.96,
              color: "var(--fg)",
              marginTop: "1rem",
              maxWidth: "18ch",
            }}
          >
            Lock your slot.
          </h1>
          <p
            style={{
              marginTop: "1.25rem",
              fontSize: "17px",
              lineHeight: 1.7,
              color: "var(--fg-3)",
              maxWidth: "44ch",
            }}
          >
            Choose your game type and confirm your contact details.
          </p>
        </FadeIn>

        {/* ── step strip ─────────────────────────────────────────────── */}
        <FadeIn delay={0.08}>
          <div
            style={{
              marginTop: "2.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              borderTop: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                style={{
                  padding: "1rem 0",
                  paddingLeft: i === 0 ? 0 : "1.25rem",
                  paddingRight: i === 2 ? 0 : "1.25rem",
                  borderRight: i < 2 ? "1px solid var(--line)" : undefined,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    flexShrink: 0,
                    color: step.active
                      ? "var(--accent)"
                      : step.done
                        ? "var(--fg-dim)"
                        : "var(--fg-faint)",
                  }}
                >
                  {step.n}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: step.active ? 600 : 400,
                    letterSpacing: "-0.01em",
                    color: step.active
                      ? "var(--fg)"
                      : step.done
                        ? "var(--fg-3)"
                        : "var(--fg-dim)",
                  }}
                >
                  {step.label}
                </span>
                {step.done && (
                  <CheckCircle2
                    size={12}
                    style={{ color: "var(--accent)", opacity: 0.7, marginLeft: "auto", flexShrink: 0 }}
                  />
                )}
                {step.active && (
                  <span
                    style={{
                      marginLeft: "auto",
                      flexShrink: 0,
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--accent)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── MAIN GRID ────────────────────────────────────────────────── */}
      <section className="container pb-24">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_380px] items-start">

          {/* ── LEFT: form ─────────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>

            {/* Game type */}
            <FadeIn delay={0.06}>
              <SectionDivider label="Game type" />
              <p style={{ fontSize: "15px", color: "var(--fg-3)", lineHeight: 1.65, marginBottom: "1.5rem", maxWidth: "52ch" }}>
                Private is your own squad only. Open lets other signed-in players join your slot until it fills.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {/* Private */}
                <button
                  type="button"
                  onClick={() => { setGameType("private"); setPlayersCount(PRIVATE_GAME_PLAYERS); }}
                  style={{
                    padding: "1.25rem 1.375rem",
                    border: `1px solid ${gameType === "private" ? "var(--accent)" : "var(--line)"}`,
                    borderRadius: "20px",
                    background: gameType === "private" ? "rgba(184,255,59,0.05)" : "var(--bg-soft)",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "border-color .2s ease, background .2s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <Lock
                      size={14}
                      style={{ color: gameType === "private" ? "var(--accent)" : "var(--fg-dim)", flexShrink: 0 }}
                    />
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.01em" }}>
                      Private
                    </span>
                    {gameType === "private" && (
                      <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                    )}
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--fg-3)", lineHeight: 1.55, margin: 0 }}>
                    Reserved for your group only.
                  </p>
                </button>

                {/* Open */}
                <button
                  type="button"
                  onClick={() => { setGameType("open"); setPlayersCount(OPEN_GAME_DEFAULT_PLAYERS); }}
                  style={{
                    padding: "1.25rem 1.375rem",
                    border: `1px solid ${gameType === "open" ? "var(--accent)" : "var(--line)"}`,
                    borderRadius: "20px",
                    background: gameType === "open" ? "rgba(184,255,59,0.05)" : "var(--bg-soft)",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "border-color .2s ease, background .2s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <Users
                      size={14}
                      style={{ color: gameType === "open" ? "var(--accent)" : "var(--fg-dim)", flexShrink: 0 }}
                    />
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.01em" }}>
                      Open
                    </span>
                    {gameType === "open" && (
                      <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                    )}
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--fg-3)", lineHeight: 1.55, margin: 0 }}>
                    Others can join until it fills.
                  </p>
                </button>
              </div>

              {/* Players stepper — open game only */}
              {gameType === "open" && (
                <div
                  style={{
                    marginTop: "1.75rem",
                    paddingTop: "1.75rem",
                    borderTop: "1px solid var(--line)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1.25rem",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: 500, color: "var(--fg)" }}>
                      Players you already have
                    </p>
                    <p style={{ fontSize: "13px", color: "var(--fg-3)", marginTop: 4, lineHeight: 1.5 }}>
                      Need{" "}
                      <strong style={{ color: "var(--fg)", fontWeight: 600 }}>
                        {remainingPlayersNeeded}
                      </strong>{" "}
                      more to fill the game
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                    <button
                      type="button"
                      onClick={() => setPlayersCount((prev) => Math.max(1, prev - 1))}
                      style={{
                        width: 40, height: 40, borderRadius: "50%",
                        border: "1px solid var(--line)", background: "transparent",
                        color: "var(--fg)", fontSize: "20px", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "border-color .2s",
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        fontFamily: "var(--f-mono)",
                        fontSize: "32px",
                        fontWeight: 600,
                        color: "var(--fg)",
                        letterSpacing: "-0.04em",
                        minWidth: "2ch",
                        textAlign: "center",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {playersCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPlayersCount((prev) => Math.min(10, prev + 1))}
                      style={{
                        width: 40, height: 40, borderRadius: "50%",
                        border: "1px solid var(--line)", background: "transparent",
                        color: "var(--fg)", fontSize: "20px", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "border-color .2s",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </FadeIn>

            {/* Your details */}
            <FadeIn delay={0.10}>
              <SectionDivider label="Your details" />
              <div style={{ display: "flex", flexDirection: "column", gap: "1.375rem" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--fg-3)",
                      marginBottom: "0.625rem",
                      letterSpacing: "0.01em",
                    }}
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: "100%",
                      borderRadius: "14px",
                      border: "1px solid var(--line)",
                      background: "var(--bg-soft)",
                      padding: "14px 18px",
                      fontSize: "15px",
                      color: "var(--fg)",
                      outline: "none",
                      boxSizing: "border-box" as const,
                      transition: "border-color .2s",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--fg-3)",
                      marginBottom: "0.625rem",
                      letterSpacing: "0.01em",
                    }}
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    placeholder="9813110577"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: "100%",
                      borderRadius: "14px",
                      border: `1px solid ${phoneInvalid ? "rgba(255,100,100,0.45)" : "var(--line)"}`,
                      background: "var(--bg-soft)",
                      padding: "14px 18px",
                      fontSize: "15px",
                      color: "var(--fg)",
                      outline: "none",
                      boxSizing: "border-box" as const,
                      transition: "border-color .2s",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = phoneInvalid ? "rgba(255,100,100,0.45)" : "var(--accent)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = phoneInvalid ? "rgba(255,100,100,0.45)" : "var(--line)")}
                  />
                  {phoneInvalid && (
                    <p style={{ marginTop: "0.5rem", fontSize: "13px", color: "rgba(255,140,140,0.9)", lineHeight: 1.5 }}>
                      Use 7-15 digits: numbers, spaces, + or −.
                    </p>
                  )}
                </div>

                <p style={{ fontSize: "13px", color: "var(--fg-dim)", lineHeight: 1.65, maxWidth: "52ch" }}>
                  Sign-in is required before confirming. Payment is collected at the venue, not online.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* ── RIGHT: sticky summary ────────────────────────────────── */}
          <FadeIn delay={0.14}>
            <div
              style={{
                position: "sticky",
                top: "calc(80px + 1.5rem)",
                border: "1px solid var(--line)",
                borderRadius: "24px",
                background: "var(--bg-soft)",
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <div style={{ padding: "1.375rem 1.75rem", borderBottom: "1px solid var(--line)" }}>
                <span className="eyebrow">Booking summary</span>
              </div>

              {/* Date */}
              <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid var(--line)" }}>
                <RowLabel>Date</RowLabel>
                <p
                  style={{
                    marginTop: "0.5rem",
                    fontSize: "22px",
                    fontWeight: 600,
                    color: "var(--fg)",
                    letterSpacing: "-0.035em",
                    lineHeight: 1.1,
                  }}
                >
                  {parsedDate && !Number.isNaN(parsedDate.getTime())
                    ? format(parsedDate, "EEEE, MMM d")
                    : "No date selected"}
                </p>
              </div>

              {/* Slots */}
              <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid var(--line)" }}>
                <RowLabel>Slots</RowLabel>
                {slots.length > 0 ? (
                  <div style={{ marginTop: "0.875rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {slots.map((slot, i) => (
                      <div
                        key={`${slot.time}-${i}`}
                        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                      >
                        <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--fg)" }}>
                          {slot.time}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--f-mono)",
                            fontSize: "13px",
                            color: "var(--fg-3)",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          NPR {slot.price.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ marginTop: "0.5rem", fontSize: "14px", color: "var(--fg-dim)" }}>
                    No slots selected.
                  </p>
                )}
              </div>

              {/* Game type */}
              <div
                style={{
                  padding: "1.25rem 1.75rem",
                  borderBottom: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                {gameType === "private"
                  ? <Lock size={13} style={{ color: "var(--fg-dim)", flexShrink: 0 }} />
                  : <Users size={13} style={{ color: "var(--fg-dim)", flexShrink: 0 }} />}
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--fg)", lineHeight: 1 }}>
                    {gameType === "private" ? "Private game" : "Open game"}
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--fg-dim)", marginTop: 4, lineHeight: 1.45 }}>
                    {gameType === "private"
                      ? "Reserved for your group only"
                      : `${playersCount} confirmed · ${remainingPlayersNeeded} spots open`}
                  </p>
                </div>
              </div>

              {/* Total */}
              <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid var(--line)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "0.75rem" }}>
                  <div>
                    <RowLabel>Total</RowLabel>
                    <p style={{ fontSize: "12px", color: "var(--fg-dim)", marginTop: 5 }}>
                      {slots.length} hr · pay at venue
                    </p>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: "clamp(26px,2.8vw,34px)",
                      fontWeight: 600,
                      letterSpacing: "-0.045em",
                      color: "var(--fg)",
                      fontVariantNumeric: "tabular-nums",
                      lineHeight: 1,
                    }}
                  >
                    NPR {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* After confirming */}
              <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid var(--line)" }}>
                <RowLabel>After confirming</RowLabel>
                <div style={{ marginTop: "0.875rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    "Your slot is reserved immediately.",
                    "A confirmation page shows your booking details.",
                    "Payment is settled at the venue on arrival.",
                  ].map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
                      <span
                        style={{
                          fontFamily: "var(--f-mono)",
                          fontSize: "10px",
                          color: "var(--fg-faint)",
                          flexShrink: 0,
                          letterSpacing: "0.08em",
                        }}
                      >
                        0{i + 1}
                      </span>
                      <p style={{ fontSize: "13px", color: "var(--fg-3)", lineHeight: 1.55, margin: 0 }}>
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA area */}
              <div
                style={{
                  padding: "1.375rem 1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem",
                }}
              >
                {submitError && (
                  <div
                    style={{
                      padding: "0.875rem 1rem",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,100,100,0.22)",
                      background: "rgba(255,80,80,0.05)",
                    }}
                  >
                    <p style={{ fontSize: "13px", color: "rgba(255,150,150,0.9)", lineHeight: 1.5, margin: 0 }}>
                      {submitError}
                    </p>
                  </div>
                )}

                {status === "loading" ? (
                  <button
                    disabled
                    className="btn btn-primary btn-lg"
                    style={{ width: "100%", opacity: 0.55 }}
                  >
                    Checking account...
                  </button>
                ) : session?.user ? (
                  <button
                    className="btn btn-primary btn-lg"
                    style={{ width: "100%", boxShadow: "0 10px 30px rgba(184,255,59,0.16)" }}
                    disabled={!canConfirm}
                    onClick={handleConfirm}
                  >
                    {isRedirecting
                      ? "Opening confirmation..."
                      : isSubmitting
                        ? "Booking..."
                        : "Confirm booking"}
                    <span className="btn-icon-wrap"><ArrowRight size={13} /></span>
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-lg"
                    style={{ width: "100%", boxShadow: "0 10px 30px rgba(184,255,59,0.16)" }}
                    onClick={() => {
                      const currentUrl =
                        typeof window !== "undefined"
                          ? window.location.pathname + window.location.search
                          : "/book/details";
                      router.push(`/login?callbackUrl=${encodeURIComponent(currentUrl)}`);
                    }}
                  >
                    Sign in to continue
                    <span className="btn-icon-wrap"><ArrowRight size={13} /></span>
                  </button>
                )}

                {!session?.user && status !== "loading" && (
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "13px",
                      color: "var(--fg-dim)",
                      lineHeight: 1.5,
                    }}
                  >
                    We&apos;ll bring you back here right after sign-in.
                  </p>
                )}

                <Link
                  href="/book"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.375rem",
                    fontSize: "13px",
                    color: "var(--fg-dim)",
                    textDecoration: "none",
                    transition: "color .2s",
                  }}
                >
                  <ArrowLeft size={13} />
                  Edit slot selection
                </Link>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>
    </main>
  );
}
