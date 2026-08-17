import { HOME_FAQS } from './data.js';
import { WhySection, ClosingSection } from './TreatmentsExplore.jsx';
import YuccaHomeTreatments from './YuccaHomeTreatments.jsx';
import YuccaHomeHiw from './YuccaHomeHiw.jsx';
import { ADVISOR_PILLARS } from './advisorsData.js';

function HeroSection({ openStart }) {
  return (
    <section className="retro-home-hero-section pax-home-hero" data-hero-reveal data-revealed="true">
      <div className="pax-home-hero__inner">
        <div className="pax-home-hero__copy">
          <h1 className="pax-home-hero__heading">
            Provider-guided GLP-1 care, prescribed only when it&rsquo;s right.
          </h1>
          <p className="pax-home-hero__subtitle">
            Semaglutide or Tirzepatide — reviewed by a licensed U.S. provider before anything is prescribed.
          </p>
          <div className="pax-home-hero__cta">
            <button
              type="button"
              className="retro-home-hero-btn retro-home-hero-btn--primary"
              onClick={() => openStart('semaglutide')}
            >
              Start medical intake · from $125/mo
            </button>
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
        <div className="pax-home-hero__media" aria-hidden="true">
          <img
            className="pax-home-hero__photo"
            src="/images/pax-hero-portrait.webp?v=ph1"
            alt=""
            width="1024"
            height="1536"
            loading="eager"
            fetchPriority="high"
          />
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
