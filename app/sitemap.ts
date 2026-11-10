import type { MetadataRoute } from "next";
import { groupByCategory } from "@/brand/productMap.js";
import { listTreatments } from "@/lib/vco";

const SITE = "https://www.paxlongevity.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const treatments = await listTreatments().catch(() => []);
  return [
    { url: `${SITE}/` },
    { url: `${SITE}/treatments` },
    { url: `${SITE}/how-pax-works` },
    { url: `${SITE}/network` },
    ...groupByCategory(treatments).map((group) => ({ url: `${SITE}/programs/${group.slug}` })),
    ...treatments.map((item) => ({ url: `${SITE}/treatments/${item.slug}` })),
  ];
}
