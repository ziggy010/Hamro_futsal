import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { prisma } from "../../src/lib/prisma";
import { format } from "date-fns";
import { CalendarDays, Sparkles } from "lucide-react";
import AccountProfileCard from "./account-profile-card";
import AccountBookingsSection from "./account-bookings-section";
import StatePanel from "@/components/ui/state-panel";

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
      user: {
        name: string;
      };
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

  return `${hourTo12(first.startHour)} - ${hourTo12(last.endHour)}`;
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

function statusClasses(status: string) {
  if (
    status === "PRIVATE_CONFIRMED" ||
    status === "OPEN_CONFIRMED" ||
    status === "FULL"
  ) {
    return "border-[#1E4D33] bg-[#10261B] text-[#7EF7C1]";
  }

  if (status === "OPEN_PENDING_FILL" || status === "PENDING_FILL") {
    return "border-[#6C5A14] bg-[#2B2411] text-[#F4D35E]";
  }

  return "border-[#4D2A2F] bg-[#241519] text-[#FF9999]";
}

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login?callbackUrl=/account");
  }

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
          slots: {
            select: {
              id: true,
              startHour: true,
              endHour: true,
              price: true,
            },
          },
        },
        orderBy: {
          bookingDate: "desc",
        },
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
                  user: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const bookings = user.bookings as Booking[];
  const joinedGames = user.openGameJoins as JoinedGame[];
  const activeBookings = bookings.filter(
    (booking) =>
      booking.status !== "CANCELLED" && booking.status !== "OPEN_EXPIRED",
  );
  const pendingPayments = activeBookings.filter(
    (booking) => booking.paymentStatus === "PENDING",
  );
  const displayName = user.name || "Player";

  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.26)] backdrop-blur-2xl md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(184,255,59,0.08),transparent_18%),radial-gradient(circle_at_80%_30%,rgba(184,255,59,0.08),transparent_18%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/12" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(18,22,28,0.24)] px-4 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-xl">
                <span className="h-2.5 w-2.5 rounded-full bg-[#B8FF3B] shadow-[0_0_14px_rgba(184,255,59,0.55)]" />
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#B8FF3B]">
                  Member dashboard
                </span>
              </div>

              <h1 className="mt-5 text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white md:text-[4.2rem]">
                Welcome back, {displayName}.
              </h1>

              <p className="mt-5 max-w-2xl text-[15px] leading-8 text-[#94A3B8] md:text-base">
                Track upcoming bookings, open-game activity, and the profile
                details that keep every reservation smooth.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#C9D2DC]">
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                  Private and open games
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                  Payment at venue
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                  Manage bookings easily
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-white/12 bg-[rgba(20,24,30,0.30)] shadow-[0_20px_60px_rgba(0,0,0,0.24),0_0_30px_rgba(184,255,59,0.06)] backdrop-blur-2xl">
              <div className="relative p-5 md:p-6">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_45%,rgba(255,255,255,0.02)_100%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/18" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.08] text-[#B8FF3B]">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-[#D7DEE7]">Account health</p>
                      <p className="text-lg font-semibold text-white">
                        Ready for your next game
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-sm text-[#94A3B8]">Upcoming bookings</p>
                      <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                        {activeBookings.length}
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-sm text-[#94A3B8]">Joined games</p>
                      <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                        {joinedGames.length}
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-sm text-[#94A3B8]">Pending payments</p>
                      <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                        {pendingPayments.length}
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-sm text-[#94A3B8]">Saved phone</p>
                      <p className="mt-2 truncate text-lg font-semibold text-white">
                        {user.phone || "Add your phone"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-16">
        <div className="space-y-6">
          <AccountProfileCard
            initialName={user.name}
            initialEmail={user.email || ""}
            initialPhone={user.phone || ""}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <AccountBookingsSection initialBookings={bookings} />

            <div className="rounded-[30px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] md:p-6">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[#B8FF3B]">
                    Joined games
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    Open game activity
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                    Keep track of the matches you joined and how close each one
                    is to filling up.
                  </p>
                </div>

                <div className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-sm text-[#94A3B8]">Active joins</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {joinedGames.length}
                  </p>
                </div>
              </div>

              {joinedGames.length === 0 ? (
                <StatePanel
                  eyebrow="No joined games yet"
                  title="Your open-game activity will appear here"
                  text="Once you join an open game, this space will show the host, player count, and current status so you can track it easily."
                  className="rounded-[24px] p-5 shadow-none"
                />
              ) : (
                <div className="space-y-4">
                  {joinedGames.map((join) => {
                    const spotsLeft =
                      join.openGame.maxPlayers - join.openGame.currentPlayers;

                    return (
                      <div
                        key={join.id}
                        className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-[#C9D2DC]">
                              <CalendarDays
                                size={13}
                                className="text-[#B8FF3B]"
                              />
                              {format(
                                new Date(join.openGame.booking.bookingDate),
                                "EEEE, MMM d",
                              )}
                            </div>

                            <p className="mt-4 text-[1.4rem] font-semibold tracking-[-0.03em] text-white">
                              {formatSlotRange(join.openGame.booking.slots)}
                            </p>
                          </div>

                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs ${statusClasses(
                              join.openGame.status,
                            )}`}
                          >
                            {statusLabel(join.openGame.status)}
                          </span>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          <div className="rounded-[20px] border border-white/10 bg-[#121821] px-4 py-3">
                            <p className="text-sm text-[#94A3B8]">Hosted by</p>
                            <p className="mt-1 text-white">
                              {join.openGame.booking.user.name}
                            </p>
                          </div>

                          <div className="rounded-[20px] border border-white/10 bg-[#121821] px-4 py-3">
                            <p className="text-sm text-[#94A3B8]">
                              You joined with
                            </p>
                            <p className="mt-1 text-white">
                              {join.playersJoined} player
                              {join.playersJoined > 1 ? "s" : ""}
                            </p>
                          </div>

                          <div className="rounded-[20px] border border-white/10 bg-[#121821] px-4 py-3">
                            <p className="text-sm text-[#94A3B8]">
                              Current players
                            </p>
                            <p className="mt-1 text-white">
                              {join.openGame.currentPlayers} /{" "}
                              {join.openGame.maxPlayers}
                            </p>
                          </div>

                          <div className="rounded-[20px] border border-white/10 bg-[#121821] px-4 py-3">
                            <p className="text-sm text-[#94A3B8]">Game progress</p>
                            <p className="mt-1 text-white">
                              {spotsLeft === 0
                                ? "Full squad"
                                : `${spotsLeft} spot${spotsLeft > 1 ? "s" : ""} left`}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
