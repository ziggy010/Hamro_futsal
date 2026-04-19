import { NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma";
import { requireAdmin } from "../../../src/lib/require-admin";
import {
  getErrorMessage,
  isUnauthorizedError,
} from "@/lib/utils/error-message";

export async function GET() {
  try {
    await requireAdmin();

    const bookings = await prisma.booking.findMany({
      where: {
        status: {
          not: "CANCELLED",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        slots: true,
        openGame: true,
      },
    });

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error: unknown) {
    if (isUnauthorizedError(error)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("GET_BOOKINGS_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        error: getErrorMessage(error, "Failed to fetch bookings"),
      },
      { status: 500 },
    );
  }
}
