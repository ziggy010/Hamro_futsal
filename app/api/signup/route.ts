import { NextResponse } from "next/server";
import { compare, hash } from "bcryptjs";
import { prisma } from "../../../src/lib/prisma";
import { createHash, randomBytes } from "node:crypto";
import { emailConfigured, sendEmail, verificationEmail } from "@/lib/email";
import { clientIp, rateLimited } from "@/lib/rate-limit";

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
    const verificationRequired = process.env.EMAIL_VERIFICATION_ENABLED === "true";

    if (verificationRequired && !emailConfigured()) {
      return NextResponse.json({ error: "Email signup is temporarily unavailable" }, { status: 503 });
    }
    if (await rateLimited(`signup:ip:${clientIp(req)}`, 5, 60 * 60_000) ||
        await rateLimited(`signup:email:${safeEmail}`, 3, 60 * 60_000)) {
      return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
    }

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

    if (existingUserByEmail?.emailVerifiedAt) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 },
      );
    }

    if (existingUserByEmail?.passwordHash &&
        !await compare(safePassword, existingUserByEmail.passwordHash)) {
      return NextResponse.json({ error: "This email has a pending account. Use its original password to resend verification." }, { status: 409 });
    }

    let venueCreatedUser: { id: string } | null = null;

    if (safePhone) {
      const existingUserByPhone = await prisma.user.findUnique({
        where: { phone: safePhone },
      });

      if (existingUserByPhone) {
        if (existingUserByPhone.email || existingUserByPhone.passwordHash) {
          return NextResponse.json(
            { error: "Phone already in use" },
            { status: 409 },
          );
        }
        venueCreatedUser = existingUserByPhone;
      }
    }

    const passwordHash = await hash(safePassword, 10);

    const user = existingUserByEmail && !existingUserByEmail.emailVerifiedAt
      ? verificationRequired
        ? { id: existingUserByEmail.id }
        : await prisma.user.update({
            where: { id: existingUserByEmail.id },
            data: { emailVerifiedAt: new Date() },
            select: { id: true },
          })
      : venueCreatedUser
      ? await prisma.user.update({
          where: { id: venueCreatedUser.id },
          data: {
            name: safeName,
            email: safeEmail,
            passwordHash,
            emailVerifiedAt: verificationRequired ? null : new Date(),
          },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
          },
        })
      : await prisma.user.create({
          data: {
            name: safeName,
            email: safeEmail,
            phone: safePhone,
            passwordHash,
            emailVerifiedAt: verificationRequired ? null : new Date(),
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

    if (verificationRequired) {
      const token = randomBytes(32).toString("hex");
      await prisma.emailVerificationToken.deleteMany({ where: { userId: user.id } });
      await prisma.emailVerificationToken.create({ data: {
        userId: user.id,
        tokenHash: createHash("sha256").update(token).digest("hex"),
        expiresAt: new Date(Date.now() + 24 * 60 * 60_000),
      } });
      const url = new URL("/api/verify-email", process.env.AUTH_URL);
      url.searchParams.set("token", token);
      await sendEmail(safeEmail, "Verify your Strike Yard email", verificationEmail(url.toString()));
    }

    return NextResponse.json(
      {
        success: true,
        verificationRequired,
        message: verificationRequired ? "Check your email for a verification link." : "Account created.",
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("SIGNUP_ERROR", error);

    if (error instanceof Error && error.message.startsWith("EMAIL_SEND_FAILED_")) {
      return NextResponse.json({ error: "Could not send verification email. Please try again." }, { status: 503 });
    }

    return NextResponse.json(
      {
        error: "Failed to sign up",
      },
      { status: 500 },
    );
  }
}
