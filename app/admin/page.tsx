"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  Users,
  Wallet,
} from "lucide-react";
import ExpireButton from "@/components/admin/ExpireButton";
import FadeIn from "@/components/ui/fade-in";
import SectionHeading from "@/components/ui/section-heading";
import Button from "@/components/ui/button";
import StatePanel from "@/components/ui/state-panel";
import { getErrorMessage } from "@/lib/utils/error-message";

type BookingApi = {
  id: string;
  bookingType: "PRIVATE" | "OPEN";
  status:
    | "PRIVATE_CONFIRMED"
    | "OPEN_PENDING_FILL"
    | "OPEN_CONFIRMED"
    | "OPEN_EXPIRED"
    | "CANCELLED";
  bookingDate: string;
  playersCount: number;
  totalPrice: number;
  createdAt: string;
  paymentStatus: "PENDING" | "PAID";
  user: {
    id: string;
    name: string;
    phone: string;
  };
  slots: {
    id: string;
    startHour: number;
    endHour: number;
    price: number;
  }[];
  openGame?: {
    id: string;
    status: "PENDING_FILL" | "CONFIRMED" | "FULL" | "EXPIRED" | "CANCELLED";
    currentPlayers: number;
    maxPlayers: number;
  } | null;
};

type OpenGameApi = {
  id: string;
  status: "PENDING_FILL" | "CONFIRMED" | "FULL" | "EXPIRED" | "CANCELLED";
  currentPlayers: number;
  minPlayers: number;
  maxPlayers: number;
  cutoffTime: string;
  booking: {
    id: string;
    bookingDate: string;
    user: {
      id: string;
      name: string;
      phone: string;
    };
    slots: {
      id: string;
      startHour: number;
      endHour: number;
      price: number;
    }[];
  };
};

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
}

function hourTo12(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const normalized = hour % 12 === 0 ? 12 : hour % 12;
  return `${normalized}:00 ${suffix}`;
}

function formatSlotRange(
  slots: { startHour: number; endHour: number }[] | undefined,
) {
  if (!slots?.length) return "Time unavailable";

  const sorted = [...slots].sort((a, b) => a.startHour - b.startHour);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  return `${hourTo12(first.startHour)} - ${hourTo12(last.endHour)}`;
}

function bookingBadge(status: BookingApi["status"]) {
  if (status === "PRIVATE_CONFIRMED" || status === "OPEN_CONFIRMED") {
    return "border-[#476B0D] bg-[#22310D] text-[#B8FF3B]";
  }

  if (status === "OPEN_PENDING_FILL") {
    return "border-[#6C5A14] bg-[#2B2411] text-[#F4D35E]";
  }

  if (status === "CANCELLED" || status === "OPEN_EXPIRED") {
    return "border-[#4D2A2F] bg-[#241519] text-[#FF9999]";
  }

  return "border-white/10 bg-white/[0.04] text-[#D7DEE7]";
}

function openGameBadge(status: OpenGameApi["status"]) {
  if (status === "FULL") {
    return "border-[#0E4D38] bg-[#0F2A22] text-[#7EF7C1]";
  }

  if (status === "CONFIRMED") {
    return "border-[#476B0D] bg-[#22310D] text-[#B8FF3B]";
  }

  if (status === "PENDING_FILL") {
    return "border-[#6C5A14] bg-[#2B2411] text-[#F4D35E]";
  }

  return "border-[#4D2A2F] bg-[#241519] text-[#FF9999]";
}

function bookingStatusLabel(status: BookingApi["status"]) {
  if (status === "PRIVATE_CONFIRMED") return "Confirmed";
  if (status === "OPEN_PENDING_FILL") return "Waiting for players";
  if (status === "OPEN_CONFIRMED") return "Open confirmed";
  if (status === "OPEN_EXPIRED") return "Expired";
  return "Cancelled";
}

function openGameStatusLabel(status: OpenGameApi["status"]) {
  if (status === "PENDING_FILL") return "Pending fill";
  if (status === "CONFIRMED") return "Confirmed";
  if (status === "FULL") return "Full";
  if (status === "EXPIRED") return "Expired";
  return "Cancelled";
}

