/** How it works page — 5-step sticky flow, Pax brand imagery + copy */

const HIW = '/images/yucca-clone/hiw';
const YC = '/images/yucca-clone';

export const HOW_STEPS = [
  {
    n: '01',
    title: 'Choose a',
    titleItalic: 'treatment plan',
    body: 'Browse our science-backed GLP-1 options and select the plan that fits your goals. Then complete a short medical history questionnaire — a few minutes that helps our providers confirm you’re a good fit for treatment.',
    image: {
      src: `${HIW}/Treatment-Plan.avif?v=pax2`,
      alt: 'Pax Longevity Semaglutide and Tirzepatide treatment vials',
    },
    chips: ['Semaglutide', 'Tirzepatide'],
    callout: {
      value: '2 treatments',
      label: 'Personalized Semaglutide and Tirzepatide protocols',
    },
    link: { href: '#/treatments/weight-loss', label: 'Explore treatments →' },
  },
  {
    n: '02',
    title: 'Checkout &',
    titleItalic: 'verify identity',
    body: 'Complete your purchase, then take one quick step to verify your identity by entering the last four digits of your SSN or uploading a photo of a government-issued ID. It’s a standard part of the process — and it ensures your prescription is issued safely and securely.',
    image: {
      src: `${HIW}/Checkout--Verify-identity.avif?v=pax2`,
      alt: 'Secure Pax checkout and identity verification',
    },
    chips: ['Secure checkout', 'ID verification', 'Cancel anytime'],
  },
  {
    n: '03',
    title: 'Provider',
    titleItalic: 'reviews intake',
    body: 'A licensed U.S. provider reviews your medical history and questionnaire — typically within 24 hours. If they need clarification or have recommendations, they’ll follow up directly. No live appointment needed.',
    image: {
      src: `${HIW}/Provider-reviews-intake_2.avif?v=pax2`,
      alt: 'Licensed provider reviewing Pax patient intake',
    },
    chips: ['Licensed providers', 'Review within 24h', 'No office visit'],
  },
  {
    n: '04',
    title: 'Receive your',
    titleItalic: 'medication',
    body: 'Once approved, your prescription is sent to our licensed partner pharmacy and fulfilled to your exact treatment plan. Your medication ships via expedited delivery — securely packaged and delivered directly to your door.',
    image: {
      src: `${HIW}/Receive-your-medication_2.avif?v=pax2`,
      alt: 'Pax Tirzepatide medication delivered in discreet packaging',
    },
    chips: ['Licensed pharmacy', 'Expedited shipping', 'Discreet packaging'],
    callout: {
      value: 'Free expedited',
      label: 'Includes insulation to help medication stay fresh in transit.',
    },
  },
  {
    n: '05',
    title: 'Start your',
    titleItalic: 'treatment',
    body: 'Your care doesn’t stop at delivery. From day one, you’ll have access to your Patient Center, a step-by-step onboarding checklist, and a care team you can reach anytime. We’re here for questions, adjustments, and everything in between.',
    image: {
      src: `${HIW}/Start-your-treatment_1.avif`,
      alt: 'Patient starting treatment with Pax care team support',
    },
    chips: ['Patient Center', 'Onboarding checklist', 'Ongoing support'],
  },
];

export const HOW_STORIES = [
  {
    step: '01',
    img: `${YC}/Blaze-B.-p-800.avif`,
    title: 'Tirzepatide Progress',
    timeline: 'Month 3 · Dual GIP/GLP-1',
    quote: 'My provider adjusted my dosing based on how I responded — not a template.',
    patient: 'Blaze B.',
    metric: 'Tirzepatide',
  },
  {
    step: '02',
    img: `${YC}/Crystal-G.-p-800.avif`,
    title: 'Semaglutide Steady Loss',
    timeline: 'Month 2 · GLP-1 Protocol',
    quote: 'Clear instructions and direct communication with my care team on Semaglutide.',
    patient: 'Crystal G.',
    metric: 'Semaglutide',
  },
  {
    step: '03',
    img: `${YC}/Lisa-C.-p-800.avif`,
    title: 'Discreet Delivery',
    timeline: 'Month 1 · Fulfillment',
    quote: 'Fulfillment was calm, cold-chain shipped, and completely discreet.',
    patient: 'Lisa C.',
    metric: 'Pharmacy Direct',
  },
  {
    step: '04',
    img: `${YC}/Kim-B.-p-800.avif`,
    title: 'Ongoing GLP-1 Care',
    timeline: 'Month 6 · Optimization',
    quote: 'Ongoing check-ins kept my goals on track long term.',
    patient: 'Kim B.',
    metric: 'Ongoing Support',
  },
];

export const HOW_WHY = [
  {
    image: {
      src: `${YC}/expt-tirz-sema-vials-together.png?v=pax2`,
      alt: 'Pax Semaglutide and Tirzepatide vials',
    },
    title: 'Transparent & Trusted',
    body: 'From compounding partners to doorstep delivery — pharmaceutical-grade quality with clear, clinical oversight.',
  },
  {
    image: {
      src: `${YC}/dr-michael-wasef-md-pax.png?v=pax3`,
      alt: 'Licensed Pax Longevity provider',
    },
    title: 'Care Built Around You',
    body: 'Semaglutide or Tirzepatide — protocols tailored to your goals, history, and how your body responds.',
  },
  {
    image: {
      src: `${HIW}/pax-why-science-results.png?v=pax3`,
      alt: 'Patient on a Pax Longevity weight loss journey',
    },
    title: 'Science-backed Results',
    body: 'Clinically guided weekly protocols designed for appetite regulation and durable metabolic support.',
  },
];

export const HOW_MEDIA = {
  storyHero: {
    src: `${HIW}/Every-Treatment-Has-A-Story.avif`,
    alt: 'Patients sharing their personalized treatment journey and results',
  },
  priority: {
    src: `${HIW}/yucca-health-patient-portal-dashboard-semaglutide-mobile.avif`,
    alt: 'Pax Patient Center dashboard showing treatment plan and health records',
  },
  cta: {
    src: `${HIW}/yucca-health-patient-portal-features-glp-1-treatment.avif`,
    alt: 'Pax Patient Center on mobile — track progress and manage treatment',
  },
};

export const HOW_FAQS = [
  {
    q: 'How does Pax Longevity work?',
    a: 'Choose a treatment, complete a short online intake, a licensed U.S. provider reviews it within 24 hours, and if approved, your medication is compounded and shipped directly to your door.',
  },
  {
    q: 'Is a prescription required?',
    a: 'Yes. Our treatments are prescription-only. Licensed providers review your medical history and, if appropriate, issue a prescription through our HIPAA-compliant platform.',
  },
  {
    q: 'What treatments do you offer?',
    a: 'Personalized Semaglutide and Tirzepatide for weight loss — prescribed by licensed U.S. providers and fulfilled by licensed pharmacies.',
  },
  {
    q: 'How fast is shipping?',
    a: 'Once approved and prescribed, your medication ships with free expedited delivery in discreet, temperature-controlled packaging.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Plans are flexible with no long-term commitment. You can pause or cancel anytime from your Patient Center.',
  },
];
