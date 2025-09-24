// src/lib/auth.ts
import { AuthOptions } from "next-auth"; // NextAuth v4 / Auth.js
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../models/User";
import { connectMongo } from "./mongoose";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        await connectMongo();
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        // For demo, using plain password comparison
        if (credentials.password !== user.password) return null;

        return {
          id: user._id.toString(),
          name: user.fullName,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login", // login page
  },
  secret: process.env.AUTH_SECRET,
};
