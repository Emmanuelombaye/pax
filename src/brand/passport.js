/**
 * Pax Longevity — connect passport (VirtualClinicOS Brand Storefront).
 * Browser-safe: brand ID only. Never put phk_* keys in NEXT_PUBLIC_*.
 */

function env(name, fallback = "") {
  if (typeof process === "undefined" || !process.env) return fallback;
  const value = process.env[name];
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export const PAX_PASSPORT = {
  version: "1.4.0",
  product: {
    name: "Pax Longevity",
    legalName: "Pax Longevity",
    tagline: "Live longer. Feel younger. Age intentionally.",
    shortName: "Pax",
  },
  identity: {
    slug: "pax",
    supportEmail: "support@paxlongevity.com",
    marketingUrl: "https://www.pax-longevity.com",
    startPath: "/intake",
  },
  connect: {
    mode: env("NEXT_PUBLIC_VCO_CONNECT_MODE", env("VITE_PAX_CONNECT_MODE", "remote")),
    baseUrl: env(
      "NEXT_PUBLIC_VCO_API_URL",
      env("VITE_PAX_API_URL", "https://portal.virtualclinicos.com"),
    ),
    brandId: env(
      "NEXT_PUBLIC_VCO_BRAND_ID",
      env("VITE_PAX_BRAND_ID", "4065c369-9a3c-47af-8d6f-07cc7238d329"),
    ),
    notes:
      "Catalog + intake via VirtualClinicOS Brand Storefront (public brand ID). Hosted intake_url is the handoff — do not invent intake URLs.",
  },
  compliance: {
    demoDisclaimer:
      "Catalog and intake use VirtualClinicOS. Patient Center demo data stays local until a patient backend is connected.",
  },
};

export default PAX_PASSPORT;
