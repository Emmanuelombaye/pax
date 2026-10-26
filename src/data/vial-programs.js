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

/** Only the 3 live VCO Brand Storefront treatments */
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
    summary:
      "Pax’s dual-pathway weight management option. Your physician chooses the dose after labs, and refills follow the plan — never a cart checkout.",
    benefits: ["From $299/mo", "Physician-titrated", "Labs before treatment", "Monthly check-ins"],
    about: [
      {
        title: "What is tirzepatide?",
        body: "A dual-agonist medicine used in Pax’s weight program when a physician includes it. Membership and medication are billed separately.",
      },
      {
        title: "What is it prescribed for?",
        body: "Weight care, when your history, goals, and labs support it.",
      },
      {
        title: "How does the plan work?",
        body: "You start with bloodwork and a licensed visit. If tirzepatide fits, the physician writes the dose and adjusts it as you check in.",
      },
      {
        title: "What to expect",
        body: "Appetite often changes before the scale does. Follow-ups are part of the plan so the dose can move with you.",
      },
    ],
  }),
  vial({
    slug: "nad-1000-mg",
    program: "longevity",
    title: "NAD+",
    price: "From $199 + membership",
    image: "/images/pax-card-nad-v3.webp",
    alt: "Pax NAD+ vials",
    vcoSku: "STORE-NAD",
    summary:
      "NAD+ for cellular energy and healthy aging support. Added only when a physician includes it in your longevity plan.",
    benefits: ["Cellular energy", "Physician review", "Live clinical intake"],
    about: [
      {
        title: "What is NAD+?",
        body: "A cellular coenzyme protocol used when a physician includes it for energy and longevity support.",
      },
      {
        title: "What is it prescribed for?",
        body: "Cellular health and healthy aging goals, after clinical review.",
      },
      {
        title: "How does the plan work?",
        body: "Labs and a visit first. If NAD+ fits, the physician sets the protocol and follow-up.",
      },
      {
        title: "What to expect",
        body: "A monitored course with check-ins — not an open-ended cart refill.",
      },
    ],
  }),
];

export const programs = [
  {
    slug: "weight",
    title: "Weight Loss",
    description: "Physician-titrated Semaglutide & Tirzepatide with monthly refills after labs and a licensed visit.",
  },
  {
    slug: "longevity",
    title: "Longevity & Wellness",
    description: "NAD+ cellular support when a physician includes it in your plan — live clinical intake.",
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
  return vials.filter((other) => other.slug !== item.slug);
}

export function allVials() {
  return vials;
}
