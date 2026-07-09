export const TREATMENTS = [
  {
    id: 'weight-loss',
    name: 'Weight Management',
    med: 'Personalized Semaglutide',
    badge: 'GLP-1',
    priceFrom: 146,
    blurb: 'Curb appetite and support sustainable fat loss with provider-guided GLP-1 care.',
    image: '/images/glp1-treatment.webp',
  },
  {
    id: 'longevity',
    name: 'Cellular Longevity',
    med: 'NAD+ Protocol',
    badge: 'NAD+',
    priceFrom: 189,
    blurb: 'Support cellular energy, recovery, and healthy aging with clinician oversight.',
    image: '/images/nad-treatment.webp',
  },
  {
    id: 'recovery',
    name: 'Vitality & Recovery',
    med: 'Sermorelin',
    badge: 'Peptide',
    priceFrom: 168,
    blurb: 'Support sleep, recovery, and lean muscle with a personalized peptide plan.',
    image: '/images/sermorelin-treatment.webp',
  },
];

export const PLANS = [
  {
    id: '1mo',
    label: '1-month',
    months: 1,
    perMonth: 249,
    total: 249,
    note: 'Flexible · cancel anytime',
  },
  {
    id: '3mo',
    label: '3-month',
    months: 3,
    perMonth: 199,
    total: 597,
    note: 'Most popular · save vs monthly',
    popular: true,
  },
  {
    id: '6mo',
    label: '6-month',
    months: 6,
    perMonth: 146,
    total: 876,
    note: 'Best value · first-order savings',
  },
];

export const INTAKE_STEPS = [
  {
    id: 'goal',
    question: 'What is your primary health goal?',
    type: 'choice',
    options: [
      { value: 'lose-weight', label: 'Lose weight & curb appetite' },
      { value: 'energy', label: 'More energy & cellular vitality' },
      { value: 'recovery', label: 'Recovery, sleep & lean muscle' },
      { value: 'longevity', label: 'Long-term longevity support' },
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
      { value: 'other', label: 'Another weight-related condition' },
    ],
  },
  {
    id: 'meds',
    question: 'Are you currently taking any GLP-1 or peptide medications?',
    type: 'choice',
    options: [
      { value: 'no', label: 'No — starting fresh' },
      { value: 'yes-sema', label: 'Yes — Semaglutide / Wegovy / Ozempic' },
      { value: 'yes-tirz', label: 'Yes — Tirzepatide / Zepbound / Mounjaro' },
      { value: 'yes-other', label: 'Yes — another peptide protocol' },
    ],
  },
];

export const TRUST_POINTS = [
  'U.S. licensed providers',
  'Only charged if prescribed',
  'Cancel anytime',
  'Free expedited shipping',
];
