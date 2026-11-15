import type { Metadata } from "next";
import Network from "@/components/pages/Network";
import JsonLd from "@/components/JsonLd";
import { breadcrumbs, SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "The Pax Network — Clinicians, Labs & Partners",
  description:
    "Meet the Pax network: independent U.S.-licensed clinicians, CLIA-certified laboratories, and licensed pharmacy partners behind Pax Health.",
  alternates: { canonical: "/network" },
  openGraph: {
    title: "The Pax Network",
    description: "Licensed clinicians, certified labs, and pharmacy partners.",
    url: `${SITE}/network`,
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbs([["Home", "/"], ["Network", "/network"]])} />
      <Network />
    </>
  );
}
