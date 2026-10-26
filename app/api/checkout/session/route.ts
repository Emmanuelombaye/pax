import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/server/vcoCheckout.js";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const origin = req.headers.get("origin") || req.nextUrl.origin;
  const result = await createCheckoutSession({ body, origin });
  return NextResponse.json(result.json, { status: result.status });
}