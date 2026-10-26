"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BrandSeal, LanguageToggle } from "@/components/Chrome";
import LiveTreatments from "@/components/LiveTreatments";
import { DEFAULT_INTAKE_HREF } from "@/brand/productMap.js";
import { useLang } from "@/i18n";
import "@/styles/how-it-works.css";

const images = {
  getStarted: { src: "/images/pax-get-started-v4-hq.webp", alt: "Quiet desk inviting the start of your assessment" },
  bloodwork: { src: "/images/pax-bloodwork-home-v4-hq.webp", alt: "Warm clinical still life ? diagnostics with quiet care" },
  bloodworkPage: { src: "/images/pax-bloodwork-page-v4-hq.webp", alt: "Measure what matters ? quiet focus before the plan" },
  consult: { src: "/images/pax-consult-v5-hq.webp", alt: "Licensed provider in a private telehealth consult" },
  membership: { src: "/images/pax-membership-v4-hq.webp", alt: "Membership ritual ? journal, pen, and quiet intention" },
  howItWorks: { src: "/images/pax-how-it-works-v6-hq.webp", alt: "Woman reviewing her plan in warm window light" },
  frontMembership: { src: "/images/pax-front-membership-v4-hq.webp", alt: "Open journal, pen, and cup on an oak desk" },
  physicians: { src: "/images/pax-physicians-v5-hq.webp", alt: "Licensed providers who lead your plan" },
  founder: { src: "/images/pax-founder-v5-hq.webp", alt: "Pax leadership in a sunlit stone doorway" },
  women: { src: "/images/pax-women-hub-v5-hq.webp", alt: "Woman in warm natural light ? calm confidence" },
  longevity: { src: "/images/pax-longevity-cta-v6-hq.webp", alt: "Woman walking a bright gallery hallway ? calm resolve" },
};

const marquee = ["Licensed providers", "Partner labs", "Evidence-based care", "FSA/HSA eligible"];

const discover = {
  num: "01",
  title: "Discover",
  lead: "Tell us about your health, symptoms, and goals.",
  points: [
    "Name what you want to change before any medication",
    "Symptoms and a short health history",
    "The assessment stays inside Pax",
  ],
  image: images.getStarted,
};

const guidedSteps = [
  {
    num: "02",
    title: "Measure",
    lead: "Complete comprehensive bloodwork and diagnostics.",
    points: [
      "Advanced lab diagnostics are $65, at home or at a lab",
      "Optional Tasso at-home blood test is $79.99 ($59.99 member)",
      "DEXA $59.95 and Prenuvo MRI $2,099 as membership add-ons",
    ],
    image: images.bloodwork,
  },
  {
    num: "03",
    title: "Personalize",
    lead: "Meet with a licensed provider who reviews your results and develops your individualized plan.",
    points: ["A private 1:1 visit", "Labs read with your history and goals", "Treatment only when it fits"],
    image: images.consult,
  },
  {
    num: "04",
    title: "Evolve",
    lead: "Begin your treatment with ongoing care, testing, and adjustments as your needs change.",
    points: [
      "A required physician follow-up every 90 days",
      "Adjustments when your needs change",
      "Messaging with your care team",
      "Care continues only after that review",
    ],
    image: images.membership,
  },
];

const foundationSteps = [
  {
    num: "02",
    title: "Review results",
    lead: "See your labs in plain language, then decide if you want a visit.",
    points: ["Every marker explained without a sales script", "Your notes stay with your Pax record", "Book a consult when you want one"],
    image: images.bloodworkPage,
  },
  {
    num: "03",
    title: "A plan you can deepen",
    lead: "Testing on a steady cadence, with consults when you need them.",
    points: ["A clear path into care", "Consults purchased only when you want them", "Move into Premium as the plan grows"],
    image: images.howItWorks,
  },
  {
    num: "04",
    title: "Stay current",
    lead: "Retest and watch the markers that matter.",
    points: [
      "Testing about every 6 months",
      "Trends across hormones, metabolism, and related signals",
      "Spot a change before it becomes the whole story",
    ],
    image: images.frontMembership,
  },
];

