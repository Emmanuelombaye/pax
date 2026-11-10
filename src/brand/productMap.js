/**
 * Pax presentation for VirtualClinicOS storefront products, keyed by VCO `slug`.
 * Names, prices, supply, availability and intake links always come from the API;
 * this file only adds Pax imagery and marketing copy for slugs the API returns.
 */

export const FALLBACK_IMAGE = "/brand/pax-seal-512.png";

/** Generic Pax CTAs send patients to the live catalog so they pick a listed product. */
export const DEFAULT_INTAKE_HREF = "/treatments";

/** Hims-style homepage lineups, keyed by VCO category slug. Unknown categories use their VCO name. */
export const CATEGORY_COPY = {
  "weight-management": {
    title: "Your weight care,",
    accent: "physician-led.",
    lead: "Once-weekly options, prescribed only after a licensed review.",
  },
  "hormone-optimization": {
    title: "Hormones,",
    accent: "built for you.",
    lead: "Hormone therapy dosed by a licensed provider around your history and labs.",
  },
};

const PRESENTATION = {
  semaglutide: {
    label: "Semaglutide",
    badge: "Once weekly",
    subtitle: "Semaglutide injection",
    image: "/images/pax-card-semaglutide-v1.webp",
    alt: "Pax semaglutide vial",
    about: [
      {
        title: "What is semaglutide?",
        body: "A once-weekly GLP-1 medicine used in Pax’s weight program when a physician includes it. Membership and medication are billed separately.",
      },
      {
        title: "What is it prescribed for?",
        body: "Weight care and metabolic health, when your history, goals, and labs support it.",
      },
      {
        title: "How does the plan work?",
        body: "You start with a licensed review. If semaglutide fits, the physician writes the dose and adjusts it as you check in.",
      },
      {
        title: "What to expect",
        body: "Appetite often changes before the scale does. Follow-ups are part of the plan so the dose can move with you.",
      },
    ],
  },
  tirzepatide: {
    label: "Tirzepatide",
    badge: "Dual action",
    subtitle: "Tirzepatide injection",
    image: "/images/pax-card-tirzepatide-v2.webp",
    alt: "Pax tirzepatide vial",
    about: [
      {
        title: "What is tirzepatide?",
        body: "A once-weekly dual GIP/GLP-1 medicine used in Pax’s weight program when a physician includes it. Membership and medication are billed separately.",
      },
      {
        title: "What is it prescribed for?",
        body: "Weight care, when your history, goals, and labs support it.",
      },
      {
        title: "How does the plan work?",
        body: "You start with a licensed review. If tirzepatide fits, the physician writes the dose and adjusts it as you check in.",
      },
      {
        title: "What to expect",
        body: "Appetite often changes before the scale does. Follow-ups are part of the plan so the dose can move with you.",
      },
    ],
  },
  "testosterone-cypionate-10ml": {
    label: "Testosterone",
    badge: "Video visit",
    subtitle: "Testosterone cypionate 200 mg/mL",
    image: "/images/pax-card-testosterone-v4.webp",
    alt: "Pax testosterone cypionate vial",
    summary:
      "Testosterone cypionate injection for men with clinically low testosterone, prescribed only after labs and a video visit with a licensed provider.",
    about: [
      {
        title: "What is testosterone cypionate?",
        body: "An injectable form of testosterone. Your provider decides whether it fits, and sets the dose and schedule.",
      },
      {
        title: "What is it prescribed for?",
        body: "Low testosterone confirmed by labs, when your symptoms and history support treatment.",
      },
      {
        title: "How does the plan work?",
        body: "Labs and a video visit come first. If it fits, your provider prescribes it and checks your levels at follow-ups.",
      },
      {
        title: "What to expect",
        body: "Changes build over weeks, not days. Follow-up labs let your provider adjust the plan safely.",
      },
    ],
  },
  "estradiol-patch-0-05mg-1-per-week-box-of-4": {
    label: "Estradiol patch 0.05 mg",
    badge: "Once weekly",
    subtitle: "Estradiol transdermal patch",
    image: "/images/pax-card-estradiol-patch-v1.webp",
    alt: "Pax estradiol transdermal patch box",
  },
  "estradiol-patch-0-1mg-1-per-week-box-of-4": {
    label: "Estradiol patch 0.1 mg",
    badge: "Once weekly",
    subtitle: "Estradiol transdermal patch",
    image: "/images/pax-card-estradiol-patch-v1.webp",
    alt: "Pax estradiol transdermal patch box",
  },
  "estradiol-vaginal-cream-0-01-42-5-g-tube": {
    label: "Estradiol cream",
    badge: "Local relief",
    subtitle: "Estradiol 0.01% vaginal cream",
    image: "/images/pax-card-estradiol-cream-v1.webp",
    alt: "Pax estradiol vaginal cream tube",
    summary:
      "Estradiol 0.01% vaginal cream for local menopause symptoms, prescribed only after a licensed provider reviews your history.",
    about: [
      {
        title: "What is estradiol vaginal cream?",
        body: "A low-dose estrogen cream applied locally. Your provider decides whether it fits and how often to use it.",
      },
      {
        title: "What is it prescribed for?",
        body: "Vaginal dryness and related menopause symptoms, when your history supports it.",
      },
      {
        title: "How does the plan work?",
        body: "Complete the intake and a provider reviews it. If it fits, they prescribe it and follow up on how you feel.",
      },
      {
        title: "What to expect",
        body: "Comfort often improves over a few weeks. Your provider can adjust the plan at check-ins.",
      },
    ],
  },
  "progesterone-capsules-100mg": {
    label: "Progesterone",
    badge: "Bedtime capsule",
    subtitle: "Oral progesterone 100 mg",
    image: "/images/pax-card-prog-v3.webp",
    alt: "Pax progesterone 100 mg capsules",
    summary:
      "Oral progesterone 100 mg capsules for menopause hormone therapy, prescribed only after a licensed provider reviews your history.",
    about: [
      {
        title: "What is progesterone?",
        body: "An oral hormone often paired with estrogen in menopause hormone therapy. Your provider decides whether it fits.",
      },
      {
        title: "What is it prescribed for?",
        body: "Menopause hormone therapy, including protecting the uterus when estrogen is part of the plan.",
      },
      {
        title: "How does the plan work?",
        body: "Complete the intake and a provider reviews it. If it fits, they prescribe the dose and follow up with you.",
      },
      {
        title: "What to expect",
        body: "Many people take it at bedtime. Your provider will check in on sleep, mood, and symptoms.",
      },
    ],
  },
};

