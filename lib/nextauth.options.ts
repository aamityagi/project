import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectMongo } from "./mongoose";
import User from "../models/User";
import { JWT } from "next-auth/jwt";

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
if (!NEXTAUTH_SECRET) {
  throw new Error("Please define NEXTAUTH_SECRET in .env.local");
}

// ✅ Type-safe JWT
interface MyJWT extends JWT {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectMongo();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.fullName,
          email: user.email,
          role: user.role ?? "user",
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      const t: MyJWT = token; // ✅ cast token safely
      if (user) {
        t.id = user.id;
        t.name = user.name;
        t.email = user.email;
        t.role = user.role ?? "user";
      }
      return t;
    },
    async session({ session, token }) {
      const t = token as MyJWT;
      session.user.id = t.id ?? "";
      session.user.name = t.name ?? "";
      session.user.email = t.email ?? "";
      session.user.role = t.role ?? "user";
      return session;
    },
  },
};
