import { createHash } from "node:crypto";
import { prisma } from "@/src/lib/prisma";

export async function rateLimited(key: string, limit: number, windowMs: number) {
  const hashed = createHash("sha256").update(key).digest("hex");
  const now = new Date();
  const cutoff = new Date(now.getTime() - windowMs);
  await prisma.rateLimit.updateMany({ where: { key: hashed, windowStart: { lt: cutoff } }, data: { count: 0, windowStart: now } });
  const record = await prisma.rateLimit.upsert({
    where: { key: hashed },
    create: { key: hashed, count: 1, windowStart: now },
    update: { count: { increment: 1 } },
  });
  return record.count > limit;
}

export function clientIp(req: Request) {
  return req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
