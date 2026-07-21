/** Marketing content + route tab ids */
const HOME_FAQS = [
  {
    q: 'Are weight-loss medications FDA approved?',
    lead: 'Brand-name GLP-1s are FDA-approved; compounded versions follow federal 503A pharmacy standards.',
    points: [
      'Wegovy & Ozempic are FDA-approved brands',
      'Compounded Semaglutide is prepared in licensed 503A facilities',
      'Compounded formulas are not individually FDA-reviewed',
    ],
  },
  {
    q: 'How fast is my intake reviewed?',
    lead: 'Most assessments are completed within 24 hours of submission.',
    points: [
      'Licensed clinicians review your health intake',
      'Prescriptions issued when clinically appropriate',
      'Your provider contacts you if more info is needed',
    ],
  },
  {
    q: 'How are treatments shipped and stored?',
    lead: 'Temperature-sensitive peptides ship overnight in cold-chain packaging.',
    points: [
      'Insulated packaging with gel packs included',
      'Overnight delivery to your door',
      'Refrigerate immediately on arrival',
    ],
  },
  {
    q: 'Is Pax a secure patient platform?',
    lead: 'Yes — licensed U.S. providers, HIPAA-secure intake, and accredited compounding partners.',
    points: [
      'Board-certified physicians review every intake',
      '503A accredited pharmacy sourcing',
      'HIPAA-compliant Patient Center',
    ],
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

const HERO_SLIDES = [
  '/images/hero-longevity.webp',
  '/images/miami-active.webp',
  '/images/hero-miami-cycle.webp',
  '/images/hero-miami-yoga.webp',
  '/images/hero-miami-water.webp',
];

const ROUTE_TABS = [
  'vision', 'threats', 'treatments', 'advisors', 'education',
  'privacy', 'terms', 'medical-disclaimer',
  ...LIFESTYLE_PILLARS.map((pillar) => pillar.id)
];

export { HOME_FAQS, LIFESTYLE_PILLARS, HERO_SLIDES, ROUTE_TABS };
