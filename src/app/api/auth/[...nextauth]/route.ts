"use server";
import NextAuth from "next-auth";
import { authOptions } from "../../../../../lib/nextauth.options"; // ✅ import from shared lib

// Only export GET and POST handlers for App Router
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
