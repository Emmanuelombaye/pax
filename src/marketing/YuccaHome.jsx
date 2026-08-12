import { useEffect, useState } from 'react';
import { HOME_FAQS } from './data.js';
import { ReviewsSection, WhySection, ClosingSection } from './TreatmentsExplore.jsx';
import YuccaHomeTreatments from './YuccaHomeTreatments.jsx';
import YuccaHomeHiw from './YuccaHomeHiw.jsx';

const IMG = '/images/yucca-clone';

const HERO_WORDS = [
  { text: 'Semaglutide', color: 'var(--forest)' },
  { text: 'Tirzepatide', color: 'var(--terracotta)' },
];

const RESULTS = [
  { name: 'Lisa C.', lbs: 75, time: 'in 10 Months', image: `${IMG}/Lisa-C.-p-800.avif` },
  { name: 'Blaze B.', lbs: 50, time: 'in 6 Months', image: `${IMG}/Blaze-B.-p-800.avif` },
  { name: 'Crystal G.', lbs: 50, time: 'in 6 Months', image: `${IMG}/Crystal-G.-p-800.avif` },
  { name: 'JamiLyn O.', lbs: 36, time: 'in 14 Weeks', image: `${IMG}/Jamilyn-C.-p-800.avif` },
  { name: 'Kim B.', lbs: 8, time: 'in 6 Weeks', image: `${IMG}/Kim-B.-p-800.avif` },
];

const DOCTORS = [
  {
    name: 'Dr. Mark Hamilton, MD',
    title: 'Internal Medicine Physician',
    desc: 'Specialist in GLP-1 weight management and metabolic optimization.',
    image: '/images/cards/doctor-male.png',
    alma: `${IMG}/university-of-south-florida-logo.svg`,
    almaAlt: 'University of South Florida — medical school alma mater',
  },
  {
    name: 'Dr. Sarah Jenkins, MD',
    title: 'Internal Medicine Physician',
    desc: 'Expert in advanced endocrinology, GLP-1 protocols, and metabolic health.',
    image: '/images/cards/doctor-female.png',
    alma: `${IMG}/university-of-south-florida-logo.svg`,
    almaAlt: 'University of South Florida — medical school alma mater',
  },
];

