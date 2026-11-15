import type { Metadata } from "next";
import TreatmentsCatalog from "@/components/pages/TreatmentsCatalog";
import JsonLd from "@/components/JsonLd";
import { listTreatments } from "@/lib/vco";
import { breadcrumbs, SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Treatments — Hormone, Weight & Longevity Care | Pax Health",
  description:
    "Browse Pax treatments for hormone therapy, weight care, and longevity. Every option is prescribed only after a licensed provider reviews your intake.",
  alternates: { canonical: "/treatments" },
  openGraph: {
    title: "Pax Health Treatments",
    description: "Hormone, weight, and longevity treatments prescribed after a licensed review.",
    url: `${SITE}/treatments`,
    type: "website",
  },
};

export default async function Page() {
  return (
    <>
      <JsonLd data={breadcrumbs([["Home", "/"], ["Treatments", "/treatments"]])} />
      <TreatmentsCatalog treatments={await listTreatments()} />
    </>
  );
}
