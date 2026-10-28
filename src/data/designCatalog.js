/** Designed product cards + lifestyle imagery for marketing pages */

export const LIVE_PRODUCT_CARDS = [
  {
    id: "semaglutide",
    name: "Semaglutide",
    category: "Weight Loss",
    badge: "Live intake",
    blurb: "Once-weekly GLP-1 for weight and metabolic care after labs and a licensed visit.",
    price: "From $399/mo + membership",
    image: "/images/pax-formula-weight-v2.webp",
    href: "/treatments/semaglutide",
    intakeId: "semaglutide",
  },
  {
    id: "tirzepatide",
    name: "Tirzepatide",
    category: "Weight Loss",
    badge: "Live intake",
    blurb: "Dual-pathway weight care with dosing set by your provider when labs support it.",
    price: "From $299/mo + membership",
    image: "/images/pax-card-tirzepatide-v2.webp",
    href: "/treatments/tirzepatide",
    intakeId: "tirzepatide",
  },
  {
    id: "nad",
    name: "NAD+",
    category: "Longevity",
    badge: "Live intake",
    blurb: "Cellular energy and healthy aging support when a physician includes it in your plan.",
    price: "From $199 + membership",
    image: "/images/pax-card-nad-v3.webp",
    href: "/treatments/nad-1000-mg",
    intakeId: "nad",
  },
];

export const FORMULA_CARDS = [
  {
    id: "weight",
    title: "Weight Care",
    teaser: "GLP-1 protocols guided by labs and a licensed visit.",
    image: "/images/pax-formula-weight-v2.webp",
    href: "/programs/weight",
  },
  {
    id: "peptides",
    title: "Peptides",
    teaser: "Recovery and cellular support when clinically appropriate.",
    image: "/images/pax-formula-peptides.webp",
    href: "/programs/longevity",
  },
  {
    id: "sexual",
    title: "Sexual Health",
    teaser: "Physician-reviewed options for desire and performance.",
    image: "/images/pax-formula-sexual-v2.webp",
    href: "/care",
  },
  {
    id: "hair",
    title: "Hair",
    teaser: "Formulas for scalp and follicle support under clinical review.",
    image: "/images/pax-formula-hair-v2.webp",
    href: "/care",
  },
  {
    id: "menopause",
    title: "Menopause",
    teaser: "Hormone-aware care with quiet, measured guidance.",
    image: "/images/pax-formula-menopause.webp",
    href: "/care",
  },
];

/** Studio product cards — visual catalog; live CTAs stay on the 3 open treatments */
export const STUDIO_CARDS = [
  { id: "testosterone", name: "Testosterone", image: "/images/pax-card-testosterone-v4.webp", tag: "Hormone" },
  { id: "t-cream", name: "T Cream", image: "/images/pax-card-t-cream-v6.webp", tag: "Hormone" },
  { id: "gel", name: "Gel", image: "/images/pax-card-gel-v3.webp", tag: "Hormone" },
  { id: "estrace", name: "Estrace", image: "/images/pax-card-estrace-v3.webp", tag: "Hormone" },
  { id: "prog", name: "Progesterone", image: "/images/pax-card-prog-v3.webp", tag: "Hormone" },
  { id: "progcream", name: "Prog Cream", image: "/images/pax-card-progcream-v3.webp", tag: "Hormone" },
  { id: "bpc", name: "BPC-157", image: "/images/pax-card-bpc-v2.webp", tag: "Peptide" },
  { id: "tb500", name: "TB-500", image: "/images/pax-card-tb500-v1.webp", tag: "Peptide" },
  { id: "ghk", name: "GHK-Cu", image: "/images/pax-card-ghk-v2.webp", tag: "Peptide" },
  { id: "ipamorelin", name: "Ipamorelin", image: "/images/pax-card-ipamorelin-v2.webp", tag: "Peptide" },
  { id: "tesamorelin", name: "Tesamorelin", image: "/images/pax-card-tesamorelin-v1.webp", tag: "Peptide" },
  { id: "kpv", name: "KPV", image: "/images/pax-card-kpv-v1.webp", tag: "Peptide" },
  { id: "pt141", name: "PT-141", image: "/images/pax-card-pt141-v3.webp", tag: "Wellness" },
  { id: "glutathione", name: "Glutathione", image: "/images/pax-card-glutathione-v3.webp", tag: "Wellness" },
  { id: "nad-card", name: "NAD+", image: "/images/pax-card-nad-v3.webp", tag: "Longevity" },
  { id: "tirz-card", name: "Tirzepatide", image: "/images/pax-card-tirzepatide-v2.webp", tag: "Weight" },
];

