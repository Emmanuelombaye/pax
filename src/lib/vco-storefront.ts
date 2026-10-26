/**
 * VirtualClinicOS Brand Storefront — Next-friendly re-exports.
 * Canonical client lives in src/brand/* (same wiring as the Yucca StartFlow path).
 */
export {
  fetchProducts as fetchStorefrontProducts,
  beginIntake as beginHostedIntake,
} from "@/brand/storefront.js";
export {
  LIVE_TREATMENTS,
  TREATMENT_SKU,
  findProductForTreatment,
  fallbackProducts,
  resolveTreatmentId,
  intakeHref,
} from "@/brand/productMap.js";
export {
  listStorefrontProducts,
  startProductIntake,
  connectInfo,
} from "@/brand/connect.js";
