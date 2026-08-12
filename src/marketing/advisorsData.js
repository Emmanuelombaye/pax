/** Advisors / medical direction — Pax clinical board */

const YC = '/images/yucca-clone';

export const ADVISORS = [
  {
    id: 'wasef',
    name: 'Dr. Michael Wasef',
    credentials: 'MD',
    role: 'Medical Director',
    focus: ['Clinical review', 'Protocol design', 'Safety oversight'],
    bio: 'Leads clinical review standards for Semaglutide and Tirzepatide — ensuring every plan is personalized, monitored, and medically sound.',
    img: `${YC}/dr-michael-wasef-md-pax.png?v=pax3`,
    featured: true,
  },
  {
    id: 'sakla',
    name: 'Dr. Andrew Sakla',
    credentials: 'DO',
    role: 'Weight Management Advisor',
    focus: ['GLP-1 protocols', 'Metabolic health', 'Patient outcomes'],
    bio: 'Advises on GLP-1 dosing pathways and patient response patterns so treatment stays effective, flexible, and grounded in real clinical practice.',
    img: `${YC}/dr-andrew-sakla-do-pax.png?v=pax3`,
  },
  {
    id: 'ellis',
    name: 'Dr. Amara Ellis',
    credentials: 'MD',
    role: 'Clinical Safety Advisor',
    focus: ['Eligibility review', 'Risk screening', 'Ongoing care'],
    bio: 'Guides intake standards and exclusion criteria — helping licensed providers identify the right candidates and adjust care when clinically needed.',
    img: `${YC}/dr-amara-ellis-md-pax.png?v=pax3`,
  },
];

export const ADVISOR_PILLARS = [
  {
    n: '01',
    title: 'Licensed U.S. review',
    body: 'Every intake is reviewed by a state-licensed provider before a prescription is issued.',
  },
  {
    n: '02',
    title: 'Within 24 hours',
    body: 'Typical clinical review turnaround — with direct follow-up if clarification is needed.',
  },
  {
    n: '03',
    title: 'Accountable follow-through',
    body: 'Plans can be adjusted when your response, labs, or goals call for a different approach.',
  },
];
