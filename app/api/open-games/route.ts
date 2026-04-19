import { NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma";
import { auth } from "../../../auth";
import { getErrorMessage } from "@/lib/utils/error-message";

export async function GET() {
  try {
    const session = await auth();
    const sessionRole = (session?.user as { role?: string } | undefined)?.role;
    const isAdmin = sessionRole === "admin";

    const openGames = await prisma.openGame.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        status: true,
        currentPlayers: true,
        minPlayers: true,
        maxPlayers: true,
        cutoffTime: true,
        booking: {
          select: {
            id: true,
            bookingDate: true,
            user: {
              select: isAdmin
                ? {
                    id: true,
                    name: true,
                    phone: true,
                    email: true,
                  }
                : {
                    id: true,
                    name: true,
                  },
            },
            slots: {
              select: {
                id: true,
                slotDate: true,
                startHour: true,
                endHour: true,
                price: true,
              },
            },
          },
        },
        participants: {
          select: {
            id: true,
            playersJoined: true,
            createdAt: true,
            user: {
              select: isAdmin
                ? {
                    id: true,
                    name: true,
                    phone: true,
                  }
                : {
                    id: true,
                    name: true,
                  },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      openGames,
    });
  } catch (error: unknown) {
    console.error("GET_OPEN_GAMES_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        error: getErrorMessage(error, "Failed to fetch open games"),
      },
      { status: 500 },
    );
  }
}