function timeUntil(dateString: string) {
  const now = Date.now();
  const target = new Date(dateString).getTime();
  const diff = target - now;

  if (diff <= 0) return "Cutoff passed";

  const hours = Math.floor(diff / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));

  if (hours <= 0) {
    return `${minutes} min left`;
  }

  if (minutes === 0) {
    return `${hours} hr left`;
  }

  return `${hours} hr ${minutes} min left`;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<BookingApi[]>([]);
  const [openGames, setOpenGames] = useState<OpenGameApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setError("");

      const [bookingsRes, openGamesRes] = await Promise.all([
        fetch("/api/bookings", { cache: "no-store" }),
        fetch("/api/open-games", { cache: "no-store" }),
      ]);

      const bookingsData = await bookingsRes.json();
      const openGamesData = await openGamesRes.json();

      if (!bookingsRes.ok) {
        throw new Error(bookingsData?.error || "Failed to load bookings");
      }

      if (!openGamesRes.ok) {
        throw new Error(openGamesData?.error || "Failed to load open games");
      }

      setBookings(bookingsData.bookings || []);
      setOpenGames(openGamesData.openGames || []);
    } catch (fetchError: unknown) {
      setError(getErrorMessage(fetchError, "Failed to load dashboard data"));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const todayStart = useMemo(() => startOfToday(), []);
  const todayEnd = useMemo(() => endOfToday(), []);

  const todaysBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.bookingDate);
      return bookingDate >= todayStart && bookingDate <= todayEnd;
    });
  }, [bookings, todayStart, todayEnd]);

  const activeTodaysBookings = useMemo(() => {
    return todaysBookings.filter(
      (booking) =>
        booking.status !== "CANCELLED" && booking.status !== "OPEN_EXPIRED",
    );
  }, [todaysBookings]);

  const todaysSales = useMemo(() => {
    return activeTodaysBookings.reduce(
      (sum, booking) => sum + booking.totalPrice,
      0,
    );
  }, [activeTodaysBookings]);

  const todaysCollected = useMemo(() => {
    return activeTodaysBookings
      .filter((booking) => booking.paymentStatus === "PAID")
      .reduce((sum, booking) => sum + booking.totalPrice, 0);
  }, [activeTodaysBookings]);

  const pendingPaymentsCount = useMemo(() => {
    return activeTodaysBookings.filter(
      (booking) => booking.paymentStatus === "PENDING",
    ).length;
  }, [activeTodaysBookings]);

  const activeOpenGames = useMemo(() => {
    return openGames.filter(
      (game) =>
        game.status === "PENDING_FILL" ||
        game.status === "CONFIRMED" ||
        game.status === "FULL",
    );
  }, [openGames]);

  const urgentOpenGames = useMemo(() => {
    const now = new Date();
    return activeOpenGames.filter((game) => {
      const cutoff = new Date(game.cutoffTime);
      return cutoff > now && cutoff.getTime() - now.getTime() <= 2 * 60 * 60 * 1000;
    });
  }, [activeOpenGames]);

  const pendingFillGames = useMemo(() => {
    return activeOpenGames.filter((game) => game.status === "PENDING_FILL");
  }, [activeOpenGames]);

  const filledSlotsToday = useMemo(() => {
    const slotCount = activeTodaysBookings.reduce(
      (sum, booking) => sum + booking.slots.length,
      0,
    );

    const totalDailySlots = 15;
    return Math.min(100, Math.round((slotCount / totalDailySlots) * 100));
  }, [activeTodaysBookings]);

  const totalPlayersToday = useMemo(() => {
    return activeTodaysBookings.reduce(
      (sum, booking) => sum + booking.playersCount,
      0,
    );
  }, [activeTodaysBookings]);

  const recentBookings = useMemo(() => {
    return [...bookings].slice(0, 6);
  }, [bookings]);

  const openGamesWatchlist = useMemo(() => {
    return [...activeOpenGames]
      .sort(
        (a, b) =>
          new Date(a.cutoffTime).getTime() - new Date(b.cutoffTime).getTime(),
      )
      .slice(0, 6);
  }, [activeOpenGames]);

  const quickLinks = [
    {
      title: "Bookings",
      description: "Manage confirmations, cancellations, and customer details.",
      href: "/admin/bookings",
      accent: "from-[#B8FF3B]/22 to-transparent",
    },
    {
      title: "Open Games",
      description: "Track fill status, view hosts, and intervene before cutoffs.",
      href: "/admin/open-games",
      accent: "from-[#7EF7C1]/18 to-transparent",
    },
    {
      title: "Slots",
      description: "Block time, reopen slots, and review the upcoming schedule.",
      href: "/admin/slots",
      accent: "from-[#F4D35E]/18 to-transparent",
    },
    {
      title: "Sales",
      description: "See collected revenue, pending payments, and daily totals.",
      href: "/admin/sales",
      accent: "from-[#8CC9FF]/18 to-transparent",
    },
  ];

  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <FadeIn>
          <SectionHeading
            eyebrow="Admin"
            title="Operations dashboard"
            text="Monitor today's bookings, live open games, revenue, and the next actions that keep the venue running smoothly."
          />
        </FadeIn>

        <FadeIn delay={0.04}>
          <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.26)] backdrop-blur-2xl md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(184,255,59,0.08),transparent_18%),radial-gradient(circle_at_82%_24%,rgba(126,247,193,0.08),transparent_18%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-white/12" />

            <div className="relative z-10 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(18,22,28,0.24)] px-4 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-xl">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#B8FF3B] shadow-[0_0_14px_rgba(184,255,59,0.55)]" />
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#B8FF3B]">
                    Live control room
                  </span>
                </div>

                <h1 className="mt-5 text-[2.45rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white md:text-[4.2rem]">
                  One place to run bookings, games, and daily venue flow.
                </h1>

                <p className="mt-5 max-w-2xl text-[15px] leading-8 text-[#94A3B8] md:text-base">
                  Keep an eye on revenue, urgent cutoffs, pending payments, and
                  the newest booking activity without jumping between screens.
                </p>

                <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#C9D2DC]">
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Today&apos;s view
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Open-game watchlist
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Faster admin actions
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[30px] border border-white/12 bg-[rgba(20,24,30,0.32)] shadow-[0_20px_60px_rgba(0,0,0,0.24),0_0_30px_rgba(184,255,59,0.06)] backdrop-blur-2xl">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_45%,rgba(255,255,255,0.02)_100%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/18" />

                <div className="relative p-5 md:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.08] text-[#B8FF3B]">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-[#D7DEE7]">Venue pulse</p>
                      <p className="text-lg font-semibold text-white">
                        Today at a glance
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-sm text-[#94A3B8]">Today&apos;s revenue</p>
                      <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                        NPR {todaysSales}
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-sm text-[#94A3B8]">Bookings today</p>
                      <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                        {activeTodaysBookings.length}
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-sm text-[#94A3B8]">Live open games</p>
                      <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                        {activeOpenGames.length}
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-sm text-[#94A3B8]">Slots filled today</p>
                      <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                        {filledSlotsToday}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-[#94A3B8]">Collected so far</p>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[#D7DEE7]">
                        NPR {todaysCollected}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                      {pendingPaymentsCount > 0
                        ? `${pendingPaymentsCount} booking${pendingPaymentsCount > 1 ? "s" : ""} still need payment follow-up today.`
                        : "No pending payment follow-ups for active bookings today."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {error && (
          <div className="mt-6">
            <StatePanel
              variant="error"
              eyebrow="Couldn’t load dashboard"
              title="The operations dashboard is temporarily unavailable"
              text={error}
              actions={
                <Button
                  variant="secondary"
                  className="rounded-[999px]"
                  onClick={() => {
                    setRefreshing(true);
                    fetchDashboardData();
                  }}
                >
                  Try Again
                </Button>
              }
            />
          </div>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Revenue Today",
              value: `NPR ${todaysSales}`,
              meta: `${pendingPaymentsCount} pending payment follow-ups`,
              icon: Wallet,
            },
            {
              title: "Players Today",
              value: String(totalPlayersToday),
              meta: `${activeTodaysBookings.length} active bookings`,
              icon: Users,
            },
            {
              title: "Urgent Cutoffs",
              value: String(urgentOpenGames.length),
              meta:
                urgentOpenGames.length > 0
                  ? "Need attention soon"
                  : "No urgent open games",
              icon: TriangleAlert,
            },
            {
              title: "Pending Fill Games",
              value: String(pendingFillGames.length),
              meta: `${activeOpenGames.length} live open games total`,
              icon: Sparkles,
            },
          ].map((item, index) => (
            <FadeIn key={item.title} delay={0.06 + index * 0.03}>
              <div className="card-strong rounded-[28px] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-[#94A3B8]">{item.title}</p>
                    <p className="mt-2 text-[1.9rem] font-semibold tracking-[-0.04em] text-white">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                      {item.meta}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.05] text-[#B8FF3B]">
                    <item.icon size={20} />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <FadeIn delay={0.08}>
            <div className="card-strong rounded-[32px] p-5 md:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[#B8FF3B]">
                    Actions
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    Today&apos;s admin controls
                  </p>
                </div>

                <Button
                  variant="secondary"
                  className="rounded-[16px]"
                  onClick={() => {
                    setRefreshing(true);
                    fetchDashboardData();
                  }}
                >
                  <RefreshCw
                    size={16}
                    className={refreshing ? "animate-spin" : ""}
                  />
                  Refresh
                </Button>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <ExpireButton />

                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.05] text-[#B8FF3B]">
                      <Clock3 size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        Manual follow-up focus
                      </p>
                      <p className="mt-1 text-xs leading-6 text-[#94A3B8]">
                        Pending payments: {pendingPaymentsCount}
                        <br />
                        Urgent cutoffs: {urgentOpenGames.length}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2 text-sm text-[#D7DEE7]">
                    <div className="rounded-[16px] border border-white/10 bg-[#121821] px-3 py-3">
                      Check today&apos;s unpaid bookings before peak hours.
                    </div>
                    <div className="rounded-[16px] border border-white/10 bg-[#121821] px-3 py-3">
                      Review open games close to cutoff and decide if they need manual help.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {quickLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="block">
                    <div className="group relative h-full overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/[0.06]">
                      <div
                        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${link.accent}`}
                      />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />

                      <div className="relative flex h-full flex-col justify-between">
                        <div>
                          <p className="text-lg font-semibold text-white">
                            {link.title}
                          </p>
                          <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                            {link.description}
                          </p>
                        </div>

                        <div className="mt-4 inline-flex items-center gap-2 text-sm text-[#B8FF3B]">
                          Open
                          <ArrowRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="card-strong rounded-[32px] p-5 md:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[#B8FF3B]">
                    Watchlist
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    Open games that need attention
                  </p>
                </div>

                <Link href="/admin/open-games" className="text-sm text-[#B8FF3B]">
                  Manage all
                </Link>
              </div>

              <div className="mt-5 space-y-3">
                {loading ? (
                  <StatePanel
                    variant="loading"
                    title="Loading live game watchlist"
                    text="Checking the latest open games, cutoff pressure, and fill status."
                    className="rounded-[20px] p-4 shadow-none"
                  />
                ) : openGamesWatchlist.length === 0 ? (
                  <StatePanel
                    title="No active open games right now"
                    text="Once hosts publish new open matches, they’ll appear here for quick monitoring."
                    className="rounded-[20px] p-4 shadow-none"
                  />
                ) : (
                  openGamesWatchlist.map((game) => {
                    const remaining = game.maxPlayers - game.currentPlayers;
                    const urgent =
                      new Date(game.cutoffTime).getTime() - Date.now() <=
                        2 * 60 * 60 * 1000 &&
                      new Date(game.cutoffTime) > new Date();

                    return (
                      <div
                        key={game.id}
                        className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-base font-medium text-white">
                                {formatSlotRange(game.booking.slots)}
                              </p>
                              <span
                                className={`inline-flex rounded-full border px-3 py-1 text-xs ${openGameBadge(
                                  game.status,
                                )}`}
                              >
                                {openGameStatusLabel(game.status)}
                              </span>
                              {urgent && (
                                <span className="inline-flex rounded-full border border-[#6C5A14] bg-[#2B2411] px-3 py-1 text-xs text-[#F4D35E]">
                                  Urgent cutoff
                                </span>
                              )}
                            </div>

                            <p className="mt-2 text-sm text-[#94A3B8]">
                              Host: {game.booking.user.name} •{" "}
                              {new Date(game.booking.bookingDate).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </p>
                          </div>

                          <div className="rounded-[18px] border border-white/10 bg-[#121821] px-4 py-3 text-right">
                            <p className="text-xs text-[#94A3B8]">Cutoff</p>
                            <p className="mt-1 text-sm font-medium text-white">
                              {timeUntil(game.cutoffTime)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                          <div className="rounded-[18px] border border-white/10 bg-[#121821] px-4 py-3">
                            <p className="text-xs text-[#94A3B8]">Players</p>
                            <p className="mt-1 text-white">
                              {game.currentPlayers} / {game.maxPlayers}
                            </p>
                          </div>
                          <div className="rounded-[18px] border border-white/10 bg-[#121821] px-4 py-3">
                            <p className="text-xs text-[#94A3B8]">Need to fill</p>
                            <p className="mt-1 text-white">
                              {remaining > 0 ? remaining : 0} spot
                              {remaining === 1 ? "" : "s"}
                            </p>
                          </div>
                          <div className="rounded-[18px] border border-white/10 bg-[#121821] px-4 py-3">
                            <p className="text-xs text-[#94A3B8]">Minimum</p>
                            <p className="mt-1 text-white">{game.minPlayers}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <FadeIn delay={0.16}>
            <div className="card-strong rounded-[32px] p-5 md:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[#B8FF3B]">
                    Activity
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    Recent bookings
                  </p>
                </div>
                <Link href="/admin/bookings" className="text-sm text-[#B8FF3B]">
                  View all
                </Link>
              </div>

              <div className="mt-5 space-y-3">
                {loading ? (
                  <StatePanel
                    variant="loading"
                    title="Loading booking activity"
                    text="Pulling the most recent reservations and payment state."
                    className="rounded-[20px] p-4 shadow-none"
                  />
                ) : recentBookings.length === 0 ? (
                  <StatePanel
                    title="No recent bookings yet"
                    text="Once new reservations start coming in, this panel will show the latest activity."
                    className="rounded-[20px] p-4 shadow-none"
                  />
                ) : (
                  recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-base font-medium text-white">
                              {formatSlotRange(booking.slots)}
                            </p>
                            <span
                              className={`inline-flex rounded-full border px-3 py-1 text-xs ${bookingBadge(
                                booking.status,
                              )}`}
                            >
                              {bookingStatusLabel(booking.status)}
                            </span>
                            <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[#D7DEE7]">
                              {booking.paymentStatus === "PAID"
                                ? "Paid"
                                : "Pending"}
                            </span>
                          </div>

                          <p className="mt-2 text-sm text-[#94A3B8]">
                            {booking.user.name} • {booking.bookingType} •{" "}
                            {booking.playersCount} players
                          </p>
                        </div>

                        <div className="rounded-[18px] border border-white/10 bg-[#121821] px-4 py-3 text-right">
                          <p className="text-xs text-[#94A3B8]">Booking total</p>
                          <p className="mt-1 text-sm font-medium text-white">
                            NPR {booking.totalPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="card-strong rounded-[32px] p-5 md:p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-[#B8FF3B]">
                  Snapshot
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  Daily operating signals
                </p>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  {
                    label: "Total bookings in system",
                    value: String(bookings.length),
                  },
                  {
                    label: "Today's active bookings",
                    value: String(activeTodaysBookings.length),
                  },
                  {
                    label: "Pending fill open games",
                    value: String(pendingFillGames.length),
                  },
                  {
                    label: "Confirmed or full open games",
                    value: String(
                      activeOpenGames.filter(
                        (game) =>
                          game.status === "CONFIRMED" || game.status === "FULL",
                      ).length,
                    ),
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4"
                  >
                    <p className="text-sm text-[#94A3B8]">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
