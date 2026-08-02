/** Marketing content + route tab ids — home FAQ copy from pax-longevity.vercel.app */
const HOME_FAQS = [
  {
    q: 'What is the Pax Longevity Membership?',
    lead: 'The Pax Longevity Membership gives you access to our network of leading medical providers, personalized treatment plans, and exclusive pricing on prescription medications and labs.',
    points: [],
  },
  {
    q: 'How much does the weight loss program cost?',
    lead: 'Programs start at $199/month for Semaglutide and $299/month for Tirzepatide, depending on the dosage and plan prescribed by your provider.',
    points: [],
  },
  {
    q: 'Are video visits with a doctor required?',
    lead: 'In most cases, an asynchronous intake form is sufficient. However, if your provider needs more information, they may request a brief telehealth video visit.',
    points: [],
  },
  {
    q: 'Is insurance required?',
    lead: 'No, Pax operates on a cash-pay basis. This allows us to provide transparent, affordable pricing without the hassle of insurance approvals.',
    points: [],
  },
];

const LIFESTYLE_PILLARS = [
  {
    id: 'lifestyle-movement',
    image: '/images/lifestyle-movement.webp',
    alt: 'Morning walk on Miami beach at sunrise',
    title: 'Coastal Movement',
    caption: 'Morning coastal movement',
    teaser: 'Zone-2 walks and tidal rhythm training that sustains metabolic health year-round.',
    eyebrow: 'Daily Ritual',
    summary: 'Low-impact daily movement protects cardiovascular health and insulin sensitivity — without overtaxing recovery.',
    practices: [
      '30–45 minute sunrise walks on sand or coastal paths',
      'Zone-2 cardio sessions to improve mitochondrial density',
      'Mobility work paired with breath-led cool-downs',
      'Weekly activity targets tracked against clinical baselines'
    ],
    relatedLabel: 'Explore weight management',
    relatedLink: '#/treatments'
  },
  {
    id: 'lifestyle-nourishment',
    image: '/images/lifestyle-nourishment.webp',
    alt: 'Mediterranean wellness meal on a coastal terrace',
    title: 'Metabolic Nourishment',
    caption: 'Metabolic nourishment',
    teaser: 'Mediterranean-inspired nutrition that stabilizes glucose and fuels cellular repair.',
    eyebrow: 'Fuel & Recovery',
    summary: 'Mediterranean-inspired nutrition stabilizes glucose and supports the cellular repair your peptide protocol is designed to enhance.',
    practices: [
      'Protein-forward meals timed around activity and sleep',
      'Low-glycemic plates rich in omega-3s and polyphenols',
      'Hydration and electrolyte balance in coastal heat',
      'Monthly metabolic markers to refine dietary guidance'
    ],
    relatedLabel: 'View GLP-1 protocols',
    relatedLink: '#/treatments'
  },
  {
    id: 'lifestyle-active',
    image: '/images/lifestyle-active.webp',
    alt: 'Cycling along the Miami coast at sunrise',
    title: 'Active Longevity',
    caption: 'Active longevity',
    teaser: 'Strength, cycling, and recovery cycles built for decades — not just seasons.',
    eyebrow: 'Performance',
    summary: 'Train for long-term capacity — resistance, endurance, and recovery cycles that preserve lean mass and energy.',
    practices: [
      '2–3 resistance sessions per week with progressive overload',
      'Coastal cycling or swimming for cardiovascular endurance',
      'Deliberate rest days aligned with Sermorelin evening dosing',
      'Sleep and HRV tracking to guide training intensity'
    ],
    relatedLabel: 'Explore Sermorelin therapy',
    relatedLink: '#/treatments'
  },
  {
    id: 'lifestyle-balance',
    image: '/images/lifestyle-balance.webp',
    alt: 'Sunrise meditation by the ocean',
    title: 'Mind-Body Balance',
    caption: 'Mind-body balance',
    teaser: 'Meditation, sleep architecture, and nervous-system recovery for cognitive clarity.',
    eyebrow: 'Restoration',
    summary: 'Sleep, meditation, and nervous-system recovery amplify the cellular repair signals your clinical protocol targets.',
    practices: [
      '10-minute sunrise meditation or breathwork rituals',
      'Consistent sleep windows with evening light discipline',
      'Digital sunset routines to protect melatonin cycles',
      'Quarterly cognitive and stress biomarker reviews'
    ],
    relatedLabel: 'Explore NAD+ therapy',
    relatedLink: '#/treatments'
  }
];

/** Wellness-first carousel (secondary pages / legacy). */
const HERO_SLIDES = [
  {
    mobile: '/images/hero-longevity.webp',
    desktop: '/images/hero-longevity-desktop.webp',
  },
  {
    mobile: '/images/hero-miami-water.webp',
    desktop: '/images/hero-miami-water-desktop.webp',
  },
  {
    mobile: '/images/hero-miami-yoga.webp',
    desktop: '/images/hero-miami-yoga-desktop.webp',
  },
  {
    mobile: '/images/home-scroll-banner.webp',
    desktop: '/images/home-scroll-banner.webp',
  },
];

/** Home card-flow programs — Vercel-style cards, generated Pax product imagery */
const HOME_PROGRAMS = [
  {
    id: 'glp',
    title: 'GLPs / Weight Loss',
    blurb: 'Physician-titrated Semaglutide & Tirzepatide',
    badge: 'Most demand',
    tone: 'amber',
    image: '/images/cards/glp-pen.png',
    href: '#/treatments',
  },
  {
    id: 'hormone',
    title: 'Hormone Health',
    blurb: 'TRT, HRT & longevity optimization',
    badge: 'Controlled',
    tone: 'clay',
    image: '/images/cards/pill-bottle.png',
    href: '#/treatments',
  },
  {
    id: 'peptides',
    title: 'Peptides & Wellness',
    blurb: 'NAD+, Sermorelin & cellular recovery',
    badge: 'Premium',
    tone: 'dune',
    image: '/images/cards/labs-box.png',
    href: '#/treatments',
  },
  {
    id: 'vitality',
    title: 'Vitality',
    blurb: 'Energy, recovery & performance protocols',
    badge: 'Subscription',
    tone: 'mist',
    image: '/images/cards/vitality-bottle.png',
    href: '#/treatments',
  },
];

const HOME_CHIPS = [
  { label: 'GLPs / Weight Loss', href: '#/treatments' },
  { label: 'Hormone Health & Longevity', href: '#/treatments' },
  { label: 'Peptides & Wellness', href: '#/treatments' },
  { label: 'Vitality & Performance', href: '#/treatments' },
];

const HOME_DOCTORS = [
  {
    name: 'Dr. Mark Hamilton, MD',
    bio: 'Specialist in TRT, longevity protocols, and performance optimization.',
    image: '/images/cards/doctor-male.png',
  },
  {
    name: 'Dr. Sarah Jenkins, MD',
    bio: 'Expert in advanced endocrinology, GLP-1 weight management, and metabolic health.',
    image: '/images/cards/doctor-female.png',
  },
];

const ROUTE_TABS = [
  'vision', 'threats', 'treatments', 'advisors', 'education',
  'privacy', 'terms', 'medical-disclaimer',
  ...LIFESTYLE_PILLARS.map((pillar) => pillar.id)
];

export {
  HOME_FAQS,
  LIFESTYLE_PILLARS,
  HERO_SLIDES,
  HOME_PROGRAMS,
  HOME_CHIPS,
  HOME_DOCTORS,
  ROUTE_TABS,
};
