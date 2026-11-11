import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { prisma } from "../../src/lib/prisma";
import AccountProfileCard from "./account-profile-card";
import AccountBookingsSection from "./account-bookings-section";
import FadeIn from "@/components/ui/fade-in";

type Slot = {
  id: string;
  startHour: number;
  endHour: number;
  price: number;
};

type Booking = {
  id: string;
  status: string;
  paymentStatus: "PENDING" | "PAID";
  bookingDate: Date;
  totalPrice: number;
  slots: Slot[];
};

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
          status: true,
          paymentStatus: true,
          bookingDate: true,
          totalPrice: true,
          slots: { select: { id: true, startHour: true, endHour: true, price: true } },
        },
        orderBy: { bookingDate: "desc" },
      },
    },
  });

  if (!user) redirect("/login");

  const bookings = user.bookings as Booking[];
  const visibleBookings = bookings.filter(
    (b) => b.status !== "CANCELLED" && b.status !== "OPEN_EXPIRED",
  );
  const activeBookings = visibleBookings.filter((b) => !hasBookingEnded(b));
  const pendingPayments = visibleBookings.filter((b) => b.paymentStatus === "PENDING");
  const displayName = user.name || "Player";

  const stats = [
    { label: "Upcoming", value: activeBookings.length },
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
            Your bookings, payment status, and account details in one place.
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

          <FadeIn delay={0.1}>
            <AccountBookingsSection initialBookings={bookings} />
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
