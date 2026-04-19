"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  format,
  formatDistanceToNowStrict,
  isToday,
  isTomorrow,
  parseISO,
} from "date-fns";
import {
  ArrowRight,
  CalendarDays,
  Users,
  Clock3,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Timer,
} from "lucide-react";
import Button from "@/components/ui/button";
import FadeIn from "@/components/ui/fade-in";
import ModalShell from "@/components/ui/modal-shell";
import SectionHeading from "@/components/ui/section-heading";
import StatePanel from "@/components/ui/state-panel";
import { useSession } from "next-auth/react";

type ApiSlot = {
  id: string;
  slotDate: string;
  startHour: number;
  endHour: number;
  price: number;
};

type ApiOpenGame = {
  id: string;
  status: "PENDING_FILL" | "CONFIRMED" | "FULL" | "EXPIRED" | "CANCELLED";
  currentPlayers: number;
  minPlayers: number;
  maxPlayers: number;
  cutoffTime: string;
  participants: {
    id: string;
    playersJoined: number;
    user: {
      id: string;
      name: string;
    };
  }[];
  booking: {
    id: string;
    bookingDate: string;
    user: {
      id: string;
      name: string;
      phone: string;
      email?: string | null;
    };
    slots: ApiSlot[];
  };
};

type OpenGameCard = {
  id: string;
  dateLabel: string;
  dateValue: string;
  time: string;
  currentPlayers: number;
  maxPlayers: number;
  host: string;
  participants: string[];
  spotsLeft: number;
  note: string;
  cutoffLabel: string;
  cutoffStatus: "open" | "urgent" | "closed";
  status: "PENDING_FILL" | "CONFIRMED" | "FULL" | "EXPIRED" | "CANCELLED";
};

function hourTo12(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const normalized = hour % 12 === 0 ? 12 : hour % 12;
  return `${normalized}:00 ${suffix}`;
}

function formatSlotRange(slots: ApiSlot[]) {
  if (!slots.length) return "Time unavailable";

  const sorted = [...slots].sort((a, b) => a.startHour - b.startHour);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  return `${hourTo12(first.startHour)} - ${hourTo12(last.endHour)}`;
}

function getDateLabel(date: Date) {
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return format(date, "EEEE");
}

function getStatusBadge(status: OpenGameCard["status"]) {
  if (status === "FULL") {
    return "border-[#0E4D38] bg-[#0F2A22] text-[#7EF7C1]";
  }

  if (status === "CONFIRMED") {
    return "border-[#476B0D] bg-[#22310D] text-[#B8FF3B]";
  }

  return "border-[#6C5A14] bg-[#2B2411] text-[#F4D35E]";
}

function getCutoffDetails(cutoffTime: Date) {
  const now = new Date();
  const diff = cutoffTime.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      label: "Join cutoff passed",
      status: "closed" as const,
    };
  }

  const distance = formatDistanceToNowStrict(cutoffTime, {
    addSuffix: true,
  });

  if (diff <= 2 * 60 * 60 * 1000) {
    return {
      label: `Cutoff ${distance}`,
      status: "urgent" as const,
    };
  }

  return {
    label: `Cutoff ${distance}`,
    status: "open" as const,
  };
}

function hasGameStarted(game: ApiOpenGame) {
  if (!game.booking.slots.length) return true;

  const bookingDate = parseISO(game.booking.bookingDate);
  const earliestStartHour = Math.min(
    ...game.booking.slots.map((slot) => slot.startHour),
  );
  const gameStart = new Date(bookingDate);
  gameStart.setHours(earliestStartHour, 0, 0, 0);

  return gameStart <= new Date();
}

const joinRules = [
  {
    title: "Join solo or with friends",
    text: "You can join with more than one player as long as the remaining spots allow it.",
    icon: UserPlus,
  },
  {
    title: "Cutoff keeps matches reliable",
    text: "Only upcoming games before the join cutoff are shown, so every card is actually joinable.",
    icon: Timer,
  },
  {
    title: "Your account confirms the join",
    text: "Sign-in keeps the player list clean and makes open games easier to manage.",
    icon: ShieldCheck,
  },
];

