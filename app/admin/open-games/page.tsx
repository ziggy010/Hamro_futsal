"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, ChevronRight, Users } from "lucide-react";
import Button from "@/components/ui/button";
import ModalShell from "@/components/ui/modal-shell";
import StatePanel from "@/components/ui/state-panel";
import { getErrorMessage } from "@/lib/utils/error-message";

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
  participants: {
    id: string;
    playersJoined: number;
    createdAt: string;
    user: {
      id: string;
      name: string;
      phone: string;
    };
  }[];
};

function hourTo12(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const normalized = hour % 12 === 0 ? 12 : hour % 12;
  return `${normalized}:00 ${suffix}`;
}

function formatSlotRange(slots: { startHour: number; endHour: number }[]) {
  if (!slots.length) return "Time unavailable";

  const sorted = [...slots].sort((a, b) => a.startHour - b.startHour);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  return `${hourTo12(first.startHour)} – ${hourTo12(last.endHour)}`;
}

function formatDate(dateString: string) {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function statusLabel(status: OpenGameApi["status"]) {
  if (status === "PENDING_FILL") return "Pending Fill";
  if (status === "CONFIRMED") return "Confirmed";
  if (status === "FULL") return "Full";
  if (status === "EXPIRED") return "Expired";
  return "Cancelled";
}

function statusClasses(status: OpenGameApi["status"]) {
  if (status === "CONFIRMED") {
    return "border-[#476B0D] bg-[#22310D] text-[#B8FF3B]";
  }

  if (status === "PENDING_FILL") {
    return "border-[#6C5A14] bg-[#2B2411] text-[#F4D35E]";
  }

  if (status === "FULL") {
    return "border-[#0E4D38] bg-[#0F2A22] text-[#7EF7C1]";
  }

  return "border-[#4D2A2F] bg-[#241519] text-[#FF9999]";
}

export default function AdminOpenGamesPage() {
  const [games, setGames] = useState<OpenGameApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedGame, setSelectedGame] = useState<OpenGameApi | null>(null);

  const fetchGames = async () => {
    try {
      setError("");
      const res = await fetch("/api/open-games", { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to load open games");
      }

      setGames(data.openGames || []);
    } catch (error: unknown) {
      setError(getErrorMessage(error, "Failed to load open games"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const activeGames = useMemo(() => {
    return games.filter(
      (g) =>
        g.status === "PENDING_FILL" ||
        g.status === "CONFIRMED" ||
        g.status === "FULL",
    );
  }, [games]);

  const expiredGames = useMemo(() => {
    return games.filter(
      (g) => g.status === "EXPIRED" || g.status === "CANCELLED",
    );
  }, [games]);

  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-[#B8FF3B]">
            Admin
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
            Open Games
          </h1>
          <p className="mt-2 text-[#94A3B8]">
            Manage all open games and track player fill status.
          </p>
        </div>

        {error && (
          <div className="mb-6">
            <StatePanel
              variant="error"
              eyebrow="Couldn’t load open games"
              title="The open-game board is temporarily unavailable"
              text={error}
              actions={
                <Button
                  variant="secondary"
                  className="rounded-[999px]"
                  onClick={() => {
                    setLoading(true);
                    fetchGames();
                  }}
                >
                  Try Again
                </Button>
              }
            />
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          {/* ACTIVE */}
          <div className="card-strong p-5">
            <p className="text-lg font-semibold text-white">Active Games</p>

            <div className="mt-4 space-y-4">
              {loading ? (
                <StatePanel
                  variant="loading"
                  title="Loading active open games"
                  text="Checking player counts, hosts, and current fill status."
                  className="rounded-[22px] p-4 shadow-none"
                />
              ) : activeGames.length === 0 ? (
                <StatePanel
                  title="No active open games"
                  text="When players create new public matches, they’ll appear here for review and action."
                  className="rounded-[22px] p-4 shadow-none"
                />
              ) : (
                activeGames.map((game) => {
                  const remaining = game.maxPlayers - game.currentPlayers;

                  return (
                    <div
                      key={game.id}
                      className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-base font-medium text-white">
                            {formatSlotRange(game.booking.slots)}
                          </p>

                          <p className="mt-1 text-xs text-[#94A3B8]">
                            {formatDate(game.booking.bookingDate)}
                          </p>
                        </div>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs ${statusClasses(
                            game.status,
                          )}`}
                        >
                          {statusLabel(game.status)}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-sm text-[#94A3B8]">
                        <Users size={14} className="text-[#B8FF3B]" />
                        Host: {game.booking.user.name}
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-sm text-[#94A3B8]">
                        <CalendarDays size={14} className="text-[#B8FF3B]" />
                        {game.currentPlayers}/{game.maxPlayers} players
                      </div>

                      <div className="mt-2 text-sm text-[#94A3B8]">
                        {remaining > 0
                          ? `Need ${remaining} more player${remaining > 1 ? "s" : ""}`
                          : "No remaining spots"}
                      </div>

                      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                        <Button
                          variant="secondary"
                          className="flex-1 rounded-[14px]"
                          onClick={async () => {
                            if (!confirm("Cancel this open game?")) return;

                            try {
                              const res = await fetch(
                                "/api/open-games/cancel",
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({ openGameId: game.id }),
                                },
                              );

                              const data = await res.json();

                              if (!res.ok) {
                                throw new Error(
                                  data?.error || "Failed to cancel",
                                );
                              }

                              fetchGames();
                            } catch (error: unknown) {
                              alert(
                                getErrorMessage(error, "Error cancelling game"),
                              );
                            }
                          }}
                          disabled={
                            game.status === "CANCELLED" ||
                            game.status === "EXPIRED"
                          }
                        >
                          Cancel
                        </Button>
                        <Button
                          className="flex-1 rounded-[14px]"
                          onClick={() => setSelectedGame(game)}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* EXPIRED */}
          <div className="card-strong p-5">
            <p className="text-lg font-semibold text-white">
              Expired / Cancelled
            </p>

            <div className="mt-4 space-y-4">
              {loading ? (
                <StatePanel
                  variant="loading"
                  title="Loading inactive games"
                  text="Checking expired and cancelled records."
                  className="rounded-[22px] p-4 shadow-none"
                />
              ) : expiredGames.length === 0 ? (
                <StatePanel
                  title="No expired or cancelled games"
                  text="This column will keep older inactive records when they exist."
                  className="rounded-[22px] p-4 shadow-none"
                />
              ) : (
                expiredGames.map((game) => (
                  <div
                    key={game.id}
                    className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm text-white">
                        {formatSlotRange(game.booking.slots)}
                      </p>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs ${statusClasses(
                          game.status,
                        )}`}
                      >
                        {statusLabel(game.status)}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-[#94A3B8]">
                      Host: {game.booking.user.name}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* SIDE LINKS */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link
            href="/admin"
            className="flex items-center justify-between rounded-[20px] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white transition hover:border-white/14"
          >
            Dashboard
            <ChevronRight size={16} />
          </Link>

          <Link
            href="/admin/bookings"
            className="flex items-center justify-between rounded-[20px] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white transition hover:border-white/14"
          >
            Bookings
            <ChevronRight size={16} />
          </Link>

          <Link
            href="/admin/slots"
            className="flex items-center justify-between rounded-[20px] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white transition hover:border-white/14"
          >
            Slots
            <ChevronRight size={16} />
          </Link>
        </div>
      </section>
      <ModalShell
        open={!!selectedGame}
        onClose={() => setSelectedGame(null)}
        panelClassName="max-w-xl"
      >
        {selectedGame && (
          <div className="w-full overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(10,14,19,0.92)] shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:rounded-[32px]">
            <div className="relative p-5 md:p-6">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)] opacity-70" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#B8FF3B]">
                      Open game details
                    </p>
                    <h3 className="mt-2 text-[1.5rem] font-semibold tracking-[-0.03em] text-white md:text-2xl">
                      {formatSlotRange(selectedGame.booking.slots)}
                    </h3>
                    <p className="mt-2 text-sm text-[#94A3B8]">
                      {formatDate(selectedGame.booking.bookingDate)}
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

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm text-[#94A3B8]">Host</p>
                    <p className="mt-1 text-base font-medium text-white">
                      {selectedGame.booking.user.name}
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm text-[#94A3B8]">Phone</p>
                    <p className="mt-1 text-base font-medium text-white">
                      {selectedGame.booking.user.phone}
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm text-[#94A3B8]">Players</p>
                    <p className="mt-1 text-base font-medium text-white">
                      {selectedGame.currentPlayers} / {selectedGame.maxPlayers}
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm text-[#94A3B8]">Status</p>
                    <p className="mt-1 text-base font-medium text-white">
                      {statusLabel(selectedGame.status)}
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm text-[#94A3B8]">Minimum players</p>
                    <p className="mt-1 text-base font-medium text-white">
                      {selectedGame.minPlayers}
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm text-[#94A3B8]">Cutoff time</p>
                    <p className="mt-1 text-base font-medium text-white">
                      {new Date(selectedGame.cutoffTime).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm text-[#94A3B8]">Joined players</p>

                  {selectedGame.participants.length === 0 ? (
                    <div className="mt-3">
                      <StatePanel
                        title="No joined players yet"
                        text="This host booking is still waiting for the first participant to join."
                        className="rounded-[18px] p-4 shadow-none"
                      />
                    </div>
                  ) : (
                    <div className="mt-3 space-y-3">
                      {selectedGame.participants.map((participant) => (
                        <div
                          key={participant.id}
                          className="rounded-[18px] border border-white/10 bg-[#121821] px-4 py-3"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <p className="text-sm font-medium text-white">
                                {participant.user.name}
                              </p>
                              <p className="mt-1 text-xs text-[#94A3B8]">
                                {participant.user.phone}
                              </p>
                            </div>

                            <div className="sm:text-right">
                              <p className="text-sm font-medium text-white">
                                +{participant.playersJoined} player
                                {participant.playersJoined > 1 ? "s" : ""}
                              </p>
                              <p className="mt-1 text-xs text-[#94A3B8]">
                                {new Date(
                                  participant.createdAt,
                                ).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    variant="secondary"
                    className="rounded-[16px] px-5"
                    onClick={() => setSelectedGame(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </ModalShell>
    </main>
  );
}
