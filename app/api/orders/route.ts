import { NextRequest, NextResponse } from "next/server";
import { getPatientOrders } from "@/server/vcoCheckout.js";

export async function GET(req: NextRequest) {
  const email = String(req.nextUrl.searchParams.get("email") || "");
  const result = await getPatientOrders({ email });
  return NextResponse.json(result.json, { status: result.status });
}