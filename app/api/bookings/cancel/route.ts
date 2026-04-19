import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../../../src/lib/prisma";

function canCancelBooking(
  bookingDate: Date,
  slots: { startHour: number }[],
  now = new Date(),
) {
  if (slots.length === 0) return false;

  const earliestStartHour = Math.min(...slots.map((slot) => slot.startHour));
  const gameStart = new Date(bookingDate);
  gameStart.setHours(earliestStartHour, 0, 0, 0);

  return gameStart.getTime() - now.getTime() > 5 * 60 * 60 * 1000;
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const sessionUser = session?.user;
    const sessionRole = (sessionUser as { role?: string } | undefined)?.role;

    if (!sessionUser?.email && sessionRole !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
      include: {
        openGame: true,
        slots: {
          select: {
            startHour: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.status === "CANCELLED" || booking.status === "OPEN_EXPIRED") {
      return NextResponse.json(
        { error: "Booking is no longer active" },
        { status: 400 },
      );
    }

    const isAdmin = sessionRole === "admin";

    if (!isAdmin) {
      if (!sessionUser?.email || booking.user.email !== sessionUser.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      if (!canCancelBooking(booking.bookingDate, booking.slots)) {
        return NextResponse.json(
          { error: "Bookings can only be cancelled more than 5 hours before the game starts" },
          { status: 400 },
        );
      }
    }

    // Update booking status
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: "CANCELLED",
      },
    });

    // If open game exists, cancel that too
    if (booking.openGame) {
      await prisma.openGame.update({
        where: { id: booking.openGame.id },
        data: {
          status: "CANCELLED",
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "Failed to cancel booking",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
