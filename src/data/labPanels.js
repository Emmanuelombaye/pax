/** Home “What we measure” cards → dedicated lab panel pages */

export const LAB_PANELS = [
  {
    slug: "hormones",
    title: "Hormones",
    eyebrow: "Longevity panel",
    summary:
      "Sex hormones and binding proteins that shape energy, body composition, mood, and recovery — read together, not in isolation.",
    markers: [
      {
        name: "Total Testosterone",
        detail: "Overall circulating testosterone, used with free T and SHBG to understand androgen status.",
      },
      {
        name: "Free Testosterone",
        detail: "The unbound fraction available to tissues — often more informative than total alone.",
      },
      {
        name: "Estradiol (E2)",
        detail: "A key estrogen for bone, mood, and metabolic balance in both men and women.",
      },
      {
        name: "Progesterone",
        detail: "Supports cycle health, sleep, and calm — interpreted in context of timing and goals.",
      },
      {
        name: "SHBG",
        detail: "Sex hormone–binding globulin that modulates how much hormone is free to act.",
      },
    ],
  },
  {
    slug: "cardiovascular",
    title: "Cardiovascular Health",
    eyebrow: "Longevity panel",
    summary:
      "Lipids and inflammation markers that help map heart and vessel risk long before symptoms show.",
    markers: [
      {
        name: "ApoB",
        detail: "Counts atherogenic particles — a clearer risk signal than LDL-C alone for many people.",
      },
      {
        name: "LDL",
        detail: "Low-density lipoprotein cholesterol, read with ApoB and triglycerides for context.",
      },
      {
        name: "HDL",
        detail: "High-density lipoprotein cholesterol associated with reverse cholesterol transport.",
      },
      {
        name: "Triglycerides",
        detail: "Blood fats that rise with metabolic stress, diet, and alcohol — tracked over time.",
      },
      {
        name: "hs-CRP",
        detail: "High-sensitivity C-reactive protein for low-grade inflammation tied to vascular risk.",
      },
    ],
  },
  {
    slug: "metabolic",
    title: "Metabolic Health",
    eyebrow: "Longevity panel",
    summary:
      "Glucose handling and insulin signaling — the foundation for weight, energy, and long-term metabolic resilience.",
    markers: [
      {
        name: "Fasting Insulin",
        detail: "How hard the pancreas is working at rest; early signal of insulin resistance.",
      },
      {
        name: "Hemoglobin A1C",
        detail: "Average glucose over roughly three months — a durable glycemic fingerprint.",
      },
      {
        name: "Glucose",
        detail: "Current circulating sugar level, interpreted with fasting status and A1C.",
      },
    ],
  },
  {
    slug: "thyroid",
    title: "Thyroid Health",
    eyebrow: "Longevity panel",
    summary:
      "Thyroid axis markers that influence metabolism, temperature, cognition, and how you feel day to day.",
    markers: [
      {
        name: "TSH",
        detail: "Pituitary signal that drives thyroid output — the usual first-line screen.",
      },
      {
        name: "Free T3",
        detail: "Active thyroid hormone available to cells for metabolic rate and energy.",
      },
      {
        name: "Free T4",
        detail: "Primary circulating thyroid hormone that converts to T3 in tissues.",
      },
    ],
  },
  {
    slug: "nutrients",
    title: "Nutrient Status",
    eyebrow: "Longevity panel",
    summary:
      "Foundational micronutrients and iron studies that support hormones, cognition, and recovery.",
    markers: [
      {
        name: "Vitamin D",
        detail: "Fat-soluble hormone-like vitamin for bone, immune, and muscle function.",
      },
      {
        name: "Vitamin B12",
        detail: "Essential for nerves and red blood cells — often low with restricted diets.",
      },
      {
        name: "Ferritin",
        detail: "Iron stores; low levels can show as fatigue even when CBC looks “normal.”",
      },
      {
        name: "Iron Studies",
        detail: "A broader look at iron transport and availability beyond ferritin alone.",
      },
    ],
  },
  {
    slug: "general",
    title: "General Health",
    eyebrow: "Longevity panel",
    summary:
      "Core organ and blood counts that keep the rest of the panel grounded in whole-body safety.",
    markers: [
      {
        name: "CBC",
        detail: "Complete blood count — red cells, white cells, and platelets at a glance.",
      },
      {
        name: "CMP",
        detail: "Comprehensive metabolic panel for electrolytes, protein, and organ enzymes.",
      },
      {
        name: "Kidney Function",
        detail: "Markers of filtration and clearance that guide medication and hydration plans.",
      },
      {
        name: "Liver Function",
        detail: "Enzymes and bilirubin that reflect hepatic stress, medications, and recovery.",
      },
    ],
  },
];

export function findLabPanel(slug) {
  return LAB_PANELS.find((panel) => panel.slug === slug);
}

export function labPanelSlugs() {
  return LAB_PANELS.map((panel) => panel.slug);
}
