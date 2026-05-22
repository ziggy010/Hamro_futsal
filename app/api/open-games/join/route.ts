import { NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/prisma";
import { auth } from "../../../../auth";
import { getOpenGameCutoffTime } from "../../../../lib/open-game-cutoff";

type JoinBody = {
  openGameId: string;
  playersJoined: number;
};

function hasGameStarted(
  bookingDate: Date,
  slots: { startHour: number }[],
  now = new Date(),
) {
  if (slots.length === 0) return true;

  const earliestStartHour = Math.min(...slots.map((slot) => slot.startHour));
  const gameStart = new Date(bookingDate);
  gameStart.setHours(earliestStartHour, 0, 0, 0);

  return gameStart <= now;
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to join a game" },
        { status: 401 },
      );
    }

    const sessionEmail = session.user.email;
    const body = (await req.json()) as JoinBody;
    const { openGameId, playersJoined } = body;

    if (!openGameId || !playersJoined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (playersJoined < 1 || playersJoined > 5) {
      return NextResponse.json(
        { error: "Invalid players count" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: sessionEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Logged-in user not found" },
        { status: 404 },
      );
    }

    const result = await prisma.$transaction(
      async (tx) => {
        const openGame = await tx.openGame.findUnique({
          where: { id: openGameId },
          include: {
            booking: {
              select: {
                id: true,
                bookingDate: true,
                slots: {
                  select: {
                    startHour: true,
                  },
                },
              },
            },
          },
        });

        if (!openGame) {
          throw new Error("OPEN_GAME_NOT_FOUND");
        }

        if (
          openGame.status !== "PENDING_FILL" &&
          openGame.status !== "CONFIRMED"
        ) {
          throw new Error("GAME_NOT_JOINABLE");
        }

        const effectiveCutoffTime = getOpenGameCutoffTime(
          openGame.booking.bookingDate,
          openGame.booking.slots,
        );

        if (effectiveCutoffTime <= new Date()) {
          throw new Error("JOIN_CUTOFF_PASSED");
        }

        if (hasGameStarted(openGame.booking.bookingDate, openGame.booking.slots)) {
          throw new Error("GAME_ALREADY_STARTED");
        }

        const newTotalPlayers = openGame.currentPlayers + playersJoined;

        if (newTotalPlayers > openGame.maxPlayers) {
          throw new Error("EXCEEDS_MAX_PLAYERS");
        }

        const existingParticipant = await tx.openGameParticipant.findFirst({
          where: {
            openGameId,
            userId: user.id,
          },
        });

        if (existingParticipant) {
          throw new Error("ALREADY_JOINED");
        }

        const participant = await tx.openGameParticipant.create({
          data: {
            openGameId,
            userId: user.id,
            playersJoined,
          },
        });

        const updatedGame = await tx.openGame.update({
          where: { id: openGameId },
          data: {
            currentPlayers: newTotalPlayers,
            status:
              newTotalPlayers === openGame.maxPlayers
                ? "FULL"
                : newTotalPlayers >= openGame.minPlayers
                  ? "CONFIRMED"
                  : "PENDING_FILL",
          },
        });

        const nextBookingStatus =
          newTotalPlayers >= openGame.minPlayers
            ? "OPEN_CONFIRMED"
            : "OPEN_PENDING_FILL";

        await tx.booking.update({
          where: { id: openGame.booking.id },
          data: {
            status: nextBookingStatus,
          },
        });

        return { participant, updatedGame, effectiveCutoffTime };
      },
      {
        timeout: 15000,
      },
    );

    await prisma.openGame.updateMany({
      where: {
        id: openGameId,
        cutoffTime: {
          not: result.effectiveCutoffTime,
        },
      },
      data: {
        cutoffTime: result.effectiveCutoffTime,
      },
    });

    return NextResponse.json(
      {
        success: true,
        participant: result.participant,
        updatedGame: result.updatedGame,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "";

    if (errorMessage === "OPEN_GAME_NOT_FOUND") {
      return NextResponse.json(
        { error: "Open game not found" },
        { status: 404 },
      );
    }

    if (errorMessage === "GAME_NOT_JOINABLE") {
      return NextResponse.json(
        { error: "Game is not open for joining" },
        { status: 400 },
      );
    }

    if (errorMessage === "USER_NOT_FOUND") {
      return NextResponse.json(
        { error: "Logged-in user not found" },
        { status: 404 },
      );
    }

    if (errorMessage === "EXCEEDS_MAX_PLAYERS") {
      return NextResponse.json(
        { error: "Exceeds max players" },
        { status: 400 },
      );
    }

    if (errorMessage === "ALREADY_JOINED") {
      return NextResponse.json(
        { error: "You already joined this game" },
        { status: 400 },
      );
    }

    if (errorMessage === "JOIN_CUTOFF_PASSED") {
      return NextResponse.json(
        { error: "This game's join cutoff has already passed" },
        { status: 400 },
      );
    }

    if (errorMessage === "GAME_ALREADY_STARTED") {
      return NextResponse.json(
        { error: "This game has already started" },
        { status: 400 },
      );
    }

    console.error("JOIN_GAME_ERROR", error);

    return NextResponse.json(
      {
        error: "Failed to join game",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
