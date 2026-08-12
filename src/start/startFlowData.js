export const FLOW_STEPS = [
  { id: 'treatment', label: 'Choose treatment' },
  { id: 'intake', label: 'Medical intake' },
  { id: 'plan', label: 'Plan & checkout' },
  { id: 'verify', label: 'Verify & account' },
];

export const TREATMENT_INCLUDES = [
  'Free medical consultation',
  'Free expedited shipping',
  '24/7 care-team support',
  'Patient Center access',
];

export const GLP_PRODUCT = {
  title: 'Personalized GLP-1 Injections',
  blurb:
    'A weekly injection designed to support appetite control, metabolic balance, and long-term weight management through GLP-1 pathway activation — prescribed only when medically appropriate.',
  socialProof: '1,000+ started in the past week',
  badges: ['Most popular', 'In stock'],
  image: '/images/cards/pax-yucca-vials.png',
  finePrint:
    'Provider-guided care from U.S. licensed pharmacies. Charged only if prescribed — change or cancel anytime.',
};

/** Pax weight-loss goals: Semaglutide & Tirzepatide only */
export const TREATMENT_GOALS = [
  {
    id: 'weight-loss',
    label: 'Weight Loss',
    eyebrow: 'Personalized',
    title: 'GLP-1 Injections',
    blurb:
      'A weekly injection designed to support weight management by helping regulate appetite and reduce hunger signals. Available in GLP-1 (Semaglutide) and GLP-1 + GIP (Tirzepatide).',
    badges: ['Best seller', 'In stock'],
    image: '/images/cards/pax-yucca-vials.png',
    imageFallback: '/images/cards/pax-glp-product.png',
    hasMedPicker: true,
    defaultTreatmentId: 'semaglutide',
    treatmentIds: ['semaglutide', 'tirzepatide'],
  },
];

export const TREATMENT_CATEGORIES = TREATMENT_GOALS.map((g) => ({
  id: g.id,
  title: g.label,
  treatments: g.treatmentIds,
}));

const monthPlans = (one, three, six) => [
  {
    id: '1mo',
    label: '1-month',
    months: 1,
    perMonth: one,
    total: one,
    note: 'Flexible · cancel anytime',
  },
  {
    id: '3mo',
    label: '3-month',
    months: 3,
    perMonth: three,
    total: three * 3,
    note: 'Popular · save vs monthly',
    popular: true,
  },
  {
    id: '6mo',
    label: '6-month',
    months: 6,
    perMonth: six,
    total: six * 6,
    note: 'Best value · lock in rate',
  },
];

export const TREATMENTS = [
  {
    id: 'semaglutide',
    category: 'weight-loss',
    name: 'Personalized Semaglutide',
    med: 'Semaglutide',
    pathway: 'GLP-1 (Semaglutide)',
    tagline: 'Steady, gradual results.',
    badge: 'Most popular',
    priceFrom: 125,
    frequency: 'Weekly',
    blurb:
      'Targets the GLP-1 pathway to reduce appetite and support consistent, sustainable weight loss.',
    image: '/images/cards/pax-yucca-vials.png',
    plans: monthPlans(146, 135, 125),
  },
  {
    id: 'tirzepatide',
    category: 'weight-loss',
    name: 'Personalized Tirzepatide',
    med: 'Tirzepatide',
    pathway: 'GLP-1 + GIP (Tirzepatide)',
    tagline: 'Dual-action support.',
    badge: 'Dual pathway',
    priceFrom: 225,
    frequency: 'Weekly',
    blurb:
      'Acts on GLP-1 and GIP pathways for stronger appetite regulation and more pronounced weight-loss support.',
    image: '/images/cards/pax-yucca-vials.png',
    plans: monthPlans(258, 240, 225),
  },
];

export const GLP_TREATMENTS = TREATMENTS.filter((t) => t.category === 'weight-loss');

/** Fallback shared plans (Semaglutide ladder) for any legacy reads */
export const PLANS = TREATMENTS[0].plans;

export function getPlansForTreatment(treatmentId) {
  const t = TREATMENTS.find((x) => x.id === treatmentId);
  return t?.plans || PLANS;
}

export function getGoalForTreatment(treatmentId) {
  const t = TREATMENTS.find((x) => x.id === treatmentId);
  return TREATMENT_GOALS.find((g) => g.id === t?.category) || TREATMENT_GOALS[0];
}

export function resolveTreatmentId(raw) {
  const value = String(raw || '').trim();
  if (!value) return '';
  if (value === 'weight-loss' || value === 'glp' || value === 'longevity' || value === 'nad') {
    return 'semaglutide';
  }
  if (value === 'recovery' || value === 'muscle-recovery' || value === 'sermorelin') {
    return 'semaglutide';
  }
  return TREATMENTS.some((t) => t.id === value) ? value : '';
}

export const INTAKE_STEPS = [
  {
    id: 'goal',
    question: 'What is your primary health goal?',
    type: 'choice',
    options: [
      { value: 'lose-weight', label: 'Lose weight & curb appetite' },
      { value: 'energy', label: 'More energy & cellular vitality' },
      { value: 'recovery', label: 'Better recovery, sleep & muscle support' },
      { value: 'metabolic', label: 'Improve metabolic health markers' },
    ],
  },
  {
    id: 'bmi',
    question: 'Tell us a bit about your body metrics',
    type: 'metrics',
  },
  {
    id: 'conditions',
    question: 'Do any of these apply to you?',
    type: 'choice',
    options: [
      { value: 'none', label: 'None of these' },
      { value: 'diabetes', label: 'Type 2 diabetes' },
      { value: 'hypertension', label: 'High blood pressure' },
      { value: 'cholesterol', label: 'High cholesterol' },
      { value: 'other', label: 'Another related condition' },
    ],
  },
  {
    id: 'meds',
    question: 'Are you currently taking any related medications or peptides?',
    type: 'choice',
    options: [
      { value: 'no', label: 'No — starting fresh' },
      { value: 'yes-sema', label: 'Yes — Semaglutide / Wegovy / Ozempic' },
      { value: 'yes-tirz', label: 'Yes — Tirzepatide / Zepbound / Mounjaro' },
      { value: 'yes-other', label: 'Yes — another related medication' },
    ],
  },
];

export const TRUST_POINTS = [
  'U.S. licensed providers',
  'Only charged if prescribed',
  'No account until after checkout',
  'Free expedited shipping',
];
