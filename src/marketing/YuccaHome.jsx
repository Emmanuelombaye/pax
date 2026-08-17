import { useEffect, useState } from 'react';
import { HOME_FAQS } from './data.js';
import { WhySection, ClosingSection } from './TreatmentsExplore.jsx';
import YuccaHomeTreatments from './YuccaHomeTreatments.jsx';
import YuccaHomeHiw from './YuccaHomeHiw.jsx';
import { ADVISOR_PILLARS } from './advisorsData.js';

const HERO_WORDS = [
  { text: 'Semaglutide', color: 'var(--forest)' },
  { text: 'Tirzepatide', color: 'var(--terracotta)' },
];

function useHeroTyper() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % HERO_WORDS.length), 2200);
    return () => window.clearInterval(id);
  }, []);
  return HERO_WORDS[index];
}

function HeroSection({ openStart }) {
  const word = useHeroTyper();

  return (
    <section className="retro-home-hero-section pax-home-hero" data-hero-reveal data-revealed="true">
      <div className="retro-home-hero-card pax-home-hero__card relative overflow-hidden rounded-retro-card border-2 border-retro-ink">
        <div className="pax-home-hero__media" aria-hidden="true">
          <img
            className="pax-home-hero__photo"
            src="/images/pax-hero-couple-portrait.webp?v=lite1"
            alt=""
            width="1400"
            height="2100"
            loading="eager"
            fetchPriority="high"
          />
          <div className="pax-home-hero__wash" />
          <div className="pax-home-hero__scrim" />
        </div>
        <div className="retro-home-hero-contain relative z-[2]">
          <div className="retro-home-hero-wrap pax-home-hero__wrap relative z-[2]">
            <div className="retro-home-hero-top">
              <h1 className="sr-only">Provider-guided GLP-1 treatment</h1>
              <div className="retro-home-hero-heading pax-home-hero__heading hero-reveal hero-reveal--fade-up">
                <span className="italic pax-home-hero__word" style={{ color: word.color }}>
                  {word.text}
                </span>
                <br />
                with provider review
              </div>
              <p className="retro-home-hero-subtitle pax-home-hero__subtitle hero-reveal hero-reveal--fade-up italic">
                prescribed only when medically appropriate.
              </p>
            </div>
            <div className="retro-home-hero-bottom hero-reveal hero-reveal--fade-up">
              <div className="retro-home-hero-cta-group">
                <div className="retro-home-hero-primary-wrap">
                  <button
                    type="button"
                    className="retro-home-hero-btn retro-home-hero-btn--primary"
                    onClick={() => openStart('semaglutide')}
                  >
                    Start medical intake · from $125/mo
                  </button>
                </div>
                <a href="#/treatments/weight-loss" className="retro-home-hero-btn retro-home-hero-btn--secondary">
                  <span>Explore Treatments</span>
                  <span className="retro-home-hero-btn-chevron" aria-hidden="true">
                    <svg viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M0.799805 0.799988L5.79981 5.79999L0.799805 10.8"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const MEMBERSHIP_CARDS = [
  {
    id: 'provider',
    fit: 'cover',
    src: '/images/yucca-clone/dr-michael-wasef-md-pax.webp?v=lite1',
    alt: 'Licensed clinician in a Pax lab coat',
  },
  {
    id: 'portal',
    fit: 'phone',
    src: '/images/yucca-clone/hiw/yucca-health-patient-portal-dashboard-semaglutide-mobile.avif?v=phone1',
    alt: 'Pax patient portal on a phone',
  },
  {
    id: 'medication',
    fit: 'cover',
    src: '/images/membership/vials.webp?v=m2',
    alt: 'Personalized Semaglutide and Tirzepatide vials',
  },
  {
    id: 'progress',
    fit: 'cover',
    src: '/images/membership/scale.webp?v=m2',
    alt: 'Ongoing progress tracking',
  },
];

const MEMBERSHIP_PERKS = [
  'Licensed U.S. provider review',
  'Patient portal',
  'Personalized treatment plan',
  'Ongoing progress support',
];

function MembershipSection() {
  return (
    <section className="pax-member" aria-labelledby="pax-member-heading">
      <div className="pax-member__inner">
        <div className="pax-member__row">
          {MEMBERSHIP_CARDS.map((card) => (
            <figure key={card.id} className={`pax-member__card pax-member__card--${card.fit} pax-member__card--${card.id}`}>
              {card.fit === 'phone' ? (
                <div className="pax-member__phone">
                  <img src={card.src} alt="" loading="eager" decoding="async" />
                </div>
              ) : (
                <img src={card.src} alt="" loading="eager" decoding="async" />
              )}
              <figcaption className="sr-only">{card.alt}</figcaption>
            </figure>
          ))}
        </div>

        <div className="pax-member__copy">
          <h2 id="pax-member-heading">Get complete support in one membership</h2>
          <p>Along with medication, if eligible, you get:</p>
          <ul className="pax-member__perks">
            {MEMBERSHIP_PERKS.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ProvidersSection() {
  return (
    <section className="retro-home-doctors pax-home-providers">
      <div className="pax-home-providers__inner">
        <div className="retro-home-doctors-heading-wrap">
          <h2 className="retro-home-doctors-heading">
            Licensed U.S. providers <br />
            review every <em className="italic font-semibold">intake</em> <br />
            before a prescription
          </h2>
          <p className="pax-home-providers__lede">
            Completing an online questionnaire does not guarantee treatment. A state-licensed clinician
            determines whether Semaglutide or Tirzepatide is appropriate for you.
          </p>
        </div>

        <div className="pax-home-providers__pillars" role="list">
          {ADVISOR_PILLARS.map((pillar) => (
            <article key={pillar.n} className="pax-home-providers__card" role="listitem">
              <img src={pillar.img} alt={pillar.alt} loading="lazy" decoding="async" style={{ objectPosition: pillar.pos }} />
              <div className="pax-home-providers__copy">
                <span className="pax-home-providers__n">{pillar.n}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="pax-home-providers__link-wrap">
          <a href="#/how-it-works" className="pax-home-providers__link">
            See how clinical review works →
          </a>
        </p>
      </div>
    </section>
  );
}

function FaqSection({ activeFaq, onFaqToggle }) {
  return (
    <section className="retro-faqs">
      <div className="retro-faqs__head">
        <h2 className="retro-faqs__heading">We&rsquo;ve got you.</h2>
        <p className="retro-faqs__sub">You have questions, we have answers.</p>
      </div>
      <ul className="retro-faqs__list">
        {HOME_FAQS.map((faq, index) => {
          const open = activeFaq === index;
          return (
            <li key={faq.q} className="retro-faqs__item" data-faq-item data-open={open ? 'true' : 'false'}>
              <button type="button" className="retro-faqs__toggle" aria-expanded={open} onClick={() => onFaqToggle(index)}>
                <span className="retro-faqs__question">{faq.q}</span>
                <span className="retro-faqs__icon" aria-hidden="true">+</span>
              </button>
              <div className="retro-faqs__panel" role="region" hidden={!open}>
                <div className="retro-faqs__panel-inner">
                  <div className="retro-faqs__answer">
                    <p>{faq.lead}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Home — Yucca layout without fabricated social proof, results, or clinician claims */
export default function YuccaHome({ openStart, activeFaq, onFaqToggle }) {
  return (
    <div className="yucca-home u5-type" data-retro-scope>
      <HeroSection openStart={openStart} />
      <YuccaHomeTreatments openStart={openStart} />
      <MembershipSection />
      <YuccaHomeHiw />
      <ProvidersSection />
      <WhySection />
      <FaqSection activeFaq={activeFaq} onFaqToggle={onFaqToggle} />
      <ClosingSection onCta={() => openStart()} />
    </div>
  );
}