const PATCH_COPY = {
  summary:
    "A once-weekly estradiol patch for menopause symptoms, prescribed only after a licensed provider reviews your history.",
  about: [
    {
      title: "What is an estradiol patch?",
      body: "A skin patch that releases estradiol steadily. You change it once a week; a box of 4 lasts 28 days.",
    },
    {
      title: "What is it prescribed for?",
      body: "Hot flashes, night sweats, and other menopause symptoms, when your history supports hormone therapy.",
    },
    {
      title: "How does the plan work?",
      body: "Complete the intake and a provider reviews it. If it fits, they choose the strength and follow up with you.",
    },
    {
      title: "What to expect",
      body: "Symptoms often ease over a few weeks. Your provider can change the strength at check-ins.",
    },
  ],
};

export const SAFETY = [
  {
    title: "Contraindications",
    body: "A licensed provider decides whether this belongs in your plan. It is not appropriate for every person, and some histories rule it out.",
  },
  {
    title: "Possible side effects",
    body: "Your provider reviews what to watch for before anything is prescribed, and stays available if the response is not what you expected.",
  },
  {
    title: "Warnings",
    body: "Tell your provider about other medications and conditions. Nothing here is a prescription, and nothing ships until a clinician says it should.",
  },
];

export function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function standardAbout(name, summary) {
  return [
    { title: `What is ${name} prescribed for?`, body: summary },
    {
      title: "How does the plan work?",
      body: "A licensed provider reviews your intake and history before this is added to a plan. The dose and whether it belongs are decided in that review.",
    },
    {
      title: "What to expect",
      body: "Nothing ships until a clinician approves it. If it is prescribed, follow-up is part of the plan so the response can be checked.",
    },
  ];
}

