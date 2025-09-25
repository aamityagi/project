import { NextResponse } from "next/server";
import { connectMongo } from "../../../../../lib/mongoose";
import User from "../../../../../models/User";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "../../../../../lib/sendEmail";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectMongo();
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      password,
      confirmPassword,
      extraInfo,
      terms,
      profession,
      professionLink,
    } = body;

    // Basic validation
    if (!fullName || !email || !phone || !password || !confirmPassword || !profession) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    if (
      (profession === "business" || profession === "social" || profession === "company") &&
      !professionLink
    ) {
      return NextResponse.json(
        { error: "Please enter the required link for your profession" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return NextResponse.json({ error: "Email or phone already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();

    // Create user with isVerified = false
    const user = await User.create({
      id: uuidv4(),
      fullName,
      email,
      phone,
      password: hashedPassword,
      role: "user",
      extraInfo: extraInfo || "",
      terms: !!terms,
      profession,
      professionLink: professionLink || "",
      isVerified: false,
      verificationToken,
    });

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json({
      message: "Signup successful! Verification email sent to your email address.",
      userId: user.id,
    });
  } catch (error) {
    console.error("Signup API error:", error);

    // ✅ Type-safe error handling
    const message = error instanceof Error ? error.message : "Server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
