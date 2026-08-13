import { useEffect, useMemo, useState } from 'react';
import {
  TREATMENT_GOALS,
  getGoalForTreatment,
} from '../start/startFlowData.js';

const IMG = '/images/yucca-clone';

const INCLUDES = [
  'Free Medical Consultation',
  'Free Expedited Shipping',
  '24/7 Dedicated Support',
  'Access to Patient Portal',
];

const PROTOCOL_ICON_WAVE = (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M13 34c3.2-7 6.4-7 9.6 0s6.4 7 9.6 0 6.4-7 9.6 0 6.4 7 9.6 0"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const PROTOCOL_ICON_PATH = (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M16 22C30 22 30 44 48 44"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeDasharray="2 3.5"
    />
    <circle cx="30" cy="29" r="2.4" fill="currentColor" />
  </svg>
);

const PROTOCOL_ICON_LINES = (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.4" />
    <line x1="19" y1="26" x2="41" y2="26" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="19" y1="32" x2="46" y2="32" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <line
      x1="19"
      y1="38"
      x2="35"
      y2="38"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeDasharray="2 3.5"
    />
  </svg>
);

const TABS = [
  {
    id: 'weight-loss',
    tab: 'Weight Loss',
    tone: 'wl',
    card: 'wl',
    tabImg: `${IMG}/Weight-Loss-Image-from-TinyPNG.avif`,
    cardTitle: 'Personalized GLP‑1 Injections',
    priceFrom: '$125',
    priceAlt: 'From $125 per month on a 6-month plan — charged only if prescribed',
    chip: 'Provider-guided',
    chipClass: 'bg-pax-chip text-white',
    blurb:
      'A weekly treatment that may support appetite regulation and weight management through GLP-1 pathway activation — prescribed only when a licensed provider determines it is appropriate.',
    products: [
      {
        id: 'semaglutide',
        name: 'GLP-1 (Semaglutide)',
        desc: 'Weekly GLP-1 pathway support.',
        thumb: `${IMG}/expt-wl-sema.jpg`,
      },
      {
        id: 'tirzepatide',
        name: 'GLP-1 + GIP (Tirzepatide)',
        desc: 'Dual-pathway weekly support.',
        thumb: `${IMG}/expt-wl-tirz.jpg`,
      },
    ],
  },
];

const WL_PROTOCOL = {
  heading: "Your body isn't working against you. It just needs the right signal.",
  sub: "GLP-1 medications don't fight your hunger — they work through the same hormonal system your body already uses to regulate it.",
  vials: `${IMG}/expt-tirz-sema-vials-together.png?v=paxbrand`,
  cards: [
    {
      icon: PROTOCOL_ICON_WAVE,
      title: "Targets the hormone that tells your brain you're full.",
      body: 'After you eat, your body releases a hormone called GLP-1 — a signal that travels to your brain and says: enough. GLP-1 medications mimic that signal. The result is a clearer, more consistent message to stop eating.',
    },
    {
      icon: PROTOCOL_ICON_PATH,
      title: 'Slows down how fast food leaves your stomach.',
      body: 'These treatments reduce the rate at which your stomach empties after a meal. The physical sensation of fullness lasts longer — and hunger returns more slowly.',
    },
    {
      icon: PROTOCOL_ICON_LINES,
      title: 'Recalibrates your hunger system — not shuts it down.',
      body: "Over time, with structured dosing reviewed by your provider, GLP-1 therapy helps restore a more balanced hormonal response to food — so the process feels steadier, not like a fight you're constantly losing.",
    },
  ],
};

const NAD_PROTOCOL = {
  heading: 'NAD+ restores cellular energy as you age.',
  sub: 'NAD+ works with the cellular systems your body already relies on for energy production, DNA repair, and mitochondrial function.',
  vials: `${IMG}/explore-nad-protocol-vials-figma.png`,
  cards: [
    {
      icon: PROTOCOL_ICON_WAVE,
      title: 'Fuels mitochondrial energy production.',
      body: 'NAD+ is the coenzyme your cells use in the energy-producing structures inside your cells. By restoring healthy NAD+ levels, treatment is intended to support the cellular energy production that declines with age.',
    },
    {
      icon: PROTOCOL_ICON_PATH,
      title: 'Activates sirtuins for longevity and repair.',
      body: 'NAD+ is required for sirtuin activity — a family of proteins involved in DNA repair, stress resistance, and longevity. By supporting NAD+ levels, you help activate these pathways that decline with age.',
    },
    {
      icon: PROTOCOL_ICON_LINES,
      title: 'Supports metabolic health and insulin sensitivity.',
      body: 'NAD+ is essential for cellular metabolism, including how your body converts food into energy. By maintaining healthy NAD+ levels, you support the cellular pathways that influence glucose handling and metabolic function.',
    },
  ],
};

