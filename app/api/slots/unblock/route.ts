import { NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/prisma";
import { requireAdmin } from "../../../../src/lib/require-admin";
import {
  getErrorMessage,
  isUnauthorizedError,
} from "@/lib/utils/error-message";

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = await req.json();
    const { slotBlockId } = body;

    if (!slotBlockId) {
      return NextResponse.json(
        { error: "slotBlockId is required" },
        { status: 400 },
      );
    }

    await prisma.slotBlock.delete({
      where: { id: slotBlockId },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (isUnauthorizedError(error)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      {
        error: "Failed to unblock slot",
        details: getErrorMessage(error),
      },
      { status: 500 },
    );
  }
}
