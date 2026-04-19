import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import { prisma } from "../../../src/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "Failed to load account data",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

type UpdateAccountBody = {
  name?: string;
  phone?: string;
};

export async function PATCH(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as UpdateAccountBody;
    const name = body.name?.trim() || "";
    const phone = body.phone?.trim() || "";
    const phoneValid = !phone || /^[0-9+\-\s]{7,15}$/.test(phone);

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 },
      );
    }

    if (!phoneValid) {
      return NextResponse.json(
        { error: "Please enter a valid phone number" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
      },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (phone) {
      const conflictingUser = await prisma.user.findFirst({
        where: {
          phone,
          id: {
            not: existingUser.id,
          },
        },
        select: {
          id: true,
        },
      });

      if (conflictingUser) {
        return NextResponse.json(
          { error: "Phone already in use" },
          { status: 409 },
        );
      }
    }

    const user = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        name,
        phone: phone || null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "Failed to update account",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