const inclusions = [
  "Hormone optimization ? testosterone from $28/mo, testosterone cream from $60/mo, progesterone from $49/mo, progesterone cream from $79/mo, estradiol from $58/mo",
  "Weight management (tirzepatide) ? from $299/mo",
  "Longevity peptides and cellular health ? BPC-157 $149/mo, TB-500 $105/mo, Ipamorelin $179/mo, Tesamorelin $189/mo, KPV $179/mo, NAD+ $129/mo, glutathione $75/mo",
  "Sexual wellness (PT-141) ? $75",
  "Cognition and focus (Selank, Semax) ? $95/mo",
  "Beauty and regeneration (GHK-Cu) ? $149/mo",
  "50+ biomarker testing ? $65",
];

const tableRows = [
  { label: "Initial testing", guided: "In your plan", foundation: "In your plan" },
  { label: "Membership", guided: "$155/month", foundation: "$25/month" },
  { label: "Medication", guided: "Billed separately", foundation: "Billed separately" },
  { label: "Testing", guided: "Every 90 days", foundation: "Every 6 months" },
  { label: "Treatment", guided: "When a provider says it fits", foundation: "Consults when you need them" },
  { label: "FSA/HSA eligible", guided: true, foundation: true },
  { label: "Advanced panels", guided: true, foundation: false },
  { label: "Provider consultation", guided: "Included", foundation: "Available" },
  { label: "Customized care plan", guided: true, foundation: false },
];

const faqs = [
  { q: "Can I cancel anytime?", a: "Yes. Membership is month-to-month once enrolled. Cancel anytime." },
  { q: "Is Pax covered by insurance?", a: "Pax is cash-pay. Some services may be FSA/HSA eligible depending on your plan. A receipt is available where that helps." },
  { q: "Can I still see a provider on Basic membership?", a: "Yes. Basic includes testing every 6 months, and consults can be purchased. Premium includes the private visit as part of ongoing care." },
  { q: "What is biomarker testing?", a: "It measures markers in your blood that reflect how your body is working: hormones, metabolism, nutrients, and related signals as indicated." },
  { q: "What can biomarker testing show?", a: "It can surface early signals around hormones, metabolism, thyroid, and related systems, so a provider can shape a plan before problems deepen." },
];

const stories = [
  { id: "01", name: "Maya", quote: "The biggest shift has been consistency ? energy that holds through the day, not spikes and crashes." },
  { id: "02", name: "Jordan", quote: "I finally felt heard. Labs were explained clearly, and nothing felt like a sales pitch ? just honest guidance." },
  { id: "03", name: "Elena", quote: "Menopause support that treated me as a whole person. Within weeks, sleep and mood started to settle." },
  { id: "04", name: "Marcus", quote: "Comprehensive review of my bloodwork with helpful next steps. Clear diagnosis. No pressure." },
  { id: "05", name: "Priya", quote: "I feel clearer and more confident ? not just physically, but in how I understand my own biology." },
  { id: "06", name: "Chris", quote: "Fatigue that had been brushed off for years was finally addressed. The care team stayed with me." },
];

const portraits = [images.consult, images.physicians, images.founder, images.women];

