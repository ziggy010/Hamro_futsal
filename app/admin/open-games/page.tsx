"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import ModalShell from "@/components/ui/modal-shell";
import StatePanel from "@/components/ui/state-panel";
import { getErrorMessage } from "@/lib/utils/error-message";
import { getOpenGameCutoffTime } from "../../../lib/open-game-cutoff";

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
    user: { id: string; name: string; phone: string };
    slots: { id: string; startHour: number; endHour: number; price: number }[];
  };
  participants: {
    id: string;
    playersJoined: number;
    createdAt: string;
    user: { id: string; name: string; phone: string };
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
  return `${hourTo12(sorted[0].startHour)} – ${hourTo12(sorted[sorted.length - 1].endHour)}`;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  });
}

function statusLabel(status: OpenGameApi["status"]) {
  if (status === "PENDING_FILL") return "Pending Fill";
  if (status === "CONFIRMED") return "Confirmed";
  if (status === "FULL") return "Full";
  if (status === "EXPIRED") return "Expired";
  return "Cancelled";
}

function statusColor(status: OpenGameApi["status"]): string {
  if (status === "CONFIRMED") return "var(--accent)";
  if (status === "PENDING_FILL") return "#F4D35E";
  if (status === "FULL") return "#7EF7C1";
  return "rgba(255,150,150,0.8)";
}

function StatusBadge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: "11px",
        fontWeight: 500,
        padding: "3px 10px",
        borderRadius: "999px",
        border: "1px solid rgba(255,255,255,0.1)",
        color,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function MetaLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: "var(--f-mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--fg-dim)", display: "block" }}>
      {children}
    </span>
  );
}

