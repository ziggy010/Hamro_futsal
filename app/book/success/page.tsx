import Link from "next/link";
import { format } from "date-fns";
import {
  CheckCircle2,
  Lock,
  Users,
  CalendarDays,
  Wallet,
  Phone,
} from "lucide-react";
import { redirect } from "next/navigation";
import { prisma } from "../../../src/lib/prisma";
import Button from "@/components/ui/button";
import BookingProgress from "@/components/ui/booking-progress";
import FadeIn from "@/components/ui/fade-in";
import SectionHeading from "@/components/ui/section-heading";

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

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: RawSearchParams;
}) {
  const params = await searchParams;
  const bookingId = first(params.bookingId);

  if (!bookingId) {
    redirect("/book");
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      user: true,
      slots: {
        orderBy: {
          startHour: "asc",
        },
      },
      openGame: true,
    },
  });

  if (!booking) {
    redirect("/book");
  }

  const parsedDate = new Date(booking.bookingDate);
  const gameType = booking.bookingType === "OPEN" ? "open" : "private";
  const playersCount = booking.playersCount;
  const remainingPlayersNeeded = Math.max(0, 10 - playersCount);
  const total = booking.totalPrice;

  const slots = booking.slots.map(
    (slot: { startHour: number; endHour: number; price: number }) => ({
      time: `${hourTo12(slot.startHour)} - ${hourTo12(slot.endHour)}`,
      price: slot.price,
    }),
  );

  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <FadeIn>
          <SectionHeading
            eyebrow="Booking confirmed"
            title="Your futsal slot is locked in."
            text={
              gameType === "private"
                ? "Your private game booking is ready. Payment will be collected at the venue."
                : "Your open game is live. Other players can now join this slot."
            }
          />
          <BookingProgress currentStep={3} />
        </FadeIn>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <FadeIn delay={0.08}>
            <div className="card-strong glow overflow-hidden p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[22px] border border-[#476B0D] bg-[#22310D]">
                  <CheckCircle2 className="text-[#B8FF3B]" size={28} />
                </div>

                <div className="min-w-0">
                  <p className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
                    Booking successful
                  </p>
                  <p className="mt-2 text-sm leading-8 text-[#94A3B8] md:text-base">
                    {gameType === "private"
                      ? "This slot is reserved for your own group."
                      : "This booking is now listed as an open game and more players can join until it fills up."}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                    <CalendarDays size={14} className="text-[#B8FF3B]" />
                    Date
                  </div>
                  <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-white">
                    {format(parsedDate, "EEEE, MMM d")}
                  </p>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                    <Wallet size={14} className="text-[#B8FF3B]" />
                    Payment
                  </div>
                  <div className="mt-2">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-sm ${
                        booking.paymentStatus === "PAID"
                          ? "border-[#1E4D33] bg-[#10261B] text-[#7EF7C1]"
                          : "border-[#6C5A14] bg-[#2B2411] text-[#F4D35E]"
                      }`}
                    >
                      {booking.paymentStatus === "PAID"
                        ? "Paid"
                        : "Pay at venue"}
                    </span>
                  </div>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                    <CheckCircle2 size={14} className="text-[#B8FF3B]" />
                    Status
                  </div>
                  <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-white">
                    {booking.status === "PRIVATE_CONFIRMED"
                      ? "Confirmed"
                      : booking.status === "OPEN_PENDING_FILL"
                        ? "Open game pending fill"
                        : booking.status === "OPEN_CONFIRMED"
                          ? "Open game confirmed"
                          : booking.status}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                  <Phone size={14} className="text-[#B8FF3B]" />
                  Booked for
                </div>
                <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-white">
                  {booking.user.name || "Customer"}
                </p>
                <p className="mt-1 text-sm text-[#94A3B8]">
                  {booking.user.phone || "No phone provided"}
                </p>
              </div>

              <div className="mt-4 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm text-[#94A3B8]">What to expect now</p>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-[#121821] px-3 py-3 text-sm text-[#D7DEE7]">
                    Your slot is already reserved for the selected time.
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#121821] px-3 py-3 text-sm text-[#D7DEE7]">
                    Payment is collected at the venue when you arrive.
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#121821] px-3 py-3 text-sm text-[#D7DEE7]">
                    If this is an open game, more players can now join.
                  </div>
                </div>
              </div>

              {gameType === "open" && (
                <div className="mt-4 rounded-[22px] border border-[#476B0D] bg-[#18220C] p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-[#476B0D] bg-[#22310D] text-[#B8FF3B]">
                      <Users size={18} />
                    </div>

                    <div>
                      <p className="text-base font-medium text-white">
                        Open game created
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[#C9D2DC]">
                        You currently have {playersCount} player
                        {playersCount > 1 ? "s" : ""} and need{" "}
                        {remainingPlayersNeeded} more to reach 10 players.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/book">
                  <Button className="w-full sm:w-auto">
                    Book Another Slot
                  </Button>
                </Link>

                <Link href={gameType === "open" ? "/games" : "/"}>
                  <Button variant="secondary" className="w-full sm:w-auto">
                    {gameType === "open" ? "View Open Games" : "Back to Home"}
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.14}>
            <div className="card-strong p-5 md:p-6">
              <p className="section-eyebrow">Booking summary</p>

              <div className="mt-5 space-y-4">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm text-[#94A3B8]">Game type</p>

                  <div className="mt-3 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.04] text-[#B8FF3B]">
                      {gameType === "private" ? (
                        <Lock size={18} />
                      ) : (
                        <Users size={18} />
                      )}
                    </div>

                    <div>
                      <p className="text-base font-medium text-white">
                        {gameType === "private" ? "Private Game" : "Open Game"}
                      </p>
                      <p className="mt-1 text-sm leading-7 text-[#94A3B8]">
                        {gameType === "private"
                          ? "Reserved only for your own players."
                          : `You currently have ${playersCount} player${
                              playersCount > 1 ? "s" : ""
                            } and need ${remainingPlayersNeeded} more.`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm text-[#94A3B8]">Reserved slots</p>

                  {slots.length > 0 ? (
                    <div className="mt-3 space-y-2">
                      {slots.map((slot: Slot, index: number) => (
                        <div
                          key={`${slot.time}-${index}`}
                          className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#121821] px-3 py-3"
                        >
                          <span className="text-sm font-medium text-white">
                            {slot.time}
                          </span>
                          <span className="text-sm text-[#94A3B8]">
                            NPR {slot.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-[#94A3B8]">
                      Slot details unavailable.
                    </p>
                  )}
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#94A3B8]">Duration</p>
                    <p className="font-medium text-white">
                      {slots.length} hour{slots.length > 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm text-[#94A3B8]">Total amount</p>
                    <p className="text-2xl font-semibold tracking-[-0.03em] text-white">
                      NPR {total}
                    </p>
                  </div>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm text-[#94A3B8]">What happens next</p>
                  <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                    {gameType === "private"
                      ? "Arrive a little before your booked time and complete payment at the venue."
                      : "Your game is now visible for other players to join."}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