const SER_PROTOCOL = {
  headingLines: ['Sermorelin stimulates', 'growth hormone', 'production as you age.'],
  sub: "Sermorelin is a peptide that supports your body's natural growth hormone signals. Treatment is designed to support recovery, sleep quality, energy, and healthy body composition over time.",
  vials: `${IMG}/expt-personalized-sermorelin-vial.png`,
  cards: [
    {
      icon: PROTOCOL_ICON_WAVE,
      title: 'Stimulates growth hormone production.',
      body: 'Sermorelin signals the pituitary gland to release natural growth hormone — the same process your body uses during deep sleep. By supporting healthy GH levels, you restore the cellular repair and energy production that declines with age.',
    },
    {
      icon: PROTOCOL_ICON_PATH,
      title: 'Supports fat loss and body composition.',
      body: 'Sermorelin helps preserve lean muscle mass and reduce body fat by restoring youthful growth hormone rhythms. Supporting these levels helps activate the metabolic pathways that govern body composition and physical performance.',
    },
    {
      icon: PROTOCOL_ICON_LINES,
      title: 'Improves sleep quality and recovery.',
      body: 'Sermorelin can improve sleep quality and recovery by stimulating natural growth hormone release — helping your body repair tissues, rebuild muscle, and wake up feeling more rested.',
    },
  ],
};

const WL_EXPECT = {
  title: 'What to expect, week by week with your GLP-1 Treatment',
  sub: "No guesswork. Here's how the first months typically look for patients in the program. Individual experiences vary.",
  weeks: [
    {
      tag: 'Week 1 → 4 · Your body is adjusting',
      text: 'You start on a low dose — intentionally. Your GLP-1 treatment is introduced gradually to give your body time to adapt. Some patients notice appetite changes early. Others take a few more weeks. Both are normal. Your provider is available throughout.',
      img: `${IMG}/GLP1-Retro/expect-week-1-4.avif`,
    },
    {
      tag: 'Week 4 → 12 · The protocol starts to settle',
      text: 'As titration continues, your provider monitors how you respond. Appetite signals and dosing may be adjusted based on your individual course — experiences vary, and treatment is not guaranteed to produce a specific outcome.',
      img: `${IMG}/GLP1-Retro/expect-week-4-12.avif`,
    },
    {
      tag: 'Month 3+ · Calibrated to you',
      text: 'This is where the protocol becomes truly personal. With how your body has responded — to the dose, to the titration, to the treatment itself — your provider can now fine-tune your plan with real precision. The focus shifts from adjustment to consistency, and maintainable progress becomes the rhythm.',
      img: `${IMG}/GLP1-Retro/expect-month-3.avif`,
    },
  ],
};

const NAD_EXPECT = {
  title: ['What to expect,', 'week by week'],
  sub: "NAD (Nicotinamide Adenine Dinucleotide) is a coenzyme that helps cells generate energy and repair themselves. In this program, NAD support is used to help improve cellular function and metabolism. Here's how it typically unfolds.",
  weeks: [
    {
      tag: 'Week 1 → 4 · NAD+ begins working',
      text: 'You start on a measured dose — intentionally. NAD+ is introduced gradually so your body can begin to respond at the cellular level. Some patients notice early shifts in energy or recovery. Others take a few more weeks. Both are normal. Your provider is available throughout.',
      img: `${IMG}/exp-hiw-lon-week-1.avif`,
    },
    {
      tag: 'Week 4 → 12 · Cellular energy builds',
      text: 'As titration continues, your provider monitors how you respond. Energy, recovery, and dosing may be adjusted based on your individual course — experiences vary, and treatment is not guaranteed to produce a specific outcome.',
      img: `${IMG}/exp-hiw-lon-week-2.avif`,
    },
    {
      tag: 'Month 3+ · Long-term cellular support',
      text: 'This is where the protocol becomes truly personal. With how your body has responded — to the dose, to the cadence, to the protocol itself — your provider can fine-tune your plan with real precision. The focus shifts from adjustment to consistency, and long-term support becomes the rhythm.',
      img: `${IMG}/exp-hiw-lon-week-3.avif`,
    },
  ],
};

const SER_EXPECT = {
  title: ['What to expect,', 'week by week'],
  sub: "Sermorelin is a growth hormone releasing peptide that signals the pituitary gland to naturally increase growth hormone production. In this program, sermorelin is used to support body composition, energy, and recovery. Here's how it typically unfolds.",
  weeks: [
    {
      tag: 'Week 1 → 4 · Sermorelin begins working',
      text: 'Your body begins responding to sermorelin as the pituitary gland starts increasing growth hormone production. You may notice early improvements in sleep quality and energy levels. This initial phase lays the groundwork for deeper results in the weeks ahead.',
      img: `${IMG}/exp-hiw-mr-week-1.avif`,
    },
    {
      tag: 'Week 4 → 12 · Growth hormone increases',
      text: 'Growth hormone levels continue to rise as your body responds to sermorelin. Many patients notice improvements in body composition, reduced fat, and increased muscle tone. Recovery improves and sleep often deepens during this phase.',
      img: `${IMG}/exp-hiw-mr-week-2.avif`,
    },
    {
      tag: 'Month 3+ · Long-term optimization',
      text: 'Sustained sermorelin use supports long-term improvements in body composition, energy, and overall vitality. Your provider can fine-tune your protocol based on your progress, helping you maintain results and continue optimizing over time.',
      img: `${IMG}/exp-hiw-mr-week-3.avif`,
    },
  ],
};

