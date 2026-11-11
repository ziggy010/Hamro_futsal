import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import { prisma } from "../../../src/lib/prisma";
import { getErrorMessage } from "@/lib/utils/error-message";

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getActivity(value: string | null) {
  return value === "PICKLEBALL" ? "PICKLEBALL" : "FUTSAL";
}

function getCourtNumber(value: string | null, activity: "FUTSAL" | "PICKLEBALL") {
  const court = Number(value);
  if (activity === "PICKLEBALL" && (court === 1 || court === 2)) return court;
  return 1;
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    const isAdmin =
      !!session?.user && (session.user as { role?: string }).role === "admin";
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");
    const activity = getActivity(searchParams.get("activity"));
    const courtNumber = getCourtNumber(searchParams.get("court"), activity);

    const targetDate = startOfDay(dateParam ? new Date(dateParam) : new Date());

    const bookingSlots = await prisma.bookingSlot.findMany({
      where: {
        slotDate: targetDate,
        activity,
        courtNumber,
        booking: {
          status: {
            in: ["PRIVATE_CONFIRMED", "OPEN_PENDING_FILL", "OPEN_CONFIRMED"],
          },
        },
      },
      include: {
        booking: {
          include: isAdmin
            ? {
                user: true,
              }
            : undefined,
        },
      },
      orderBy: {
        startHour: "asc",
      },
    });

    const blockedSlots = await prisma.slotBlock.findMany({
      where: {
        blockDate: targetDate,
        activity,
        courtNumber,
      },
      orderBy: {
        startHour: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      date: targetDate,
      bookingSlots,
      blockedSlots,
      activity,
      courtNumber,
    });
  } catch (error: unknown) {
    console.error("GET_SLOTS_ERROR", error);

    return NextResponse.json(
      {
        error: "Failed to fetch slots",
        details: getErrorMessage(error),
      },
      { status: 500 },
    );
  }
}
