import BookingDetailsClient from "./booking-details-client";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { prisma } from "../../../src/lib/prisma";

type RawSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

type Slot = {
  time: string;
  price: number;
};

type InitialUser = {
  name: string;
  phone: string;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function BookingDetailsPage({
  searchParams,
}: {
  searchParams: RawSearchParams;
}) {
  const params = await searchParams;

  const date = firstValue(params.date);
  const slotsRaw = firstValue(params.slots);

  let slots: Slot[] = [];
  try {
    slots = slotsRaw ? JSON.parse(slotsRaw) : [];
  } catch {
    slots = [];
  }

  const hasValidDate = !!date && !Number.isNaN(new Date(date).getTime());
  const hasValidSlots =
    Array.isArray(slots) &&
    slots.length > 0 &&
    slots.length <= 2 &&
    slots.every(
      (slot) =>
        typeof slot?.time === "string" &&
        slot.time.length > 0 &&
        typeof slot?.price === "number" &&
        Number.isFinite(slot.price),
    );

  if (!hasValidDate || !hasValidSlots) {
    redirect("/book");
  }

  const total = slots.reduce((sum, slot) => sum + slot.price, 0);
  const session = await auth();

  let initialUser: InitialUser | undefined;

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        name: true,
        phone: true,
      },
    });

    initialUser = {
      name: user?.name || session.user.name || "",
      phone: user?.phone || "",
    };
  }

  return (
    <BookingDetailsClient
      dateParam={date}
      slots={slots}
      total={total}
      initialUser={initialUser}
    />
  );
}
