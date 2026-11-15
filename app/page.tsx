import type { Metadata } from "next";
import Home from "@/components/pages/Home";
import { listTreatments } from "@/lib/vco";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Page() {
  return <Home treatments={await listTreatments()} />;
}
