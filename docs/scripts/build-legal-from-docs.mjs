/**
 * Build src/marketing/legalContent.js from exported Google Docs in tmp-legal/
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tmp = path.join(root, 'tmp-legal');

function clean(s) {
  return String(s || '')
    .replace(/\r/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .trim();
}

function esc(s) {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n');
}

function readTxt(name) {
  return clean(fs.readFileSync(path.join(tmp, name), 'utf8'));
}

function parseNumberedDoc(text, { titleOverride } = {}) {
  const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  let title = titleOverride || lines[0];
  let lastUpdated = 'August 15, 2026';
  let i = 0;
  if (/^Last updated:/i.test(lines[0])) {
    lastUpdated = lines[0].replace(/^Last updated:\s*/i, '');
    i = 1;
    title = titleOverride || 'Legal';
  } else {
    i = 1;
    if (lines[1] && /^Last updated:/i.test(lines[1])) {
      lastUpdated = lines[1].replace(/^Last updated:\s*/i, '');
      i = 2;
    }
  }

  const intro = [];
  while (i < lines.length && !/^\d+\.\s+/.test(lines[i])) {
    intro.push(lines[i]);
    i += 1;
  }

  const sections = [];
  let current = null;
  for (; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(/^(\d+)\.\s+(.+)$/);
    if (m) {
      if (current) sections.push(current);
      current = { heading: `${m[1]}. ${m[2]}`, body: [] };
      continue;
    }
    if (!current) {
      intro.push(line);
      continue;
    }
    if (line.startsWith('* ')) current.body.push(line.slice(2));
    else current.body.push(line);
  }
  if (current) sections.push(current);
  // If doc jumps straight into numbered sections, mirror the first lead as intro.
  if (!intro.length && sections[0]?.body?.length) {
    intro.push(sections[0].body[0]);
  }
  return { title, lastUpdated, intro: intro.join(' '), sections };
}

function parseHipaa(text) {
  const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  let lastUpdated = 'August 15, 2026';
  let i = 0;
  if (/hipaa/i.test(lines[0])) i = 1;
  if (lines[i] && /^Last updated:/i.test(lines[i])) {
    lastUpdated = lines[i].replace(/^Last updated:\s*/i, '');
    i += 1;
  }
  const intro = [];
  while (i < lines.length && !/^(Uses and Disclosures|Your Rights|Our Responsibilities|Complaints and Contact)$/i.test(lines[i])) {
    intro.push(lines[i]);
    i += 1;
  }
  const sections = [];
  let current = null;
  for (; i < lines.length; i++) {
    const line = lines[i];
    if (/^(Uses and Disclosures|Your Rights|Our Responsibilities|Complaints and Contact)$/i.test(line)) {
      if (current) sections.push(current);
      current = { heading: line, body: [] };
      continue;
    }
    if (/informational purposes/i.test(line)) continue;
    if (!current) intro.push(line);
    else current.body.push(line.startsWith('* ') ? line.slice(2) : line);
  }
  if (current) sections.push(current);
  return {
    title: 'HIPAA Notice',
    lastUpdated,
    intro: intro.join(' '),
    sections,
  };
}

function parseTermsWithStates(text) {
  const parsed = parseNumberedDoc(text, { titleOverride: 'Terms of Use' });
  const statesSection = parsed.sections.find((s) => /states served/i.test(s.heading));
  const US_STATES = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
  ];

  if (statesSection) {
    // Rebuild body: keep prose, then clean state list
    const prose = statesSection.body.filter((p) => !US_STATES.includes(p) && !/^\t+$/.test(p));
    const lead = prose.find((p) => /access to at least some Services/i.test(p))
      || 'Subject to the qualifications and limitations in Section 5, access to at least some Services is offered in each of the following 50 states:';
    const trail = prose.find((p) => /physically located/i.test(p))
      || 'You must be physically located in the applicable state at the time clinical services are provided. The treating provider must be authorized to practice in that state, and the dispensing pharmacy must be authorized to dispense and ship the prescribed medication to that state. Not every treatment, medication, provider, pharmacy, or fulfillment option is available in every listed state.';
    statesSection.body = [lead, US_STATES.join(', ') + '.', trail];
  }
  return parsed;
}

function pageBlock(id, page) {
  const sections = page.sections
    .map((s) => {
      const body = s.body.map((p) => `          '${esc(p)}',`).join('\n');
      return `      {
        heading: '${esc(s.heading)}',
        body: [
${body}
        ],
      },`;
    })
    .join('\n');

  return `  '${id}': {
    id: '${id}',
    title: '${esc(page.title)}',
    eyebrow: 'Legal',
    lastUpdated: '${esc(page.lastUpdated)}',
    intro:
      '${esc(page.intro)}',
    sections: [
${sections}
    ],
  },`;
}

const terms = parseTermsWithStates(readTxt('final.txt'));
const privacy = parseNumberedDoc(readTxt('doc3.txt'), { titleOverride: 'Privacy Policy' });
const telehealth = parseNumberedDoc(readTxt('doc2.txt'), { titleOverride: 'Telehealth Consent' });
const hipaa = parseHipaa(readTxt('doc4.txt'));
const medicalDisclaimer = parseNumberedDoc(readTxt('doc1.txt'), { titleOverride: 'Medical Disclaimer' });

// Source doc heading still said MensRx in one section — correct to Pax.
for (const section of medicalDisclaimer.sections) {
  section.heading = section.heading.replace(/MensRx®?/gi, 'Pax Longevity®');
  section.body = section.body.map((p) => p.replace(/MensRx®?/gi, 'Pax Longevity®'));
}

