/** Pax Longevity ↔ Peak Health OS white-label care portal URLs */

const CARE_ORIGIN = (import.meta.env.VITE_PAX_CARE_ORIGIN || "https://www.peak-health.io").replace(/\/$/, "");
const BRAND_SLUG = import.meta.env.VITE_PAX_BRAND_SLUG || "pax";
const BRAND_ID = import.meta.env.VITE_PAX_BRAND_ID || "b7e8f9a0-1c2d-4e3f-9a5b-6c7d8e9f0a1b";

const GOAL_CATEGORY = {
  "lose-weight": "weight-loss",
  "more-energy": "longevity",
  "anti-aging": "longevity",
  recovery: "longevity",
};

export function paxCareBase() {
  return `${CARE_ORIGIN}/care/${BRAND_SLUG}`;
}

export function paxEnrollUrl(goalOrCategory) {
  const category = GOAL_CATEGORY[goalOrCategory] || goalOrCategory || "weight-loss";
  const params = new URLSearchParams({
    brand: BRAND_SLUG,
    brandId: BRAND_ID,
    category,
  });
  return `${paxCareBase()}/shop?${params}`;
}

export function paxPatientLoginUrl() {
  return `${paxCareBase()}/login`;
}

export function paxAdminLoginUrl() {
  return `${paxCareBase()}/admin/login`;
}

export function startPaxEnrollment(goal) {
  window.location.assign(paxEnrollUrl(goal));
}
