import { NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/prisma";
import { requireAdmin } from "../../../../src/lib/require-admin";
import {
  getErrorMessage,
  isUnauthorizedError,
} from "@/lib/utils/error-message";

type BlockSlotBody = {
  blockDate: string;
  startHour: number;
  endHour: number;
  reason?: "MAINTENANCE" | "ADMIN_BLOCK" | "PRIVATE_EVENT" | "OTHER";
  note?: string;
};

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = (await req.json()) as BlockSlotBody;
    const {
      blockDate,
      startHour,
      endHour,
      reason = "ADMIN_BLOCK",
      note,
    } = body;

    if (!blockDate || startHour === undefined || endHour === undefined) {
      return NextResponse.json(
        { error: "blockDate, startHour, and endHour are required" },
        { status: 400 },
      );
    }

    if (endHour <= startHour) {
      return NextResponse.json(
        { error: "endHour must be greater than startHour" },
        { status: 400 },
      );
    }

    const normalizedDate = startOfDay(new Date(blockDate));

    const existingBookingSlot = await prisma.bookingSlot.findFirst({
      where: {
        slotDate: normalizedDate,
        startHour: { lt: endHour },
        endHour: { gt: startHour },
        booking: {
          status: {
            in: ["PRIVATE_CONFIRMED", "OPEN_PENDING_FILL", "OPEN_CONFIRMED"],
          },
        },
      },
    });

    if (existingBookingSlot) {
      return NextResponse.json(
        { error: "This slot is already booked and cannot be blocked." },
        { status: 409 },
      );
    }

    const existingBlock = await prisma.slotBlock.findFirst({
      where: {
        blockDate: normalizedDate,
        startHour: { lt: endHour },
        endHour: { gt: startHour },
      },
    });

    if (existingBlock) {
      return NextResponse.json(
        { error: "This slot is already blocked." },
        { status: 409 },
      );
    }

    const slotBlock = await prisma.slotBlock.create({
      data: {
        blockDate: normalizedDate,
        startHour,
        endHour,
        reason,
        note: note || null,
      },
    });

    return NextResponse.json({ success: true, slotBlock }, { status: 201 });
  } catch (error: unknown) {
    if (isUnauthorizedError(error)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      {
        error: "Failed to block slot",
        details: getErrorMessage(error),
      },
      { status: 500 },
    );
  }
}
