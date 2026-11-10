/**
 * VirtualClinicOS Brand Storefront — server-side catalog for Pax.
 * Docs: https://portal.virtualclinicos.com/api-docs (Brand Storefront API, Product change events).
 *
 * Responses are cached under VCO_TAG. /api/vco-webhook clears that tag when VCO
 * reports a product change; the timed revalidate is only a safety net.
 */
import { toTreatment } from "@/brand/productMap.js";

if (typeof window !== "undefined") {
  throw new Error("src/lib/vco.ts is server-only");
}

const BASE = (process.env.VCO_API_BASE || "https://portal.virtualclinicos.com").replace(/\/$/, "");
const BRAND_ID =
  process.env.VCO_BRAND_ID || process.env.NEXT_PUBLIC_VCO_BRAND_ID || "4065c369-9a3c-47af-8d6f-07cc7238d329";
const SAFETY_REVALIDATE_SECONDS = 300;

export const VCO_TAG = "vco-products";

type RawCategory = { id: string; name: string; slug: string; sort_order?: number | null };
type RawProduct = Record<string, any>;
export type Treatment = ReturnType<typeof toTreatment>;

async function vco<T>(path: string): Promise<T | null> {
  const key = process.env.VCO_STOREFRONT_KEY || process.env.VCO_API_KEY;
  const url = new URL(`${BASE}${path}`);
  const headers: Record<string, string> = { Accept: "application/json" };
  if (key) {
    headers.Authorization = `Bearer ${key}`;
  } else {
    url.searchParams.set("brandId", BRAND_ID);
    headers["X-Brand-Id"] = BRAND_ID;
  }

  const res = await fetch(url, {
    headers,
    next: { tags: [VCO_TAG], revalidate: SAFETY_REVALIDATE_SECONDS },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`VCO ${path} answered ${res.status}`);
  return res.json();
}

async function listCategories(): Promise<RawCategory[]> {
  try {
    return (await vco<{ categories: RawCategory[] }>("/api/commerce/v1/categories"))?.categories ?? [];
  } catch {
    return [];
  }
}

function sortProducts(products: RawProduct[], categories: RawCategory[]) {
  const order = (p: RawProduct) => categories.find((c) => c.id === p.category)?.sort_order ?? 999;
  return [...products].sort(
    (a, b) => order(a) - order(b) || String(a.created_at).localeCompare(String(b.created_at)),
  );
}

export async function listTreatments(): Promise<Treatment[]> {
  const [data, categories] = await Promise.all([
    vco<{ products: RawProduct[] }>("/api/commerce/v1/products"),
    listCategories(),
  ]);
  return sortProducts(data?.products ?? [], categories).map((p) => toTreatment(p, categories));
}

export async function getTreatment(slug: string): Promise<Treatment | null> {
  if (!slug) return null;
  const [data, categories] = await Promise.all([
    vco<{ product: RawProduct }>(`/api/commerce/v1/products/${encodeURIComponent(slug)}`),
    listCategories(),
  ]);
  return data?.product ? toTreatment(data.product, categories) : null;
}
