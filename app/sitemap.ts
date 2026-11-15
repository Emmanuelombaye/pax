import type { MetadataRoute } from "next";
import { groupByCategory } from "@/brand/productMap.js";
import { labPanelSlugs } from "@/data/labPanels.js";
import { LEGAL_PAGE_IDS } from "@/data/legalContent.js";
import { listTreatments } from "@/lib/vco";
import { SITE } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const treatments = await listTreatments().catch(() => []);
  const lastModified = new Date();
  return [
    { url: `${SITE}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/treatments`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/how-pax-works`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/network`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    ...groupByCategory(treatments).map((group) => ({
      url: `${SITE}/programs/${group.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...treatments.map((item) => ({
      url: `${SITE}/treatments/${item.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...labPanelSlugs().map((slug: string) => ({
      url: `${SITE}/labs/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...LEGAL_PAGE_IDS.map((id: string) => ({
      url: `${SITE}/legal/${id}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
