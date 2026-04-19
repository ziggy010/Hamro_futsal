import { NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/prisma";
import { requireAdmin } from "../../../../src/lib/require-admin";
import {
  getErrorMessage,
  isUnauthorizedError,
} from "@/lib/utils/error-message";

export async function GET() {
  try {
    await requireAdmin();
    const now = new Date();

    const gamesToExpire = await prisma.openGame.findMany({
      where: {
        status: "PENDING_FILL",
        cutoffTime: {
          lte: now,
        },
      },
      select: {
        id: true,
        bookingId: true,
        currentPlayers: true,
        minPlayers: true,
      },
    });

    const targetIds = gamesToExpire
      .filter(
        (game: {
          id: string;
          bookingId: string;
          currentPlayers: number;
          minPlayers: number;
        }) => game.currentPlayers < game.minPlayers,
      )
      .map(
        (game: {
          id: string;
          bookingId: string;
          currentPlayers: number;
          minPlayers: number;
        }) => game.id,
      );

    if (targetIds.length === 0) {
      return NextResponse.json({
        success: true,
        expiredCount: 0,
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const expiredGames = await tx.openGame.updateMany({
        where: {
          id: { in: targetIds },
          status: "PENDING_FILL",
        },
        data: {
          status: "EXPIRED",
        },
      });

      const expiredBookings = await tx.booking.updateMany({
        where: {
          openGame: {
            id: { in: targetIds },
          },
          status: "OPEN_PENDING_FILL",
        },
        data: {
          status: "OPEN_EXPIRED",
        },
      });

      return {
        expiredGames: expiredGames.count,
        expiredBookings: expiredBookings.count,
      };
    });

    return NextResponse.json({
      success: true,
      expiredCount: result.expiredGames,
      bookingUpdates: result.expiredBookings,
    });
  } catch (error: unknown) {
    if (isUnauthorizedError(error)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      {
        success: false,
        error: getErrorMessage(error, "Failed to expire open games"),
      },
      { status: 500 },
    );
  }
}
