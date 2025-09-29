import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const base = searchParams.get("base") || "USD";
  const symbols = searchParams.get("symbols") || "USD";

  try {
    const res = await fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch exchange rate" }, { status: 500 });
  }
}