/** Turn a raw VCO storefront product into the serializable shape the Pax UI renders. */
export function toTreatment(raw, categories = []) {
  const slug = raw.slug || slugify(raw.sku || raw.id);
  const extra = PRESENTATION[slug] || {};
  const patchCopy = slug.startsWith("estradiol-patch") ? PATCH_COPY : {};
  const name = raw.public_display_name || raw.name || "Treatment";
  const category = categories.find((c) => c.id === raw.category);
  const categoryName = raw.category_name || category?.name || "Treatments";
  const summary =
    raw.short_description ||
    extra.summary ||
    patchCopy.summary ||
    raw.description ||
    "Prescribed only after a licensed provider reviews your intake.";

  return {
    id: raw.id,
    slug,
    sku: raw.sku || null,
    name,
    label: extra.label || name,
    badge: extra.badge || (raw.requires_video_consult ? "Video visit" : null),
    subtitle: extra.subtitle || raw.dosage_form || null,
    summary,
    description: raw.description || null,
    price: typeof raw.price === "number" ? raw.price : null,
    supply: raw.supply || null,
    plan: raw.plan || null,
    shippingPrice: typeof raw.shipping_price === "number" ? raw.shipping_price : null,
    blockedStates: Array.isArray(raw.ships_to_blocked_states) ? raw.ships_to_blocked_states : [],
    requiresVideoConsult: !!raw.requires_video_consult,
    inStock: (raw.availability || "in_stock") === "in_stock",
    intakeUrl: raw.intake_url || null,
    category: categoryName,
    categorySlug: category?.slug || slugify(categoryName),
    image: extra.image || raw.image_url || (Array.isArray(raw.images) && raw.images[0]) || FALLBACK_IMAGE,
    imageAlt: extra.alt || name,
    about: extra.about || patchCopy.about || standardAbout(name, summary),
    seo: raw.seo || { title: name, description: summary, image: null },
  };
}

export function canStartIntake(treatment) {
  return !!(treatment && treatment.inStock && treatment.intakeUrl);
}

/** "$199/mo", "$120 · 3-month supply", or a plan's per-charge terms. */
export function priceLabel(treatment, t = (s) => s) {
  if (!treatment || treatment.price == null) return "";
  const plan = treatment.plan;
  if (plan && plan.price_per_charge != null) {
    const every = plan.bill_every_months || 1;
    return every === 1
      ? `$${plan.price_per_charge}${t("/mo")}`
      : `$${plan.price_per_charge} ${t("every")} ${every} ${t("months")}`;
  }
  const months = treatment.supply?.months;
  if (months === 1) return `$${treatment.price}${t("/mo")}`;
  if (months && months > 1) return `$${treatment.price} · ${months}-${t("month supply")}`;
  return `$${treatment.price}`;
}

export function supplyLabel(treatment, t = (s) => s) {
  const supply = treatment?.supply;
  if (!supply) return null;
  if (supply.months && supply.months > 1) return `${supply.months}-${t("month supply")}`;
  if (supply.days) return `${supply.days}-${t("day supply")}`;
  if (supply.months === 1) return t("1-month supply");
  return null;
}

export function groupByCategory(treatments) {
  const groups = [];
  for (const item of treatments) {
    let group = groups.find((g) => g.slug === item.categorySlug);
    if (!group) {
      group = { slug: item.categorySlug, name: item.category, items: [] };
      groups.push(group);
    }
    group.items.push(item);
  }
  return groups;
}

export function joinCategories(treatments, t = (s) => s) {
  const names = groupByCategory(treatments).map((g) => t(g.name).toLowerCase());
  if (names.length <= 1) return names[0] || "";
  return `${names.slice(0, -1).join(", ")} ${t("and")} ${names[names.length - 1]}`;
}
