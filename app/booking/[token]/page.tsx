import type { Metadata } from "next";
import Booking from "@/components/pages/Booking";

export const metadata: Metadata = { title: "Booking — Pax Health", robots: { index: false, follow: false } };

export default function Page() {
  return <Booking />;
}
