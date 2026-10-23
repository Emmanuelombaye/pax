/**
 * Presentational mapping for VCO storefront products → Pax UI.
 */

/** Local start-funnel treatment id → VCO SKU */
export const TREATMENT_SKU = {
  semaglutide: 'STORE-SEMA',
  tirzepatide: 'STORE-TIRZ',
  nad: 'STORE-NAD',
};

export const PRODUCT_PRESENTATION = {
  'STORE-SEMA': {
    image: '/images/vials/sema.webp?v=fast1',
    badge: 'Weekly',
    frequency: 'Once weekly subcutaneous',
    sort: 1,
  },
  'STORE-TIRZ': {
    image: '/images/vials/tirz.webp?v=fast1',
    badge: 'Dual pathway',
    frequency: 'Once weekly subcutaneous',
    sort: 2,
  },
  'STORE-NAD': {
    image: '/images/vials/sema.webp?v=fast1',
    badge: 'NAD+',
    frequency: 'Provider-guided protocol',
    sort: 3,
  },
};

/** Offline / API-down catalog using known Pax storefront rows (public intake URLs). */
export const FALLBACK_CATALOG = [
  {
    id: '8ae4edf9-d08b-46fa-b710-68caa7b24d51',
    name: 'Semaglutide',
    sku: 'STORE-SEMA',
    description:
      'Physician-prescribed once-weekly subcutaneous GLP-1 therapy for safe, sustained weight management and metabolic health.',
    price: 399,
    intake_url: 'https://intake.paxlongevity.com/intake/8ae4edf9-d08b-46fa-b710-68caa7b24d51',
    requires_prescription: true,
    status: 'active',
  },
  {
    id: '3d0e8ddf-1415-4f96-a43f-21b6c46ae48b',
    name: 'Tirzepatide',
    sku: 'STORE-TIRZ',
    description:
      'Dual GIP/GLP-1 receptor agonist treatment formulated for maximum clinical efficacy and metabolic optimization.',
    price: 499,
    intake_url: 'https://intake.paxlongevity.com/intake/3d0e8ddf-1415-4f96-a43f-21b6c46ae48b',
    requires_prescription: true,
    status: 'active',
  },
  {
    id: '338bbe76-dbb9-42ff-ab1c-7bf687cad1b5',
    name: 'NAD+',
    sku: 'STORE-NAD',
    description:
      'High-potency cellular coenzyme therapy designed to boost ATP energy production, repair DNA, and enhance cognitive longevity.',
    price: 199,
    intake_url: 'https://intake.paxlongevity.com/intake/338bbe76-dbb9-42ff-ab1c-7bf687cad1b5',
    requires_prescription: false,
    status: 'active',
  },
];

export function enrichProduct(raw) {
  const meta = PRODUCT_PRESENTATION[raw.sku] || {
    image: raw.image_url || '/images/vials/sema.webp?v=fast1',
    badge: 'Treatment',
    frequency: 'Provider-guided',
    sort: 99,
  };

  const name = raw.public_display_name || raw.name || 'Treatment';
  const image = raw.image_url || (Array.isArray(raw.images) && raw.images[0]) || meta.image;

  return {
    id: raw.id,
    sku: raw.sku || raw.id,
    name,
    description: raw.description || '',
    price: typeof raw.price === 'number' ? raw.price : null,
    intakeUrl: raw.intake_url || null,
    requiresPrescription: !!raw.requires_prescription,
    requiresIntake: raw.requires_intake !== false,
    status: raw.status || 'active',
    image,
    badge: meta.badge,
    frequency: meta.frequency,
    sort: meta.sort,
  };
}

export function mapCatalog(rawProducts) {
  return (rawProducts || [])
    .filter((p) => p && p.status !== 'inactive')
    .map(enrichProduct)
    .sort((a, b) => a.sort - b.sort || a.name.localeCompare(b.name));
}

export function fallbackProducts() {
  return mapCatalog(FALLBACK_CATALOG);
}

export function findProductForTreatment(products, treatmentId) {
  const sku = TREATMENT_SKU[treatmentId];
  if (!sku) return null;
  return (products || []).find((p) => p.sku === sku) || null;
}