export const PROGRAM_CARDS = [
  {
    id: "glp",
    title: "GLPs / Weight Loss",
    blurb: "Physician-titrated Semaglutide & Tirzepatide",
    badge: "Live now",
    image: "/images/cards/glp-pen.png",
    href: "/programs/weight",
  },
  {
    id: "hormone",
    title: "Hormone Health",
    blurb: "TRT, HRT & longevity optimization",
    badge: "Physician plan",
    image: "/images/cards/pill-bottle.png",
    href: "/care",
  },
  {
    id: "peptides",
    title: "Peptides & Wellness",
    blurb: "NAD+ and cellular recovery protocols",
    badge: "Live NAD+",
    image: "/images/cards/labs-box.png",
    href: "/programs/longevity",
  },
  {
    id: "vitality",
    title: "Vitality",
    blurb: "Energy, recovery & performance",
    badge: "Membership",
    image: "/images/cards/vitality-bottle.png",
    href: "/membership",
  },
];

export const LIFESTYLE_PILLARS = [
  {
    id: "movement",
    image: "/images/lifestyle-movement.webp",
    alt: "Morning walk on Miami beach at sunrise",
    title: "Coastal Movement",
    eyebrow: "Daily Ritual",
    teaser: "Zone-2 walks and tidal rhythm training that sustains metabolic health year-round.",
    practices: [
      "30–45 minute sunrise walks on sand or coastal paths",
      "Zone-2 cardio to improve mitochondrial density",
      "Mobility work paired with breath-led cool-downs",
    ],
  },
  {
    id: "nourishment",
    image: "/images/lifestyle-nourishment.webp",
    alt: "Mediterranean wellness meal on a coastal terrace",
    title: "Metabolic Nourishment",
    eyebrow: "Fuel & Recovery",
    teaser: "Mediterranean-inspired nutrition that stabilizes glucose and fuels cellular repair.",
    practices: [
      "Protein-forward meals timed around activity and sleep",
      "Low-glycemic plates rich in omega-3s and polyphenols",
      "Hydration and electrolyte balance in coastal heat",
    ],
  },
  {
    id: "active",
    image: "/images/lifestyle-active.webp",
    alt: "Cycling along the Miami coast at sunrise",
    title: "Active Longevity",
    eyebrow: "Performance",
    teaser: "Strength, cycling, and recovery cycles built for decades — not just seasons.",
    practices: [
      "2–3 resistance sessions per week with progressive overload",
      "Coastal cycling or swimming for cardiovascular endurance",
      "Deliberate rest days aligned with your care plan",
    ],
  },
  {
    id: "balance",
    image: "/images/lifestyle-balance.webp",
    alt: "Sunrise meditation by the ocean",
    title: "Mind-Body Balance",
    eyebrow: "Restoration",
    teaser: "Meditation, sleep architecture, and nervous-system recovery for cognitive clarity.",
    practices: [
      "10-minute sunrise meditation or breathwork rituals",
      "Consistent sleep windows with evening light discipline",
      "Digital sunset routines to protect melatonin cycles",
    ],
  },
];

export const CARE_DOCTORS = [
  {
    name: "Dr. Mark Hamilton, MD",
    bio: "Specialist in TRT, longevity protocols, and performance optimization.",
    image: "/images/cards/doctor-male.png",
  },
  {
    name: "Dr. Sarah Jenkins, MD",
    bio: "Expert in endocrinology, GLP-1 weight management, and metabolic health.",
    image: "/images/cards/doctor-female.png",
  },
];
