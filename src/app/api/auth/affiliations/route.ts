"use server";
import { NextResponse } from "next/server";
import { connectMongo } from "../../../../../lib/mongoose";
import Affiliation from "../../../../../models/Affiliation";
import { getServerAuthSession } from "../../../../../lib/getServerAuthSession";

// Type for POST body
interface AffiliationBody {
  fullName: string;
  email?: string;
  companyName?: string;
  website?: string;
  userId?: string;
}

// ✅ Safe JSON parser
async function safeJson(req: Request) {
  try {
    const text = await req.text();
    if (!text) return {};
    return JSON.parse(text);
  } catch {
    return {};
  }
}

export async function POST(req: Request) {
  await connectMongo();

  try {
    const session = await getServerAuthSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // ✅ Use safe JSON parsing
    const body = (await safeJson(req)) as AffiliationBody;

    // Basic server-side validation
    if (!body.fullName) {
      return NextResponse.json({ error: "fullName required" }, { status: 400 });
    }

    // Update existing or create new affiliation
    const existing = await Affiliation.findOne({ userId: session.user.id });
    if (existing) {
      Object.assign(existing, body);
      await existing.save();
      return NextResponse.json({ ok: true, affiliation: existing });
    }

    const affiliation = await Affiliation.create({
      ...body,
      userId: session.user.id,
      email: session.user.email,
    });

    return NextResponse.json({ ok: true, affiliation }, { status: 201 });
  } catch (error) {
    console.error("Affiliation API error", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  await connectMongo();

  try {
    const session = await getServerAuthSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const isAdmin = session.user.role === "admin"; // type-safe
    if (isAdmin) {
      const all = await Affiliation.find().sort({ createdAt: -1 }).lean();
      return NextResponse.json({ ok: true, affiliations: all });
    }

    const mine = await Affiliation.findOne({ userId: session.user.id }).lean();
    return NextResponse.json({ ok: true, affiliation: mine });
  } catch (error) {
    console.error("Affiliation GET error", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
