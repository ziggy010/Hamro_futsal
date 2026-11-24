import { NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/prisma";
import { requireAdmin } from "../../../../src/lib/require-admin";
import {
  getErrorMessage,
  isUnauthorizedError,
} from "@/lib/utils/error-message";

const countedStatuses = [
  "PRIVATE_CONFIRMED",
  "OPEN_PENDING_FILL",
  "OPEN_CONFIRMED",
] as const;

export async function GET() {
  try {
    await requireAdmin();

    const users = await prisma.user.findMany({
      where: { role: "USER" },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        createdAt: true,
        bookings: {
          where: { status: { in: [...countedStatuses] } },
          select: {
            id: true,
            bookingDate: true,
            paymentStatus: true,
            paidAmount: true,
            totalPrice: true,
            slots: {
              select: { activity: true },
            },
          },
        },
      },
    });

    const customers = users
      .map((user) => {
        const paidBookings = user.bookings.filter(
          (booking) => booking.paymentStatus === "PAID",
        );
        const lifetimeSpend = paidBookings.reduce(
          (sum, booking) => sum + (booking.paidAmount ?? booking.totalPrice),
          0,
        );
        const lastBookingAt = user.bookings.reduce<Date | null>(
          (latest, booking) =>
            !latest || booking.bookingDate > latest ? booking.bookingDate : latest,
          null,
        );
        const activityCounts = user.bookings.flatMap((booking) => booking.slots).reduce(
          (counts, slot) => {
            counts[slot.activity] += 1;
            return counts;
          },
          { FUTSAL: 0, PICKLEBALL: 0 },
        );

        return {
          id: user.id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          createdAt: user.createdAt,
          bookingCount: user.bookings.length,
          paidBookingCount: paidBookings.length,
          lifetimeSpend,
          lastBookingAt,
          favoriteActivity:
            activityCounts.PICKLEBALL > activityCounts.FUTSAL
              ? "PICKLEBALL"
              : activityCounts.FUTSAL > 0
                ? "FUTSAL"
                : null,
        };
      })
      .sort(
        (a, b) =>
          b.lifetimeSpend - a.lifetimeSpend ||
          b.bookingCount - a.bookingCount ||
          a.name.localeCompare(b.name),
      );

    return NextResponse.json({
      success: true,
      customers,
      summary: {
        totalCustomers: customers.length,
        returningCustomers: customers.filter((customer) => customer.bookingCount > 1)
          .length,
        totalBookings: customers.reduce(
          (sum, customer) => sum + customer.bookingCount,
          0,
        ),
        lifetimeRevenue: customers.reduce(
          (sum, customer) => sum + customer.lifetimeSpend,
          0,
        ),
      },
    });
  } catch (error: unknown) {
    if (isUnauthorizedError(error)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      {
        error: "Failed to fetch customers",
        details: getErrorMessage(error),
      },
      { status: 500 },
    );
  }
}
