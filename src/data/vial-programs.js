const safety = [
  {
    title: "Contraindications",
    body: "A licensed physician decides whether this belongs in your plan. It is not appropriate for every person, and some histories rule it out.",
  },
  {
    title: "Possible side effects",
    body: "Your physician reviews what to watch for before anything is prescribed, and stays available if the response is not what you expected.",
  },
  {
    title: "Warnings",
    body: "Tell your physician about other medications and conditions. Nothing here is a prescription, and nothing ships until a clinician says it should.",
  },
];

function standardAbout(title, summary) {
  return [
    { title: `What is ${title} prescribed for?`, body: summary },
    {
      title: `How does ${title} work?`,
      body: "A licensed provider reviews your labs and history before this is added to a plan. The dose, the form, and whether it belongs are decided in that visit.",
    },
    {
      title: "What to expect",
      body: "Nothing is ordered from this page. If a provider prescribes it, follow-up is part of the plan so the response can be checked.",
    },
  ];
}

function vial(item) {
  return {
    safety,
    about: item.about || standardAbout(item.title, item.summary),
    ...item,
  };
}

const vials = [
  vial({
    slug: "semaglutide",
    program: "weight",
    title: "Semaglutide",
    price: "From $399/mo + membership",
    image: "/images/pax-card-tirzepatide-v2.webp",
    alt: "Pax semaglutide vial",
    vcoSku: "STORE-SEMA",
    summary:
      "Physician-prescribed once-weekly GLP-1 for weight and metabolic care. Dose and refills follow your labs — never a cart checkout.",
    benefits: ["From $399/mo", "Physician-titrated", "Labs before treatment", "Monthly check-ins"],
    about: [
      {
        title: "What is semaglutide?",
        body: "A once-weekly GLP-1 medicine used in Pax’s weight program when a physician includes it. Membership and medication are billed separately.",
      },
      {
        title: "What is it prescribed for?",
        body: "Weight care and metabolic health, when your history, goals, and labs support it.",
      },
      {
        title: "How does the plan work?",
        body: "You start with bloodwork and a licensed visit. If semaglutide fits, the physician writes the dose and adjusts it as you check in.",
      },
      {
        title: "What to expect",
        body: "Appetite often changes before the scale does. Follow-ups are part of the plan so the dose can move with you.",
      },
    ],
  }),
  vial({
    slug: "tirzepatide",
    program: "weight",
    title: "Tirzepatide",
    price: "From $299/mo + membership",
    image: "/images/pax-card-tirzepatide-v2.webp",
    alt: "Pax tirzepatide vial",
    vcoSku: "STORE-TIRZ",
    summary: "Pax’s weight management option. Your physician chooses the dose after labs, and refills follow the plan — never a cart checkout.",
    benefits: ["From $299/mo", "Physician-titrated", "Labs before treatment", "Monthly check-ins"],
    about: [
      { title: "What is tirzepatide?", body: "A dual-agonist medicine used in Pax’s weight program when a physician includes it. Membership and medication are billed separately." },
      { title: "What is it prescribed for?", body: "Weight care, when your history, goals, and labs support it. It is one option inside the weight program, not a promise of a number on the scale." },
      { title: "How does the plan work?", body: "You start with bloodwork and a licensed visit. If tirzepatide fits, the physician writes the dose and adjusts it as you check in." },
      { title: "What to expect", body: "Appetite often changes before the scale does. Follow-ups are part of the plan so the dose can move with you." },
    ],
  }),
  vial({
    slug: "compounded-testosterone",
    program: "hormones",
    title: "Compounded Testosterone",
    price: "From $28/mo + membership",
    image: "/images/pax-card-testosterone-v4.webp",
    alt: "Pax testosterone cypionate vial",
    summary: "Compounded testosterone for low levels, started only after labs and a physician visit. Cream is a separate option when injections are not the fit.",
    benefits: ["From $28/mo", "After labs, not before", "Physician-set dose", "Follow-up labs"],
    about: [
      { title: "What is compounded testosterone?", body: "A compounded testosterone option when levels are low and a physician agrees treatment fits. Pax starts with a panel, not a vial." },
      { title: "What is it prescribed for?", body: "Low testosterone and related symptoms, when labs and history line up. It is not started from a questionnaire alone." },
      { title: "How does the plan work?", body: "Baseline labs, a visit, then a dose. Follow-up labs decide whether the dose changes." },
      { title: "What to expect", body: "Energy, mood, and drive are what the follow-ups are watching, along with the numbers. The protocol can change." },
    ],
  }),
  vial({
    slug: "pharma-testosterone",
    program: "hormones",
    title: "Pharma Testosterone",
    price: "From $28/mo + membership",
    image: "/images/pax-card-testosterone-v4.webp",
    alt: "Pax testosterone cypionate vial",
    summary: "Pharmaceutical testosterone when a licensed physician chooses a commercial product over a compounded form. Same membership-plus-medication billing.",
    benefits: ["From $28/mo", "Commercial product", "Physician-set dose", "Follow-up labs"],
  }),
  vial({
    slug: "testosterone-cream",
    program: "hormones",
    title: "Testosterone Cream",
    price: "From $60/mo + membership",
    image: "/images/pax-card-t-cream-v6.webp",
    alt: "Pax testosterone cream",
    summary: "Topical testosterone cream when libido, energy, or bone health calls for it — never the first step before labs.",
    benefits: ["From $60/mo", "After labs", "Topical option", "Physician-set"],
    about: [
      { title: "What is testosterone cream?", body: "A topical testosterone option used when a physician includes androgen support in the plan." },
      { title: "What is it prescribed for?", body: "Libido, energy, or bone health, and only after labs show it belongs." },
      { title: "How does the plan work?", body: "The panel comes first. Cream is one possible part of hormone care, reviewed on the same cadence as the rest." },
      { title: "What to expect", body: "A starting dose and a follow-up. It stays only if it is helping and the labs agree." },
    ],
  }),
  vial({
    slug: "estradiol-cream",
    program: "hormones",
    title: "Estradiol Cream",
    price: "From $58/mo + membership",
    image: "/images/pax-card-estrace-v3.webp",
    alt: "Pax estradiol cream",
    summary: "Estradiol cream for menopause symptoms, chosen after labs. Gel is a separate form when your physician prefers it.",
    benefits: ["From $58/mo", "After labs", "Menopause symptoms", "Ongoing review"],
    about: [
      { title: "What is estradiol cream?", body: "Estrogen support for menopause symptoms, prescribed after a hormone panel." },
      { title: "What is it prescribed for?", body: "Hot flashes, sleep, and related menopause symptoms, when a physician finds estrogen care appropriate." },
      { title: "How does the plan work?", body: "Labs, a visit, then a form and a dose. Follow-up labs keep the protocol honest." },
      { title: "What to expect", body: "Symptom change is reviewed with you. The dose and the form can both move." },
    ],
  }),
  vial({
    slug: "estradiol-gel",
    program: "hormones",
    title: "0.1% Estradiol Gel",
    price: "From $58/mo + membership",
    image: "/images/pax-card-gel-v3.webp",
    alt: "Pax estradiol gel",
    summary: "0.1% estradiol gel for menopause symptoms including hot flashes, vaginal dryness, and bone support — form chosen with your physician after labs.",
    benefits: ["From $58/mo", "After labs", "Gel form", "Physician-chosen"],
  }),
  vial({
    slug: "progesterone-capsules",
    program: "hormones",
    title: "Progesterone Capsules",
    price: "From $49/mo + membership",
    image: "/images/pax-card-prog-v3.webp",
    alt: "Pax progesterone capsules",
    summary: "Prescription progesterone capsules help balance and regulate hormone levels for women in menopause or with related menstrual conditions.",
    benefits: ["From $49/mo", "After labs", "Hormone balance", "Physician review"],
  }),
  vial({
    slug: "progesterone-cream",
    program: "hormones",
    title: "Progesterone Cream",
    price: "From $79/mo + membership",
    image: "/images/pax-card-progcream-v3.webp",
    alt: "Pax progesterone cream",
    summary: "Prescription progesterone cream for perimenopause and menopause symptoms such as irregular cycles, irritability, sleep disruption, and mental fog.",
    benefits: ["From $79/mo", "After labs", "Topical option", "Physician review"],
  }),
  vial({
    slug: "nad-1000-mg",
    program: "peptides",
    title: "NAD+ 1000 mg",
    price: "$129/mo + membership",
    image: "/images/pax-card-nad-v3.webp",
    alt: "Pax NAD+ vials",
    vcoSku: "STORE-NAD",
    summary: "NAD+ 1000 mg for cellular energy and healthy aging support. Added only when a physician includes it in your longevity plan.",
    benefits: ["$129/mo", "Cellular energy", "Physician review"],
  }),
  vial({
    slug: "glutathione",
    program: "peptides",
    title: "Glutathione",
    price: "$75/mo + membership",
    image: "/images/pax-card-glutathione-v3.webp",
    alt: "Pax glutathione vials",
    summary: "Glutathione antioxidant support against oxidative stress — prescribed when labs and goals call for cellular defense.",
    benefits: ["$75/mo", "Antioxidant support", "Physician review"],
  }),
  vial({
    slug: "bpc-157",
    program: "peptides",
    title: "BPC-157",
    price: "$149/mo + membership",
    image: "/images/pax-card-bpc-v2.webp",
    alt: "Pax BPC-157 vial",
    summary: "A recovery peptide, prescribed in cycles with safety monitoring. It is part of the peptide program, not a research vial you order yourself.",
    benefits: ["Recovery focus", "$149/mo", "Prescribed in cycles", "Safety monitoring"],
    about: [
      { title: "What is BPC-157?", body: "A peptide used, when a physician includes it, around recovery. Pax treats it as a prescribed protocol with a start, a cycle, and a review." },
      { title: "What is it prescribed for?", body: "Recovery and longevity goals, after labs and a visit. It is not a standalone purchase." },
      { title: "How does the plan work?", body: "The physician sets the cycle length and what to watch. You do not stay on it without a reason to continue." },
      { title: "What to expect", body: "A defined cycle, a check-in, and a decision to continue, pause, or change the protocol." },
    ],
  }),
  vial({
    slug: "tb-500",
    program: "peptides",
    title: "TB-500",
    price: "$105/mo + membership",
    image: "/images/pax-card-tb500-v1.webp",
    alt: "Pax TB-500 vial",
    summary: "TB-500 for recovery support inside a monitored peptide protocol, reviewed with your physician before and during the cycle.",
    benefits: ["$105/mo", "Recovery", "Monitored cycle"],
  }),
  vial({
    slug: "kpv",
    program: "peptides",
    title: "KPV",
    price: "$179/mo + membership",
    image: "/images/pax-card-kpv-v1.webp",
    alt: "Pax KPV vial",
    summary: "KPV for inflammation-focused peptide care when a licensed provider decides it belongs in your plan.",
    benefits: ["$179/mo", "Inflammation", "Physician review"],
  }),
  vial({
    slug: "tesamorelin",
    program: "peptides",
    title: "Tesamorelin",
    price: "$189/mo + membership",
    image: "/images/pax-card-tesamorelin-v1.webp",
    alt: "Pax Tesamorelin vial",
    summary: "Tesamorelin for body-composition goals, prescribed with physician oversight and follow-up — not an open-ended refill.",
    benefits: ["$189/mo", "Body composition", "Follow-up"],
  }),
  vial({
    slug: "ipamorelin",
    program: "peptides",
    title: "Ipamorelin",
    price: "$179/mo + membership",
    image: "/images/pax-card-ipamorelin-v2.webp",
    alt: "Pax ipamorelin vial",
    summary: "A growth-hormone secretagogue used when recovery and body composition are the goal, cycled with physician oversight.",
    benefits: ["Body composition", "$179/mo", "Cycled, not open-ended", "Physician oversight"],
    about: [
      { title: "What is ipamorelin?", body: "A peptide that signals growth-hormone release. At Pax it is prescribed only inside a monitored cycle." },
      { title: "What is it prescribed for?", body: "Recovery and body-composition goals, when labs and history support adding it." },
      { title: "How does the plan work?", body: "A physician sets the cycle, reviews how you respond, and decides whether another cycle belongs in the plan." },
      { title: "What to expect", body: "A clear on-and-off rhythm, not a standing refill with no one looking." },
    ],
  }),
  vial({
    slug: "ghk-cu",
    program: "peptides",
    title: "GHK-Cu",
    price: "$149/mo + membership",
    image: "/images/pax-card-ghk-v2.webp",
    alt: "Pax GHK-Cu vial",
    summary: "A copper peptide protocol aimed at beauty, regeneration, and healthy aging, reviewed with your physician before it is part of the plan.",
    benefits: ["Healthy-aging focus", "$149/mo", "Physician review", "Cycled with monitoring"],
    about: [
      { title: "What is GHK-Cu?", body: "A copper peptide considered for recovery and healthy aging. It enters a Pax plan only after a clinician includes it." },
      { title: "What is it prescribed for?", body: "Beauty, regeneration, and longevity goals, alongside the rest of the peptide program." },
      { title: "How does the plan work?", body: "Labs and a visit first. If it fits, the physician sets the protocol and a date to look again." },
      { title: "What to expect", body: "A monitored course, then a decision based on how you feel and what the follow-up shows." },
    ],
  }),
  vial({
    slug: "pt-141",
    program: "vitality",
    title: "PT-141",
    price: "$75 + membership",
    image: "/images/pax-card-pt141-v3.webp",
    alt: "Pax PT-141 nasal spray",
    summary: "For desire and arousal, for women and men, when the physician includes it. Membership is required; medication is billed on its own line.",
    benefits: ["Desire and arousal", "$75 + membership", "For women and men", "Physician-included"],
    about: [
      { title: "What is PT-141?", body: "A medicine aimed at desire. It is added only when the physician thinks it fits — never as a default add-on." },
      { title: "What is it prescribed for?", body: "Low desire, for women and men, inside a supervised vitality plan." },
      { title: "How does the plan work?", body: "Labs and a visit first. PT-141 is one option the physician can include after clinical review." },
      { title: "What to expect", body: "A discreet fulfillment path if prescribed, with follow-up if the response is not what you expected." },
    ],
  }),
];

export const programs = [
  {
    slug: "weight",
    title: "GLPs / Weight Loss",
    description: "Physician-titrated Semaglutide & Tirzepatide protocols with monthly refills shipped to your door.",
  },
  {
    slug: "hormones",
    title: "Hormone Health & Longevity",
    description: "TRT, HRT, and full metabolic panels with ongoing labs — compounded or commercial pharmacy options.",
  },
  {
    slug: "peptides",
    title: "Peptides & Wellness",
    description: "Custom peptide protocols — BPC-157, Ipamorelin, GHK-Cu and more — designed around recovery and longevity goals.",
  },
  {
    slug: "vitality",
    title: "Vitality & Performance",
    description: "Sildenafil, Tadalafil, PT-141, Tri-Mix. Discreet shipping, physician-supervised, refilled on autopilot.",
  },
];

export function findProgram(slug) {
  return programs.find((program) => program.slug === slug);
}

export function findVial(slug) {
  return vials.find((item) => item.slug === slug);
}

export function vialsForProgram(slug) {
  return vials.filter((item) => item.program === slug);
}

export function relatedVials(item) {
  return vials.filter((other) => other.program === item.program && other.slug !== item.slug);
}
