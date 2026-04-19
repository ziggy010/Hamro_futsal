import { NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/prisma";
import { getErrorMessage } from "@/lib/utils/error-message";

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");

    const today = new Date();
    const targetDate = dateParam ? new Date(dateParam) : today;

    const start = startOfDay(targetDate);
    const end = endOfDay(targetDate);

    const bookings = await prisma.booking.findMany({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
        status: {
          in: ["PRIVATE_CONFIRMED", "OPEN_CONFIRMED", "OPEN_PENDING_FILL"],
        },
      },
      include: {
        user: true,
        slots: true,
        openGame: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    type BookingItem = (typeof bookings)[number];

    const totalRevenue = bookings.reduce(
      (sum: number, b: BookingItem) => sum + b.totalPrice,
      0,
    );

    const collectedRevenue = bookings
      .filter((b: BookingItem) => b.paymentStatus === "PAID")
      .reduce((sum: number, b: BookingItem) => sum + b.totalPrice, 0);

    const pendingRevenue = bookings
      .filter((b: BookingItem) => b.paymentStatus === "PENDING")
      .reduce((sum: number, b: BookingItem) => sum + b.totalPrice, 0);

    const privateRevenue = bookings
      .filter((b: BookingItem) => b.bookingType === "PRIVATE")
      .reduce((sum: number, b: BookingItem) => sum + b.totalPrice, 0);

    const openRevenue = bookings
      .filter((b: BookingItem) => b.bookingType === "OPEN")
      .reduce((sum: number, b: BookingItem) => sum + b.totalPrice, 0);

    return NextResponse.json({
      success: true,
      totalRevenue,
      collectedRevenue,
      pendingRevenue,
      privateRevenue,
      openRevenue,
      bookings,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "Failed to fetch sales",
        details: getErrorMessage(error),
      },
      { status: 500 },
    );
  }
}
