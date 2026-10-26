/**
 * Presentational mapping for VCO storefront products → Pax UI.
 * Live Pax catalog (Brand Storefront) is exactly these 3 treatments.
 */

/** The only VCO-backed treatments for Pax right now */
export const LIVE_TREATMENTS = [
  {
    id: "semaglutide",
    sku: "STORE-SEMA",
    name: "Semaglutide",
    category: "Weight Loss",
    vialSlug: "semaglutide",
    intakeUrl:
      "https://intake.paxlongevity.com/intake/8ae4edf9-d08b-46fa-b710-68caa7b24d51",
  },
  {
    id: "tirzepatide",
    sku: "STORE-TIRZ",
    name: "Tirzepatide",
    category: "Weight Loss",
    vialSlug: "tirzepatide",
    intakeUrl:
      "https://intake.paxlongevity.com/intake/3d0e8ddf-1415-4f96-a43f-21b6c46ae48b",
  },
  {
    id: "nad",
    sku: "STORE-NAD",
    name: "NAD+",
    category: "Longevity & Wellness",
    vialSlug: "nad-1000-mg",
    intakeUrl:
      "https://intake.paxlongevity.com/intake/338bbe76-dbb9-42ff-ab1c-7bf687cad1b5",
  },
];

/** Local treatment id / vial slug → VCO SKU */
export const TREATMENT_SKU = {
  semaglutide: "STORE-SEMA",
  tirzepatide: "STORE-TIRZ",
  nad: "STORE-NAD",
  "nad-1000-mg": "STORE-NAD",
  weight: "STORE-SEMA",
};

export const PRODUCT_PRESENTATION = {
  "STORE-SEMA": {
    badge: "Weekly",
    frequency: "Once weekly subcutaneous",
    sort: 1,
  },
  "STORE-TIRZ": {
    badge: "Dual pathway",
    frequency: "Once weekly subcutaneous",
    sort: 2,
  },
  "STORE-NAD": {
    badge: "NAD+",
    frequency: "Provider-guided protocol",
    sort: 3,
  },
};

/** Offline / API-down catalog using known Pax storefront rows (public intake URLs). */
export const FALLBACK_CATALOG = [
  {
    id: "8ae4edf9-d08b-46fa-b710-68caa7b24d51",
    name: "Semaglutide",
    sku: "STORE-SEMA",
    description:
      "Physician-prescribed once-weekly subcutaneous GLP-1 therapy for safe, sustained weight management and metabolic health.",
    price: 399,
    intake_url: "https://intake.paxlongevity.com/intake/8ae4edf9-d08b-46fa-b710-68caa7b24d51",
    requires_prescription: true,
    status: "active",
  },
  {
    id: "3d0e8ddf-1415-4f96-a43f-21b6c46ae48b",
    name: "Tirzepatide",
    sku: "STORE-TIRZ",
    description:
      "Dual GIP/GLP-1 receptor agonist treatment formulated for maximum clinical efficacy and metabolic optimization.",
    price: 499,
    intake_url: "https://intake.paxlongevity.com/intake/3d0e8ddf-1415-4f96-a43f-21b6c46ae48b",
    requires_prescription: true,
    status: "active",
  },
  {
    id: "338bbe76-dbb9-42ff-ab1c-7bf687cad1b5",
    name: "NAD+",
    sku: "STORE-NAD",
    description:
      "High-potency cellular coenzyme therapy designed to boost ATP energy production, repair DNA, and enhance cognitive longevity.",
    price: 199,
    intake_url: "https://intake.paxlongevity.com/intake/338bbe76-dbb9-42ff-ab1c-7bf687cad1b5",
    requires_prescription: false,
    status: "active",
  },
];

export function enrichProduct(raw) {
  const meta = PRODUCT_PRESENTATION[raw.sku] || {
    badge: "Treatment",
    frequency: "Provider-guided",
    sort: 99,
  };

  const name = raw.public_display_name || raw.name || "Treatment";
  const image = raw.image_url || (Array.isArray(raw.images) && raw.images[0]) || null;

  return {
    id: raw.id,
    sku: raw.sku || raw.id,
    name,
    description: raw.description || "",
    price: typeof raw.price === "number" ? raw.price : null,
    intakeUrl: raw.intake_url || null,
    requiresPrescription: !!raw.requires_prescription,
    requiresIntake: raw.requires_intake !== false,
    status: raw.status || "active",
    image,
    badge: meta.badge,
    frequency: meta.frequency,
    sort: meta.sort,
  };
}

export function mapCatalog(rawProducts) {
  return (rawProducts || [])
    .filter((p) => p && p.status !== "inactive")
    .map(enrichProduct)
    .sort((a, b) => a.sort - b.sort || a.name.localeCompare(b.name));
}

export function fallbackProducts() {
  return mapCatalog(FALLBACK_CATALOG);
}

export function resolveTreatmentId(raw) {
  const key = String(raw || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
  if (!key) return "semaglutide";
  if (TREATMENT_SKU[key]) return key;
  if (key.includes("tirz")) return "tirzepatide";
  if (key.includes("nad")) return "nad";
  if (key.includes("sema") || key.includes("weight")) return "semaglutide";
  return "semaglutide";
}

export function findProductForTreatment(products, treatmentId) {
  const id = resolveTreatmentId(treatmentId);
  const sku = TREATMENT_SKU[id];
  if (!sku) return null;
  return (products || []).find((p) => p.sku === sku) || null;
}

export function intakeHref(treatmentId) {
  const id = resolveTreatmentId(treatmentId);
  return `/intake?treatment=${encodeURIComponent(id)}`;
}

/** Default live handoff when a page has no specific treatment */
export const DEFAULT_INTAKE_HREF = intakeHref("semaglutide");

/** Map marketing program slugs → a live VCO treatment */
export function intakeHrefForProgram(programSlug) {
  const key = String(programSlug || "").toLowerCase();
  if (key === "weight") return intakeHref("semaglutide");
  if (key === "longevity" || key === "peptides") return intakeHref("nad");
  return DEFAULT_INTAKE_HREF;
}

export function isLiveTreatment(slugOrId) {
  const id = resolveTreatmentId(slugOrId);
  return LIVE_TREATMENTS.some((t) => t.id === id || t.vialSlug === slugOrId);
}
