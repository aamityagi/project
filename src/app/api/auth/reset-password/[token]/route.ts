import { NextResponse } from "next/server";
import { connectMongo } from "../../../../../../lib/mongoose";
import User from "../../../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request, context: { params: Promise<{ token: string }> }) {
  try {
    await connectMongo();
    const { password, confirmPassword } = await req.json();

    // ✅ await params
    const { token } = await context.params;

    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json(
      { success: true, message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
