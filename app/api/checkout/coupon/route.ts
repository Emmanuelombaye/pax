import { NextRequest, NextResponse } from "next/server";
import { validateCoupon } from "@/server/vcoCheckout.js";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const result = await validateCoupon({
    code: body?.code,
    programSlug: body?.programSlug,
  });
  return NextResponse.json(result.json, { status: result.status });
}