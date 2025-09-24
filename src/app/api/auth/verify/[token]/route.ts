import { NextResponse } from "next/server";
import { connectMongo } from "../../../../../../lib/mongoose";
import User from "../../../../../../models/User";

interface Params {
  params: Promise<{ token: string }>; // ✅ make params async
}

export async function GET(req: Request, { params }: Params) {
  await connectMongo();

  const { token } = await params; // ✅ await params

  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  user.isVerified = true;
  user.verificationToken = "";
  await user.save();

  // ✅ Redirect with absolute URL
  return NextResponse.redirect(new URL("/login", req.url));
}
