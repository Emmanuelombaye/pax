import type { Metadata } from "next";
import Admin from "@/components/pages/Admin";

export const metadata: Metadata = { title: "Admin — Pax Health", robots: { index: false, follow: false } };

export default function Page() {
  return <Admin />;
}
