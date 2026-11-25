import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  const destination = new URL("/login", process.env.AUTH_URL || req.url);
  if (!token || !/^[0-9a-f]{64}$/.test(token)) {
    destination.searchParams.set("verification", "invalid");
    return NextResponse.redirect(destination);
  }
  const tokenHash = createHash("sha256").update(token).digest("hex");
  try {
    const record = await prisma.emailVerificationToken.findUnique({ where: { tokenHash } });
    if (!record || record.expiresAt < new Date()) {
      destination.searchParams.set("verification", "expired");
    } else {
      await prisma.$transaction([
        prisma.user.update({ where: { id: record.userId }, data: { emailVerifiedAt: new Date() } }),
        prisma.emailVerificationToken.deleteMany({ where: { userId: record.userId } }),
      ]);
      destination.searchParams.set("verification", "success");
    }
  } catch (error) {
    console.error("EMAIL_VERIFICATION_ERROR", error);
    destination.searchParams.set("verification", "error");
  }
  const response = NextResponse.redirect(destination);
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("Cache-Control", "no-store");
  return response;
}
