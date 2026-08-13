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
            src="/images/pax-hero-couple-portrait.png"
            alt=""
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

function ProvidersSection() {
  return (
    <section className="retro-home-doctors pax-home-providers">
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

      <div className="pax-home-providers__pillars">
        {ADVISOR_PILLARS.map((pillar) => (
          <article key={pillar.n} className="pax-home-providers__card">
            <span className="pax-home-providers__n">{pillar.n}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.body}</p>
          </article>
        ))}
      </div>

      <p className="pax-home-providers__link-wrap">
        <a href="#/how-it-works" className="pax-home-providers__link">
          See how clinical review works →
        </a>
      </p>
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
      <YuccaHomeHiw />
      <ProvidersSection />
      <WhySection />
      <FaqSection activeFaq={activeFaq} onFaqToggle={onFaqToggle} />
      <ClosingSection onCta={() => openStart()} />
    </div>
  );
}
