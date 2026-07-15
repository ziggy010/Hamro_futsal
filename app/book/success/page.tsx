import Link from "next/link";
import { format } from "date-fns";
import { CheckCircle2, Lock, Users, ArrowRight, CalendarDays } from "lucide-react";
import { redirect } from "next/navigation";
import { prisma } from "../../../src/lib/prisma";
import FadeIn from "@/components/ui/fade-in";

type RawSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

type Slot = {
  time: string;
  price: number;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function hourTo12(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const normalized = hour % 12 === 0 ? 12 : hour % 12;
  return `${normalized}:00 ${suffix}`;
}

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

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: RawSearchParams;
}) {
  const params = await searchParams;
  const bookingId = first(params.bookingId);

  if (!bookingId) redirect("/book");

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      user: true,
      slots: { orderBy: { startHour: "asc" } },
      openGame: true,
    },
  });

  if (!booking) redirect("/book");

  const parsedDate = new Date(booking.bookingDate);
  const gameType = booking.bookingType === "OPEN" ? "open" : "private";
  const playersCount = booking.playersCount;
  const remainingPlayersNeeded = Math.max(0, 10 - playersCount);
  const total = booking.totalPrice;

  const slots: Slot[] = booking.slots.map(
    (slot: { startHour: number; endHour: number; price: number }) => ({
      time: `${hourTo12(slot.startHour)} - ${hourTo12(slot.endHour)}`,
      price: slot.price,
    }),
  );

  function statusLabel(status: string) {
    if (status === "PRIVATE_CONFIRMED") return "Confirmed";
    if (status === "OPEN_PENDING_FILL") return "Waiting for players";
    if (status === "OPEN_CONFIRMED") return "Confirmed";
    return status;
  }

  const STEPS = [
    { n: "01", label: "Pick a slot", done: true, active: false },
    { n: "02", label: "Your details", done: true, active: false },
    { n: "03", label: "Confirmed", done: false, active: true },
  ];

  return (
    <main className="min-h-screen">

      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <section className="container pt-12 pb-10 md:pt-20 md:pb-14">
        <FadeIn>
          <span className="eyebrow">Step 03 · Confirmed</span>
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
            {gameType === "private" ? "Your slot is locked." : "Your open game is live."}
          </h1>
          <p
            style={{
              marginTop: "1.25rem",
              fontSize: "17px",
              lineHeight: 1.7,
              color: "var(--fg-3)",
              maxWidth: "48ch",
            }}
          >
            {gameType === "private"
              ? "Payment is collected at the venue when you arrive. No action needed until then."
              : "Other players can now join your slot until it reaches 10 players."}
          </p>
        </FadeIn>

        {/* Step strip */}
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
                    color: step.active ? "var(--accent)" : "var(--fg-dim)",
                  }}
                >
                  {step.n}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: step.active ? 600 : 400,
                    letterSpacing: "-0.01em",
                    color: step.active ? "var(--fg)" : "var(--fg-3)",
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

          {/* ── LEFT: confirmation details ───────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>

            <FadeIn delay={0.06}>
              {/* Confirmation hero */}
              <div
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: "20px",
                  background: "var(--bg-soft)",
                  overflow: "hidden",
                  marginBottom: "1.5rem",
                }}
              >
                {/* Confirmed header */}
                <div
                  style={{
                    padding: "1.5rem 1.75rem",
                    borderBottom: "1px solid var(--line)",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: "1px solid rgba(184,255,59,0.3)",
                      background: "rgba(184,255,59,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircle2 size={20} style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "17px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.02em" }}>
                      Booking confirmed
                    </p>
                    <p style={{ fontSize: "13px", color: "var(--fg-3)", marginTop: 2 }}>
                      {gameType === "private"
                        ? "Reserved for your group only."
                        : "Now listed as an open game. Players can join."}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <CalendarDays size={14} style={{ color: "var(--fg-dim)", flexShrink: 0 }} />
                  <div>
                    <RowLabel>Date</RowLabel>
                    <p style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--fg)", marginTop: 4 }}>
                      {format(parsedDate, "EEEE, MMM d")}
                    </p>
                  </div>
                </div>

                {/* Status + payment */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid var(--line)", borderRight: "1px solid var(--line)" }}>
                    <RowLabel>Status</RowLabel>
                    <p style={{ fontSize: "15px", fontWeight: 500, color: "var(--fg)", marginTop: "0.5rem" }}>
                      {statusLabel(booking.status)}
                    </p>
                  </div>
                  <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid var(--line)" }}>
                    <RowLabel>Payment</RowLabel>
                    <p style={{ fontSize: "15px", fontWeight: 500, color: booking.paymentStatus === "PAID" ? "var(--accent)" : "var(--fg)", marginTop: "0.5rem" }}>
                      {booking.paymentStatus === "PAID" ? "Paid" : "Pay at venue"}
                    </p>
                  </div>
                </div>

                {/* Booked for */}
                <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid var(--line)" }}>
                  <RowLabel>Booked for</RowLabel>
                  <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--fg)", marginTop: "0.5rem", letterSpacing: "-0.02em" }}>
                    {booking.user.name || "Customer"}
                  </p>
                  {booking.user.phone && (
                    <p style={{ fontSize: "13px", color: "var(--fg-dim)", marginTop: 2 }}>
                      {booking.user.phone}
                    </p>
                  )}
                </div>

                {/* Open game note */}
                {gameType === "open" && (
                  <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid var(--line)", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <Users size={14} style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--fg)" }}>Open game created</p>
                      <p style={{ fontSize: "13px", color: "var(--fg-3)", marginTop: 4, lineHeight: 1.55 }}>
                        {playersCount} player{playersCount > 1 ? "s" : ""} confirmed,{" "}
                        {remainingPlayersNeeded} spot{remainingPlayersNeeded !== 1 ? "s" : ""} remaining.
                      </p>
                    </div>
                  </div>
                )}

                {/* What to expect */}
                <div style={{ padding: "1.25rem 1.75rem" }}>
                  <RowLabel>What happens now</RowLabel>
                  <div style={{ marginTop: "0.875rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {[
                      "Your slot is already reserved for the selected time.",
                      "Payment is collected at the venue when you arrive.",
                      gameType === "open" ? "Other players can join this game from the open games page." : "Show up a few minutes before your slot starts.",
                    ].map((step, i) => (
                      <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
                        <span style={{ fontFamily: "var(--f-mono)", fontSize: "10px", color: "var(--fg-faint)", flexShrink: 0, letterSpacing: "0.08em" }}>
                          0{i + 1}
                        </span>
                        <p style={{ fontSize: "13px", color: "var(--fg-3)", lineHeight: 1.55, margin: 0 }}>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                <Link href="/book" className="btn btn-primary btn-lg">
                  Book another slot
                  <span className="btn-icon-wrap"><ArrowRight size={13} /></span>
                </Link>
                <Link href={gameType === "open" ? "/games" : "/"} className="btn btn-ghost btn-lg">
                  {gameType === "open" ? "View open games" : "Back to home"}
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* ── RIGHT: summary panel ─────────────────────────────────── */}
          <FadeIn delay={0.12}>
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
              <div style={{ padding: "1.375rem 1.75rem", borderBottom: "1px solid var(--line)" }}>
                <span className="eyebrow">Booking summary</span>
              </div>

              {/* Game type */}
              <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {gameType === "private"
                  ? <Lock size={13} style={{ color: "var(--fg-dim)", flexShrink: 0 }} />
                  : <Users size={13} style={{ color: "var(--fg-dim)", flexShrink: 0 }} />}
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--fg)" }}>
                    {gameType === "private" ? "Private game" : "Open game"}
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--fg-dim)", marginTop: 3 }}>
                    {gameType === "private"
                      ? "Reserved for your group only"
                      : `${playersCount} confirmed · ${remainingPlayersNeeded} spots open`}
                  </p>
                </div>
              </div>

              {/* Slots */}
              <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid var(--line)" }}>
                <RowLabel>Reserved slots</RowLabel>
                {slots.length > 0 ? (
                  <div style={{ marginTop: "0.875rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {slots.map((slot, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--fg)" }}>{slot.time}</span>
                        <span style={{ fontFamily: "var(--f-mono)", fontSize: "13px", color: "var(--fg-3)", fontVariantNumeric: "tabular-nums" }}>
                          NPR {slot.price.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ marginTop: "0.5rem", fontSize: "14px", color: "var(--fg-dim)" }}>Slot details unavailable.</p>
                )}
              </div>

              {/* Total */}
              <div style={{ padding: "1.25rem 1.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
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
            </div>
          </FadeIn>

        </div>
      </section>
    </main>
  );
}
