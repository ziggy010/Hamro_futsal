import { NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma";
import { getErrorMessage } from "@/lib/utils/error-message";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ ok: true, users });
  } catch (error: unknown) {
    return NextResponse.json(
      { ok: false, error: getErrorMessage(error, "Failed to fetch users") },
      { status: 500 },
    );
  }
}
