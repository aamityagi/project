// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongo } from "../../../../../lib/mongoose";
import User from "../../../../../models/User";
import bcrypt from "bcryptjs";

// ✅ Type for token to satisfy TypeScript
type ExtendedToken = {
  id?: string;
  email?: string;
  name?: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect to MongoDB
        await connectMongo();

        // Find user by email
        const user = await User.findOne({ email: credentials?.email });
        if (!user) throw new Error("No user found");

        // Validate password
        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid password");

        // ✅ Return data for JWT
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.fullName, // Use fullName from your schema
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Cast token to ExtendedToken for TypeScript
      const t = token as ExtendedToken;

      session.user = {
        id: t.id || "",
        email: t.email || "",
        name: t.name || "",
      };

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
