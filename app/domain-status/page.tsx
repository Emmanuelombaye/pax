import type { Metadata } from "next";
import DomainStatus from "@/components/pages/DomainStatus";

export const metadata: Metadata = { title: "Domain status — Pax Health", robots: { index: false, follow: false } };

export default function Page() {
  return <DomainStatus />;
}
