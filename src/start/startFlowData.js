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
    'A weekly injection that may support appetite regulation and weight management through GLP-1 pathway activation — prescribed only when medically appropriate.',
  badges: ['Provider-guided', 'In stock'],
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
    note: 'Save vs monthly',
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
    tagline: 'Provider-guided GLP-1.',
    badge: 'GLP-1',
    priceFrom: 125,
    frequency: 'Weekly',
    blurb:
      'Targets the GLP-1 pathway to support appetite regulation when medically appropriate.',
    image: '/images/cards/pax-yucca-vials.png',
    plans: monthPlans(146, 135, 125),
  },
  {
    id: 'tirzepatide',
    category: 'weight-loss',
    name: 'Personalized Tirzepatide',
    med: 'Tirzepatide',
    pathway: 'GLP-1 + GIP (Tirzepatide)',
    tagline: 'Provider-guided dual pathway.',
    badge: 'Dual pathway',
    priceFrom: 225,
    frequency: 'Weekly',
    blurb:
      'Acts on GLP-1 and GIP pathways to support appetite regulation when medically appropriate.',
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

import QUESTIONNAIRE from './questionnaire.json';

/** LegitScript-oriented clinical intake phases (mock provider review). */
export const INTAKE_PHASES = [
  { id: 'metrics', title: 'Body metrics', eyebrow: 'Clinical intake' },
  { id: 'screening', title: 'Medical screening', eyebrow: 'Clinical intake' },
  { id: 'patient', title: 'Patient information', eyebrow: 'Clinical intake' },
  { id: 'shipping', title: 'Shipping address', eyebrow: 'Clinical intake' },
  { id: 'consent', title: 'Agreements & consent', eyebrow: 'Clinical intake' },
];

/** Kept for any legacy imports — prefer INTAKE_PHASES + QUESTIONNAIRE. */
export const INTAKE_STEPS = INTAKE_PHASES;

export { QUESTIONNAIRE };

const METRICS_IDS = new Set(['weight', 'height', 'gender', 'dob']);

export const US_STATES = [
  { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' }, { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' },
];

export function emptyIntake() {
  return {
    answers: {},
    height: '',
    weight: '',
    sexAtBirth: '',
    dob: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    consentTelehealth: false,
    consentReview: false,
  };
}

function answerForCondition(condition, intake) {
  if (!condition) return '';
  if (condition.question_id === 'gender') return intake.sexAtBirth || '';
  return intake.answers?.[condition.question_id] || '';
}

export function getActiveScreeningQuestions(intake) {
  return QUESTIONNAIRE.filter((q) => {
    if (METRICS_IDS.has(q.id)) return false;
    if (!q.condition) return true;
    const related = answerForCondition(q.condition, intake);
    return String(related).toLowerCase() === String(q.condition.value).toLowerCase();
  });
}

export function questionIsDisqualified(q, answer) {
  if (!q?.disqualifier) return false;
  return String(answer || '').toLowerCase() === String(q.disqualifier_value || '').toLowerCase();
}

export function screeningHasDisqualifier(intake) {
  return getActiveScreeningQuestions(intake).some((q) =>
    questionIsDisqualified(q, intake.answers?.[q.id]),
  );
}

export function isScreeningComplete(intake) {
  const questions = getActiveScreeningQuestions(intake);
  const answered = questions.every((q) => {
    if (!q.required) return true;
    const ans = intake.answers?.[q.id];
    return ans != null && String(ans).trim().length > 0;
  });
  return answered && !screeningHasDisqualifier(intake);
}

export function isValidAdultDob(val) {
  if (!val) return false;
  const birthDate = new Date(val);
  if (Number.isNaN(birthDate.getTime())) return false;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age -= 1;
  return age >= 18 && age <= 120;
}

export function isValidZip(val) {
  return /^\d{5}(-\d{4})?$/.test(String(val || '').trim());
}

export function isValidEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val || '').trim());
}

export function isValidPhone(val) {
  return String(val || '').replace(/\D/g, '').length >= 10;
}

export const TRUST_POINTS = [
  'U.S. licensed providers',
  'Only charged if prescribed',
  'No account until after checkout',
  'Free expedited shipping',
];