const WL_FAQS = [
  {
    q: 'What is GLP-1 weight loss treatment?',
    a: "GLP-1 treatment is a class of prescription medication — including GLP-1 (Semaglutide) and GLP-1 + GIP (Tirzepatide) — that works with your body's natural appetite signals, helping you feel full sooner, stay satisfied longer, and reduce the constant food noise. At Pax Longevity, every protocol is reviewed by a licensed provider and built around you.",
  },
  {
    q: "What's the difference between GLP-1 (Semaglutide) and GLP-1 + GIP (Tirzepatide)?",
    a: 'Semaglutide is a GLP-1 receptor agonist. Tirzepatide is a dual GIP and GLP-1 receptor agonist. Both are designed to support appetite regulation and long-term weight management, but they work through different receptor pathways. Your provider reviews your health history and goals to determine what may be appropriate for you.',
  },
  {
    q: 'Who is GLP-1 treatment for?',
    a: "GLP-1 treatment may be considered for adults working toward provider-guided weight management who meet clinical criteria. Eligibility is determined by a licensed provider based on your medical history, current health, and goals. Treatment isn't right for everyone — that's why every plan begins with a provider review, not a checkout.",
  },
  {
    q: 'How does the prescription process work?',
    a: 'You complete a quick clinical intake, share your medical history, and connect with a licensed provider. If approved, your medication is prepared by a partner pharmacy and shipped directly. Your provider stays involved as your dosing is titrated and adjusted over time.',
  },
  {
    q: 'What should I know about side effects?',
    a: 'Side effects vary by person. Common effects may include nausea, constipation, diarrhea, appetite changes, or digestive discomfort, especially while your body adjusts. Your provider reviews your medical history, explains what to watch for, and can adjust your protocol if needed.',
  },
  {
    q: 'Are compounded medications FDA-approved?',
    a: 'No. Pax Longevity provides compounded medications containing the same active pharmaceutical ingredients (APIs) as brand-name drugs. Compounded medications are prepared by licensed U.S. pharmacies, are not FDA-approved, and do not undergo FDA review for safety, effectiveness, or manufacturing quality.',
  },
];

const NAD_FAQS = [
  {
    q: 'What is NAD+ treatment?',
    a: 'NAD+ (Nicotinamide Adenine Dinucleotide) is a coenzyme your body produces naturally — and uses to generate cellular energy, support DNA repair, and maintain metabolic function. Levels decline with age. NAD+ therapy is a provider-guided protocol designed to replenish those levels through structured dosing. At Pax Longevity, every protocol is reviewed by a licensed provider and built around your medical history, your goals, and how your body responds over time.',
  },
  {
    q: 'How does NAD+ support cellular health?',
    a: "NAD+ plays a role in how your cells produce energy, repair damage, and regulate metabolism. By supporting these underlying processes, NAD+ therapy is intended to support steadier energy, recovery, and long-term cellular function. The goal isn't a quick lift — it's restoring a baseline your body relies on.",
  },
  {
    q: 'Who is NAD+ treatment for?',
    a: "NAD+ therapy is generally considered by adults focused on long-term wellness, energy, recovery, and metabolic support. Eligibility is determined by a licensed provider based on your medical history, current health, and goals. Treatment isn't right for everyone — that's why every plan begins with a provider review, not a checkout.",
  },
  {
    q: 'How does the prescription process work?',
    a: 'You complete a quick clinical intake, share your medical history, and connect with a licensed provider. If approved, your medication is prepared by a partner pharmacy and shipped directly. Your provider stays involved as your dosing is titrated and adjusted over time.',
  },
  {
    q: 'Are compounded medications FDA-approved?',
    a: 'No. Pax Longevity provides compounded medications containing the same active pharmaceutical ingredients (APIs) as brand-name drugs. Compounded medications are prepared by licensed U.S. pharmacies, are not FDA-approved, and do not undergo FDA review for safety, effectiveness, or manufacturing quality.',
  },
];

const SER_FAQS = [
  {
    q: 'What is Sermorelin?',
    a: "Sermorelin is a peptide therapy that supports your body's natural production of growth hormone. Rather than introducing growth hormone directly, Sermorelin signals the pituitary gland to release it on your body's own schedule — preserving the natural rhythm of how the hormone moves through your system. At Pax Longevity, every protocol is reviewed by a licensed provider and built around your medical history, your goals, and how your body responds over time.",
  },
  {
    q: 'How does Sermorelin work?',
    a: "Sermorelin is a growth hormone-releasing hormone (GHRH) analog. It prompts the pituitary gland to produce and release growth hormone in a way that mirrors your body's natural pulse. Over time, this is intended to support recovery, sleep quality, body composition, and overall metabolic function. The goal isn't to override your system — it's to support it.",
  },
  {
    q: 'Who is Sermorelin treatment for?',
    a: "Sermorelin is generally considered by adults focused on recovery, sleep, energy, and long-term wellness. Eligibility is determined by a licensed provider based on your medical history, current health, lab work where appropriate, and goals. Treatment isn't right for everyone — that's why every plan begins with a provider review, not a checkout.",
  },
  {
    q: 'How does the prescription process work?',
    a: 'You complete a quick clinical intake, share your medical history, and connect with a licensed provider. If approved, your medication is prepared by a partner pharmacy and shipped directly. Your provider stays involved as your dosing is titrated and adjusted over time.',
  },
  {
    q: 'Are compounded medications FDA-approved?',
    a: 'No. Pax Longevity provides compounded medications containing the same active pharmaceutical ingredients (APIs) as brand-name drugs. Compounded medications are prepared by licensed U.S. pharmacies, are not FDA-approved, and do not undergo FDA review for safety, effectiveness, or manufacturing quality.',
  },
];

