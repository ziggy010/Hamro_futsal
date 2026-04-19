import { NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/prisma";
import { Prisma as PrismaClient } from "@prisma/client";
import { auth } from "../../../../auth";

type IncomingSlot = {
  startHour: number;
  endHour: number;
  price: number;
};

type BookingBody = {
  name: string;
  phone: string;
  email?: string;
  bookingDate: string;
  bookingType: "PRIVATE" | "OPEN";
  playersCount: number;
  totalPrice: number;
  slots: IncomingSlot[];
};

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function priceForHour(hour: number) {
  if (hour < 10) return 800;
  if (hour < 17) return 1000;
  return 1200;
}

function normalizeSlots(slots: IncomingSlot[]) {
  const normalized = slots
    .map((slot) => ({
      startHour: Number(slot.startHour),
      endHour: Number(slot.endHour),
      price: Number(slot.price),
    }))
    .sort((a, b) => a.startHour - b.startHour);

  if (normalized.length === 0 || normalized.length > 2) {
    throw new Error("INVALID_SLOT_SELECTION");
  }

  for (const slot of normalized) {
    const isValidHour =
      Number.isInteger(slot.startHour) &&
      Number.isInteger(slot.endHour) &&
      slot.startHour >= 7 &&
      slot.endHour <= 22 &&
      slot.endHour === slot.startHour + 1;

    if (!isValidHour) {
      throw new Error("INVALID_SLOT_SELECTION");
    }

    const expectedPrice = priceForHour(slot.startHour);

    if (slot.price !== expectedPrice) {
      throw new Error("INVALID_SLOT_PRICE");
    }
  }

  if (
    normalized.length === 2 &&
    normalized[1].startHour !== normalized[0].endHour
  ) {
    throw new Error("INVALID_SLOT_SELECTION");
  }

  return normalized;
}

function getGameStart(date: Date, slots: IncomingSlot[]) {
  const earliestStartHour = Math.min(...slots.map((slot) => slot.startHour));
  const gameStart = new Date(date);
  gameStart.setHours(earliestStartHour, 0, 0, 0);
  return gameStart;
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to book a slot" },
        { status: 401 },
      );
    }
    const sessionEmail = session.user.email;
    const body = (await req.json()) as BookingBody;

    const { name, phone, bookingDate, bookingType, playersCount, slots } =
      body;
    const safeName = name?.trim() || "";
    const safePhone = phone?.trim() || "";
    const normalizedSlots = normalizeSlots(slots || []);
    const safePlayersCount = Number(playersCount);
    const expectedTotal = normalizedSlots.reduce(
      (sum, slot) => sum + priceForHour(slot.startHour),
      0,
    );

    if (
      !safeName ||
      !bookingDate ||
      !bookingType ||
      !safePlayersCount ||
      !normalizedSlots.length
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (safePlayersCount < 1 || safePlayersCount > 10) {
      return NextResponse.json(
        { error: "Players count must be between 1 and 10" },
        { status: 400 },
      );
    }

    const normalizedDate = startOfDay(new Date(bookingDate));

    if (Number.isNaN(normalizedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid booking date" },
        { status: 400 },
      );
    }

    const now = new Date();
    const gameStart = getGameStart(normalizedDate, normalizedSlots);

    if (gameStart <= now) {
      return NextResponse.json(
        { error: "Please choose an upcoming slot" },
        { status: 400 },
      );
    }

    let user = await prisma.user.findUnique({
      where: { email: sessionEmail },
    });

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    const nextPhone = safePhone || user.phone || "";

    if (!nextPhone) {
      throw new Error("PHONE_REQUIRED");
    }

    if (!user.name && safeName) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: safeName,
          phone: nextPhone,
        },
      });
    } else if (user.name !== safeName || user.phone !== nextPhone) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: safeName,
          phone: nextPhone,
        },
      });
    }

    const result = await prisma.$transaction(
      async (tx) => {
        const blockedSlots = await tx.slotBlock.findMany({
          where: {
            blockDate: normalizedDate,
          },
        });

        type BlockedSlotItem = (typeof blockedSlots)[number];

        for (const slot of normalizedSlots) {
          const isBlocked = blockedSlots.some(
            (b: BlockedSlotItem) =>
              b.startHour === slot.startHour && b.endHour === slot.endHour,
          );

          if (isBlocked) {
            throw new Error("BLOCKED_SLOT");
          }
        }

        const existingSlots = await tx.bookingSlot.findMany({
          where: {
            slotDate: normalizedDate,
            booking: {
              status: {
                in: [
                  "PRIVATE_CONFIRMED",
                  "OPEN_PENDING_FILL",
                  "OPEN_CONFIRMED",
                ],
              },
            },
          },
        });

        type ExistingSlotItem = (typeof existingSlots)[number];

        for (const slot of normalizedSlots) {
          const isTaken = existingSlots.some(
            (s: ExistingSlotItem) =>
              s.startHour === slot.startHour && s.endHour === slot.endHour,
          );

          if (isTaken) {
            throw new Error("SLOT_ALREADY_BOOKED");
          }
        }

        const booking = await tx.booking.create({
          data: {
            userId: user.id,
            bookingType,
            status:
              bookingType === "PRIVATE"
                ? "PRIVATE_CONFIRMED"
                : "OPEN_PENDING_FILL",
            bookingDate: normalizedDate,
            playersCount: safePlayersCount,
            totalPrice: expectedTotal,
            slots: {
              create: normalizedSlots.map((slot) => ({
                slotDate: normalizedDate,
                startHour: slot.startHour,
                endHour: slot.endHour,
                price: priceForHour(slot.startHour),
              })),
            },
            ...(bookingType === "OPEN"
              ? {
                  openGame: {
                    create: {
                      status: "PENDING_FILL",
                      currentPlayers: safePlayersCount,
                      minPlayers: 6,
                      maxPlayers: 10,
                      cutoffTime: new Date(
                        new Date(normalizedDate).setHours(
                          normalizedSlots[0].startHour - 2,
                          0,
                          0,
                          0,
                        ),
                      ),
                    },
                  },
                }
              : {}),
          },
          include: {
            user: true,
            slots: true,
            openGame: true,
          },
        });

        return booking;
      },
      {
        timeout: 15000,
      },
    );

    return NextResponse.json(
      { success: true, booking: result },
      { status: 201 },
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "";

    if (errorMessage === "BLOCKED_SLOT") {
      return NextResponse.json(
        { error: "One or more selected slots are blocked" },
        { status: 400 },
      );
    }

    if (errorMessage === "SLOT_ALREADY_BOOKED") {
      return NextResponse.json(
        { error: "One or more selected slots are already booked" },
        { status: 400 },
      );
    }

    if (errorMessage === "INVALID_SLOT_SELECTION") {
      return NextResponse.json(
        { error: "Please choose one hour or two continuous hours" },
        { status: 400 },
      );
    }

    if (errorMessage === "INVALID_SLOT_PRICE") {
      return NextResponse.json(
        { error: "Selected slot pricing is invalid. Please choose again." },
        { status: 400 },
      );
    }

    if (errorMessage === "PHONE_REQUIRED") {
      return NextResponse.json(
        { error: "Phone number is required to complete the booking" },
        { status: 400 },
      );
    }

    if (errorMessage === "USER_NOT_FOUND") {
      return NextResponse.json(
        { error: "Logged-in user not found" },
        { status: 404 },
      );
    }

    if (error instanceof PrismaClient.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          error: "Failed to create booking",
          details: `Database error ${error.code}: ${error.message}`,
        },
        { status: 500 },
      );
    }

    console.error("BOOKING_CREATE_ERROR", error);

    return NextResponse.json(
      {
        error: "Failed to create booking",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
