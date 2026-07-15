import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { prisma } from "../../src/lib/prisma";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AccountProfileCard from "./account-profile-card";
import AccountBookingsSection from "./account-bookings-section";
import StatePanel from "@/components/ui/state-panel";
import FadeIn from "@/components/ui/fade-in";

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
  bookingDate: Date;
  playersCount: number;
  totalPrice: number;
  slots: Slot[];
};

type JoinedGame = {
  id: string;
  playersJoined: number;
  createdAt: Date;
  openGame: {
    id: string;
    status: string;
    currentPlayers: number;
    maxPlayers: number;
    booking: {
      bookingDate: Date;
      slots: Slot[];
      user: { name: string };
    };
  };
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
  if (status === "PENDING_FILL") return "Waiting for players";
  if (status === "FULL") return "Full";
  if (status === "OPEN_EXPIRED") return "Expired";
  if (status === "CANCELLED") return "Cancelled";
  return status;
}

function statusColor(status: string) {
  if (status === "PRIVATE_CONFIRMED" || status === "OPEN_CONFIRMED" || status === "FULL") return "var(--accent)";
  if (status === "OPEN_PENDING_FILL" || status === "PENDING_FILL") return "#F4D35E";
  return "rgba(255,150,150,0.8)";
}

function hasBookingEnded(booking: Booking) {
  if (!booking.slots.length) return true;
  const latestEndHour = Math.max(...booking.slots.map((s) => s.endHour));
  const gameEnd = new Date(booking.bookingDate);
  gameEnd.setHours(latestEndHour, 0, 0, 0);
  return gameEnd <= new Date();
}

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login?callbackUrl=/account");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      email: true,
      phone: true,
      bookings: {
        select: {
          id: true,
          bookingType: true,
          status: true,
          paymentStatus: true,
          bookingDate: true,
          playersCount: true,
          totalPrice: true,
          slots: { select: { id: true, startHour: true, endHour: true, price: true } },
        },
        orderBy: { bookingDate: "desc" },
      },
      openGameJoins: {
        select: {
          id: true,
          playersJoined: true,
          createdAt: true,
          openGame: {
            select: {
              id: true,
              status: true,
              currentPlayers: true,
              maxPlayers: true,
              booking: {
                select: {
                  bookingDate: true,
                  slots: true,
                  user: { select: { name: true } },
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) redirect("/login");

  const bookings = user.bookings as Booking[];
  const joinedGames = user.openGameJoins as JoinedGame[];
  const visibleBookings = bookings.filter(
    (b) => b.status !== "CANCELLED" && b.status !== "OPEN_EXPIRED",
  );
  const activeBookings = visibleBookings.filter((b) => !hasBookingEnded(b));
  const pendingPayments = visibleBookings.filter((b) => b.paymentStatus === "PENDING");
  const displayName = user.name || "Player";

  const stats = [
    { label: "Upcoming", value: activeBookings.length },
    { label: "Joined games", value: joinedGames.length },
    { label: "Pending payment", value: pendingPayments.length },
  ];

  return (
    <main className="min-h-screen">

      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <section className="container pt-12 pb-10 md:pt-20 md:pb-14">
        <FadeIn>
          <span className="eyebrow">Account</span>
          <h1
            style={{
              fontFamily: "var(--f-sans)",
              fontWeight: 700,
              fontSize: "clamp(2.4rem,5.5vw,4.8rem)",
              letterSpacing: "-0.055em",
              lineHeight: 0.96,
              color: "var(--fg)",
              marginTop: "1rem",
              maxWidth: "20ch",
            }}
          >
            Welcome back, {displayName}.
          </h1>
          <p style={{ marginTop: "1.25rem", fontSize: "17px", lineHeight: 1.7, color: "var(--fg-3)", maxWidth: "48ch" }}>
            Your bookings, open game activity, and account details in one place.
          </p>
        </FadeIn>

        {/* Stats strip */}
        <FadeIn delay={0.08}>
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
                  paddingLeft: i === 0 ? 0 : "1.5rem",
                  paddingRight: i === stats.length - 1 ? 0 : "1.5rem",
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
                    fontSize: "clamp(28px,3vw,40px)",
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
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────────── */}
      <section className="container pb-24">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          <FadeIn delay={0.06}>
            <AccountProfileCard
              initialName={user.name}
              initialEmail={user.email || ""}
              initialPhone={user.phone || ""}
            />
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-2 items-start">

            <FadeIn delay={0.1}>
              <AccountBookingsSection initialBookings={bookings} />
            </FadeIn>

            {/* Joined games */}
            <FadeIn delay={0.14}>
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
                    <span className="eyebrow">Joined games</span>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.03em", marginTop: "0.375rem" }}>
                      Open game activity
                    </p>
                    <p style={{ fontSize: "13px", color: "var(--fg-3)", marginTop: 4, lineHeight: 1.5 }}>
                      Games you joined and their current fill status.
                    </p>
                  </div>
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: "32px", fontWeight: 600, letterSpacing: "-0.04em", color: "var(--fg-dim)", lineHeight: 1 }}>
                    {joinedGames.length}
                  </span>
                </div>

                {joinedGames.length === 0 ? (
                  <div style={{ padding: "2rem 1.75rem" }}>
                    <StatePanel
                      eyebrow="No joined games yet"
                      title="Your open-game activity will appear here"
                      text="Once you join an open game, this space will show the host, player count, and current status."
                      className="rounded-[20px] p-5 shadow-none"
                    />
                  </div>
                ) : (
                  <div style={{ padding: "0 1.75rem" }}>
                    {joinedGames.map((join) => {
                      const spotsLeft = join.openGame.maxPlayers - join.openGame.currentPlayers;
                      return (
                        <div
                          key={join.id}
                          style={{ borderTop: "1px solid var(--line)", padding: "1.375rem 0" }}
                        >
                          {/* Date + status */}
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <CalendarDays size={13} style={{ color: "var(--fg-dim)" }} />
                              <span style={{ fontFamily: "var(--f-mono)", fontSize: "11px", color: "var(--fg-dim)", letterSpacing: "0.06em" }}>
                                {format(new Date(join.openGame.booking.bookingDate), "EEE, MMM d")}
                              </span>
                            </div>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 500,
                                padding: "3px 10px",
                                borderRadius: "999px",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: statusColor(join.openGame.status),
                              }}
                            >
                              {statusLabel(join.openGame.status)}
                            </span>
                          </div>

                          {/* Time */}
                          <p style={{ fontSize: "clamp(18px,2vw,22px)", fontWeight: 600, letterSpacing: "-0.04em", color: "var(--fg)" }}>
                            {formatSlotRange(join.openGame.booking.slots)}
                          </p>

                          {/* Meta */}
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
                              { label: "Host", value: join.openGame.booking.user.name },
                              { label: "Your players", value: `${join.playersJoined}` },
                              { label: "Fill", value: `${join.openGame.currentPlayers} / ${join.openGame.maxPlayers}` },
                              { label: "Spots left", value: spotsLeft === 0 ? "Full squad" : `${spotsLeft}` },
                            ].map((item) => (
                              <div key={item.label}>
                                <span style={{ fontFamily: "var(--f-mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--fg-dim)", display: "block" }}>
                                  {item.label}
                                </span>
                                <span style={{ fontSize: "13px", color: "var(--fg-3)", marginTop: 3, display: "block" }}>
                                  {item.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Footer link */}
                <div style={{ padding: "1rem 1.75rem", borderTop: "1px solid var(--line)" }}>
                  <Link href="/games" className="btn-text" style={{ fontSize: "13px" }}>
                    Browse open games <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

    </main>
  );
}
