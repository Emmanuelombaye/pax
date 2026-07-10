/** Simulated clinical + account data for Pax Patient Center demo */

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
}

function series(n, base, swing = 4) {
  return Array.from({ length: n }, (_, i) => {
    const t = Date.now() - (n - 1 - i) * 86400000;
    const wave = Math.sin(i / 2.2) * swing + (Math.random() - 0.5) * swing * 0.35;
    return { t, v: Math.round((base + wave) * 10) / 10 };
  });
}

export const DEMO_USER = {
  id: 'demo_alex',
  email: 'alex.rivera@email.com',
  firstName: 'Alex',
  lastName: 'Rivera',
};

export const MOCK = {
  healthScore: 82,
  profile: {
    ...DEMO_USER,
    phone: '(305) 555-0142',
    dob: '1989-04-12',
    sex: 'Female',
    bloodType: 'A+',
    heightIn: 66,
    weightLbs: 168,
    language: 'English',
    occupation: 'Product design',
    pharmacy: 'CVS Pharmacy — Brickell',
    preferredDoctor: 'Dr. Elena Vance, MD',
    emergency: { name: 'Jordan Rivera', relation: 'Spouse', phone: '(305) 555-0199' },
    allergies: ['Penicillin', 'Shellfish'],
    conditions: ['Prediabetes (resolved)', 'Vitamin D deficiency'],
    familyHistory: ['Maternal hypertension', 'Paternal type 2 diabetes'],
    lifestyle: 'Zone-2 walks 4×/week · Mediterranean nutrition · Sleep 10:30–6:30',
  },

  membership: {
    plan: 'Pax Continuum — Monthly',
    status: 'Active',
    nextBilling: daysFromNow(18).slice(0, 10),
    price: '$249/mo',
    benefits: ['Provider messaging', 'Quarterly labs', 'RPM dashboard', 'Priority refill'],
  },

  appointments: {
    upcoming: [
      {
        id: 'a1',
        title: 'Follow-up · Metabolic review',
        provider: 'Dr. Elena Vance',
        when: daysFromNow(2),
        mode: 'Video',
        status: 'Confirmed',
        canJoin: true,
      },
      {
        id: 'a2',
        title: 'Nutrition consult',
        provider: 'Maya Chen, RD',
        when: daysFromNow(9),
        mode: 'In person · Miami',
        status: 'Confirmed',
        canJoin: false,
      },
      {
        id: 'a3',
        title: 'Lab draw — Quest Brickell',
        provider: 'Quest Diagnostics',
        when: daysFromNow(14),
        mode: 'In person',
        status: 'Scheduled',
        canJoin: false,
      },
    ],
    history: [
      {
        id: 'h1',
        title: 'Initial clinical intake',
        provider: 'Dr. Elena Vance',
        when: daysAgo(21),
        mode: 'Video',
        status: 'Completed',
        summary: 'Started Semaglutide titration · lifestyle plan issued',
      },
      {
        id: 'h2',
        title: 'Onboarding check-in',
        provider: 'Care team',
        when: daysAgo(12),
        mode: 'Message visit',
        status: 'Completed',
        summary: 'Tolerating week-1 dose · nausea mild',
      },
    ],
  },

  messages: [
    {
      id: 'm1',
      from: 'care',
      name: 'Dr. Elena Vance',
      body: 'Alex — labs look strong. Keep the current titration. Log any nausea above 4/10.',
      at: daysAgo(1),
      read: false,
    },
    {
      id: 'm2',
      from: 'patient',
      name: 'You',
      body: 'Morning dose went fine. Mild appetite drop, energy is good.',
      at: daysAgo(1),
      read: true,
    },
    {
      id: 'm3',
      from: 'care',
      name: 'Pax Care Desk',
      body: 'Your cold-chain shipment is out for delivery today (tracking in Treatment).',
      at: daysAgo(3),
      read: true,
    },
  ],

  treatment: {
    name: 'Compounded Semaglutide',
    status: 'Active',
    plan: 'Continuum Monthly · Week 3 of titration',
    dose: '0.5 mg weekly · subcutaneous',
    nextRefill: daysFromNow(11).slice(0, 10),
    instructions: [
      'Inject on the same weekday each week',
      'Rotate sites: abdomen / thigh',
      'Refrigerate 36–46°F',
      'Hydrate 80–100 oz daily during titration',
    ],
    tasks: [
      { id: 't1', label: 'Log weekly weight', done: true },
      { id: 't2', label: 'Complete PHQ-9 before follow-up', done: false },
      { id: 't3', label: 'Upload insurance card', done: true },
      { id: 't4', label: 'Confirm pharmacy preference', done: false },
    ],
    lifestyle: ['Protein 100g+/day', 'Zone-2 150 min/week', 'Sleep window consistency'],
  },

  prescriptions: [
    {
      id: 'rx1',
      name: 'Semaglutide (compounded)',
      dose: '0.5 mg weekly',
      status: 'Active',
      pharmacy: 'Partner 503A pharmacy',
      refillsLeft: 2,
      lastFilled: daysAgo(6).slice(0, 10),
    },
    {
      id: 'rx2',
      name: 'Ondansetron 4 mg',
      dose: 'As needed for nausea',
      status: 'Active',
      pharmacy: 'CVS Brickell',
      refillsLeft: 1,
      lastFilled: daysAgo(18).slice(0, 10),
    },
    {
      id: 'rx3',
      name: 'Vitamin D3 5000 IU',
      dose: '1 capsule daily',
      status: 'Active',
      pharmacy: 'CVS Brickell',
      refillsLeft: 3,
      lastFilled: daysAgo(30).slice(0, 10),
    },
  ],

  medSchedule: {
    morning: [
      { id: 'ms1', name: 'Vitamin D3', time: '7:30 AM', taken: true },
      { id: 'ms2', name: 'Electrolyte packet', time: '8:00 AM', taken: true },
    ],
    evening: [
      { id: 'ms3', name: 'Magnesium glycinate', time: '9:00 PM', taken: false },
    ],
    weekly: [{ id: 'ms4', name: 'Semaglutide injection', day: 'Monday', taken: true }],
    adherence: 94,
  },

  labs: [
    {
      id: 'l1',
      name: 'Comprehensive metabolic panel',
      date: daysAgo(8).slice(0, 10),
      status: 'Reviewed',
      abnormal: false,
      items: [
        { marker: 'Glucose', value: '92', unit: 'mg/dL', range: '70–99', flag: 'ok' },
        { marker: 'ALT', value: '28', unit: 'U/L', range: '7–56', flag: 'ok' },
        { marker: 'Creatinine', value: '0.82', unit: 'mg/dL', range: '0.6–1.1', flag: 'ok' },
      ],
    },
    {
      id: 'l2',
      name: 'Lipid panel + ApoB',
      date: daysAgo(8).slice(0, 10),
      status: 'Reviewed',
      abnormal: true,
      items: [
        { marker: 'LDL-C', value: '118', unit: 'mg/dL', range: '<100', flag: 'high' },
        { marker: 'ApoB', value: '96', unit: 'mg/dL', range: '<90', flag: 'high' },
        { marker: 'HDL-C', value: '58', unit: 'mg/dL', range: '>50', flag: 'ok' },
      ],
      comment: 'Dr. Vance: Continue protocol; recheck lipids in 12 weeks.',
    },
    {
      id: 'l3',
      name: 'HbA1c',
      date: daysAgo(8).slice(0, 10),
      status: 'Reviewed',
      abnormal: false,
      items: [{ marker: 'HbA1c', value: '5.3', unit: '%', range: '<5.7', flag: 'ok' }],
    },
  ],

  records: [
    { id: 'r1', type: 'Visit summary', title: 'Initial intake — metabolic', date: daysAgo(21).slice(0, 10) },
    { id: 'r2', type: 'Diagnosis', title: 'Obesity class I · ICD E66.9', date: daysAgo(21).slice(0, 10) },
    { id: 'r3', type: 'Vaccination', title: 'Influenza 2025–26', date: daysAgo(60).slice(0, 10) },
    { id: 'r4', type: 'Procedure', title: 'None on file', date: '—' },
  ],

  monitoring: {
    bp: series(14, 118, 6).map((p, i) => ({
      ...p,
      diastolic: Math.round(74 + Math.sin(i / 2) * 3),
    })),
    hr: series(14, 68, 5),
    weight: series(14, 172, 1.2).map((p, i) => ({ ...p, v: Math.round((172 - i * 0.28 + Math.sin(i) * 0.3) * 10) / 10 })),
    glucose: series(14, 98, 8),
    spo2: series(14, 98, 0.6),
    sleep: series(14, 7.2, 0.8),
    devices: [
      { id: 'd1', name: 'Apple Watch Ultra', status: 'Connected', lastSync: '2 min ago' },
      { id: 'd2', name: 'Withings BPM Connect', status: 'Connected', lastSync: 'Today 7:14 AM' },
      { id: 'd3', name: 'Dexcom-ready slot', status: 'Not paired', lastSync: '—' },
    ],
  },

  wellness: {
    waterOz: 64,
    waterGoal: 90,
    exerciseMin: 35,
    exerciseGoal: 45,
    calories: 1680,
    mood: 4,
    stress: 2,
    sleepQuality: 4,
    meditationMin: 10,
    goals: [
      { label: 'Lose 12 lb by Q3', progress: 42 },
      { label: '150 Zone-2 minutes / week', progress: 68 },
    ],
  },

  insurance: {
    payer: 'Aetna PPO',
    memberId: 'AET-88420119',
    group: 'G-22091',
    subscriber: 'Alex Rivera',
    deductible: { used: 420, total: 1500 },
    oop: { used: 890, total: 4500 },
    copay: { specialist: '$40', primary: '$25', labs: 'Plan rates' },
    cardUploaded: true,
    claims: [
      { id: 'c1', title: 'Video follow-up', date: daysAgo(21).slice(0, 10), amount: '$185', status: 'Paid' },
      { id: 'c2', title: 'Lab panel', date: daysAgo(8).slice(0, 10), amount: '$240', status: 'Processing' },
    ],
  },

  billing: {
    balance: 0,
    invoices: [
      { id: 'b1', title: 'Continuum membership', date: daysAgo(12).slice(0, 10), amount: '$249.00', status: 'Paid' },
      { id: 'b2', title: 'Clinical visit copay', date: daysAgo(21).slice(0, 10), amount: '$40.00', status: 'Paid' },
    ],
    card: 'Visa ···· 4242',
    subscription: 'Pax Continuum — Monthly',
  },

  documents: [
    { id: 'doc1', name: 'Driver license', type: 'ID', date: daysAgo(40).slice(0, 10) },
    { id: 'doc2', name: 'Aetna insurance card', type: 'Insurance', date: daysAgo(40).slice(0, 10) },
    { id: 'doc3', name: 'Referral — endocrinology', type: 'Referral', date: daysAgo(25).slice(0, 10) },
    { id: 'doc4', name: 'Lab PDF — CMP + lipids', type: 'Labs', date: daysAgo(8).slice(0, 10) },
  ],

  family: [
    { id: 'f1', name: 'Sam Rivera', relation: 'Child · 12', access: 'Appointments + vaccines', status: 'Active' },
    { id: 'f2', name: 'Jordan Rivera', relation: 'Spouse · caregiver', access: 'Full proxy', status: 'Active' },
  ],

  notifications: [
    { id: 'n1', title: 'Visit in 2 days', body: 'Metabolic follow-up with Dr. Vance', type: 'appointment', at: daysAgo(0), unread: true },
    { id: 'n2', title: 'New lab results', body: 'Lipid panel ready to review', type: 'labs', at: daysAgo(1), unread: true },
    { id: 'n3', title: 'Refill window opens soon', body: 'Semaglutide refill in 11 days', type: 'rx', at: daysAgo(2), unread: false },
    { id: 'n4', title: 'Membership billed', body: '$249 charged to Visa ···· 4242', type: 'billing', at: daysAgo(12), unread: false },
  ],

  forms: [
    { id: 'form1', name: 'Pre-visit intake', status: 'Complete' },
    { id: 'form2', name: 'PHQ-9', status: 'Due' },
    { id: 'form3', name: 'GAD-7', status: 'Due' },
    { id: 'form4', name: 'HIPAA acknowledgment', status: 'Complete' },
  ],

  security: {
    mfa: true,
    devices: [
      { name: 'MacBook Pro', last: 'Now', current: true },
      { name: 'iPhone 16', last: 'Yesterday', current: false },
    ],
    sessions: [
      { where: 'Miami, FL · Chrome', when: 'Today 1:12 PM' },
      { where: 'Miami, FL · iOS App', when: 'Yesterday 8:04 PM' },
    ],
  },

  supportFaqs: [
    { q: 'How do I join a video visit?', a: 'Open Appointments → Join Visit within 15 minutes of start. We will run a device check first.' },
    { q: 'How do refills work?', a: 'Request from Medications → Refills. Your provider reviews before pharmacy release.' },
    { q: 'Is my data stored on this device?', a: 'This demo keeps session locally. Production connects to a HIPAA-ready backend via the Pax connect adapter.' },
  ],
};

export function unreadMessages(messages = MOCK.messages) {
  return messages.filter((m) => m.from === 'care' && !m.read).length;
}

export function unreadNotifications(list = MOCK.notifications) {
  return list.filter((n) => n.unread).length;
}
