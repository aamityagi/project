// src/lib/getServerAuthSession.ts
import { getServerSession } from "next-auth";
import { authOptions } from "./nextauth.options";

export async function getServerAuthSession() {
  // Simple wrapper: call from server components/route handlers
  return await getServerSession(authOptions);
}