function Check({ light }) {
  return (
    <svg viewBox="0 0 25 25" className="hiw-check" aria-hidden="true" style={{ color: light ? "#fdf5e9" : "#c67265" }}>
      <rect x="3" y="3" width="19" height="19" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12.8 10.8 15.5 17 9.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CellView({ value, light }) {
  if (value === true) return <span className="inline-flex justify-center"><Check light={light} /></span>;
  if (value === false) return <span style={{ color: light ? "rgba(253,245,233,.4)" : "rgba(93,83,75,.35)" }}>?</span>;
  return <span>{value}</span>;
}

function Cta({ children, clay, outline, block, className = "" }) {
  return (
    <Link href={DEFAULT_INTAKE_HREF} className={`hiw-btn ${clay ? "clay" : ""} ${outline ? "outline" : ""} ${block ? "block block-md" : ""} ${className}`}>
      {children}
    </Link>
  );
}

function StepRow({ step, cta }) {
  return (
    <article className="hiw-step">
      <div className="hiw-photo">
        <img src={step.image.src} alt={step.image.alt} />
      </div>
      <div>
        <p className="hiw-kicker">Step {step.num}</p>
        <h3>{step.title}</h3>
        <p className="hiw-lead">{step.lead}</p>
        <ul className="hiw-points">
          {step.points.map((point) => (
            <li key={point}>
              <Check />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        {cta ? <div className="mt-8"><Cta block>Get Started</Cta></div> : null}
      </div>
    </article>
  );
}

export default function HowItWorks() {
  const { t } = useLang();
  const [tier, setTier] = useState("guided");
  const [openFaq, setOpenFaq] = useState(0);
  const [story, setStory] = useState(0);
  const [paused, setPaused] = useState(false);
  const steps = tier === "guided" ? guidedSteps : foundationSteps;

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setStory((n) => (n + 1) % stories.length), 5000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div className="how-pax">
      <section className="hiw-hero">
        <img className="hiw-hero-photo" src={images.howItWorks.src} alt={images.howItWorks.alt} />
        <header className="absolute inset-x-0 top-0 z-20">
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 text-sand md:px-10">
            <Link href="/" className="inline-flex items-center gap-3 font-serif text-2xl tracking-tight"><BrandSeal /><span>Pax<span className="italic text-dune"> Health</span></span></Link>
            <div className="flex items-center gap-3">
              <LanguageToggle className="text-sand" />
              <Link href={DEFAULT_INTAKE_HREF} className="rounded-full bg-sand px-4 py-2 text-xs uppercase tracking-[0.16em] text-forest">{t("Take Assessment")}</Link>
            </div>
          </nav>
        </header>
        <div className="hiw-hero-copy">
          <div className="hiw-hero-band">
            <div className="hiw-wrap hiw-hero-row">
              <div className="max-w-3xl text-center md:text-left">
                <h1 className="hiw-display">How Pax Works</h1>
                <p className="hiw-indigo mt-4 text-lg leading-relaxed md:text-xl">
                  Comprehensive biomarker testing. Provider-led care. Personalized treatment for hormones, metabolism, and longevity.
                </p>
              </div>
              <Cta clay className="block block-md shrink-0">Start Today</Cta>
            </div>
          </div>
        </div>
      </section>

      <LiveTreatments />

      <div className="hiw-marquee">
        <div className="hiw-marquee-desktop">
          {marquee.map((word, index) => (
            <span key={word} className="hiw-word">
              {word}
              {index < marquee.length - 1 ? <span className="hiw-dash" /> : null}
            </span>
          ))}
        </div>
        <div className="hiw-marquee-mobile overflow-hidden">
          <div className="hiw-ticker">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                {marquee.map((word) => (
                  <span key={`${copy}-${word}`} className="hiw-word" style={{ fontSize: "1rem" }}>
                    {word}
                    <span className="hiw-dash" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="hiw-steps">
        <div className="hiw-wrap">
          <h2 className="hiw-section-title">How it works</h2>
          <StepRow step={discover} cta />
          <div className="mt-2 flex justify-center pb-5">
            <div className="hiw-tabs" role="tablist" aria-label="Membership path">
              {[
                ["guided", "Premium"],
                ["foundation", "Basic"],
              ].map(([id, label]) => (
                <button key={id} type="button" role="tab" aria-selected={tier === id} onClick={() => setTier(id)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div key={tier}>
            {steps.map((step) => (
              <StepRow key={`${tier}-${step.num}`} step={step} />
            ))}
          </div>
          <div className="border-t border-forest/15 py-12 text-center">
            <Cta>Start testing</Cta>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 text-center md:py-24">
        <div className="hiw-wrap">
          <h2 className="hiw-section-title">Want the most from your care?</h2>
          <p className="hiw-indigo mt-3 text-lg">Premium is the fuller relationship. Medication is billed on its own.</p>
          <div className="mt-10 overflow-x-auto">
            <table className="hiw-table">
              <thead>
                <tr>
                  <th className="w-[34%]" />
                  <th className="premium">Premium</th>
                  <th className="basic">Basic</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.label}>
                    <th>{row.label}</th>
                    <td className="premium"><CellView value={row.guided} light /></td>
                    <td className="basic"><CellView value={row.foundation} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Cta>Premium</Cta>
            <Cta outline>Basic</Cta>
          </div>
          <p className="hiw-indigo mt-6 text-sm uppercase tracking-[0.12em] opacity-60">FSA/HSA eligible ? Cancel anytime</p>
        </div>
      </section>

      <section className="border-y border-forest/10 bg-sand py-16 md:py-24">
        <div className="hiw-wrap">
          <h2 className="hiw-section-title">Pax includes care and follow-up for</h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {inclusions.map((item) => (
              <li key={item}><span className="hiw-include">{t(item)}</span></li>
            ))}
          </ul>
          <div className="mt-10"><Cta>Get Started Now</Cta></div>
        </div>
      </section>

      <section className="hiw-stories">
        <div className="hiw-doctors overflow-hidden">
          <div className="hiw-doctor-track">
            {portraits.map((photo) => (
              <figure key={photo.src} className="hiw-portrait">
                <div className="frame"><img src={photo.src} alt={photo.alt} /></div>
                <figcaption className="hiw-indigo mt-2 text-center text-sm">Licensed provider</figcaption>
              </figure>
            ))}
            {portraits.map((photo) => (
              <figure key={`${photo.src}-copy`} className="hiw-portrait copy" aria-hidden="true">
                <div className="frame"><img src={photo.src} alt="" /></div>
                <figcaption className="hiw-indigo mt-2 text-center text-sm">Licensed provider</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div
          className="mt-6 flex min-w-0 flex-1 flex-col gap-4 px-4 md:mt-0 md:px-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <p className="text-base font-semibold md:text-xl">Care from licensed providers</p>
          <div className="hiw-stack">
            {stories.map((item, index) => (
              <article key={item.id} className={index === story ? "relative z-[1] opacity-100" : "pointer-events-none z-0 opacity-0"}>
                <p className="hiw-quote">?{item.quote}?</p>
                <p className="mt-4 text-base font-semibold md:text-xl">{item.name}</p>
                <p className="hiw-indigo mt-1 text-[0.9375rem]">Pax member</p>
              </article>
            ))}
          </div>
          <div className="relative z-[1] mt-4 flex items-center justify-between gap-4">
            <button type="button" aria-label="Previous" onClick={() => setStory((n) => (n - 1 + stories.length) % stories.length)} className="text-2xl">?</button>
            <div className="flex gap-2.5">
              {stories.map((item, index) => (
                <button key={item.id} type="button" aria-label={`Story ${index + 1}`} onClick={() => setStory(index)} className="h-2 w-2 rounded-full bg-forest" style={{ opacity: index === story ? 1 : 0.25 }} />
              ))}
            </div>
            <button type="button" aria-label="Next" onClick={() => setStory((n) => (n + 1) % stories.length)} className="text-2xl">?</button>
          </div>
          <div className="relative z-[1] mt-4"><Cta block>Get Started Now</Cta></div>
        </div>
      </section>

      <section className="hiw-faq">
        <img className="hiw-faq-bg" src={images.howItWorks.src} alt="" />
        <div className="hiw-wrap">
          <div className="hiw-faq-card">
            <h2 className="hiw-section-title">FAQs</h2>
            {faqs.map((item, index) => {
              const open = openFaq === index;
              return (
                <div key={item.q} className="border-b border-forest/20">
                  <button type="button" className="flex w-full items-center justify-between gap-6 py-4 text-left md:py-7" aria-expanded={open} onClick={() => setOpenFaq(open ? -1 : index)}>
                    <span className="font-serif text-xl md:text-2xl">{item.q}</span>
                    <span className="font-serif text-2xl text-terracotta" style={{ transform: open ? "rotate(45deg)" : "none" }}>+</span>
                  </button>
                  {open ? <p className="hiw-indigo max-w-2xl pb-6 text-lg leading-relaxed">{item.a}</p> : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="hiw-cta">
        <img className="bg" src={images.longevity.src} alt={images.longevity.alt} />
        <div className="shade" />
        <div className="hiw-wrap copy">
          <div className="max-w-2xl">
            <h2>Begin your <em className="text-terracotta">assessment</em></h2>
            <p className="mt-5 text-base leading-relaxed text-white sm:text-lg">
              Tell us your goals in a few minutes, then complete the $65 starter diagnostic at home or at a partner lab. A licensed provider reviews your results and builds a plan. Basic membership is $25/month; Premium is $155/month. Medication, when prescribed, is always a separate charge ? and completing an assessment does not guarantee treatment.
            </p>
            <p className="mt-6 font-serif text-xl text-white sm:text-2xl">$65 diagnostic ? membership is separate</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Cta clay>Get Started</Cta>
              <a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="inline-flex items-center gap-2 font-serif text-lg text-white">
                How It Works <span aria-hidden="true">?</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
