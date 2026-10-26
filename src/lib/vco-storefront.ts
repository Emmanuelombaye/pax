/**
 * VirtualClinicOS Brand Storefront (browser-safe brand ID).
 * Docs: https://portal.virtualclinicos.com/api-docs#storefront-auth
 */

const DEFAULT_BASE = "https://portal.virtualclinicos.com";
const DEFAULT_BRAND_ID = "4065c369-9a3c-47af-8d6f-07cc7238d329";

export const TREATMENT_SKU: Record<string, string> = {
  semaglutide: "STORE-SEMA",
  tirzepatide: "STORE-TIRZ",
  nad: "STORE-NAD",
  weight: "STORE-SEMA",
};

type StorefrontProduct = {
  id: string;
  sku?: string;
  name?: string;
  intake_url?: string | null;
  status?: string;
};

function config() {
  const baseUrl = (
    process.env.NEXT_PUBLIC_VCO_API_URL ||
    process.env.VITE_PAX_API_URL ||
    DEFAULT_BASE
  ).replace(/\/$/, "");
  const brandId =
    process.env.NEXT_PUBLIC_VCO_BRAND_ID ||
    process.env.VITE_PAX_BRAND_ID ||
    DEFAULT_BRAND_ID;
  return { baseUrl, brandId };
}

export async function fetchStorefrontProducts(): Promise<StorefrontProduct[]> {
  const { baseUrl, brandId } = config();
  const url = new URL(`${baseUrl}/api/commerce/v1/products`);
  url.searchParams.set("brandId", brandId);
  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "X-Brand-Id": brandId,
    },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Storefront failed (${res.status})`);
  const data = await res.json();
  return Array.isArray(data?.products) ? data.products : [];
}

export function findIntakeUrl(
  products: StorefrontProduct[],
  treatmentKey: string,
): string | null {
  const sku = TREATMENT_SKU[treatmentKey] || TREATMENT_SKU.semaglutide;
  const match = products.find((p) => p.sku === sku && p.status !== "inactive");
  return match?.intake_url || null;
}

export function beginHostedIntake(intakeUrl: string) {
  if (typeof window === "undefined") return;
  window.location.assign(intakeUrl);
}
