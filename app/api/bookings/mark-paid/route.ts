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
    const { bookingId } = body;

    if (!bookingId) {
      return NextResponse.json(
        { error: "bookingId is required" },
        { status: 400 },
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (
      booking.status === "CANCELLED" ||
      booking.status === "OPEN_EXPIRED"
    ) {
      return NextResponse.json(
        { error: "Inactive bookings cannot be marked as paid" },
        { status: 400 },
      );
    }

    if (booking.paymentStatus === "PAID") {
      return NextResponse.json({
        success: true,
        booking,
      });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        paymentStatus: "PAID",
        paidAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
    });
  } catch (error: unknown) {
    if (isUnauthorizedError(error)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      {
        error: "Failed to mark booking as paid",
        details: getErrorMessage(error),
      },
      { status: 500 },
    );
  }
}
