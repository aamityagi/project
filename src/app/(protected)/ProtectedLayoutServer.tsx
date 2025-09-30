// src/app/(protected)/ProtectedLayoutServer.tsx
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/nextauth.options"; // ✅ import from shared lib
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default async function ProtectedLayoutServer({ children }: ProtectedLayoutProps) {
  // Check session on the server
  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirect unauthorized users to login
    redirect("/login");
  }

  // Return protected content if session exists
  return <>{children}</>;
}
