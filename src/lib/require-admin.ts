import { auth } from "../../auth";

export async function requireAdmin() {
  const session = await auth();

  const isAdmin =
    !!session?.user && (session.user as { role?: string }).role === "admin";

  if (!isAdmin) {
    throw new Error("UNAUTHORIZED");
  }

  return session;
}
