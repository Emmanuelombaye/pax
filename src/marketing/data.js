import { MARKETING_IMAGES } from './assets.js';

/** Marketing content + route tab ids — home FAQ copy from pax-longevity.vercel.app */
const HOME_FAQS = [
  {
    q: 'What is the Pax Longevity Membership?',
    lead: 'The Pax Longevity Membership gives you access to our network of leading medical providers, personalized treatment plans, and exclusive pricing on prescription medications and labs.',
    points: [],
  },
  {
    q: 'How much does the weight loss program cost?',
    lead: 'Semaglutide plans start at $125/month on the 6-month plan ($146 month-to-month). Tirzepatide plans start at $225/month on the 6-month plan ($258 month-to-month). Final pricing is confirmed after provider review.',
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
    relatedLink: '#/treatments/weight-loss'
  },
  {
    id: 'lifestyle-nourishment',
    image: '/images/lifestyle-nourishment.webp',
    alt: 'Mediterranean wellness meal on a coastal terrace',
    title: 'Metabolic Nourishment',
    caption: 'Metabolic nourishment',
    teaser: 'Mediterranean-inspired nutrition that stabilizes glucose and fuels cellular repair.',
    eyebrow: 'Fuel & Recovery',
    summary: 'Mediterranean-inspired nutrition stabilizes glucose and supports the metabolic progress your GLP-1 protocol is designed to enhance.',
    practices: [
      'Protein-forward meals timed around activity and sleep',
      'Low-glycemic plates rich in omega-3s and polyphenols',
      'Hydration and electrolyte balance in coastal heat',
      'Monthly metabolic markers to refine dietary guidance'
    ],
    relatedLabel: 'View GLP-1 protocols',
    relatedLink: '#/treatments/weight-loss'
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
      'Deliberate rest days aligned with weekly injection schedules',
      'Sleep and HRV tracking to guide training intensity'
    ],
    relatedLabel: 'Explore Semaglutide',
    relatedLink: '#/start?treatment=semaglutide'
  },
  {
    id: 'lifestyle-balance',
    image: '/images/lifestyle-balance.webp',
    alt: 'Sunrise meditation by the ocean',
    title: 'Mind-Body Balance',
    caption: 'Mind-body balance',
    teaser: 'Meditation, sleep architecture, and nervous-system recovery for cognitive clarity.',
    eyebrow: 'Restoration',
    summary: 'Sleep, meditation, and nervous-system recovery amplify the metabolic progress your GLP-1 protocol supports.',
    practices: [
      '10-minute sunrise meditation or breathwork rituals',
      'Consistent sleep windows with evening light discipline',
      'Digital sunset routines to protect melatonin cycles',
      'Quarterly cognitive and stress biomarker reviews'
    ],
    relatedLabel: 'Explore Tirzepatide',
    relatedLink: '#/start?treatment=tirzepatide'
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

/** Home card-flow programs — Semaglutide & Tirzepatide only */
const HOME_PROGRAMS = [
  {
    id: 'semaglutide',
    title: 'Semaglutide',
    blurb: 'Weekly GLP-1 for steady appetite and weight support',
    badge: 'GLP-1',
    tone: 'amber',
    image: MARKETING_IMAGES.cards.glpPen,
    href: '#/start?treatment=semaglutide',
  },
  {
    id: 'tirzepatide',
    title: 'Tirzepatide',
    blurb: 'Weekly GLP-1 + GIP dual-pathway weight support',
    badge: 'Dual action',
    tone: 'clay',
    image: MARKETING_IMAGES.cards.glpPen,
    href: '#/start?treatment=tirzepatide',
  },
];

const HOME_CHIPS = [
  { label: 'Semaglutide', href: '#/start?treatment=semaglutide' },
  { label: 'Tirzepatide', href: '#/start?treatment=tirzepatide' },
  { label: 'Weight Loss Treatments', href: '#/treatments/weight-loss' },
  { label: 'See if I qualify', href: '#/start' },
];

const THREAT_DOMAINS = [
  {
    id: 'cardio',
    num: '01',
    title: 'Cardiovascular Resilience',
    focus: 'Heart & vessel integrity',
    text: 'Track ApoB, Lp(a), and inflammatory signals early — then intervene before arterial aging becomes irreversible.',
    image: MARKETING_IMAGES.threats.cardio,
    alt: 'Coastal athlete monitoring cardiovascular recovery at sunset',
  },
  {
    id: 'metabolic',
    num: '02',
    title: 'Metabolic Stability',
    focus: 'Energy & glucose control',
    text: 'Address insulin resistance, visceral fat, and cellular fuel pathways that quietly accelerate biological aging.',
    image: MARKETING_IMAGES.threats.metabolic,
    alt: 'Mediterranean nourishment supporting metabolic longevity',
  },
  {
    id: 'neuro',
    num: '03',
    title: 'Cognitive Clarity',
    focus: 'Brain & nervous system',
    text: 'Protect sleep architecture, APOE risk context, and oxygenation patterns that shape long-term mental sharpness.',
    image: MARKETING_IMAGES.threats.neuro,
    alt: 'Sunrise meditation supporting cognitive clarity and brain health',
  },
  {
    id: 'cancer',
    num: '04',
    title: 'Early Interception',
    focus: 'Oncology & genomics',
    text: 'Use hereditary risk panels and biomarker strategy to catch vulnerability years before disease has room to grow.',
    image: MARKETING_IMAGES.threats.cancer,
    alt: 'Precision diagnostics environment for early interception',
  },
];

const ROUTE_TABS = [
  'vision', 'threats', 'treatments', 'how-it-works',
  'privacy', 'terms', 'medical-disclaimer',
  ...LIFESTYLE_PILLARS.map((pillar) => pillar.id)
];

export {
  HOME_FAQS,
  LIFESTYLE_PILLARS,
  HERO_SLIDES,
  HOME_PROGRAMS,
  HOME_CHIPS,
  THREAT_DOMAINS,
  ROUTE_TABS,
};
