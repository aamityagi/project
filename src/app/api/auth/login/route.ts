import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "../../../../../lib/mongoose";
import User from "../../../../../models/User";
import bcrypt from "bcryptjs"; // or "bcrypt"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Connect to MongoDB
    await connectMongo();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { field: "email", message: "User not found" },
        { status: 401 }
      );
    }

    // Compare passwords
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { field: "password", message: "Incorrect password" },
        { status: 401 }
      );
    }

    // ✅ Successful login
    // Create a session (you can use a cookie)
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("userEmail", user.email, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