function ExploreHero({ pane, selectedTx, setSelectedTx, onCta }) {
  return (
    <section className="explore-hero-section bg-white pb-10">
      <div className="explore-hero-container u-container">
        <div className="explore-hero-grid flex flex-col gap-6 tablet:flex-row tablet:items-start tablet:gap-9 desktop:gap-8">
          <div
            data-card={pane.card}
            className="explore-card explore-hero-card relative flex flex-col justify-between overflow-visible rounded-3xl text-white text-xs font-medium tracking-[-0.01em] w-full h-[27.5rem] tablet:h-auto tablet:min-h-0 tablet:flex-1 tablet:max-w-[31.5131rem] desktop:flex-none desktop:w-[31.5131rem] desktop:aspect-[480/549] px-6 pt-6 pb-5 tablet:px-7 tablet:pt-8 tablet:pb-7"
          >
            <h2 className="explore-hero-card-title mx-auto m-0 text-center text-[1.75rem] tablet:text-[2.5rem] desktop:text-[2.625rem] leading-[1] tracking-[-0.04em] font-medium max-w-[15ch]">
              {pane.cardTitle}
            </h2>
            <div className="explore-hero-card-price explore-hero-card-price--text" aria-label={pane.priceAlt}>
              <span className="explore-hero-card-price-main">FROM {pane.priceFrom}</span>
              <span className="explore-hero-card-price-sub">/mo · 6-month plan</span>
            </div>
            <div className="explore-hero-card-footer flex items-center justify-between gap-3">
              <div>Licensed U.S. provider review required</div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`explore-hero-chip inline-flex items-center justify-center rounded-full text-xs font-medium leading-none tracking-tight px-1.5 py-1 whitespace-nowrap ${pane.chipClass}`}
                >
                  {pane.chip}
                </span>
                <span className="explore-hero-stock inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium leading-none tracking-tight whitespace-nowrap">
                  <span className="explore-stock-dot block w-1.5 h-1.5 rounded-full" />
                  Available
                </span>
              </div>
            </div>
          </div>

          <div className="explore-hero-content flex flex-col w-full tablet:flex-1 desktop:max-w-[47%]">
            <p className="explore-hero-copy text-base leading-[1.5] tracking-[-0.01em] text-neutral-900 mb-4 tablet:mb-6 desktop:mb-8">
              {pane.blurb}
            </p>

            {pane.products.length > 0 && (
              <div className="explore-hero-products my-[18px] flex flex-row flex-wrap items-center gap-x-6 gap-y-3 mb-6">
                {pane.products.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`explore-hero-product flex items-center gap-2 ${selectedTx === p.id ? 'is-active' : ''}`}
                    onClick={() => setSelectedTx(p.id)}
                  >
                    <div className="explore-hero-product-thumb aspect-square w-[34px] max-w-[34px] overflow-clip rounded-full">
                      <img src={p.thumb} alt="" loading="lazy" className="block w-full h-full object-cover" />
                    </div>
                    <div className="explore-hero-product-copy">
                      <div className="explore-hero-product-name text-sm font-medium text-neutral-900">{p.name}</div>
                      <div className="explore-hero-product-desc">{p.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div className="explore-hero-includes mb-5 grid gap-4 grid-cols-1 gap-y-[18px] desktop:grid-cols-[0.75fr_1fr] desktop:items-center">
              <div className="explore-hero-plans">
                <div className="explore-hero-plans-label text-sm tracking-[-0.01em] text-neutral-900/40">
                  All Plans Include:
                </div>
                <div className="explore-hero-plan-list mt-2.5 flex flex-col gap-3">
                  {INCLUDES.map((item) => (
                    <div key={item} className="explore-hero-plan-item flex items-center gap-3 text-sm tracking-[-0.01em] text-neutral-900">
                      <div className="explore-hero-plan-icon flex aspect-square w-6 min-w-6 items-center justify-center overflow-clip rounded-full bg-neutral-200 text-neutral-900">
                        ✓
                      </div>
                      <div>{item}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="explore-hero-guarantee relative pt-5"
                aria-label="Care commitment — provider-guided care from U.S. licensed pharmacies."
              >
                <div className="explore-hero-guarantee-card rounded-2xl bg-neutral-200 px-3 pt-8 pb-4 text-center text-xs leading-[1.5] tracking-[-0.01em] text-neutral-900">
                  <div className="explore-hero-guarantee-heading" aria-hidden="true">
                    <img src="/brand/pax-horizontal.svg?v=2" alt="Pax Longevity" loading="lazy" className="explore-hero-guarantee-logo" />
                    <span className="explore-hero-guarantee-rule" />
                    <span className="explore-hero-guarantee-word">Commitment</span>
                  </div>
                  <p>
                    Provider-guided care, medications from U.S. licensed pharmacies, and only charged if treatment is
                    prescribed - with flexibility to change or cancel anytime.
                  </p>
                </div>
              </div>
            </div>

            <div className="explore-hero-divider mb-9 hidden h-px w-full bg-[#eee] tablet:block" />

            <div className="explore-hero-pricing mb-6 grid grid-cols-1 gap-3 text-center tablet:mb-0">
              <div className="explore-hero-price-row flex items-center justify-between">
                <div className="explore-hero-price-label text-sm tracking-[-0.01em] text-neutral-900/40">
                  Starting as low as:
                </div>
                <div className="explore-hero-price flex items-baseline gap-2 text-neutral-900">
                  <span className="text-2xl font-medium tracking-tight">{pane.priceFrom}</span>
                  <span className="text-sm text-neutral-900/50">/mo on 6-month plan</span>
                </div>
              </div>
              <button
                type="button"
                className="explore-hero-cta block w-full rounded-full px-6 py-4 text-base font-medium leading-none tracking-[-0.01em]"
                onClick={onCta}
              >
                See if I qualify
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProtocolSection({ variant = 'wl', data, onCta }) {
  const className =
    variant === 'nad'
      ? 'retro-protocol retro-protocol--nad'
      : variant === 'sermorelin'
        ? 'retro-protocol retro-protocol--sermorelin'
        : 'retro-protocol pax-protocol';
  const vialsClass =
    variant === 'nad'
      ? 'retro-protocol__nad-vials'
      : variant === 'sermorelin'
        ? 'retro-protocol__sermorelin-vials'
        : 'retro-protocol__vials';
  const vialImgClass =
    variant === 'nad'
      ? 'retro-protocol__nad-vial'
      : variant === 'sermorelin'
        ? 'retro-protocol__sermorelin-vial'
        : 'retro-protocol__vials-img';

  return (
    <section className={className} aria-labelledby={`retro-protocol-heading-${variant}`}>
      <div className="retro-protocol__inner">
        <div className="retro-protocol__left">
          <h2 id={`retro-protocol-heading-${variant}`} className="retro-protocol__heading">
            {data.headingLines ? (
              <>
                {data.headingLines[0]}
                <br />
                {data.headingLines[1]}
                <br />
                <span className="retro-protocol__nowrap">{data.headingLines[2]}</span>
              </>
            ) : (
              data.heading
            )}
          </h2>
          <p className="retro-protocol__sub">{data.sub}</p>
          <div className={vialsClass} aria-hidden="true">
            <img className={vialImgClass} src={data.vials} alt="" loading="lazy" />
          </div>
        </div>
        <div className="retro-protocol__right">
          {data.cards.map((c, i) => (
            <article
              key={c.title}
              className="retro-protocol-card pax-protocol-card"
              data-step={String(i + 1).padStart(2, '0')}
              style={{ '--i': i }}
            >
              <div className="pax-protocol-card__top">
                <span className="retro-protocol-card__icon pax-protocol-card__icon" aria-hidden="true">
                  {c.icon}
                </span>
                <span className="pax-protocol-card__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="retro-protocol-card__title">{c.title}</h3>
              <p className="retro-protocol-card__body">{c.body}</p>
            </article>
          ))}
          <button type="button" className="retro-protocol__cta pax-protocol__cta" onClick={onCta}>
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}

function ClinicalSection({ variant }) {
  if (variant === 'wl') {
    return (
      <section className="retro-clinical retro-clinical--weight-loss" aria-labelledby="retro-clinical-heading">
        <div className="retro-clinical__inner">
          <div className="retro-clinical__text">
            <p className="retro-clinical__eyebrow">Personalized GLP-1, GLP-1 + GIP Treatments</p>
            <h2 id="retro-clinical-heading" className="retro-clinical__heading">
              A clinically studied
              <br />
              approach to weight
              <br />
              management.
            </h2>
            <div className="retro-clinical__body">
              <p>
                GLP-1 medications work with your body&rsquo;s natural hunger signals to regulate appetite and support
                steady weight loss over time.
              </p>
              <ul>
                <li>
                  <strong>Semaglutide acts on a single GLP-1 pathway</strong> — a clinically studied foundation for
                  gradual, sustainable progress.
                </li>
                <li>
                  <strong>Tirzepatide acts on two pathways — GLP-1 and GIP</strong> — for stronger appetite regulation
                  and a broader metabolic response.
                </li>
              </ul>
              <p>Your dosing protocol is reviewed and prescribed by a licensed provider, adjusted as you progress.</p>
            </div>
          </div>
          <div className="retro-clinical__visual" aria-hidden="true">
            <img
              className="retro-clinical__vial retro-clinical__vial--tirz"
              src={`${IMG}/personalized-tirzepatide-glp-1-injection-vial-yucca-health.avif?v=paxbrand`}
              alt=""
              loading="lazy"
            />
            <img
              className="retro-clinical__vial retro-clinical__vial--sema"
              src={`${IMG}/personalized-semaglutide-glp-1-injection-vial-yucca-health.avif?v=paxbrand`}
              alt=""
              loading="lazy"
            />
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'nad') {
    return (
      <section className="retro-clinical retro-clinical--nad" aria-labelledby="retro-clinical-heading-nad">
        <div className="retro-clinical__inner">
          <div className="retro-clinical__text">
            <p className="retro-clinical__eyebrow">Personalized NAD+</p>
            <h2 id="retro-clinical-heading-nad" className="retro-clinical__heading">
              A clinically studied
              <br />
              approach to cellular
              <br />
              longevity.
            </h2>
            <div className="retro-clinical__body">
              <p>
                NAD+ is a vital coenzyme your cells use for energy production, DNA repair, and mitochondrial function.
                Your care is reviewed by a licensed provider and adjusted as you progress.
              </p>
              <p>
                NAD+ levels naturally decline with age. Treatment is designed to support cellular energy, focus,
                metabolism, and healthy aging. Individual results vary.
              </p>
            </div>
          </div>
          <div className="retro-clinical__visual" aria-hidden="true">
            <img
              className="retro-clinical__vial"
              src={`${IMG}/nad-plus-longevity-injection-vial-yucca-health.avif`}
              alt=""
              loading="lazy"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="retro-clinical retro-clinical--sermorelin" aria-labelledby="retro-clinical-heading-sermorelin">
      <div className="retro-clinical__inner">
        <div className="retro-clinical__text">
          <p className="retro-clinical__eyebrow">Personalized Sermorelin</p>
          <h2 id="retro-clinical-heading-sermorelin" className="retro-clinical__heading">
            A clinically studied
            <br />
            approach to growth
            <br />
            hormone optimization.
          </h2>
          <div className="retro-clinical__body">
            <p>
              Sermorelin is a growth hormone-releasing peptide that stimulates your pituitary gland to naturally produce
              more HGH — levels that decline with age. Your dosing protocol is reviewed and prescribed by a licensed
              provider, adjusted as you progress.
            </p>
          </div>
        </div>
        <div className="retro-clinical__visual" aria-hidden="true">
          <img
            className="retro-clinical__vial"
            src={`${IMG}/sermorelin-peptide-injection-vial-muscle-recovery-yucca-health.avif`}
            alt=""
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function ExpectSection({ variant, data }) {
  const className =
    variant === 'nad'
      ? 'retro-expect retro-expect--nad'
      : variant === 'sermorelin'
        ? 'retro-expect retro-expect--sermorelin'
        : 'retro-expect';
  const title = Array.isArray(data.title) ? (
    <>
      {data.title[0]}
      <br />
      {data.title[1]}
    </>
  ) : (
    data.title
  );

  const cards = data.weeks.map((w) => (
    <article key={w.tag} className="retro-expect-card">
      <div className="retro-expect-card__media">
        <img className="retro-expect-card__img" src={w.img} alt="" loading="lazy" />
      </div>
      <h3 className="retro-expect-card__label">{w.tag}</h3>
      <p className="retro-expect-card__desc">{w.text}</p>
    </article>
  ));

  return (
    <section className={className} aria-labelledby={`retro-expect-heading-${variant}`}>
      <div className="retro-expect__inner">
        <h2 id={`retro-expect-heading-${variant}`} className="retro-expect__heading">
          {title}
        </h2>
        <p className="retro-expect__sub">{data.sub}</p>
        <div className="retro-expect__grid">{cards}</div>
        <div className="retro-expect__carousel">
          <div className="retro-expect__track">
            {data.weeks.map((w) => (
              <article key={`c-${w.tag}`} className="retro-expect-card retro-expect-card--carousel">
                <div className="retro-expect-card__media">
                  <img className="retro-expect-card__img" src={w.img} alt="" loading="lazy" />
                </div>
                <h3 className="retro-expect-card__label">{w.tag}</h3>
                <p className="retro-expect-card__desc">{w.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function KnowallSection({ variant, faqs, vialSrc, onCta }) {
  const [openFaq, setOpenFaq] = useState(0);
  const isWl = variant === 'wl';
  const className =
    variant === 'nad'
      ? 'retro-knowall retro-knowall--nad'
      : variant === 'sermorelin'
        ? 'retro-knowall retro-knowall--sermorelin'
        : 'retro-knowall pax-knowall';
  const vialClass = isWl ? 'retro-knowall__vial retro-knowall__vial--wl' : 'retro-knowall__vial';

  return (
    <section className={className} aria-labelledby={`retro-knowall-heading-${variant}`} data-knowall="">
      <div className="retro-knowall__inner">
        <div className="retro-knowall__left">
          {isWl ? <p className="pax-knowall__eyebrow">Before you begin</p> : null}
          <h2 id={`retro-knowall-heading-${variant}`} className="retro-knowall__heading">
            Common questions before you begin.
          </h2>
          <img className={vialClass} src={vialSrc} alt="" loading="lazy" />
        </div>
        <div className="retro-knowall__right">
          <ul className={`retro-knowall__list${isWl ? ' pax-knowall__list' : ''}`} role="list">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <li
                  key={f.q}
                  className={`retro-knowall__item${isWl ? ' pax-knowall__item' : ''}`}
                  data-knowall-item=""
                  data-open={open ? 'true' : 'false'}
                  data-step={String(i + 1).padStart(2, '0')}
                  style={isWl ? { '--i': i } : undefined}
                >
                  <button
                    type="button"
                    className={`retro-knowall__toggle${isWl ? ' pax-knowall__toggle' : ''}`}
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? -1 : i)}
                  >
                    {isWl ? (
                      <span className="pax-knowall__n" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    ) : null}
                    <span className="retro-knowall__question">{f.q}</span>
                    <span className={`retro-knowall__icon${isWl ? ' pax-knowall__icon' : ''}`} aria-hidden="true">
                      {isWl ? (open ? '−' : '+') : '+'}
                    </span>
                  </button>
                  <div className="retro-knowall__panel" role="region" hidden={!open}>
                    <div className="retro-knowall__panel-inner">
                      <div className="retro-knowall__answer">
                        <p>{f.a}</p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            className={`retro-knowall__cta${isWl ? ' pax-knowall__cta' : ''}`}
            onClick={onCta}
          >
            See if I qualify
          </button>
        </div>
      </div>
    </section>
  );
}

export function WhySection() {
  const pillars = [
    {
      id: 'trusted',
      n: '01',
      title: (
        <>
          Transparent &amp; <em>trusted</em>
        </>
      ),
      body: 'From compounding partners to doorstep delivery — pharmaceutical-grade quality with clear, clinical oversight.',
      tone: 'sand',
      media: (
        <ul className="pax-why__checks">
          {[
            ['Quality sourcing', '503A pharmacies'],
            ['Medical review', 'Licensed U.S. providers'],
            ['Home delivery', 'Discreet & expedited'],
          ].map(([label, hint]) => (
            <li key={label}>
              <span className="pax-why__check-mark" aria-hidden="true">
                ✓
              </span>
              <span>
                <strong>{label}</strong>
                <small>{hint}</small>
              </span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'tailored',
      n: '02',
      title: (
        <>
          Care <em>built around you</em>
        </>
      ),
      body: 'Semaglutide or Tirzepatide — protocols tailored to your goals, history, and how your body responds.',
      tone: 'dune',
      media: (
        <ul className="pax-why__checks">
          {[
            ['Medical intake', 'Clinical questionnaire first'],
            ['Provider decision', 'Prescribe only if appropriate'],
            ['Ongoing titration', 'Dose adjusted as needed'],
          ].map(([label, hint]) => (
            <li key={label}>
              <span className="pax-why__check-mark" aria-hidden="true">
                ✓
              </span>
              <span>
                <strong>{label}</strong>
                <small>{hint}</small>
              </span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'science',
      n: '03',
      title: (
        <>
          Clinically guided <em>GLP-1</em>
        </>
      ),
      body: 'Weekly protocols guided by licensed clinicians for appetite regulation support — not guaranteed outcomes.',
      tone: 'light',
      media: (
        <div className="pax-why__media-frame">
          <img src={`${IMG}/expt-tirz-sema-vials-together.png?v=paxbrand`} alt="" loading="lazy" />
        </div>
      ),
    },
    {
      id: 'support',
      n: '04',
      title: (
        <>
          Support <em>within reach</em>
        </>
      ),
      body: 'Your portal, care team, and treatment plan — organized in one place whenever you need them.',
      tone: 'forest',
      media: (
        <div className="pax-why__media-frame pax-why__media-frame--portal">
          <img
            src={`${IMG}/hiw/yucca-health-patient-portal-dashboard-semaglutide-mobile.avif`}
            alt=""
            loading="lazy"
          />
        </div>
      ),
    },
  ];

  return (
    <section className="retro-home-why pax-why" aria-labelledby="retro-home-why-title">
      <div className="retro-home-why-inner pax-why__inner">
        <header className="pax-why__head">
          <p className="pax-why__eyebrow">The Pax difference</p>
          <h2 className="retro-home-why-title" id="retro-home-why-title">
            Why <em>Pax Longevity</em>?
          </h2>
          <p className="pax-why__sub">
            Provider-guided Semaglutide &amp; Tirzepatide — designed with clinical clarity, not checkout chaos.
          </p>
        </header>

        <div className="retro-home-why-grid pax-why__grid">
          {pillars.map((p) => (
            <article key={p.id} className={`retro-home-why-card pax-why__card pax-why__card--${p.tone}`}>
              <div className="pax-why__card-copy">
                <span className="pax-why__n">{p.n}</span>
                <h3 className="retro-home-why-card-title pax-why__card-title">{p.title}</h3>
                <p className="retro-home-why-card-body pax-why__card-body">{p.body}</p>
              </div>
              <div className="pax-why__card-media">{p.media}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClosingSection({ onCta }) {
  return (
    <section className="retro-home-closing" aria-labelledby="retro-home-closing-title">
      <img
        className="retro-home-closing-bg retro-home-closing-bg--weight-loss"
        src={`${IMG}/cta-personalized-treatments-wellness-portrait-yucca-health.avif`}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      <div className="retro-home-closing-inner">
        <h2 className="retro-home-closing-title" id="retro-home-closing-title">
          Semaglutide &amp; Tirzepatide, <em>guided by your goals</em>
        </h2>
        <p className="retro-home-closing-sub">
          Licensed U.S. providers review every intake before prescribing. Weekly GLP-1 protocols when appropriate.
        </p>
        <button type="button" className="retro-home-closing-cta" onClick={onCta}>
          Start medical intake
        </button>
      </div>
    </section>
  );
}

const PANE_IDS = new Set(['weight-loss']);
/** Legacy Yucca goal hashes → weight-loss (Semaglutide & Tirzepatide only). */
const LEGACY_PANE_REDIRECT = new Set(['longevity', 'muscle-recovery', 'nad', 'sermorelin']);

/** Mirrors Yucca `/treatments/#weight-loss` inside our hash router. */
function parseTreatmentsPaneHash(hashRaw = typeof window !== 'undefined' ? window.location.hash : '') {
  const raw = (hashRaw || '').replace(/^#\/?/, '').split('?')[0];
  const parts = raw.split('/').filter(Boolean);
  const candidate =
    parts[0] === 'treatments' && parts[1] ? parts[1] : parts.length === 1 ? parts[0] : null;
  if (!candidate) return null;
  if (PANE_IDS.has(candidate)) return candidate;
  if (LEGACY_PANE_REDIRECT.has(candidate)) return 'weight-loss';
  if (candidate === 'semaglutide' || candidate === 'tirzepatide') return 'weight-loss';
  return null;
}

function treatmentsPaneHash(paneId) {
  return `#/treatments/${paneId}`;
}

/**
 * Treatments explore — Semaglutide & Tirzepatide (weight-loss) only.
 * Deep link: #/treatments/weight-loss
 */
export default function TreatmentsExplore({ selectedTx, setSelectedTx, openStart }) {
  const [paneId, setPaneId] = useState(
    () => parseTreatmentsPaneHash() || getGoalForTreatment(selectedTx)?.id || 'weight-loss',
  );
  const pane = useMemo(() => TABS.find((p) => p.id === paneId) || TABS[0], [paneId]);
  const activeIndex = TABS.findIndex((p) => p.id === paneId);

  useEffect(() => {
    const goal = TREATMENT_GOALS.find((g) => g.id === paneId);
    if (goal && !goal.treatmentIds.includes(selectedTx)) setSelectedTx(goal.defaultTreatmentId);
  }, [paneId, selectedTx, setSelectedTx]);

  useEffect(() => {
    document.documentElement.setAttribute('data-explore-active-tab', paneId);
    return () => {
      document.documentElement.removeAttribute('data-explore-active-tab');
    };
  }, [paneId]);

  // Normalize #/treatments and legacy longevity/MR hashes → #/treatments/weight-loss
  useEffect(() => {
    const fromHash = parseTreatmentsPaneHash();
    const desired = treatmentsPaneHash(fromHash || paneId);
    if (window.location.hash !== desired) {
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}${desired}`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only normalize
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const fromHash = parseTreatmentsPaneHash();
      if (fromHash) setPaneId((prev) => (fromHash !== prev ? fromHash : prev));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const selectPane = (id) => {
    setPaneId(id);
    const goal = TREATMENT_GOALS.find((g) => g.id === id);
    if (goal) setSelectedTx(goal.defaultTreatmentId);
    const next = treatmentsPaneHash(id);
    if (window.location.hash !== next) window.location.hash = next;
  };

  const cta = () => openStart(selectedTx || pane.products[0]?.id || 'semaglutide');

  return (
    <div className="yx-clone fade-in">
      <section className="yx-clone__intro px-4">
        <h1 className="max-w-[37.0625rem] mx-auto text-center text-2xl xs:text-[1.75rem] tablet:text-[2.25rem] leading-[1] tracking-[-0.04em] font-semibold text-neutral-900">
          Explore Semaglutide and Tirzepatide — choose what&rsquo;s best <em>for you.</em>
        </h1>
      </section>

      <div className="retro-explore-tabs-wrap">
        <div data-explore-tabs="">
          {TABS.length > 1 ? (
            <section className="bg-white overflow-x-clip">
              <div
                data-explore-tab-menu=""
                data-active-index={activeIndex}
                className="explore-tab-menu mx-auto mb-6 tablet:mb-8 grid"
              >
                {TABS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    data-explore-tab-link={p.id}
                    data-active={p.id === paneId ? 'true' : 'false'}
                    data-tone={p.tone}
                    className="explore-tab-link relative flex min-h-[4.5625rem] cursor-pointer items-center overflow-hidden rounded-xl bg-neutral-200 p-4 text-sm font-semibold leading-none tracking-[-0.02em] text-neutral-900"
                    onClick={() => selectPane(p.id)}
                  >
                    <span className="explore-tab-border" aria-hidden="true" />
                    <span className="explore-tab-fill" aria-hidden="true" />
                    <span className="relative z-[2] text-left whitespace-nowrap">{p.tab}</span>
                    <img
                      src={p.tabImg}
                      alt=""
                      loading="lazy"
                      className="explore-tab-img pointer-events-none absolute bottom-0 max-h-[4.5rem]"
                      style={{ right: 0 }}
                    />
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          <div className="relative z-[2]">
            {TABS.map((p) =>
              p.id === paneId ? (
                <div key={p.id} data-explore-tab-pane={p.id} data-active="true" className="explore-tab-pane">
                  <ExploreHero pane={p} selectedTx={selectedTx} setSelectedTx={setSelectedTx} onCta={cta} />
                </div>
              ) : null,
            )}
          </div>
        </div>
      </div>

      <div data-explore-section-stack="weight-loss">
        <ProtocolSection variant="wl" data={WL_PROTOCOL} onCta={cta} />
        <ClinicalSection variant="wl" />
        <ExpectSection variant="wl" data={WL_EXPECT} />
        <KnowallSection variant="wl" faqs={WL_FAQS} vialSrc={`${IMG}/expt-tirz-sema-vials-together.png?v=paxbrand`} onCta={cta} />
      </div>

      <WhySection />
      <ClosingSection onCta={cta} />
    </div>
  );
}
