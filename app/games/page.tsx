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
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/ui/fade-in";
import ModalShell from "@/components/ui/modal-shell";
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
  return `${hourTo12(first.startHour)} – ${hourTo12(last.endHour)}`;
}

function getDateLabel(date: Date) {
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return format(date, "EEEE");
}

function getStatusStyle(status: OpenGameCard["status"]): React.CSSProperties {
  if (status === "FULL")
    return { color: "#7EF7C1", borderColor: "rgba(14,77,56,0.5)", background: "rgba(15,42,34,0.5)" };
  if (status === "CONFIRMED")
    return { color: "#B8FF3B", borderColor: "rgba(71,107,13,0.45)", background: "rgba(34,49,13,0.5)" };
  return { color: "#F4D35E", borderColor: "rgba(108,90,20,0.45)", background: "rgba(43,36,17,0.5)" };
}

function getCutoffDetails(cutoffTime: Date) {
  const now = new Date();
  const diff = cutoffTime.getTime() - now.getTime();

  if (diff <= 0) {
    return { label: "Join cutoff passed", status: "closed" as const };
  }

  const distance = formatDistanceToNowStrict(cutoffTime, { addSuffix: true });

  if (diff <= 2 * 60 * 60 * 1000) {
    return { label: `Cutoff ${distance}`, status: "urgent" as const };
  }

  return { label: `Cutoff ${distance}`, status: "open" as const };
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
    n: "01",
    title: "Join solo or with friends",
    text: "You can join with more than one player as long as the remaining spots allow it.",
  },
  {
    n: "02",
    title: "Cutoff keeps matches reliable",
    text: "Only upcoming games before the join cutoff are shown, so every card is actually joinable.",
  },
  {
    n: "03",
    title: "Your account confirms the join",
    text: "Sign-in keeps the player list clean and makes open games easier to manage.",
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
            participants: game.participants.map((p) => p.user.name),
            spotsLeft,
            note:
              game.status === "CONFIRMED"
                ? "Minimum reached. More players can still join until full."
                : `Need ${spotsLeft} more player${spotsLeft > 1 ? "s" : ""} to confirm the game.`,
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
        headers: { "Content-Type": "application/json" },
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
  const urgentGames = activeGames.filter((g) => g.cutoffStatus === "urgent").length;
  const almostFullGames = activeGames.filter((g) => g.spotsLeft <= 2).length;

  const cutoffColor = (s: OpenGameCard["cutoffStatus"]) =>
    s === "urgent" ? "#F4D35E" : s === "closed" ? "#FF9999" : "var(--fg-2)";

  return (
    <main className="min-h-screen pb-20">

      {/* ── Hero — raw editorial, no card ── */}
      <section className="container pt-12 pb-14 md:pt-20 md:pb-16">
        <FadeIn>
          <span className="eyebrow">Open games</span>
          <h1
            style={{
              fontFamily: "var(--f-sans)",
              fontWeight: 700,
              fontSize: "clamp(2.6rem,6.5vw,5.8rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.05em",
              color: "var(--fg)",
              marginTop: "1.1rem",
              maxWidth: "16ch",
            }}
          >
            Find a game.<br />Fill the missing spot.
          </h1>
          <p
            style={{
              marginTop: "1.5rem",
              maxWidth: "48ch",
              fontSize: "17px",
              lineHeight: 1.75,
              color: "var(--fg-3)",
            }}
          >
            Browse open games created by other players and join with one or
            more players until the match fills up.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            style={{
              marginTop: "2.5rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--line)",
              display: "flex",
              flexWrap: "wrap",
              gap: "0 3rem",
              fontFamily: "var(--f-mono)",
              fontSize: "13px",
              color: "var(--fg-dim)",
            }}
          >
            <span>
              <span style={{ color: "var(--fg-2)", fontWeight: 500 }}>{activeGames.length}</span>
              {" "}joinable now
            </span>
            <span>
              <span style={{ color: urgentGames > 0 ? "#F4D35E" : "var(--fg-2)", fontWeight: 500 }}>{urgentGames}</span>
              {" "}urgent cutoff
            </span>
            <span>
              <span style={{ color: "var(--fg-2)", fontWeight: 500 }}>{almostFullGames}</span>
              {" "}almost full
            </span>
            <span style={{ color: "var(--fg-dim)" }}>5v5 · sign-in required</span>
          </div>
        </FadeIn>
      </section>

      {/* ── How it works — numbered list with dividers ── */}
      <section className="container pb-14 md:pb-18">
        <FadeIn>
          <span className="eyebrow">How it works</span>
          <h2
            style={{
              fontFamily: "var(--f-sans)",
              fontWeight: 600,
              fontSize: "clamp(1.8rem,3.2vw,2.8rem)",
              letterSpacing: "-0.04em",
              color: "var(--fg)",
              marginTop: "0.9rem",
            }}
          >
            Everything important is visible before you join.
          </h2>
        </FadeIn>

        <div style={{ marginTop: "2.5rem", maxWidth: "640px" }}>
          {joinRules.map((rule, i) => (
            <FadeIn key={rule.n} delay={0.08 + i * 0.06}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "3rem 1fr",
                  gap: "0 1.5rem",
                  padding: "1.75rem 0",
                  borderTop: "1px solid var(--line)",
                  alignItems: "start",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: "12px",
                    color: "var(--fg-dim)",
                    paddingTop: "3px",
                  }}
                >
                  {rule.n}
                </span>
                <div>
                  <p
                    style={{
                      fontSize: "17px",
                      fontWeight: 600,
                      color: "var(--fg)",
                      lineHeight: 1.35,
                    }}
                  >
                    {rule.title}
                  </p>
                  <p
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "15px",
                      lineHeight: 1.75,
                      color: "var(--fg-3)",
                    }}
                  >
                    {rule.text}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
      </section>

      {/* ── Game list ── */}
      <section className="container pb-16 md:pb-20">
        {loadingGames ? (
          <StatePanel
            variant="loading"
            eyebrow="Loading"
            title="Checking live open games"
            text="We're pulling the latest joinable matches, cutoff timing, and player counts for you."
          />
        ) : gamesError ? (
          <StatePanel
            variant="error"
            eyebrow="Couldn't load games"
            title="The open games list didn't come through"
            text={gamesError}
            actions={
              <button className="btn btn-ghost" onClick={() => fetchGames()}>
                Try again
              </button>
            }
          />
        ) : activeGames.length === 0 ? (
          <StatePanel
            eyebrow="No games right now"
            title="Nothing joinable is live at the moment"
            text="Once a host creates an open game, it will appear here until the cutoff passes. You can still book your own slot and create the next match others join."
            actions={
              <>
                <button className="btn btn-primary" onClick={() => router.push("/book")}>
                  Book a slot <span className="btn-icon-wrap"><ArrowRight size={13} /></span>
                </button>
                <button className="btn btn-ghost" onClick={() => fetchGames()}>
                  Refresh
                </button>
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
                <FadeIn key={game.id} delay={0.06 * index}>
                  {/* Card — border only, no glassmorphism */}
                  <div
                    style={{
                      border: "1px solid var(--line)",
                      borderRadius: "20px",
                      overflow: "hidden",
                      background: "rgba(13,18,24,0.55)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Header */}
                    <div
                      style={{
                        padding: "1.25rem 1.25rem 1rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontFamily: "var(--f-mono)",
                            fontSize: "11px",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "var(--fg-dim)",
                          }}
                        >
                          {game.dateLabel} · {game.dateValue}
                        </span>
                        <p
                          style={{
                            marginTop: "0.5rem",
                            fontFamily: "var(--f-sans)",
                            fontWeight: 600,
                            fontSize: "clamp(1.15rem,1.8vw,1.4rem)",
                            letterSpacing: "-0.03em",
                            color: "var(--fg)",
                            lineHeight: 1.1,
                          }}
                        >
                          {game.time}
                        </p>
                      </div>

                      <span
                        className="chip"
                        style={getStatusStyle(game.status)}
                      >
                        {game.status === "FULL"
                          ? "Full"
                          : game.status === "CONFIRMED"
                            ? "Confirmed"
                            : "Open"}
                      </span>
                    </div>

                    {/* Host row */}
                    <div
                      style={{
                        padding: "0.75rem 1.25rem",
                        borderTop: "1px solid var(--line)",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "13px",
                      }}
                    >
                      <span style={{ color: "var(--fg-dim)" }}>Host</span>
                      <span style={{ color: "var(--fg-2)" }}>{game.host}</span>
                    </div>

                    {/* Cutoff row */}
                    <div
                      style={{
                        padding: "0.75rem 1.25rem",
                        borderTop: "1px solid var(--line)",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "13px",
                      }}
                    >
                      <span style={{ color: "var(--fg-dim)" }}>Cutoff</span>
                      <span style={{ color: cutoffColor(game.cutoffStatus) }}>
                        {game.cutoffLabel}
                      </span>
                    </div>

                    {/* Players + progress */}
                    <div
                      style={{
                        padding: "1rem 1.25rem",
                        borderTop: "1px solid var(--line)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--f-mono)",
                            fontSize: "20px",
                            fontWeight: 500,
                            color: "var(--fg)",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {game.currentPlayers}
                          <span
                            style={{ color: "var(--fg-dim)", fontSize: "14px" }}
                          >
                            /{game.maxPlayers}
                          </span>
                        </span>
                        <span style={{ fontSize: "12px", color: "var(--fg-dim)" }}>
                          {game.spotsLeft === 0
                            ? "Game full"
                            : `${game.spotsLeft} spot${game.spotsLeft > 1 ? "s" : ""} left`}
                        </span>
                      </div>

                      {/* Progress bar — accent used here */}
                      <div
                        style={{
                          height: "3px",
                          background: "var(--line)",
                          borderRadius: "2px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${progress}%`,
                            background: "#B8FF3B",
                            borderRadius: "2px",
                            transition: "width 0.5s",
                          }}
                        />
                      </div>

                      <p
                        style={{
                          marginTop: "0.625rem",
                          fontSize: "12px",
                          color: "var(--fg-dim)",
                          lineHeight: 1.5,
                        }}
                      >
                        {game.note}
                      </p>
                    </div>

                    {/* Participants — inline chips, no card wrapper */}
                    {game.participants.length > 0 && (
                      <div
                        style={{
                          padding: "0.75rem 1.25rem",
                          borderTop: "1px solid var(--line)",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.375rem",
                          alignItems: "center",
                        }}
                      >
                        {game.participants.slice(0, 4).map((p) => (
                          <span key={`${game.id}-${p}`} className="chip">
                            {p}
                          </span>
                        ))}
                        {game.participants.length > 4 && (
                          <span className="chip">
                            +{game.participants.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Join button */}
                    <div
                      style={{
                        padding: "1rem 1.25rem",
                        borderTop: "1px solid var(--line)",
                        marginTop: "auto",
                      }}
                    >
                      {status === "loading" ? (
                        <button
                          className="btn btn-primary"
                          style={{ width: "100%", justifyContent: "center" }}
                          disabled
                        >
                          Checking account…
                        </button>
                      ) : session?.user ? (
                        <button
                          className="btn btn-primary"
                          style={{ width: "100%", justifyContent: "center" }}
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
                                : <>Join Game <ArrowRight size={15} /></>}
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          style={{ width: "100%", justifyContent: "center" }}
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
                                : <>Login to Join <ArrowRight size={15} /></>}
                        </button>
                      )}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Join modal — divider rows, no nested cards ── */}
      <ModalShell
        open={!!selectedGame}
        onClose={() => setSelectedGame(null)}
        panelClassName="max-w-lg"
      >
        {selectedGame && (
          <div
            style={{
              width: "100%",
              overflow: "hidden",
              borderRadius: "24px",
              border: "1px solid var(--line-2)",
              background: "rgb(10,14,19)",
            }}
          >
            <div style={{ padding: "1.5rem" }}>

              {/* Modal header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <span className="eyebrow">Join game</span>
                  <h3
                    style={{
                      fontFamily: "var(--f-sans)",
                      fontWeight: 600,
                      fontSize: "clamp(1.4rem,3vw,1.8rem)",
                      letterSpacing: "-0.035em",
                      color: "var(--fg)",
                      marginTop: "0.4rem",
                      lineHeight: 1.1,
                    }}
                  >
                    {selectedGame.time}
                  </h3>
                  <p
                    style={{
                      marginTop: "0.4rem",
                      fontSize: "14px",
                      color: "var(--fg-3)",
                      fontFamily: "var(--f-mono)",
                    }}
                  >
                    {selectedGame.dateLabel} · {selectedGame.dateValue}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedGame(null)}
                  className="btn btn-ghost btn-sm"
                  style={{ flexShrink: 0 }}
                >
                  Close
                </button>
              </div>

              {/* Detail rows */}
              <div style={{ borderTop: "1px solid var(--line)" }}>
                {[
                  { label: "Host", value: selectedGame.host, color: "var(--fg-2)" },
                  {
                    label: "Join cutoff",
                    value: selectedGame.cutoffLabel,
                    color: cutoffColor(selectedGame.cutoffStatus),
                  },
                  {
                    label: "Spots left",
                    value: String(remainingSpots),
                    color: "var(--fg-2)",
                  },
                ].map(({ label, value, color }) => (
                  <div
                    key={label}
                    style={{
                      padding: "0.875rem 0",
                      borderBottom: "1px solid var(--line)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "1rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        color: "var(--fg-dim)",
                        fontFamily: "var(--f-mono)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        flexShrink: 0,
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color,
                        textAlign: "right",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Player count stepper */}
              <div style={{ marginTop: "1.5rem" }}>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--fg-dim)",
                    fontFamily: "var(--f-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "1rem",
                  }}
                >
                  How many players joining?
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setJoinCount((p) => Math.max(1, p - 1))}
                    className="btn btn-ghost"
                    style={{ minWidth: "44px", justifyContent: "center" }}
                  >
                    −
                  </button>
                  <span
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: "28px",
                      fontWeight: 500,
                      color: "var(--fg)",
                      minWidth: "2ch",
                      textAlign: "center",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {joinCount}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setJoinCount((p) => Math.min(remainingSpots, p + 1))
                    }
                    className="btn btn-ghost"
                    style={{ minWidth: "44px", justifyContent: "center" }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Joining as */}
              <div
                style={{
                  marginTop: "1.5rem",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "var(--f-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--fg-dim)",
                  }}
                >
                  Joining as
                </span>
                <p
                  style={{
                    marginTop: "0.4rem",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "var(--fg)",
                  }}
                >
                  {session?.user?.name || "Logged-in user"}
                </p>
                <p style={{ fontSize: "13px", color: "var(--fg-3)" }}>
                  {session?.user?.email || "Account email unavailable"}
                </p>
              </div>

              {/* Joined players */}
              {selectedParticipants.length > 0 && (
                <div
                  style={{
                    marginTop: "1.25rem",
                    paddingTop: "1.25rem",
                    borderTop: "1px solid var(--line)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontFamily: "var(--f-mono)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--fg-dim)",
                      display: "block",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Players joined
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.375rem",
                    }}
                  >
                    {selectedParticipants.map((p) => (
                      <span
                        key={`${selectedGame.id}-${p}`}
                        className="chip"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Error */}
              {joinError && (
                <div
                  style={{
                    marginTop: "1.25rem",
                    padding: "0.875rem 1rem",
                    borderRadius: "10px",
                    border: "1px solid rgba(77,42,47,0.8)",
                    background: "rgba(36,21,25,0.9)",
                  }}
                >
                  <p style={{ fontSize: "14px", color: "#FFB4B4" }}>
                    {joinError}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div
                style={{
                  marginTop: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {status === "loading" ? (
                  <button className="btn btn-primary btn-lg" style={{ width: "100%" }} disabled>
                    Checking account…
                  </button>
                ) : session?.user ? (
                  <button
                    className="btn btn-primary btn-lg"
                    style={{ width: "100%", boxShadow: "0 10px 30px rgba(184,255,59,0.16)" }}
                    disabled={!canJoin || joining}
                    onClick={handleJoin}
                  >
                    {joining ? "Joining…" : <>Confirm join <span className="btn-icon-wrap"><ArrowRight size={13} /></span></>}
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-lg"
                    style={{ width: "100%" }}
                    onClick={() => {
                      const currentUrl =
                        typeof window !== "undefined"
                          ? window.location.pathname + window.location.search
                          : "/games";
                      router.push(`/login?callbackUrl=${encodeURIComponent(currentUrl)}`);
                    }}
                  >
                    Sign in to join <span className="btn-icon-wrap"><ArrowRight size={13} /></span>
                  </button>
                )}

                <button
                  className="btn btn-ghost btn-lg"
                  style={{ width: "100%" }}
                  onClick={() => setSelectedGame(null)}
                >
                  Cancel
                </button>

                {!session?.user && status !== "loading" && (
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "13px",
                      color: "var(--fg-3)",
                      marginTop: "0.25rem",
                    }}
                  >
                    You need to sign in before joining an open game.
                  </p>
                )}
              </div>

              <p
                style={{
                  marginTop: "1.25rem",
                  fontSize: "12px",
                  lineHeight: 1.65,
                  color: "var(--fg-dim)",
                }}
              >
                Your account will be used for this join request and the player
                count will update after confirmation.
              </p>
            </div>
          </div>
        )}
      </ModalShell>
    </main>
  );
}