const METRIC_ARROW = (
  <svg className="retro-happy__metric-arrow" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M7.5 1.5v12M2.5 8.5l5 5 5-5" stroke="var(--forest)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PILL_CHECK = (
  <svg className="retro-happy__pill-check" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 2.25L3.5 4.5v5.25c0 3.75 2.6 7.05 6.5 8.25 3.9-1.2 6.5-4.5 6.5-8.25V4.5L10 2.25z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M7 10.25l2.25 2.25L13.5 8" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DOCTOR_BADGE = (
  <svg viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M7 0C7.6525 0 8.14297 0.469414 8.57422 0.883789L8.57617 0.885742C8.82172 1.12069 9.07506 1.36348 9.29688 1.45508C9.50082 1.53988 9.83857 1.54482 10.166 1.5498H10.1709C10.7802 1.55917 11.4703 1.56991 11.9502 2.0498C12.4301 2.5297 12.4408 3.21978 12.4502 3.8291V3.83398C12.4552 4.16144 12.4601 4.49919 12.5449 4.70312C12.6361 4.92452 12.8764 5.17645 13.1104 5.4209L13.1162 5.42578C13.5306 5.85766 14 6.3475 14 7C14 7.6525 13.5306 8.14297 13.1162 8.57422L13.1143 8.57617C12.8793 8.82172 12.6365 9.07506 12.5449 9.29688C12.4601 9.50081 12.4552 9.83857 12.4502 10.166V10.1709C12.4408 10.7802 12.4301 11.4703 11.9502 11.9502C11.4703 12.4301 10.7802 12.4408 10.1709 12.4502H10.166C9.83857 12.4552 9.50081 12.4601 9.29688 12.5449C9.07548 12.6361 8.82355 12.8764 8.5791 13.1104L8.57422 13.1162C8.14234 13.5306 7.6525 14 7 14C6.3475 14 5.85703 13.5306 5.42578 13.1162L5.42383 13.1143C5.17828 12.8793 4.92494 12.6365 4.70312 12.5449C4.49919 12.4601 4.16144 12.4552 3.83398 12.4502H3.8291C3.21978 12.4408 2.5297 12.4301 2.0498 11.9502C1.56991 11.4703 1.55917 10.7802 1.5498 10.1709V10.166C1.54482 9.83856 1.53988 9.50082 1.45508 9.29688C1.36392 9.07548 1.12356 8.82355 0.889648 8.5791L0.883789 8.57422C0.469414 8.14234 0 7.6525 0 7C0 6.3475 0.469414 5.85703 0.883789 5.42578L0.885742 5.42383C1.12069 5.17828 1.36348 4.92494 1.45508 4.70312C1.53988 4.49919 1.54482 4.16144 1.5498 3.83398V3.83203C1.5623 3.22203 1.56918 2.53043 2.0498 2.0498C2.5297 1.56991 3.21978 1.55917 3.8291 1.5498H3.83398C4.16142 1.54482 4.50044 1.53988 4.70312 1.45508C4.92452 1.36392 5.17645 1.12356 5.4209 0.889648L5.42578 0.883789C5.85766 0.469414 6.3475 0 7 0ZM10.1377 4.8623C9.87735 4.60196 9.45469 4.60195 9.19434 4.8623L6.1875 7.86914L5.1377 6.81934C4.87735 6.55899 4.45469 6.55899 4.19434 6.81934C3.93456 7.07965 3.93439 7.50152 4.19434 7.76172L5.7168 9.2832C5.84174 9.40802 6.0109 9.47845 6.1875 9.47852C6.3642 9.47852 6.53418 9.40808 6.65918 9.2832L10.1377 5.80566C10.398 5.5454 10.3978 5.12267 10.1377 4.8623Z" />
  </svg>
);

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
              <h1 className="sr-only">Weight loss treatment that works</h1>
              <div className="retro-home-hero-heading pax-home-hero__heading hero-reveal hero-reveal--fade-up">
                <span className="italic pax-home-hero__word" style={{ color: word.color }}>
                  {word.text}
                </span>
                <br />
                treatment that works
              </div>
              <p className="retro-home-hero-subtitle pax-home-hero__subtitle hero-reveal hero-reveal--fade-up italic">
                designed around you.
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
                    Lose weight for just $125/mo
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
      <div className="retro-social-proof" data-layout="hero" aria-label="Pax Longevity trust and recognition">
        <div className="retro-social-proof__card">
          <strong className="retro-social-proof__value">20,000+</strong>
          <span className="retro-social-proof__label">
            Active patients
            <br />
            on Pax Longevity
          </span>
        </div>
        <div className="retro-social-proof__card">
          <strong className="retro-social-proof__value retro-social-proof__value--prescriptions">100,000+</strong>
          <span className="retro-social-proof__label">
            Prescriptions written
            <br />
            across 50 states
          </span>
        </div>
        <div className="retro-social-proof__card">
          <div className="retro-social-proof__rating">
            <svg viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                d="M14.4626 5.34993H8.93721L7.23632 0L5.52537 5.34993L0 5.33968L4.4686 8.65007L2.75765 14L7.22625 10.6896L11.6949 14L9.99397 8.65007L14.4626 5.34993Z"
                fill="#C17C74"
              />
              <path d="M10.3764 9.85927L9.99398 8.6499L7.23633 10.6894L10.3764 9.85927Z" fill="#1C3F34" />
            </svg>
            <strong>4.7</strong>
            <em>Excellent</em>
          </div>
          <span className="retro-social-proof__label">
            1,000+ Reviews
            <br />
            on TrustPilot
          </span>
        </div>
      </div>
    </section>
  );
}