const statesFromTerms = terms.sections.find((s) => /states served/i.test(s.heading));
const important = terms.sections.find((s) => /important notices/i.test(s.heading));
const compounded = terms.sections.find((s) => /prescription and compounded/i.test(s.heading));

const statesPage = {
  title: 'States We Serve',
  lastUpdated: terms.lastUpdated,
  intro:
    'Access to at least some Pax Longevity® Services is offered in jurisdictions where care is legally available through affiliated or contracted healthcare providers and pharmacy partners, subject to applicable law, provider licensure, pharmacy authorization, patient eligibility, clinical appropriateness, and operational availability.',
  sections: [
    {
      heading: 'Service availability',
      body: [
        'Nationwide availability does not mean that every provider, treatment category, medication, dosage form, laboratory service, pharmacy, shipping method, or subscription option is available in every state. Availability may change without notice.',
        'A provider may require a synchronous video or telephone consultation, laboratory testing, medical records, an in-person examination, or other information before making a treatment decision.',
      ],
    },
    {
      heading: 'Current service area',
      body: statesFromTerms
        ? statesFromTerms.body
        : ['Services are offered in jurisdictions where care is legally available, subject to the limitations described above.'],
    },
    {
      heading: 'Location requirements',
      body: [
        'You must be physically located in the applicable state at the time clinical services are provided. The treating provider must be authorized to practice in that state, and the dispensing pharmacy must be authorized to dispense and ship the prescribed medication to that state.',
        'Questions about state availability: support@paxlongevity.com',
      ],
    },
  ],
};

const patientSafety = {
  title: 'Patient Safety',
  lastUpdated: terms.lastUpdated,
  intro:
    'Your health and safety are our highest priorities. This page summarizes important safety information from our Terms of Use and Medical Disclaimer regarding telehealth, prescriptions, and compounded medications offered through Pax Longevity®.',
  sections: [
    {
      heading: 'Important notices',
      body: important?.body?.length
        ? important.body
        : [
            'The Company is not a pharmacy, drug manufacturer, outsourcing facility, or compounding facility unless expressly identified otherwise.',
            'Prescription treatment is provided only when clinically appropriate after an evaluation by a licensed healthcare provider.',
            'In an emergency, call 911 or seek immediate emergency care.',
          ],
    },
    {
      heading: 'Provider review and prescriptions',
      body: [
        'Completing an assessment, creating an account, submitting payment information, or completing checkout does not create a guarantee of treatment or a prescription.',
        'No prescription or prescription medication will be issued, dispensed, or shipped before the required provider evaluation and issuance of a valid prescription by an authorized prescriber.',
      ],
    },
    {
      heading: 'Telehealth limitations',
      body: [
        'Telehealth and asynchronous care are not appropriate for every patient or condition. A provider may request additional information, require a live consultation or laboratory testing, decline treatment, discontinue treatment, or recommend in-person or emergency care.',
      ],
    },
    {
      heading: 'Compounded medication disclosure',
      body: compounded?.body || [
        'Compounded medications, when prescribed, are not FDA-approved and are not reviewed by the FDA for safety, effectiveness, or quality before marketing.',
      ],
    },
    {
      heading: 'Adverse events',
      body: [
        'Patients should seek immediate medical attention for severe or concerning symptoms, including difficulty breathing, chest pain, severe allergic reactions, severe abdominal pain, or loss of consciousness.',
        'To report medication side effects, patients may also contact the FDA MedWatch program at 1-800-FDA-1088 or www.fda.gov/medwatch.',
      ],
    },
    {
      heading: 'Contact',
      body: [
        'Pax Longevity LLC · 382 NE 191ST ST NUM 931099, MIAMI, FL 33179 · support@paxlongevity.com · (615) 434-2927',
      ],
    },
  ],
};

const out = `/** Legal page content — sourced from Pax Longevity Google Docs (Aug 15, 2026) */

export const LEGAL_LINKS = [
  { id: 'privacy', href: '#/privacy', label: 'Privacy Policy' },
  { id: 'terms', href: '#/terms', label: 'Terms of Use' },
  { id: 'states-we-serve', href: '#/states-we-serve', label: 'States We Serve' },
  { id: 'telehealth-consent', href: '#/telehealth-consent', label: 'Telehealth Consent' },
  { id: 'hipaa', href: '#/hipaa', label: 'HIPAA Notice' },
  { id: 'medical-disclaimer', href: '#/medical-disclaimer', label: 'Medical Disclaimer' },
  { id: 'patient-safety', href: '#/patient-safety', label: 'Patient Safety' },
];

export const LEGAL_PAGE_IDS = LEGAL_LINKS.map((l) => l.id);

export const LEGAL_PAGES = {
${pageBlock('privacy', privacy)}
${pageBlock('terms', { ...terms, title: 'Terms of Use' })}
${pageBlock('states-we-serve', statesPage)}
${pageBlock('telehealth-consent', telehealth)}
${pageBlock('hipaa', hipaa)}
${pageBlock('medical-disclaimer', medicalDisclaimer)}
${pageBlock('patient-safety', patientSafety)}
};
`;

const dest = path.join(root, 'src/marketing/legalContent.js');
fs.writeFileSync(dest, out);
console.log('Wrote', dest);
console.log('Pages:', Object.keys({
  privacy, terms, statesPage, telehealth, hipaa, medicalDisclaimer, patientSafety,
}).join(', '));
console.log('Terms sections:', terms.sections.length);
console.log('Privacy sections:', privacy.sections.length);
