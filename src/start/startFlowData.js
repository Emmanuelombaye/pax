export const FLOW_STEPS = [
  { id: 'treatment', label: 'Choose treatment' },
  { id: 'intake', label: 'Medical intake' },
  { id: 'plan', label: 'Plan & checkout' },
  { id: 'verify', label: 'Verify & account' },
];

export const TREATMENT_CATEGORIES = [
  {
    id: 'metabolic',
    title: 'Metabolic & Weight',
    treatments: ['weight-loss', 'metabolic-oral'],
  },
  {
    id: 'cellular',
    title: 'Energy & Recovery',
    treatments: ['longevity', 'recovery', 'hormone'],
  },
  {
    id: 'lifestyle',
    title: 'Aesthetic & Lifestyle',
    treatments: ['hair', 'sexual-wellness'],
  },
];

export const TREATMENTS = [
  {
    id: 'weight-loss',
    category: 'metabolic',
    name: 'Compounded GLP-1',
    med: 'Semaglutide / Tirzepatide',
    badge: 'Most requested',
    priceFrom: 249,
    frequency: 'Weekly',
    blurb: 'Physician-guided appetite and metabolic support for sustainable body-composition change.',
    image: '/images/cards/glp-pen.png',
  },
  {
    id: 'metabolic-oral',
    category: 'metabolic',
    name: 'Metabolic Oral Support',
    med: 'Adjunct protocol',
    badge: 'Adjunct',
    priceFrom: 89,
    frequency: 'Daily',
    blurb: 'Complement GLP-1 care with targeted oral support for adherence and metabolic balance.',
    image: '/images/cards/pill-bottle.png',
  },
  {
    id: 'longevity',
    category: 'cellular',
    name: 'Compounded NAD+',
    med: 'NAD+ Protocol',
    badge: 'Cellular',
    priceFrom: 149,
    frequency: '2x Weekly',
    blurb: 'Mitochondrial support for energy consistency, focus, and cellular recovery.',
    image: '/images/cards/vitality-bottle.png',
  },
  {
    id: 'recovery',
    category: 'cellular',
    name: 'Sermorelin Protocol',
    med: 'Sermorelin',
    badge: 'Recovery',
    priceFrom: 189,
    frequency: 'Nightly',
    blurb: 'Night-time recovery support for sleep architecture, muscle repair, and vitality.',
    image: '/images/cards/labs-box.png',
  },
  {
    id: 'hormone',
    category: 'cellular',
    name: 'TRT / HRT Optimization',
    med: 'Hormone balancing',
    badge: 'Hormones',
    priceFrom: 219,
    frequency: 'Monthly',
    blurb: 'Personalized hormone plans built around bloodwork and symptom profile.',
    image: '/images/cards/pill-bottle.png',
  },
  {
    id: 'hair',
    category: 'lifestyle',
    name: 'Hair Restoration Topicals',
    med: 'Custom topical blend',
    badge: 'Hair',
    priceFrom: 79,
    frequency: 'Daily',
    blurb: 'Compounded topicals for density, growth support, and scalp health.',
    image: '/images/cards/vitality-bottle.png',
  },
  {
    id: 'sexual-wellness',
    category: 'lifestyle',
    name: 'Sexual Wellness Support',
    med: 'Tadalafil protocol',
    badge: 'Lifestyle',
    priceFrom: 69,
    frequency: 'As needed',
    blurb: 'Discreet provider-led performance support with flexible dosing plans.',
    image: '/images/cards/pill-bottle.png',
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
  'No account until after checkout',
  'Free expedited shipping',
];