function HappySection() {
  return (
    <section className="retro-happy" aria-labelledby="retro-home-happy-heading">
      <h2 id="retro-home-happy-heading" className="retro-happy__heading">
        Our <em className="retro-happy__heading-accent">patients&rsquo; incredible results</em>
        <br />&mdash; built to last!
      </h2>
      <div className="retro-happy__marquee" aria-label="Patient transformation showcase">
        <div className="retro-happy__track" role="list">
          {[0, 1].map((loop) => (
            <ul key={loop} className="retro-happy__group" role="list">
              {RESULTS.map((r) => (
                <li key={`${loop}-${r.name}`} className="retro-happy__card">
                  <img className="retro-happy__photo" src={r.image} alt={`${r.name} — verified GLP-1 patient transformation`} loading="lazy" />
                  <span className="retro-happy__chip retro-happy__chip--before">Before</span>
                  <span className="retro-happy__chip retro-happy__chip--after">After</span>
                  <div className="retro-happy__scrim" aria-hidden="true" />
                  <div className="retro-happy__metric">
                    <div className="retro-happy__metric-row">
                      <span className="retro-happy__metric-label">Lost</span>
                      {METRIC_ARROW}
                    </div>
                    <div className="retro-happy__metric-number">
                      <span className="retro-happy__metric-lbs">{r.lbs}</span>
                      <span className="retro-happy__metric-unit">lbs</span>
                    </div>
                    <div className="retro-happy__metric-time">{r.time}</div>
                  </div>
                  <div className="retro-happy__pill">
                    <span className="retro-happy__pill-name">{r.name}</span>
                    {PILL_CHECK}
                    <span className="retro-happy__pill-verified">Verified GLP-1 Patient</span>
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="retro-happy__reviews-wrap">
        <div className="retro-happy__reviews-card">
          <div className="retro-happy__reviews-inner">
            <div className="retro-happy__reviews-google-text">
              <span className="retro-happy__reviews-google-label">TrustScore 4.7 · 1,210 reviews</span>
            </div>
            <div className="retro-happy__reviews-divider" />
            <div className="retro-happy__reviews-google-text">
              <span className="retro-happy__reviews-google-label">Google Rating</span>
              <div className="retro-happy__reviews-google-rating">
                <strong>4.8</strong>
                <span className="retro-happy__reviews-google-count">+100 reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatbandSection() {
  return (
    <section className="retro-home-statband" aria-label="20,000+ patients trust Pax Longevity">
      <div className="retro-home-statband-photo retro-home-statband-photo--left">
        <img src={`${IMG}/gorgeous-plus-size-model-beige-women-s-lingerie.avif`} alt="" loading="lazy" className="retro-home-statband-img" />
      </div>
      <div className="retro-home-statband-text">
        <div className="retro-home-statband-stat-row">
          <span className="retro-home-statband-num">20,000</span>
          <span className="retro-home-statband-bulb" aria-hidden="true">
            <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.25 15H23.75M15 6.25V23.75" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <p className="retro-home-statband-copy">
          patients have trusted Pax Longevity for their <span className="retro-home-statband-em">weight loss</span> treatment, and we&rsquo;re excited to help do the same for you!
        </p>
      </div>
      <div className="retro-home-statband-photo retro-home-statband-photo--right">
        <img src={`${IMG}/statband-couple-weight-loss-journey-yucca-health.avif`} alt="" loading="lazy" className="retro-home-statband-img" />
      </div>
    </section>
  );
}

function DoctorCard({ doc, carousel = false }) {
  return (
    <article className={`retro-home-doctor-card${carousel ? ' retro-home-doctor-card--carousel' : ''}`}>
      <div className="retro-home-doctor-photo-wrap">
        <img
          src={doc.image}
          alt={`${doc.name}, ${doc.title}`}
          loading="lazy"
          className="retro-home-doctor-photo"
          sizes={carousel ? '(min-width: 768px) 30vw, 88vw' : '(min-width: 992px) 380px, 100vw'}
        />
        <span className="retro-home-doctor-badge">
          {DOCTOR_BADGE}
          Board-Certified
        </span>
        <img
          src="/brand/pax-horizontal.svg?v=2"
          alt=""
          className="retro-home-doctor-brand"
          aria-hidden="true"
        />
      </div>
      <div className="retro-home-doctor-info">
        <h3 className="retro-home-doctor-name">{doc.name}</h3>
        <p className="retro-home-doctor-title">{doc.title}</p>
        <p className="retro-home-doctor-desc">{doc.desc}</p>
        <img src={doc.alma} alt={doc.almaAlt} className="retro-home-doctor-usf" loading="lazy" />
      </div>
    </article>
  );
}

function DoctorsSection() {
  return (
    <section className="retro-home-doctors">
      <div className="retro-home-doctors-heading-wrap">
        <h2 className="retro-home-doctors-heading">
          Trusted by certified <br />
          physicians who will <em className="italic font-semibold">guide</em> <br />
          and <em className="italic font-semibold">support you</em>
        </h2>
      </div>

      <div className="retro-home-doctors-grid">
        {DOCTORS.map((doc) => (
          <DoctorCard key={doc.name} doc={doc} />
        ))}
      </div>

      <div className="retro-home-doctors-carousel">
        <div data-retro-doctors-track className="retro-home-doctors-track">
          {DOCTORS.map((doc) => (
            <DoctorCard key={`m-${doc.name}`} doc={doc} carousel />
          ))}
        </div>
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

/** Yucca retro-home index — mirrors tryyucca.com/ layout and CSS */
export default function YuccaHome({ openStart, activeFaq, onFaqToggle }) {
  return (
    <div className="yucca-home u5-type" data-retro-scope>
      <HeroSection openStart={openStart} />
      <HappySection />
      <YuccaHomeTreatments openStart={openStart} />
      <YuccaHomeHiw />
      <StatbandSection />
      <ReviewsSection onCta={() => openStart()} />
      <DoctorsSection />
      <WhySection />
      <FaqSection activeFaq={activeFaq} onFaqToggle={onFaqToggle} />
      <ClosingSection onCta={() => openStart()} />
    </div>
  );
}
