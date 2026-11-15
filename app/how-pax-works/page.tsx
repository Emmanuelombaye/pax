import type { Metadata } from "next";
import HowItWorks from "@/components/pages/HowItWorks";
import JsonLd from "@/components/JsonLd";
import { listTreatments } from "@/lib/vco";
import { breadcrumbs, SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How Pax Health Works — Labs, Provider Review, Personalized Plan",
  description:
    "Start with comprehensive bloodwork, review results with a licensed U.S. provider, and receive a personalized longevity and hormone plan. Basic $25/month, Premium $155/month; medication billed separately.",
  alternates: { canonical: "/how-pax-works" },
  openGraph: {
    title: "How Pax Health Works",
    description: "Bloodwork, licensed provider review, and a personalized plan — step by step.",
    url: `${SITE}/how-pax-works`,
    type: "website",
  },
};

export default async function Page() {
  return (
    <>
      <JsonLd data={breadcrumbs([["Home", "/"], ["How it works", "/how-pax-works"]])} />
      <HowItWorks treatments={await listTreatments()} />
    </>
  );
}
