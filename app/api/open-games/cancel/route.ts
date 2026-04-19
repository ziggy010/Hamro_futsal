import { NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/prisma";
import { requireAdmin } from "../../../../src/lib/require-admin";
import {
  getErrorMessage,
  isUnauthorizedError,
} from "@/lib/utils/error-message";

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = await req.json();
    const { openGameId } = body;

    if (!openGameId) {
      return NextResponse.json(
        { error: "openGameId is required" },
        { status: 400 },
      );
    }

    const openGame = await prisma.openGame.findUnique({
      where: { id: openGameId },
      include: { booking: true },
    });

    if (!openGame) {
      return NextResponse.json(
        { error: "Open game not found" },
        { status: 404 },
      );
    }

    if (openGame.status === "CANCELLED" || openGame.status === "EXPIRED") {
      return NextResponse.json(
        { error: "Open game is no longer active" },
        { status: 400 },
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.openGame.update({
        where: { id: openGameId },
        data: {
          status: "CANCELLED",
        },
      });

      await tx.booking.update({
        where: { id: openGame.booking.id },
        data: {
          status: "CANCELLED",
        },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (isUnauthorizedError(error)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      {
        error: "Failed to cancel open game",
        details: getErrorMessage(error),
      },
      { status: 500 },
    );
  }
}
