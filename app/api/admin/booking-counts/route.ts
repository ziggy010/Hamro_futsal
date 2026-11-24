import { NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/prisma";
import { requireAdmin } from "../../../../src/lib/require-admin";
import {
  getErrorMessage,
  isUnauthorizedError,
} from "@/lib/utils/error-message";

function parseDate(value: string | null) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  date.setHours(0, 0, 0, 0);
  return date;
}

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function GET(req: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const from = parseDate(searchParams.get("from"));
    const to = parseDate(searchParams.get("to"));

    if (!from || !to || to <= from) {
      return NextResponse.json(
        { error: "A valid from and exclusive to date are required" },
        { status: 400 },
      );
    }

    const groupedBookings = await prisma.booking.groupBy({
      by: ["bookingDate"],
      where: {
        bookingDate: { gte: from, lt: to },
        status: {
          in: ["PRIVATE_CONFIRMED", "OPEN_PENDING_FILL", "OPEN_CONFIRMED"],
        },
      },
      _count: { id: true },
      orderBy: { bookingDate: "asc" },
    });

    const counts = groupedBookings.reduce<Record<string, number>>(
      (totals, entry) => {
        const key = formatDateKey(entry.bookingDate);
        totals[key] = (totals[key] || 0) + entry._count.id;
        return totals;
      },
      {},
    );

    return NextResponse.json({ success: true, counts });
  } catch (error: unknown) {
    if (isUnauthorizedError(error)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      {
        error: "Failed to fetch booking counts",
        details: getErrorMessage(error),
      },
      { status: 500 },
    );
  }
}