export default function AdminOpenGamesPage() {
  const [games, setGames] = useState<OpenGameApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [processingId, setProcessingId] = useState("");
  const [selectedGame, setSelectedGame] = useState<OpenGameApi | null>(null);

  const fetchGames = async () => {
    try {
      setError("");
      const res = await fetch("/api/open-games", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load open games");
      setGames(data.openGames || []);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to load open games"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGames(); }, []);

  const activeGames = useMemo(() =>
    games.filter((g) => g.status === "PENDING_FILL" || g.status === "CONFIRMED" || g.status === "FULL"),
    [games]);

  const expiredGames = useMemo(() =>
    games.filter((g) => g.status === "EXPIRED" || g.status === "CANCELLED"),
    [games]);

  const canExpireNow = (game: OpenGameApi) => {
    const cutoff = getOpenGameCutoffTime(new Date(game.booking.bookingDate), game.booking.slots);
    return game.status === "PENDING_FILL" && game.currentPlayers < game.minPlayers && cutoff <= new Date();
  };

  const runExpireSweep = async () => {
    try {
      setActionError("");
      setActionMessage("");
      setProcessingId("expire-sweep");
      const res = await fetch("/api/open-games/expire");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to expire open games");
      setActionMessage(`Expired ${data?.expiredCount ?? 0} open game${data?.expiredCount === 1 ? "" : "s"}.`);
      await fetchGames();
      setSelectedGame(null);
    } catch (err: unknown) {
      setActionError(getErrorMessage(err, "Failed to expire open games"));
    } finally {
      setProcessingId("");
    }
  };

  const handleCancel = async (openGameId: string) => {
    if (!confirm("Cancel this open game?")) return;
    try {
      setActionError("");
      setActionMessage("");
      setProcessingId(openGameId);
      const res = await fetch("/api/open-games/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ openGameId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to cancel");
      setActionMessage("Open game cancelled successfully.");
      await fetchGames();
      if (selectedGame?.id === openGameId) setSelectedGame(null);
    } catch (err: unknown) {
      setActionError(getErrorMessage(err, "Error cancelling game"));
    } finally {
      setProcessingId("");
    }
  };

  const stats = [
    { label: "Active", value: activeGames.length },
    { label: "Expired / Cancelled", value: expiredGames.length },
    { label: "Total", value: games.length },
  ];

  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">

        {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
        <span className="eyebrow">Admin</span>
        <h1
          style={{
            fontFamily: "var(--f-sans)",
            fontWeight: 700,
            fontSize: "clamp(2rem,4.5vw,3.8rem)",
            letterSpacing: "-0.055em",
            lineHeight: 0.96,
            color: "var(--fg)",
            marginTop: "1rem",
          }}
        >
          Open games.
        </h1>
        <p style={{ marginTop: "1rem", fontSize: "16px", lineHeight: 1.7, color: "var(--fg-3)", maxWidth: "52ch" }}>
          Manage all open games and track player fill status.
        </p>

        {/* ── STATS STRIP ─────────────────────────────────────────────── */}
        <div
          style={{
            marginTop: "2rem",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            marginBottom: "2rem",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: "1rem 0",
                paddingLeft: i === 0 ? 0 : "1.25rem",
                paddingRight: i === stats.length - 1 ? 0 : "1.25rem",
                borderRight: i < stats.length - 1 ? "1px solid var(--line)" : undefined,
              }}
            >
              <span style={{ fontFamily: "var(--f-mono)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-dim)", display: "block", marginBottom: "0.375rem" }}>
                {s.label}
              </span>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: "clamp(24px,2.5vw,36px)", fontWeight: 600, letterSpacing: "-0.04em", color: "var(--fg)", lineHeight: 1 }}>
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* ── FEEDBACK ────────────────────────────────────────────────── */}
        {error && (
          <div style={{ marginBottom: "1.5rem" }}>
            <StatePanel
              variant="error"
              eyebrow="Couldn't load open games"
              title="The open-game board is temporarily unavailable"
              text={error}
              actions={
                <button className="btn btn-ghost btn-sm" onClick={() => { setLoading(true); fetchGames(); }}>
                  Try again
                </button>
              }
            />
          </div>
        )}
        {actionError && (
          <div style={{ marginBottom: "1.25rem", padding: "0.75rem 1rem", borderRadius: "12px", border: "1px solid rgba(255,100,100,0.2)", background: "rgba(255,80,80,0.04)" }}>
            <p style={{ fontSize: "13px", color: "rgba(255,150,150,0.9)", margin: 0 }}>{actionError}</p>
          </div>
        )}
        {actionMessage && (
          <div style={{ marginBottom: "1.25rem", padding: "0.75rem 1rem", borderRadius: "12px", border: "1px solid rgba(184,255,59,0.18)", background: "rgba(184,255,59,0.04)" }}>
            <p style={{ fontSize: "13px", color: "var(--accent)", margin: 0 }}>{actionMessage}</p>
          </div>
        )}

        {/* ── MAIN GRID ───────────────────────────────────────────────── */}
        <div className="grid gap-6 xl:grid-cols-2 items-start">

          {/* Active games */}
          <div style={{ border: "1px solid var(--line)", borderRadius: "20px", background: "var(--bg-soft)", overflow: "hidden" }}>
            <div style={{ padding: "1.375rem 1.75rem", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <span className="eyebrow">Live</span>
                <p style={{ fontSize: "18px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.03em", marginTop: "0.375rem" }}>
                  Active games
                </p>
              </div>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: "28px", fontWeight: 600, letterSpacing: "-0.04em", color: "var(--fg-dim)", lineHeight: 1 }}>
                {activeGames.length}
              </span>
            </div>

            <div style={{ padding: "0 1.75rem" }}>
              {loading ? (
                <div style={{ padding: "2rem 0" }}>
                  <StatePanel
                    variant="loading"
                    title="Loading active open games"
                    text="Checking player counts, hosts, and fill status."
                    className="rounded-[20px] p-5 shadow-none"
                  />
                </div>
              ) : activeGames.length === 0 ? (
                <div style={{ padding: "2rem 0" }}>
                  <StatePanel
                    title="No active open games"
                    text="When players create new public matches, they'll appear here."
                    className="rounded-[20px] p-5 shadow-none"
                  />
                </div>
              ) : (
                activeGames.map((game) => {
                  const remaining = game.maxPlayers - game.currentPlayers;
                  const canExpire = canExpireNow(game);
                  return (
                    <div key={game.id} style={{ borderTop: "1px solid var(--line)", padding: "1.25rem 0" }}>
                      {/* Time + status */}
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.625rem" }}>
                        <p style={{ fontSize: "clamp(16px,1.8vw,20px)", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.03em" }}>
                          {formatSlotRange(game.booking.slots)}
                        </p>
                        <StatusBadge color={statusColor(game.status)}>{statusLabel(game.status)}</StatusBadge>
                      </div>

                      {/* Date + host */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                        <CalendarDays size={12} style={{ color: "var(--fg-dim)" }} />
                        <span style={{ fontFamily: "var(--f-mono)", fontSize: "11px", color: "var(--fg-dim)", letterSpacing: "0.06em" }}>
                          {formatDate(game.booking.bookingDate)}
                        </span>
                        <span style={{ fontSize: "11px", color: "var(--fg-dim)" }}>&middot; Host: {game.booking.user.name}</span>
                      </div>

                      {/* Fill info */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", marginBottom: "0.875rem" }}>
                        <div>
                          <MetaLabel>Players</MetaLabel>
                          <span style={{ fontSize: "13px", color: "var(--fg-3)", marginTop: 3, display: "block" }}>{game.currentPlayers} / {game.maxPlayers}</span>
                        </div>
                        <div>
                          <MetaLabel>Spots left</MetaLabel>
                          <span style={{ fontSize: "13px", color: remaining === 0 ? "var(--accent)" : "var(--fg-3)", marginTop: 3, display: "block" }}>
                            {remaining > 0 ? `${remaining} open` : "Full squad"}
                          </span>
                        </div>
                        <div>
                          <MetaLabel>Min. players</MetaLabel>
                          <span style={{ fontSize: "13px", color: "var(--fg-3)", marginTop: 3, display: "block" }}>{game.minPlayers}</span>
                        </div>
                      </div>

                      {/* Expire alert */}
                      {canExpire && (
                        <div style={{ padding: "0.625rem 0.875rem", borderRadius: "10px", border: "1px solid rgba(255,100,100,0.15)", background: "rgba(255,80,80,0.04)", marginBottom: "0.75rem" }}>
                          <p style={{ fontSize: "12px", color: "rgba(255,150,150,0.85)", lineHeight: 1.5 }}>
                            Passed the 4-hour cutoff without enough players. Can be expired now.
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => handleCancel(game.id)}
                          disabled={processingId === game.id}
                        >
                          {processingId === game.id ? "Updating..." : "Cancel"}
                        </button>
                        {canExpire && (
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={runExpireSweep}
                            disabled={processingId === "expire-sweep"}
                          >
                            {processingId === "expire-sweep" ? "Expiring..." : "Expire now"}
                          </button>
                        )}
                        <button className="btn btn-ghost btn-sm" onClick={() => setSelectedGame(game)}>
                          View details
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Expired / Cancelled */}
          <div style={{ border: "1px solid var(--line)", borderRadius: "20px", background: "var(--bg-soft)", overflow: "hidden" }}>
            <div style={{ padding: "1.375rem 1.75rem", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <span className="eyebrow">Inactive</span>
                <p style={{ fontSize: "18px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.03em", marginTop: "0.375rem" }}>
                  Expired / Cancelled
                </p>
              </div>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: "28px", fontWeight: 600, letterSpacing: "-0.04em", color: "var(--fg-dim)", lineHeight: 1 }}>
                {expiredGames.length}
              </span>
            </div>

            <div style={{ padding: "0 1.75rem" }}>
              {loading ? (
                <div style={{ padding: "2rem 0" }}>
                  <StatePanel
                    variant="loading"
                    title="Loading inactive games"
                    text="Checking expired and cancelled records."
                    className="rounded-[20px] p-5 shadow-none"
                  />
                </div>
              ) : expiredGames.length === 0 ? (
                <div style={{ padding: "2rem 0" }}>
                  <StatePanel
                    title="No expired or cancelled games"
                    text="Older inactive records will appear here when they exist."
                    className="rounded-[20px] p-5 shadow-none"
                  />
                </div>
              ) : (
                expiredGames.map((game) => (
                  <div key={game.id} style={{ borderTop: "1px solid var(--line)", padding: "1.125rem 0", opacity: 0.65 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.5rem" }}>
                      <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.02em" }}>
                        {formatSlotRange(game.booking.slots)}
                      </p>
                      <StatusBadge color={statusColor(game.status)}>{statusLabel(game.status)}</StatusBadge>
                    </div>
                    <p style={{ fontSize: "12px", color: "var(--fg-dim)" }}>
                      Host: {game.booking.user.name} &middot; {formatDate(game.booking.bookingDate)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── DETAIL MODAL ────────────────────────────────────────────── */}
      <ModalShell open={!!selectedGame} onClose={() => setSelectedGame(null)} panelClassName="max-w-xl">
        {selectedGame && (
          <div
            style={{
              border: "1px solid var(--line)",
              borderRadius: "20px",
              background: "var(--bg-soft)",
              overflow: "hidden",
              width: "100%",
            }}
          >
            {/* Modal header */}
            <div style={{ padding: "1.375rem 1.75rem", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
              <div>
                <span className="eyebrow">Open game details</span>
                <p style={{ fontSize: "clamp(18px,2vw,22px)", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.03em", marginTop: "0.375rem" }}>
                  {formatSlotRange(selectedGame.booking.slots)}
                </p>
                <p style={{ fontSize: "13px", color: "var(--fg-dim)", marginTop: 4 }}>
                  {formatDate(selectedGame.booking.bookingDate)}
                </p>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setSelectedGame(null)}
              >
                Close
              </button>
            </div>

            {/* Game info rows */}
            <div style={{ padding: "0 1.75rem" }}>
              {[
                { label: "Host", value: selectedGame.booking.user.name },
                { label: "Phone", value: selectedGame.booking.user.phone },
                { label: "Players", value: `${selectedGame.currentPlayers} / ${selectedGame.maxPlayers}` },
                { label: "Status", value: statusLabel(selectedGame.status) },
                { label: "Minimum players", value: `${selectedGame.minPlayers}` },
                { label: "Cutoff time", value: new Date(selectedGame.cutoffTime).toLocaleString() },
              ].map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    borderTop: i > 0 ? "1px solid var(--line)" : undefined,
                    padding: "0.875rem 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <MetaLabel>{item.label}</MetaLabel>
                  <span style={{ fontSize: "13px", color: "var(--fg)", textAlign: "right" }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Joined players */}
            <div style={{ borderTop: "1px solid var(--line)", padding: "1.25rem 1.75rem" }}>
              <span className="eyebrow" style={{ display: "block", marginBottom: "0.875rem" }}>Joined players</span>
              {selectedGame.participants.length === 0 ? (
                <StatePanel
                  title="No joined players yet"
                  text="This game is waiting for the first participant to join."
                  className="rounded-[16px] p-4 shadow-none"
                />
              ) : (
                <div>
                  {selectedGame.participants.map((p, i) => (
                    <div
                      key={p.id}
                      style={{
                        borderTop: i > 0 ? "1px solid var(--line-soft, rgba(255,255,255,0.06))" : undefined,
                        padding: "0.75rem 0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--fg)" }}>{p.user.name}</p>
                        <p style={{ fontSize: "12px", color: "var(--fg-dim)", marginTop: 2 }}>{p.user.phone}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: "13px", color: "var(--fg-3)" }}>+{p.playersJoined} player{p.playersJoined > 1 ? "s" : ""}</p>
                        <p style={{ fontSize: "11px", color: "var(--fg-dim)", marginTop: 2 }}>{new Date(p.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div style={{ borderTop: "1px solid var(--line)", padding: "1.125rem 1.75rem", display: "flex", justifyContent: "flex-end", gap: "0.5rem", flexWrap: "wrap" }}>
              {canExpireNow(selectedGame) && (
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={runExpireSweep}
                  disabled={processingId === "expire-sweep"}
                >
                  {processingId === "expire-sweep" ? "Expiring..." : "Expire now"}
                </button>
              )}
              <button className="btn btn-ghost btn-sm" onClick={() => setSelectedGame(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </ModalShell>
    </main>
  );
}