export default function GamesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [games, setGames] = useState<OpenGameCard[]>([]);
  const [selectedGame, setSelectedGame] = useState<OpenGameCard | null>(null);
  const [joinCount, setJoinCount] = useState(1);
  const [loadingGames, setLoadingGames] = useState(true);
  const [gamesError, setGamesError] = useState("");
  const [joinError, setJoinError] = useState("");
  const [joining, setJoining] = useState(false);

  const fetchGames = async () => {
    try {
      setLoadingGames(true);
      setGamesError("");

      const res = await fetch("/api/open-games", { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to load open games");
      }

      const mapped: OpenGameCard[] = (data.openGames as ApiOpenGame[])
        .filter(
          (game) =>
            game.status === "PENDING_FILL" ||
            game.status === "CONFIRMED" ||
            game.status === "FULL",
        )
        .filter((game) => {
          const cutoffTime = parseISO(game.cutoffTime);
          return cutoffTime > new Date() && !hasGameStarted(game);
        })
        .map((game) => {
          const bookingDate = parseISO(game.booking.bookingDate);
          const cutoffTime = parseISO(game.cutoffTime);
          const spotsLeft = game.maxPlayers - game.currentPlayers;
          const cutoff = getCutoffDetails(cutoffTime);

          return {
            id: game.id,
            dateLabel: getDateLabel(bookingDate),
            dateValue: format(bookingDate, "MMM d"),
            time: formatSlotRange(game.booking.slots),
            currentPlayers: game.currentPlayers,
            maxPlayers: game.maxPlayers,
            host: game.booking.user.name,
            participants: game.participants.map(
              (participant) => participant.user.name,
            ),
            spotsLeft,
            note:
              game.status === "CONFIRMED"
                ? "Minimum players reached. More players can still join until full."
                : `Need ${spotsLeft} more player${spotsLeft > 1 ? "s" : ""} to fill the game.`,
            cutoffLabel: cutoff.label,
            cutoffStatus: cutoff.status,
            status: game.status,
          };
        });

      setGames(mapped);
    } catch (error: unknown) {
      setGamesError(
        error instanceof Error ? error.message : "Failed to load games",
      );
    } finally {
      setLoadingGames(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleOpenJoin = (game: OpenGameCard) => {
    if (
      game.status === "EXPIRED" ||
      game.status === "CANCELLED" ||
      game.status === "FULL"
    ) {
      return;
    }

    setSelectedGame(game);
    setJoinCount(1);
    setJoinError("");
  };

  const remainingSpots = useMemo(() => {
    if (!selectedGame) return 0;
    return selectedGame.maxPlayers - selectedGame.currentPlayers;
  }, [selectedGame]);

  const canJoin =
    !!selectedGame &&
    (selectedGame.status === "PENDING_FILL" ||
      selectedGame.status === "CONFIRMED") &&
    joinCount <= remainingSpots &&
    joinCount > 0 &&
    remainingSpots > 0;

  const handleJoin = async () => {
    if (!selectedGame) return;
    if (
      selectedGame.status !== "PENDING_FILL" &&
      selectedGame.status !== "CONFIRMED"
    ) {
      setJoinError("This game is no longer available for joining.");
      return;
    }

    try {
      setJoining(true);
      setJoinError("");

      const res = await fetch("/api/open-games/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          openGameId: selectedGame.id,
          playersJoined: joinCount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || data?.details || "Failed to join game");
      }

      await fetchGames();
      setSelectedGame(null);
    } catch (error: unknown) {
      setJoinError(
        error instanceof Error ? error.message : "Failed to join game",
      );
    } finally {
      setJoining(false);
    }
  };

  const activeGames = games.filter(
    (game) => game.status === "PENDING_FILL" || game.status === "CONFIRMED",
  );
  const selectedParticipants = selectedGame?.participants || [];
  const urgentGames = activeGames.filter(
    (game) => game.cutoffStatus === "urgent",
  ).length;
  const almostFullGames = activeGames.filter((game) => game.spotsLeft <= 2).length;

  return (
    <main className="min-h-screen pb-20">
      <section className="container py-6 md:py-12">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.26)] backdrop-blur-2xl md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(184,255,59,0.08),transparent_18%),radial-gradient(circle_at_80%_30%,rgba(184,255,59,0.08),transparent_18%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-white/12" />

            <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(18,22,28,0.24)] px-4 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-xl">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#B8FF3B] shadow-[0_0_14px_rgba(184,255,59,0.55)]" />
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#B8FF3B]">
                    Join a game
                  </span>
                </div>

                <h1 className="mt-5 text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.05em] text-white sm:text-[2.6rem] md:text-[4.6rem]">
                  Find open games and fill the missing spots.
                </h1>

                <p className="mt-5 max-w-2xl text-[15px] leading-8 text-[#94A3B8] md:text-base">
                  Browse open games created by other players and join with one
                  or more players until the match fills up.
                </p>

                <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#C9D2DC]">
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    5v5 only
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Join with multiple players
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Sign in required
                  </div>
                </div>

                <div className="mt-7 grid gap-3 sm:mt-8 sm:grid-cols-3">
                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm text-[#94A3B8]">Available now</p>
                    <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                      {activeGames.length}
                    </p>
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm text-[#94A3B8]">Urgent cutoff</p>
                    <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                      {urgentGames}
                    </p>
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm text-[#94A3B8]">Almost full</p>
                    <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                      {almostFullGames}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:pr-2">
                <div className="overflow-hidden rounded-[26px] border border-white/12 bg-[rgba(20,24,30,0.30)] shadow-[0_20px_60px_rgba(0,0,0,0.24),0_0_30px_rgba(184,255,59,0.06)] backdrop-blur-2xl">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_45%,rgba(255,255,255,0.02)_100%)]" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/18" />

                  <div className="relative flex items-center gap-3 px-5 py-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.08] text-[#B8FF3B]">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-[#D7DEE7]">Most active time</p>
                      <p className="text-lg font-semibold text-white">
                        Evening games
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="container pb-10 md:pb-16">
        <FadeIn delay={0.12}>
          <SectionHeading
            eyebrow="How open games work"
            title="Everything important is visible before you join."
            text="The page is built so a player can quickly judge whether a game is worth joining right now: time, host, spots left, and cutoff urgency."
          />
        </FadeIn>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {joinRules.map((rule, index) => {
            const Icon = rule.icon;

            return (
              <FadeIn key={rule.title} delay={0.16 + index * 0.06}>
                <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-all duration-300 will-change-transform hover:-translate-y-[4px] hover:border-white/14">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)] opacity-70" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />

                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.04] text-[#B8FF3B] transition-transform duration-300 group-hover:scale-[1.04] group-hover:rotate-[6deg]">
                      <Icon size={20} strokeWidth={1.9} />
                    </div>

                    <h2 className="mt-6 text-[1.7rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
                      {rule.title}
                    </h2>

                    <p className="mt-4 text-[15px] leading-8 text-[#94A3B8]">
                      {rule.text}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="container pb-16 md:pb-20">
        {loadingGames ? (
          <StatePanel
            variant="loading"
            eyebrow="Loading"
            title="Checking live open games"
            text="We’re pulling the latest joinable matches, cutoff timing, and player counts for you."
          />
        ) : gamesError ? (
          <StatePanel
            variant="error"
            eyebrow="Couldn’t load games"
            title="The open games list didn’t come through"
            text={gamesError}
            actions={
              <Button
                variant="secondary"
                className="rounded-[999px]"
                onClick={() => fetchGames()}
              >
                Try Again
              </Button>
            }
          />
        ) : activeGames.length === 0 ? (
          <StatePanel
            eyebrow="No games right now"
            title="Nothing joinable is live at the moment"
            text="Once a host creates an open game, it will appear here until the cutoff passes. You can still book your own slot and create the next match others join."
            actions={
              <>
                <Button
                  className="rounded-[999px]"
                  onClick={() => router.push("/book")}
                >
                  Book a Slot
                </Button>
                <Button
                  variant="secondary"
                  className="rounded-[999px]"
                  onClick={() => fetchGames()}
                >
                  Refresh Games
                </Button>
              </>
            }
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
            {activeGames.map((game, index) => {
              const progress = (game.currentPlayers / game.maxPlayers) * 100;
              const canJoinGame =
                game.status !== "FULL" &&
                game.status !== "EXPIRED" &&
                game.status !== "CANCELLED" &&
                game.cutoffStatus !== "closed";

              return (
                <FadeIn key={game.id} delay={0.08 * index}>
                  <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-all duration-300 will-change-transform hover:-translate-y-[4px] hover:border-white/14">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)] opacity-70" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />
                    <div className="pointer-events-none absolute -right-8 top-6 h-20 w-20 rounded-full bg-[#B8FF3B]/8 blur-2xl" />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-[#C9D2DC]">
                            <CalendarDays
                              size={13}
                              className="text-[#B8FF3B]"
                            />
                            {game.dateLabel} · {game.dateValue}
                          </div>

                          <p className="mt-4 text-[1.45rem] font-semibold leading-tight tracking-[-0.03em] text-white">
                            {game.time}
                          </p>
                        </div>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs ${getStatusBadge(game.status)}`}
                        >
                          {game.status === "CONFIRMED" ? "Confirmed" : "Open"}
                        </span>
                      </div>

                      <div className="mt-5 flex items-center gap-2 text-sm text-[#94A3B8]">
                        <Users size={15} className="text-[#B8FF3B]" />
                        Hosted by {game.host}
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-sm text-[#94A3B8]">
                        <Timer size={15} className="text-[#B8FF3B]" />
                        <span
                          className={
                            game.cutoffStatus === "urgent"
                              ? "text-[#F4D35E]"
                              : game.cutoffStatus === "closed"
                                ? "text-[#FF9999]"
                                : "text-[#94A3B8]"
                          }
                        >
                          {game.cutoffLabel}
                        </span>
                      </div>

                      <div className="mt-5">
                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <p className="text-3xl font-semibold tracking-[-0.04em] text-white">
                              {game.currentPlayers} / {game.maxPlayers}
                            </p>
                            <p className="mt-1 text-sm text-[#94A3B8]">
                              {game.spotsLeft === 0
                                ? "Game full"
                                : `Need ${game.spotsLeft} more player${
                                    game.spotsLeft > 1 ? "s" : ""
                                  }`}
                            </p>
                          </div>

                          <div className="flex h-10 w-10 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.04] text-[#B8FF3B] transition-transform duration-300 group-hover:rotate-[8deg] group-hover:scale-[1.04]">
                            <Clock3 size={18} />
                          </div>
                        </div>

                        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-[#B8FF3B] transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm text-[#94A3B8]">
                              Match readiness
                            </p>
                            <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                              {game.note}
                            </p>
                          </div>
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.04] text-[#B8FF3B]">
                            <Sparkles size={18} />
                          </div>
                        </div>
                      </div>

                      {game.participants.length > 0 && (
                        <div className="mt-4 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                          <p className="text-sm text-[#94A3B8]">
                            Players joined
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {game.participants.slice(0, 4).map((participant) => (
                              <span
                                key={`${game.id}-${participant}`}
                                className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[#D7DEE7]"
                              >
                                {participant}
                              </span>
                            ))}
                            {game.participants.length > 4 && (
                              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[#94A3B8]">
                                +{game.participants.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="mt-5">
                        {status === "loading" ? (
                          <Button
                            className="w-full rounded-[999px] shadow-[0_14px_34px_rgba(184,255,59,0.20)]"
                            disabled
                          >
                            Checking account...
                          </Button>
                        ) : session?.user ? (
                          <Button
                            className="w-full rounded-[999px] shadow-[0_14px_34px_rgba(184,255,59,0.20)]"
                            onClick={() => handleOpenJoin(game)}
                            disabled={!canJoinGame}
                          >
                            {game.status === "FULL"
                              ? "Game Full"
                              : game.cutoffStatus === "closed"
                                ? "Cutoff Passed"
                              : game.status === "EXPIRED" ||
                                  game.status === "CANCELLED"
                                ? "Unavailable"
                                : "Join Game"}
                          </Button>
                        ) : (
                          <Button
                            className="w-full rounded-[999px] shadow-[0_14px_34px_rgba(184,255,59,0.20)]"
                            disabled={!canJoinGame}
                            onClick={() => {
                              const currentUrl =
                                typeof window !== "undefined"
                                  ? window.location.pathname +
                                    window.location.search
                                  : "/games";

                              router.push(
                                `/login?callbackUrl=${encodeURIComponent(currentUrl)}`,
                              );
                            }}
                          >
                            {game.status === "FULL"
                              ? "Game Full"
                              : game.cutoffStatus === "closed"
                                ? "Cutoff Passed"
                              : game.status === "EXPIRED" ||
                                  game.status === "CANCELLED"
                                ? "Unavailable"
                                : "Login to Join"}
                          </Button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleOpenJoin(game)}
                          disabled={!canJoinGame || !session?.user}
                          className="mt-3 flex w-full items-center justify-center gap-2 rounded-[999px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[#D7DEE7] transition hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          View join details <ArrowRight size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        )}
      </section>

      <ModalShell
        open={!!selectedGame}
        onClose={() => setSelectedGame(null)}
        panelClassName="max-w-lg"
      >
        {selectedGame && (
          <div className="w-full overflow-hidden rounded-[32px] border border-white/10 bg-[rgba(10,14,19,0.88)] shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
            <div className="relative p-5 md:p-6">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)] opacity-70" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#B8FF3B]">
                      Join game
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
                      {selectedGame.time}
                    </h3>
                    <p className="mt-2 text-sm text-[#94A3B8]">
                      {selectedGame.dateLabel} · {selectedGame.dateValue}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedGame(null)}
                    className="tap-soft rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-[#C9D2DC] transition hover:bg-white/[0.08]"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.04] text-[#B8FF3B]">
                      <ShieldCheck size={18} />
                    </div>

                    <div>
                      <p className="text-base font-medium text-white">
                        Spots left: {remainingSpots}
                      </p>
                      <p className="mt-1 text-sm leading-7 text-[#94A3B8]">
                        You can join with one or more players, as long as the
                        total does not exceed the remaining spots.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm text-[#94A3B8]">Host</p>
                    <p className="mt-2 text-base font-medium text-white">
                      {selectedGame.host}
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm text-[#94A3B8]">Join cutoff</p>
                    <p
                      className={`mt-2 text-base font-medium ${
                        selectedGame.cutoffStatus === "urgent"
                          ? "text-[#F4D35E]"
                          : selectedGame.cutoffStatus === "closed"
                            ? "text-[#FF9999]"
                            : "text-white"
                      }`}
                    >
                      {selectedGame.cutoffLabel}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.04] text-[#B8FF3B]">
                      <UserPlus size={18} />
                    </div>

                    <div className="w-full">
                      <p className="text-sm text-[#94A3B8]">
                        How many players are joining?
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setJoinCount((prev) => Math.max(1, prev - 1))
                          }
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.08]"
                        >
                          -
                        </button>

                        <div className="min-w-[60px] text-center">
                          <p className="text-2xl font-semibold tracking-[-0.03em] text-white">
                            {joinCount}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setJoinCount((prev) =>
                              Math.min(remainingSpots, prev + 1),
                            )
                          }
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.08]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedParticipants.length > 0 && (
                  <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm text-[#94A3B8]">Joined players</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedParticipants.map((participant) => (
                        <span
                          key={`${selectedGame.id}-${participant}`}
                          className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[#D7DEE7]"
                        >
                          {participant}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm text-[#94A3B8]">Joining as</p>
                  <p className="mt-2 text-base font-medium text-white">
                    {session?.user?.name || "Logged-in user"}
                  </p>
                  <p className="mt-1 text-sm text-[#94A3B8]">
                    {session?.user?.email || "Account email unavailable"}
                  </p>
                </div>

                {joinError && (
                  <div className="mt-4 rounded-[18px] border border-[#4D2A2F] bg-[#241519] px-4 py-3">
                    <p className="text-sm text-[#FFB4B4]">{joinError}</p>
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  {status === "loading" ? (
                    <Button
                      className="w-full rounded-[999px] shadow-[0_14px_34px_rgba(184,255,59,0.20)]"
                      disabled
                    >
                      Checking account...
                    </Button>
                  ) : session?.user ? (
                    <Button
                      className="w-full rounded-[999px] shadow-[0_14px_34px_rgba(184,255,59,0.20)]"
                      disabled={!canJoin || joining}
                      onClick={handleJoin}
                    >
                      {joining ? "Joining..." : "Confirm Join"}
                    </Button>
                  ) : (
                    <Button
                      className="w-full rounded-[999px] shadow-[0_14px_34px_rgba(184,255,59,0.20)]"
                      onClick={() => {
                        const currentUrl =
                          typeof window !== "undefined"
                            ? window.location.pathname + window.location.search
                            : "/games";

                        router.push(
                          `/login?callbackUrl=${encodeURIComponent(currentUrl)}`,
                        );
                      }}
                    >
                      Login to Join
                    </Button>
                  )}

                  <Button
                    variant="secondary"
                    className="w-full rounded-[999px]"
                    onClick={() => setSelectedGame(null)}
                  >
                    Cancel
                  </Button>
                </div>

                {!session?.user && status !== "loading" && (
                  <p className="text-center text-sm text-[#94A3B8]">
                    You need to sign in before joining an open game.
                  </p>
                )}

                <p className="mt-4 text-xs leading-7 text-[#94A3B8]">
                  Your account will be used for this join request and the player
                  count will update after confirmation.
                </p>
              </div>
            </div>
          </div>
        )}
      </ModalShell>
    </main>
  );
}
