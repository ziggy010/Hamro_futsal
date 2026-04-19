import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "../../../src/lib/prisma";

type SignupBody = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SignupBody;
    const { name, email, password, phone } = body;

    const safeName = name?.trim() || "";
    const safeEmail = email?.trim().toLowerCase() || "";
    const safePassword = password || "";
    const safePhone = phone?.trim() || null;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail);
    const phoneValid = !safePhone || /^[0-9+\-\s]{7,15}$/.test(safePhone);

    if (!safeName || !safeEmail || !safePassword) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 },
      );
    }

    if (!emailValid) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 },
      );
    }

    if (safePassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    if (!phoneValid) {
      return NextResponse.json(
        { error: "Please enter a valid phone number" },
        { status: 400 },
      );
    }

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: safeEmail },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 },
      );
    }

    if (safePhone) {
      const existingUserByPhone = await prisma.user.findUnique({
        where: { phone: safePhone },
      });

      if (existingUserByPhone) {
        return NextResponse.json(
          { error: "Phone already in use" },
          { status: 409 },
        );
      }
    }

    const passwordHash = await hash(safePassword, 10);

    const user = await prisma.user.create({
      data: {
        name: safeName,
        email: safeEmail,
        phone: safePhone,
        passwordHash,
        role: "USER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("SIGNUP_ERROR", error);

    return NextResponse.json(
      {
        error: "Failed to sign up",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
