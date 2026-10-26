/**
 * Pax Connect Adapter — storefront boundary.
 * Storefront: VirtualClinicOS Brand Storefront (browser brand ID).
 * Orders are created inside hosted intake — not from this marketing site.
 */
import { PAX_PASSPORT } from "./passport.js";
import { beginIntake, fetchCategories, fetchProduct, fetchProducts } from "./storefront.js";
import { mapCatalog } from "./productMap.js";

export function connectMode() {
  return PAX_PASSPORT.connect.mode || "remote";
}

export async function listStorefrontProducts() {
  const raw = await fetchProducts();
  return mapCatalog(raw);
}

export async function getStorefrontProduct(slugOrSku) {
  const raw = await fetchProduct(slugOrSku);
  return raw ? mapCatalog([raw])[0] : null;
}

export async function listStorefrontCategories() {
  return fetchCategories();
}

export function startProductIntake(productOrUrl) {
  const url = typeof productOrUrl === "string" ? productOrUrl : productOrUrl?.intakeUrl;
  beginIntake(url);
}

export function connectInfo() {
  return {
    mode: connectMode(),
    storefront: PAX_PASSPORT.connect.baseUrl,
    brandId: PAX_PASSPORT.connect.brandId,
  };
}
