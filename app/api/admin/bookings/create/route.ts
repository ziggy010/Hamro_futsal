import { NextResponse } from "next/server";
import { prisma } from "../../../../../src/lib/prisma";
import { requireAdmin } from "../../../../../src/lib/require-admin";
import { getHourlyRate, type ActivityType } from "../../../../../lib/pricing";
import { getErrorMessage, isUnauthorizedError } from "@/lib/utils/error-message";

type AdminBookingBody = {
  name?: string;
  phone?: string;
  bookingDate?: string;
  startHour?: number;
  endHour?: number;
  activity?: ActivityType;
  courtNumber?: number;
  paymentStatus?: "PENDING" | "PAID";
};

function startOfDay(date: Date) {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = (await req.json()) as AdminBookingBody;
    const name = body.name?.trim() || "";
    const phone = body.phone?.trim() || "";
    const activity: ActivityType = body.activity === "PICKLEBALL" ? "PICKLEBALL" : "FUTSAL";
    const courtNumber = activity === "PICKLEBALL" ? Number(body.courtNumber) : 1;
    const startHour = Number(body.startHour);
    const endHour = Number(body.endHour);
    const paymentStatus = body.paymentStatus === "PAID" ? "PAID" : "PENDING";

    if (!name || !/^[0-9+\-\s]{7,15}$/.test(phone) || !body.bookingDate) {
      return NextResponse.json(
        { error: "Customer name, valid phone number, and date are required" },
        { status: 400 },
      );
    }

    if (
      !Number.isInteger(startHour) ||
      !Number.isInteger(endHour) ||
      startHour < 6 ||
      endHour > 22 ||
      endHour !== startHour + 1 ||
      !Number.isInteger(courtNumber) ||
      courtNumber < 1 ||
      (activity === "PICKLEBALL" && courtNumber > 2)
    ) {
      return NextResponse.json({ error: "Invalid slot or court" }, { status: 400 });
    }

    const bookingDate = startOfDay(new Date(body.bookingDate));
    if (Number.isNaN(bookingDate.getTime())) {
      return NextResponse.json({ error: "Invalid booking date" }, { status: 400 });
    }

    const slotStart = new Date(bookingDate);
    slotStart.setHours(startHour, 0, 0, 0);
    if (slotStart <= new Date()) {
      return NextResponse.json({ error: "Only upcoming slots can be booked" }, { status: 400 });
    }

    const hourlyRate = getHourlyRate(activity);
    const result = await prisma.$transaction(async (tx) => {
      const [existingSlot, existingBlock] = await Promise.all([
        tx.bookingSlot.findFirst({
          where: {
            slotDate: bookingDate,
            activity,
            courtNumber,
            startHour: { lt: endHour },
            endHour: { gt: startHour },
            booking: {
              status: { in: ["PRIVATE_CONFIRMED", "OPEN_PENDING_FILL", "OPEN_CONFIRMED"] },
            },
          },
        }),
        tx.slotBlock.findFirst({
          where: {
            blockDate: bookingDate,
            activity,
            courtNumber,
            startHour: { lt: endHour },
            endHour: { gt: startHour },
          },
        }),
      ]);

      if (existingSlot) throw new Error("SLOT_ALREADY_BOOKED");
      if (existingBlock) throw new Error("BLOCKED_SLOT");

      let user = await tx.user.findUnique({ where: { phone } });
      if (!user) {
        user = await tx.user.create({ data: { name, phone } });
      } else if (!user.name) {
        user = await tx.user.update({ where: { id: user.id }, data: { name } });
      }

      return tx.booking.create({
        data: {
          userId: user.id,
          bookingType: "PRIVATE",
          status: "PRIVATE_CONFIRMED",
          bookingDate,
          playersCount: activity === "PICKLEBALL" ? 4 : 10,
          paymentStatus,
          paidAt: paymentStatus === "PAID" ? new Date() : null,
          totalPrice: hourlyRate,
          notes: "Created by venue admin",
          slots: {
            create: {
              slotDate: bookingDate,
              startHour,
              endHour,
              price: hourlyRate,
              activity,
              courtNumber,
            },
          },
        },
        include: { user: true, slots: true },
      });
    }, { timeout: 15000 });

    return NextResponse.json({ success: true, booking: result }, { status: 201 });
  } catch (error: unknown) {
    if (isUnauthorizedError(error)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const message = error instanceof Error ? error.message : "";
    if (message === "SLOT_ALREADY_BOOKED") {
      return NextResponse.json({ error: "This slot has already been booked" }, { status: 409 });
    }
    if (message === "BLOCKED_SLOT") {
      return NextResponse.json({ error: "This slot is blocked" }, { status: 409 });
    }

    console.error("ADMIN_BOOKING_CREATE_ERROR", error);
    return NextResponse.json(
      { error: getErrorMessage(error, "Failed to create booking") },
      { status: 500 },
    );
  }
}
