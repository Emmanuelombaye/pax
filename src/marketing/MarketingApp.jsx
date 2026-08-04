import { useState, useEffect, useRef } from 'react';
import { BrandLogo, PAX_PASSPORT } from '../brand/index.js';
import { HOME_FAQS, LIFESTYLE_PILLARS, HOME_PROGRAMS, HOME_CHIPS, HOME_DOCTORS, THREAT_DOMAINS } from './data.js';
import { MARKETING_IMAGES } from './assets.js';
import LegalPage from './LegalPage.jsx';
import { LEGAL_PAGE_IDS } from './legalContent.js';

const START_TREATMENT_MAP = {
  glp: 'weight-loss',
  metabolic: 'metabolic-oral',
  nad: 'longevity',
  sermorelin: 'recovery',
  hormone: 'hormone',
  hair: 'hair',
  lifestyle: 'sexual-wellness',
};

function setImageFallback(event, fallbackSrc) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = fallbackSrc;
}

export default function MarketingApp({ currentTab }) {
  // Mobile Nav State
  const [isNavOpen, setIsNavOpen] = useState(false);
  // Header Scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  // FAQ Active State
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedTx, setSelectedTx] = useState('glp');
  const programScrollerRef = useRef(null);
  


  useEffect(() => {
    setIsNavOpen(false);
  }, [currentTab]);

  // Education States
  const [eduFilter, setEduFilter] = useState('all');
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);

  const playWebinar = (url, title) => {
    setActiveVideoUrl(url);
    setActiveVideoTitle(title);
  };
  const closeWebinar = () => {
    setActiveVideoUrl(null);
    setActiveVideoTitle('');
  };
  const openArticle = (title, content, url) => {
    setActiveArticle({ title, content, url });
  };
  const closeArticle = () => {
    setActiveArticle(null);
  };


  // Header scroll observer
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.cf-reveal'));
    if (!nodes.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [currentTab]);

  useEffect(() => {
    const panel = document.querySelector('.cf-plans__panel');
    if (!panel) return undefined;

    const updatePlansProgress = () => {
      const rect = panel.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh * 0.9;
      const end = -rect.height * 0.35;
      const raw = (start - rect.top) / (start - end);
      const progress = Math.max(0, Math.min(1, raw));
      panel.style.setProperty('--plans-progress', progress.toFixed(4));
    };

    updatePlansProgress();
    window.addEventListener('scroll', updatePlansProgress, { passive: true });
    window.addEventListener('resize', updatePlansProgress);
    return () => {
      window.removeEventListener('scroll', updatePlansProgress);
      window.removeEventListener('resize', updatePlansProgress);
    };
  }, [currentTab]);

  useEffect(() => {
    const scroller = programScrollerRef.current;
    if (!scroller) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let rafId = 0;
    let last = 0;
    let paused = false;
    const speedPxPerMs = 0.045;

    const tick = (now) => {
      if (!last) last = now;
      const delta = now - last;
      last = now;
      if (!paused) {
        const loopWidth = scroller.scrollWidth / 2;
        scroller.scrollLeft += delta * speedPxPerMs;
        if (scroller.scrollLeft >= loopWidth) {
          scroller.scrollLeft -= loopWidth;
        }
      }
      rafId = window.requestAnimationFrame(tick);
    };

    const pause = () => { paused = true; };
    const resume = () => {
      paused = false;
      last = 0;
    };

    scroller.addEventListener('mouseenter', pause);
    scroller.addEventListener('mouseleave', resume);
    scroller.addEventListener('touchstart', pause, { passive: true });
    scroller.addEventListener('touchend', resume);
    scroller.addEventListener('focusin', pause);
    scroller.addEventListener('focusout', resume);

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      scroller.removeEventListener('mouseenter', pause);
      scroller.removeEventListener('mouseleave', resume);
      scroller.removeEventListener('touchstart', pause);
      scroller.removeEventListener('touchend', resume);
      scroller.removeEventListener('focusin', pause);
      scroller.removeEventListener('focusout', resume);
    };
  }, [currentTab]);

  const toggleMobileNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleFaqToggle = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const openStart = (treatmentSeed) => {
    if (!treatmentSeed) {
      window.location.hash = '#/start';
      return;
    }
    const mapped = START_TREATMENT_MAP[treatmentSeed];
    window.location.hash = mapped ? `#/start?treatment=${encodeURIComponent(mapped)}` : '#/start';
  };

  const activeLifestyle = LIFESTYLE_PILLARS.find((pillar) => pillar.id === currentTab);
  const selectedTxLabel = {
    glp: 'Compounded GLP-1',
    metabolic: 'Metabolic Oral Support',
    nad: 'Compounded NAD+',
    sermorelin: 'Sermorelin Protocol',
    hormone: 'TRT / HRT Optimization',
    hair: 'Hair Restoration Topicals',
    lifestyle: 'Sexual Wellness Support',
  }[selectedTx] || 'Selected treatment';

  return (
    <>
      {/* Header / Navigation */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <BrandLogo variant="header" />
          
          <nav className="nav">
            <a href="#/" className={`nav-link ${currentTab === 'home' ? 'active' : ''}`}>Home</a>
            <a href="#/vision" className={`nav-link ${currentTab === 'vision' ? 'active' : ''}`}>Vision</a>
            <a href="#/threats" className={`nav-link ${currentTab === 'threats' ? 'active' : ''}`}>The Threats</a>
            <a href="#/treatments" className={`nav-link ${currentTab === 'treatments' ? 'active' : ''}`}>Treatments</a>
            <a href="#/advisors" className={`nav-link ${currentTab === 'advisors' ? 'active' : ''}`}>Advisors</a>
            <a href="#/education" className={`nav-link ${currentTab === 'education' ? 'active' : ''}`}>Education</a>
            <a href="#/portal" className="nav-link">Patient Center</a>
            <button className="btn btn-primary btn-quiz-trigger" onClick={openStart}>Find my treatment</button>
          </nav>
          
          <button 
            className={`nav-toggle ${isNavOpen ? 'active' : ''}`} 
            onClick={toggleMobileNav}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div 
        className={`mobile-overlay ${isNavOpen ? 'open' : ''}`} 
        onClick={toggleMobileNav}
      ></div>
      <div className={`mobile-nav ${isNavOpen ? 'open' : ''}`}>
        <div className="mobile-nav__brand">
          <BrandLogo variant="drawer" onClick={toggleMobileNav} />
        </div>
        <a href="#/" className={`nav-link mobile-link ${currentTab === 'home' ? 'active' : ''}`} onClick={toggleMobileNav}>Home</a>
        <a href="#/vision" className={`nav-link mobile-link ${currentTab === 'vision' ? 'active' : ''}`} onClick={toggleMobileNav}>Vision</a>
        <a href="#/threats" className={`nav-link mobile-link ${currentTab === 'threats' ? 'active' : ''}`} onClick={toggleMobileNav}>The Threats</a>
        <a href="#/treatments" className={`nav-link mobile-link ${currentTab === 'treatments' ? 'active' : ''}`} onClick={toggleMobileNav}>Treatments</a>
        <a href="#/advisors" className={`nav-link mobile-link ${currentTab === 'advisors' ? 'active' : ''}`} onClick={toggleMobileNav}>Advisors</a>
        <a href="#/education" className={`nav-link mobile-link ${currentTab === 'education' ? 'active' : ''}`} onClick={toggleMobileNav}>Education</a>
        <a href="#/portal" className="nav-link mobile-link" onClick={toggleMobileNav}>Patient Center</a>
        <button 
          className="btn btn-primary btn-quiz-trigger" 
          style={{ marginTop: '1rem' }} 
          onClick={() => { toggleMobileNav(); openStart(); }}
        >
          Find my treatment
        </button>
      </div>

      {/* DYNAMIC PAGE VIEWS */}
      <main style={{ minHeight: '60vh' }}>
        
        {/* ==================== HOME PAGE VIEW ==================== */}

        {currentTab === 'home' && (
          <div className="fade-in home-card-flow">
            {/* Full-bleed hero */}
            <section className="cf-hero cf-hero--full cf-hero--italy-miami">
              <div className="cf-hero__media" aria-hidden="true">
                <img className="cf-hero__bg-image" src={MARKETING_IMAGES.home.hero} alt="" loading="eager" />
                <div className="cf-hero__overlay" />
              </div>
              <div className="cf-hero__copy cf-hero__copy--left">
                <p className="cf-kicker">Pax Longevity</p>
                <h1 className="cf-hero__title">
                  Sunset state of mind.<br />Clinical peace of mind.
                </h1>
                <p className="cf-hero__lede">
                  Luxury telehealth for weight, hormones, peptides, and vitality protocols,
                  delivered with precision and care.
                </p>
              </div>
            </section>

            <section className="cf-system-intro" aria-label="Longevity system">
              <div className="cf-system-intro__inner">
                <h2 className="cf-system-intro__title">The Pax Longevity System</h2>
                <p className="cf-system-intro__lede">Doctor-prescribed longevity care delivered through:</p>
                <div className="cf-system-intro__grid">
                  <span>Personalized treatment plans</span>
                  <span>Licensed U.S. medical providers</span>
                  <span>Vetted 503A pharmacy fulfillment</span>
                </div>
              </div>
            </section>

            {/* Program chips */}
            <section className="cf-chips" aria-label="Programs">
              <div className="cf-chips__row">
                {HOME_CHIPS.map((chip) => (
                  <a key={chip.label} href={chip.href} className="cf-chip">
                    <span>{chip.label}</span>
                    <span className="cf-chip__arrow" aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            </section>

            {/* Programs stage with product cards */}
            <section className="cf-programs cf-reveal">
              <div className="cf-programs__stage">
                <div className="cf-programs__lead-row">
                  <div className="cf-programs__intro">
                    <p className="cf-programs__kicker">Precision Program Library</p>
                    <h2 className="cf-programs__title">
                      Multiple programs,<br /><em>one practice.</em>
                    </h2>
                    <p className="cf-programs__lede">
                      Physician-led prescription pathways for weight, hormones, peptides, and recovery — matched to your biomarkers and delivered concierge-style.
                    </p>
                    <div className="cf-programs__proof">
                      <span>Licensed U.S. providers</span>
                      <span>Vetted 503A pharmacy partners</span>
                      <span>Cold-chain delivery when required</span>
                    </div>
                    <div className="cf-programs__lead-actions">
                      <button type="button" className="cf-btn-dune" onClick={openStart}>Find my treatment</button>
                      <a href="#/treatments" className="cf-btn-light">See full treatments</a>
                    </div>
                  </div>

                  <div className="cf-programs__visual">
                    <div className="cf-programs__hero-img-wrap">
                      <img src={MARKETING_IMAGES.cards.glpPen} alt="" className="cf-programs__hero-img" loading="lazy" />
                    </div>
                    <div className="cf-programs__visual-note">
                      <strong>24h</strong>
                      <span>Typical provider review turnaround</span>
                    </div>
                  </div>
                </div>

                <div className="cf-programs__access">
                  <div className="cf-programs__access-head">
                    <p className="cf-programs__access-kicker">Program Catalog</p>
                    <h3 className="cf-programs__access-title">Access our specialized programs</h3>
                    <p className="cf-programs__access-lede">Select a protocol category to view physician-led options and pricing.</p>
                  </div>
                  <div className="cf-program-scroller" ref={programScrollerRef}>
                    {[...HOME_PROGRAMS, ...HOME_PROGRAMS].map((program, index) => {
                      const isClone = index >= HOME_PROGRAMS.length;
                      return (
                        <a
                          key={`${program.id}-${index}`}
                          href={program.href}
                          className={`cf-program-card cf-program-card--${program.tone} cf-reveal`}
                          style={{ '--reveal-delay': `${120 + ((index % HOME_PROGRAMS.length) * 70)}ms` }}
                          aria-hidden={isClone ? 'true' : undefined}
                          tabIndex={isClone ? -1 : undefined}
                        >
                          <span className="cf-program-card__badge">{program.badge}</span>
                          <img
                            src={program.image}
                            alt=""
                            className="cf-program-card__img"
                            loading="lazy"
                          />
                          <div className="cf-program-card__body">
                            <h4>{program.title}</h4>
                            <p>{program.blurb}</p>
                            <div className="cf-program-card__meta">
                              <span>Doctor-prescribed</span>
                              <span>Cold-chain delivery</span>
                            </div>
                            <div className="cf-program-card__cta">
                              <span>View protocol</span>
                              <span aria-hidden="true">→</span>
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <section className="cf-eligibility cf-reveal" style={{ '--reveal-delay': '90ms' }}>
              <div className="cf-eligibility__inner">
                <div className="cf-eligibility__copy">
                  <p className="cf-eligibility__kicker">Quick pre-check</p>
                  <h2 className="cf-eligibility__title">Are you eligible?</h2>
                  <p className="cf-eligibility__lede">
                    Most adults qualify for at least one physician-led program. Complete a short
                    medical questionnaire and our licensed team reviews your profile within 24
                    hours.
                  </p>
                  <ul className="cf-eligibility__list">
                    <li>Age 18+ with valid U.S. state residence</li>
                    <li>Clinical history reviewed by licensed providers</li>
                    <li>No commitment until after medical review</li>
                  </ul>
                  <button type="button" className="cf-btn-dune cf-eligibility__cta" onClick={openStart}>
                    Check my eligibility
                  </button>
                </div>

                <div className="cf-eligibility__media-grid">
                  <article className="cf-eligibility__media-card">
                    <img
                      src={MARKETING_IMAGES.home.eligibilityPrimary}
                      alt="Patient speaking with a clinician"
                      loading="lazy"
                      onError={(e) => setImageFallback(e, MARKETING_IMAGES.cards.doctorFemale)}
                    />
                  </article>
                  <article className="cf-eligibility__media-card">
                    <img
                      src={MARKETING_IMAGES.home.eligibilitySecondary}
                      alt="Wellness-focused lifestyle and movement"
                      loading="lazy"
                      onError={(e) => setImageFallback(e, MARKETING_IMAGES.cards.lifestyleRunner)}
                    />
                  </article>
                </div>
              </div>
            </section>

            {/* Plans photo band */}
            <section className="cf-plans cf-reveal" style={{ '--reveal-delay': '120ms' }}>
              <div className="cf-plans__panel">
                <img
                  className="cf-plans__bg"
                  src={MARKETING_IMAGES.cards.lifestyleRunner}
                  alt=""
                  loading="lazy"
                />
                <div className="cf-plans__scrim" />
                <div className="cf-plans__head">
                  <p className="cf-plans__kicker">Pax Plans</p>
                  <h2 className="cf-plans__title">
                    Pax Plans,<br className="cf-br-desktop" />elevated longevity care.
                  </h2>
                  <p className="cf-plans__lede">
                    Built for different goals and lifestyles, each tier includes physician-led protocols, concierge follow-up, and premium pharmacy fulfillment.
                  </p>
                </div>
                <div className="cf-plans__grid">
                  <article className="cf-plans__card">
                    <p className="cf-plans__card-chip">Essentials</p>
                    <h3>Pax Essentials</h3>
                    <p className="cf-plans__card-price">From <strong>$199</strong>/mo</p>
                    <p className="cf-plans__card-note">Core protocol + monthly provider check-ins.</p>
                  </article>
                  <article className="cf-plans__card cf-plans__card--featured">
                    <p className="cf-plans__card-chip">Most chosen</p>
                    <h3>Pax Performance</h3>
                    <p className="cf-plans__card-price">From <strong>$349</strong>/mo</p>
                    <p className="cf-plans__card-note">Advanced diagnostics, tighter monitoring, and goal-based adjustments.</p>
                  </article>
                  <article className="cf-plans__card">
                    <p className="cf-plans__card-chip">Premier</p>
                    <h3>Pax Signature</h3>
                    <p className="cf-plans__card-price">From <strong>$519</strong>/mo</p>
                    <p className="cf-plans__card-note">Full concierge cadence with priority physician access and white-glove support.</p>
                  </article>
                </div>
                <div className="cf-plans__actions">
                  <button type="button" className="cf-btn-dune" onClick={openStart}>Check eligibility & choose my plan</button>
                  <button type="button" className="cf-btn-light" onClick={openStart}>See physician-recommended match</button>
                </div>
              </div>
            </section>

            {/* Guidance CTA */}
            <section className="cf-guidance cf-reveal" style={{ '--reveal-delay': '150ms' }}>
              <div className="cf-guidance__panel">
                <div className="cf-guidance__grid">
                  <div className="cf-guidance__copy">
                    <p className="cf-guidance__kicker">Concierge Clinical Experience</p>
                    <h2 className="cf-guidance__title">
                      Personal guidance,<br />tailored to you.
                    </h2>
                    <p className="cf-guidance__lede">
                      Personalized guidance, physician-led protocols, advanced diagnostics, and a concierge telehealth experience designed around performance, recovery, longevity, and lifestyle.
                    </p>
                    <div className="cf-guidance__proof">
                      <span>Physician-led oversight</span>
                      <span>Custom diagnostics strategy</span>
                      <span>White-glove follow-up</span>
                    </div>
                    <button type="button" className="cf-btn-dune cf-btn-dune--lg cf-guidance__cta" onClick={openStart}>Begin intake assessment →</button>
                  </div>
                  <div className="cf-guidance__visual">
                    <img
                      src={MARKETING_IMAGES.home.guidance}
                      alt="Doctor consultation for personalized longevity care"
                      loading="lazy"
                    />
                    <div className="cf-guidance__visual-note">
                      <strong>24h review</strong>
                      <span>Typical clinical response time</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="faq cf-faq" id="faq">
              <div className="container">
                <div className="section-header-center cf-faq__head">
                  <p className="cf-faq__kicker">Support & clarity</p>
                  <h2 className="section-title">Frequently asked questions</h2>
                  <p className="cf-faq__lede">
                    Clear answers before you start. Every protocol is reviewed by licensed U.S. providers.
                  </p>
                </div>
                <div className="faq-list">
                  {HOME_FAQS.map((faq, idx) => (
                    <div key={faq.q} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
                      <button
                        className="faq-question"
                        onClick={() => handleFaqToggle(idx)}
                        aria-expanded={activeFaq === idx}
                        aria-controls={`faq-panel-${idx}`}
                      >
                        <span className="faq-question-id">{String(idx + 1).padStart(2, '0')}</span>
                        <span className="faq-question-text">{faq.q}</span>
                        <span className="faq-icon" aria-hidden="true">+</span>
                      </button>
                      <div className="faq-answer" id={`faq-panel-${idx}`}>
                        <div className="faq-answer-inner">
                          <p className="faq-answer-lead">{faq.lead}</p>
                          {faq.points?.length > 0 && (
                            <ul className="faq-answer-points">
                              {faq.points.map((point) => (
                                <li key={point}>{point}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Doctors */}
            <section className="cf-doctors">
              <div className="cf-doctors__inner">
                <h2 className="cf-doctors__title">
                  The best care<br />by the best in medicine
                </h2>
                <p className="cf-doctors__lede">Meet the team of leading specialists guiding your protocols.</p>
                <div className="cf-doctors__grid">
                  {HOME_DOCTORS.map((doc) => (
                    <article key={doc.name} className="cf-doctor-card">
                      <div className="cf-doctor-card__photo">
                        <img src={doc.image} alt={doc.name} loading="lazy" />
                      </div>
                      <h3>{doc.name}</h3>
                      <p>{doc.bio}</p>
                    </article>
                  ))}
                </div>
                <a href="#/advisors" className="cf-doctors__link">Meet our clinical advisory board →</a>
              </div>
            </section>
          </div>
        )}


        {/* ==================== VISION PAGE VIEW ==================== */}
        {currentTab === 'vision' && (
          <div className="fade-in">
            {/* Vision Banner Section */}
            <section className="vision-section" style={{ paddingTop: '8rem' }}>
              <div className="vision-wrap">
                <span className="vision-eyebrow">Our Vision</span>
                <p className="vision-text">
                  To make <em>longer, healthier, and fully functional lives</em> possible for all—powered by advanced diagnostics, personalized genomics, and the next generation of metabolic therapies.
                </p>
              </div>
            </section>

            {/* Philosophy details */}
            <section className="philosophies" style={{ padding: 'var(--space-3xl) 0', backgroundColor: 'var(--sand)' }}>
              <div className="container">
                <div className="section-header-center">
                  <span className="section-label">Philosophical Foundation</span>
                  <h2 className="section-title">The decline of aging is <em>now optional.</em></h2>
                </div>

                <div className="steps-grid" style={{ marginTop: 'var(--space-xl)' }}>
                  <div className="step-card">
                    <h3 className="step-title">01 / Proactive Interception</h3>
                    <p className="step-text" style={{ marginTop: 'var(--space-xs)' }}>
                      Traditional medicine responds after symptoms appear—when cellular decline has already progressed. Pax focuses on early biomarker tracking and preventative compounding to adjust levels before systems break down.
                    </p>
                  </div>
                  <div className="step-card">
                    <h3 className="step-title">02 / Customized Biology</h3>
                    <p className="step-text" style={{ marginTop: 'var(--space-xs)' }}>
                      Every metabolic rate, hormone profile, and recovery curve is highly individual. We discard the one-size-fits-all dosage model. Our clinics compound customized formulations corresponding strictly to patient biomarkers.
                    </p>
                  </div>
                  <div className="step-card">
                    <h3 className="step-title">03 / Coastal Vitality</h3>
                    <p className="step-text" style={{ marginTop: 'var(--space-xs)' }}>
                      Inspired by Miami's active, sun-drenched outdoor lifestyle, we view longevity not as the simple absence of disease, but as the active presence of raw physical energy, structural mobility, and cognitive clarity.
                    </p>
                  </div>
                </div>

                <div className="testimonial-wrap" style={{ marginTop: 'var(--space-3xl)' }}>
                  <div className="testimonial-player">
                    <img src="/images/sermorelin-recovery.webp" alt="Patient stretching on Miami beach" loading="lazy" />
                  </div>
                  <div className="testimonial-copy-side">
                    <span className="section-label">Aspirational Living</span>
                    <blockquote className="testimonial-quote">
                      “We believe in extending your healthspan to match your lifespan. Vitality is a active commitment, not a heritable guarantee.”
                    </blockquote>
                    <p className="step-text">— Clinical Advisory Board, Pax Longevity</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Milestones Section */}
            <section className="milestones-section">
              <div className="container">
                <div className="section-header-center">
                  <span className="section-label">Our Journey</span>
                  <h2 className="section-title">Key clinical <em>milestones.</em></h2>
                  <p className="hero-description" style={{ marginTop: 'var(--space-sm)' }}>
                    How we developed the next generation of preventative longevity care and active life therapies.
                  </p>
                </div>

                <div className="timeline-wrap">
                  <div className="timeline-track"></div>
                  <div className="timeline-wrap-flex">
                    
                    {/* Milestone 1: 2022 */}
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content-grid">
                        <div className="timeline-image-frame">
                          <img src="/images/milestone-2022.webp" alt="Genesis of Pax" loading="lazy" />
                        </div>
                        <div>
                          <span className="timeline-year">2022</span>
                          <h3 className="timeline-title">Genesis of Pax Longevity</h3>
                          <p className="timeline-desc">
                            Founded in Miami Beach, Florida with the core objective of linking coastal active living with advanced preventative medicine to stop biological decline before symptoms appear.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Milestone 2: 2023 */}
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content-grid">
                        <div className="timeline-image-frame">
                          <img src="/images/milestone-2023.webp" alt="Cellular Therapy Rollout" loading="lazy" />
                        </div>
                        <div>
                          <span className="timeline-year">2023</span>
                          <h3 className="timeline-title">Peptide Supply Partnerships</h3>
                          <p className="timeline-desc">
                            Established supply agreements with leading FDA-regulated 503A outsourcing pharmacies to secure premium pharmaceutical-grade compounding for weight management and NAD+ therapies.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Milestone 3: 2024 */}
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content-grid">
                        <div className="timeline-image-frame">
                          <img src="/images/milestone-2024.webp" alt="HIPAA-Compliant Pax Patient Center" loading="lazy" />
                        </div>
                        <div>
                          <span className="timeline-year">2024</span>
                          <h3 className="timeline-title">Patient Center Launch</h3>
                          <p className="timeline-desc">
                            Launched our secure, HIPAA-compliant Pax Patient Center, connecting members with licensed clinical practitioners for rapid medical reviews in under 24 hours.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Milestone 4: 2025 */}
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content-grid">
                        <div className="timeline-image-frame">
                          <img src="/images/milestone-2025.webp" alt="Precision Genome Auditing" loading="lazy" />
                        </div>
                        <div>
                          <span className="timeline-year">2025</span>
                          <h3 className="timeline-title">Whole Genome sequencing Rollout</h3>
                          <p className="timeline-desc">
                            Integrated full genome sequencing (analyzing 6.4 billion base pairs) and early cardiac plaque diagnostics to catch heritable traits and cancer indicators years before they develop.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ==================== THREATS PAGE VIEW ==================== */}
        {currentTab === 'threats' && (
          <div className="fade-in" style={{ paddingTop: '6rem' }}>
            <section className="threats-section">
              <div className="container">
                <div className="threats-header">
                  <p className="threats-kicker">Biological intercept points</p>
                  <h2 className="threats-title">
                    Four domains.<br />
                    <em>One longevity strategy.</em>
                  </h2>
                  <p className="threats-lede">
                    Aging rarely fails in one place. Pax maps cardiovascular, metabolic, cognitive, and oncological risk early — then builds physician-led protocols around what your biology actually shows.
                  </p>
                </div>

                <div className="threats-grid">
                  {THREAT_DOMAINS.map((domain) => (
                    <article key={domain.id} className="threat-card">
                      <div className="threat-card__media">
                        <img src={domain.image} alt={domain.alt} loading="lazy" />
                        <span className="threat-card__num">{domain.num}</span>
                      </div>
                      <div className="threat-card__body">
                        <p className="threat-card__focus">{domain.focus}</p>
                        <h3 className="threat-card__title">{domain.title}</h3>
                        <p className="threat-card__text">{domain.text}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="threats-audit">
                  <div className="threats-audit__head">
                    <p className="threats-kicker">Clinical audit map</p>
                    <h3 className="threats-audit__title">What we measure first</h3>
                  </div>
                  <div className="threats-audit__table-wrap">
                    <table className="threats-audit__table">
                      <thead>
                        <tr>
                          <th>Domain</th>
                          <th>Key indicators</th>
                          <th>Primary intervention path</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Cardiovascular</td>
                          <td>ApoB, Lp(a), hs-CRP</td>
                          <td>Lipid optimization & hormone balance</td>
                        </tr>
                        <tr>
                          <td>Metabolic</td>
                          <td>HbA1c, fasting insulin, visceral fat</td>
                          <td>GLP-1 protocols & NAD+ support</td>
                        </tr>
                        <tr>
                          <td>Cognitive</td>
                          <td>APOE context, sleep quality</td>
                          <td>Recovery cycles & sleep architecture</td>
                        </tr>
                        <tr>
                          <td>Oncological</td>
                          <td>Hereditary panels, cell-free DNA</td>
                          <td>Early biomarker interception</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== TREATMENTS PAGE VIEW ==================== */}
        {currentTab === 'treatments' && (
          <div className="fade-in" style={{ paddingTop: '6rem' }}>
            <section className="treatments">
              <div className="container">
                <div className="section-header-center">
                  <span className="section-label">Direct-to-Home Prescriptions</span>
                  <h2 className="section-title">Our <em>treatments.</em></h2>
                  <p className="hero-description" style={{ marginTop: 'var(--space-sm)' }}>
                    Licensed Pax care protocols providing access to premium clinical compoundings, custom cold-chain shipped straight to your door.
                  </p>
                </div>

                <div className="tx-layout">
                  <aside className="tx-rail">
                    <p className="tx-rail__label">How It Works</p>
                    <ol className="tx-rail__steps">
                      <li>Complete your intake and goals</li>
                      <li>Licensed provider reviews within 24 hours</li>
                      <li>Medication ships directly in temperature-safe packaging</li>
                    </ol>
                    <p className="tx-rail__selected">Selected: {selectedTxLabel}</p>
                    <button className="btn btn-primary btn-quiz-trigger tx-rail__cta" onClick={() => openStart(selectedTx)}>
                      Check eligibility & start
                    </button>
                  </aside>

                  <div className="tx-catalog">
                    <section className="tx-group">
                      <div className="tx-group__header">
                        <span className="tx-group__eyebrow">Category 01</span>
                        <h3 className="tx-group__title">Metabolic & Weight Care</h3>
                      </div>
                      <div className="tx-card-grid">
                        <article className={`tx-card ${selectedTx === 'glp' ? 'active' : ''}`}>
                          <div className="tx-card__media">
                            <img src={MARKETING_IMAGES.cards.glpPen} alt="Compounded GLP-1 treatment" loading="lazy" />
                            <span className="tx-card__badge">Most Requested</span>
                          </div>
                          <div className="tx-card__body">
                            <h4>Compounded GLP-1</h4>
                            <p>Semaglutide and Tirzepatide protocols for appetite, insulin sensitivity, and body-composition support.</p>
                            <div className="tx-card__meta">
                              <span className="tx-card__freq">Weekly</span>
                              <span className="tx-card__price">From <strong>$249</strong>/mo</span>
                            </div>
                            <button
                              type="button"
                              className={`tx-card__select ${selectedTx === 'glp' ? 'active' : ''}`}
                              onClick={() => setSelectedTx('glp')}
                              aria-pressed={selectedTx === 'glp'}
                            >
                              {selectedTx === 'glp' ? 'Selected ✓' : 'Select treatment'}
                            </button>
                          </div>
                        </article>
                        <article className={`tx-card ${selectedTx === 'metabolic' ? 'active' : ''}`}>
                          <div className="tx-card__media">
                            <img src={MARKETING_IMAGES.cards.pillBottle} alt="Metabolic oral support treatment" loading="lazy" />
                            <span className="tx-card__badge">Adjunct</span>
                          </div>
                          <div className="tx-card__body">
                            <h4>Metabolic Oral Support</h4>
                            <p>Targeted adjunct options to complement GLP protocols and improve long-term adherence.</p>
                            <div className="tx-card__meta">
                              <span className="tx-card__freq">Daily</span>
                              <span className="tx-card__price">From <strong>$89</strong>/mo</span>
                            </div>
                            <button
                              type="button"
                              className={`tx-card__select ${selectedTx === 'metabolic' ? 'active' : ''}`}
                              onClick={() => setSelectedTx('metabolic')}
                              aria-pressed={selectedTx === 'metabolic'}
                            >
                              {selectedTx === 'metabolic' ? 'Selected ✓' : 'Select treatment'}
                            </button>
                          </div>
                        </article>
                      </div>
                    </section>

                    <section className="tx-group">
                      <div className="tx-group__header">
                        <span className="tx-group__eyebrow">Category 02</span>
                        <h3 className="tx-group__title">Energy, Hormones & Recovery</h3>
                      </div>
                      <div className="tx-card-grid">
                        <article className={`tx-card ${selectedTx === 'nad' ? 'active' : ''}`}>
                          <div className="tx-card__media">
                            <img src={MARKETING_IMAGES.cards.vitalityBottle} alt="Compounded NAD+ treatment" loading="lazy" />
                            <span className="tx-card__badge">Cellular</span>
                          </div>
                          <div className="tx-card__body">
                            <h4>Compounded NAD+</h4>
                            <p>Mitochondrial support protocol designed to improve energy consistency and cognitive clarity.</p>
                            <div className="tx-card__meta">
                              <span className="tx-card__freq">2x Weekly</span>
                              <span className="tx-card__price">From <strong>$149</strong>/mo</span>
                            </div>
                            <button
                              type="button"
                              className={`tx-card__select ${selectedTx === 'nad' ? 'active' : ''}`}
                              onClick={() => setSelectedTx('nad')}
                              aria-pressed={selectedTx === 'nad'}
                            >
                              {selectedTx === 'nad' ? 'Selected ✓' : 'Select treatment'}
                            </button>
                          </div>
                        </article>
                        <article className={`tx-card ${selectedTx === 'sermorelin' ? 'active' : ''}`}>
                          <div className="tx-card__media">
                            <img src={MARKETING_IMAGES.cards.labsBox} alt="Compounded Sermorelin treatment" loading="lazy" />
                            <span className="tx-card__badge">Recovery</span>
                          </div>
                          <div className="tx-card__body">
                            <h4>Sermorelin Protocol</h4>
                            <p>Night-time recovery support focused on sleep architecture, muscle repair, and healthy aging markers.</p>
                            <div className="tx-card__meta">
                              <span className="tx-card__freq">Nightly</span>
                              <span className="tx-card__price">From <strong>$189</strong>/mo</span>
                            </div>
                            <button
                              type="button"
                              className={`tx-card__select ${selectedTx === 'sermorelin' ? 'active' : ''}`}
                              onClick={() => setSelectedTx('sermorelin')}
                              aria-pressed={selectedTx === 'sermorelin'}
                            >
                              {selectedTx === 'sermorelin' ? 'Selected ✓' : 'Select treatment'}
                            </button>
                          </div>
                        </article>
                        <article className={`tx-card ${selectedTx === 'hormone' ? 'active' : ''}`}>
                          <div className="tx-card__media">
                            <img src={MARKETING_IMAGES.cards.pillBottle} alt="TRT and HRT treatment support" loading="lazy" />
                            <span className="tx-card__badge">Hormones</span>
                          </div>
                          <div className="tx-card__body">
                            <h4>TRT / HRT Optimization</h4>
                            <p>Physician-guided hormone balancing plans personalized around bloodwork and symptom profile.</p>
                            <div className="tx-card__meta">
                              <span className="tx-card__freq">Monthly Plan</span>
                              <span className="tx-card__price">From <strong>$219</strong>/mo</span>
                            </div>
                            <button
                              type="button"
                              className={`tx-card__select ${selectedTx === 'hormone' ? 'active' : ''}`}
                              onClick={() => setSelectedTx('hormone')}
                              aria-pressed={selectedTx === 'hormone'}
                            >
                              {selectedTx === 'hormone' ? 'Selected ✓' : 'Select treatment'}
                            </button>
                          </div>
                        </article>
                      </div>
                    </section>

                    <section className="tx-group">
                      <div className="tx-group__header">
                        <span className="tx-group__eyebrow">Category 03</span>
                        <h3 className="tx-group__title">Aesthetic & Lifestyle Prescriptions</h3>
                      </div>
                      <div className="tx-card-grid tx-card-grid--two">
                        <article className={`tx-card ${selectedTx === 'hair' ? 'active' : ''}`}>
                          <div className="tx-card__media">
                            <img src={MARKETING_IMAGES.cards.vitalityBottle} alt="Hair restoration topical treatment" loading="lazy" />
                            <span className="tx-card__badge">Hair</span>
                          </div>
                          <div className="tx-card__body">
                            <h4>Hair Restoration Topicals</h4>
                            <p>Custom compounded topical blends for density, growth support, and scalp health maintenance.</p>
                            <div className="tx-card__meta">
                              <span className="tx-card__freq">Daily</span>
                              <span className="tx-card__price">From <strong>$79</strong>/mo</span>
                            </div>
                            <button
                              type="button"
                              className={`tx-card__select ${selectedTx === 'hair' ? 'active' : ''}`}
                              onClick={() => setSelectedTx('hair')}
                              aria-pressed={selectedTx === 'hair'}
                            >
                              {selectedTx === 'hair' ? 'Selected ✓' : 'Select treatment'}
                            </button>
                          </div>
                        </article>
                        <article className={`tx-card ${selectedTx === 'lifestyle' ? 'active' : ''}`}>
                          <div className="tx-card__media">
                            <img src={MARKETING_IMAGES.cards.pillBottle} alt="Sexual wellness tadalafil support" loading="lazy" />
                            <span className="tx-card__badge">Lifestyle</span>
                          </div>
                          <div className="tx-card__body">
                            <h4>Sexual Wellness Support</h4>
                            <p>Discreet provider-led tadalafil and performance-support protocols with flexible dose plans.</p>
                            <div className="tx-card__meta">
                              <span className="tx-card__freq">As Needed</span>
                              <span className="tx-card__price">From <strong>$69</strong>/mo</span>
                            </div>
                            <button
                              type="button"
                              className={`tx-card__select ${selectedTx === 'lifestyle' ? 'active' : ''}`}
                              onClick={() => setSelectedTx('lifestyle')}
                              aria-pressed={selectedTx === 'lifestyle'}
                            >
                              {selectedTx === 'lifestyle' ? 'Selected ✓' : 'Select treatment'}
                            </button>
                          </div>
                        </article>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== ADVISORS PAGE VIEW ==================== */}
        {currentTab === 'advisors' && (
          <div className="fade-in" style={{ paddingTop: '6rem' }}>
            <section className="sab-section">
              <div className="container">
                <div className="section-header-center">
                  <span className="section-label">Medical Direction</span>
                  <h2 className="section-title">Guided by pioneering <em>scientific minds.</em></h2>
                  <p className="hero-description" style={{ marginTop: 'var(--space-sm)' }}>
                    Our clinical protocols, dosage ranges, and exclusion audits are managed under guidance from clinical specialists and researchers.
                  </p>
                </div>
                
                <div className="sab-grid">
                  <div className="sab-member">
                    <div className="sab-photo-wrap">
                      <img src="/images/clinical-consultation.webp" alt="Dr. Elena Vance" loading="lazy" />
                    </div>
                    <p className="sab-name">Dr. Elena Vance</p>
                    <p className="sab-role">Scientific Director</p>
                    <p className="sab-bio">Leading clinical computational genomics expert shaping our patient cell targeting protocols.</p>
                  </div>
                  <div className="sab-member">
                    <div className="sab-photo-wrap">
                      <img src="/images/milestone-2024.webp" alt="Dr. Marcus Brody" loading="lazy" />
                    </div>
                    <p className="sab-name">Dr. Marcus Brody</p>
                    <p className="sab-role">Metabolic Science Advisor</p>
                    <p className="sab-bio">Endocrinologist detailing peptide dosing structures for metabolic reversal.</p>
                  </div>
                  <div className="sab-member">
                    <div className="sab-photo-wrap">
                      <img src="/images/wellness-therapy.webp" alt="Dr. Alan Chen" loading="lazy" />
                    </div>
                    <p className="sab-name">Dr. Alan Chen</p>
                    <p className="sab-role">Cardiovascular Advisor</p>
                    <p className="sab-bio">Pioneer of early plaque and cardiovascular marker interception technologies.</p>
                  </div>
                </div>

                <div className="step-card" style={{ maxWidth: '600px', margin: 'var(--space-3xl) auto 0', textAlign: 'center' }}>
                  <h3 className="step-title">Strict Medical Safety & Oversight</h3>
                  <p className="step-text" style={{ marginTop: 'var(--space-sm)' }}>
                    Every dosage is prescribed and monitored by state-licensed healthcare practitioners. If any heritable risks or clinical contradictions are flagged during your initial audit or subsequent blood tests, your advisor will contact you to modify your plan immediately.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}



        {/* ==================== EDUCATION PAGE VIEW ==================== */}
        {currentTab === 'education' && (
          <div className="fade-in" style={{ paddingTop: '6rem' }}>
            {/* Header Banner */}
            <section className="edu-hero">
              <div className="container">
                <div className="edu-hero-grid">
                  <div>
                    <span className="edu-kicker">🧬 Science & Education</span>
                    <h1 className="edu-title">The Science of <em>Longevity.</em></h1>
                    <p className="edu-subtitle">
                      Access expert webinars, clinical studies, and metabolic insights. Curated by the physicians and medical compounding partners behind Pax.
                    </p>
                    <div className="edu-filter-bar">
                      <button className={`edu-filter-btn ${eduFilter === 'all' ? 'active' : ''}`} onClick={() => setEduFilter('all')}>All Resources</button>
                      <button className={`edu-filter-btn ${eduFilter === 'webinars' ? 'active' : ''}`} onClick={() => setEduFilter('webinars')}>Webinars</button>
                      <button className={`edu-filter-btn ${eduFilter === 'articles' ? 'active' : ''}`} onClick={() => setEduFilter('articles')}>Articles</button>
                      <button className={`edu-filter-btn ${eduFilter === 'podcasts' ? 'active' : ''}`} onClick={() => setEduFilter('podcasts')}>Podcasts</button>
                    </div>
                  </div>
                  <div className="edu-hero-stats">
                    <div className="edu-stat-box">
                      <span className="edu-stat-num">12+</span>
                      <span className="edu-stat-label">Webinars</span>
                    </div>
                    <div className="edu-stat-box">
                      <span className="edu-stat-num">24+</span>
                      <span className="edu-stat-label">Research Articles</span>
                    </div>
                    <div className="edu-stat-box">
                      <span className="edu-stat-num">503A</span>
                      <span className="edu-stat-label">Clinical Guides</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Webinars Section */}
            {(eduFilter === 'all' || eduFilter === 'webinars') && (
              <section className="edu-section" style={{ background: 'var(--sand)' }}>
                <div className="container">
                  <div className="section-header-center">
                    <span className="section-label">01 — Video Webinars</span>
                    <h2 className="section-title">Clinical Audits & <em>Molecular Biology</em></h2>
                    <p className="hero-description" style={{ marginTop: 'var(--space-sm)' }}>
                      Expert lectures covering genomics, cellular recovery, plaque interception, and peptide compounding.
                    </p>
                  </div>

                  <div className="webinars-featured-grid">
                    {/* Featured 1 */}
                    <div className="webinar-featured-card card-dark" onClick={() => playWebinar('https://www.youtube.com/embed/pQZr6SqQsbQ', 'Preventing Disease Before Symptoms Appear')}>
                      <div className="webinar-image-wrap">
                        <img src="/images/genomics_lab_classic.webp" alt="Genomics lab" loading="lazy" />
                        <div className="webinar-play-overlay">
                          <span className="webinar-play-btn">▶</span>
                        </div>
                      </div>
                      <div className="webinar-content">
                        <div className="webinar-tags">
                          <span className="webinar-tag">Featured</span>
                          <span className="webinar-tag text-terracotta">Genomics</span>
                        </div>
                        <h3 className="webinar-title">Whole Genome Sequencing: Anticipating Heritable Plaque Risk</h3>
                        <p className="webinar-desc">
                          How mapping 6.4 billion base pairs allows clinicians to anticipate metabolic blockages and heritable plaque risk years before symptoms present.
                        </p>
                        <div className="webinar-presenter">
                          <div className="presenter-info">
                            <span className="presenter-label">Presented by</span>
                            <span className="presenter-name">Dr. Wei-Wu He</span>
                          </div>
                          <span className="webinar-watch-link">Watch Video →</span>
                        </div>
                      </div>
                    </div>

                    {/* Featured 2 */}
                    <div className="webinar-featured-card" onClick={() => playWebinar('https://www.youtube.com/embed/88jwr3-Ej0I', 'A Guide to Pancreatic Cancer Treatment')}>
                      <div className="webinar-image-wrap">
                        <img src="/images/metabolic_cellular_classic.webp" alt="Cellular mitochondria" loading="lazy" />
                        <div className="webinar-play-overlay">
                          <span className="webinar-play-btn">▶</span>
                        </div>
                      </div>
                      <div className="webinar-content">
                        <div className="webinar-tags">
                          <span className="webinar-tag">Webinar</span>
                          <span className="webinar-tag text-terracotta">Oncology</span>
                        </div>
                        <h3 className="webinar-title">Pancreatic Cancer Treatment Pathways & Early Interception</h3>
                        <p className="webinar-desc">
                          Dr. Keith Lillemoe discusses advanced treatment pathways, clinical indicators, and the vital role of early multi-modal detection.
                        </p>
                        <div className="webinar-presenter">
                          <div className="presenter-info">
                            <span className="presenter-label">Presented by</span>
                            <span className="presenter-name">Dr. Keith Lillemoe</span>
                          </div>
                          <span className="webinar-watch-link">Watch Video →</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Webinars Secondary Grid */}
                  <div className="webinars-grid">
                    {/* Webinar Card 1 */}
                    <div className="webinar-small-card" onClick={() => playWebinar('https://www.youtube.com/embed/-IR3Dy6Lxkc', 'Sleep Hygiene & Glymphatic Brain Clearance')}>
                      <div className="webinar-small-image">
                        <img src="/images/sleep_brain_classic.webp" alt="Brain sleep sleep science" loading="lazy" />
                        <span className="webinar-duration">18 mins</span>
                      </div>
                      <div className="webinar-small-content">
                        <span className="webinar-small-tag">Brain Health</span>
                        <h4 className="webinar-small-title">Sleep & Glymphatic Brain Clearance</h4>
                        <p className="webinar-small-desc">Dr. Margaret O'Byrne details sleep strategies for brain optimization.</p>
                      </div>
                    </div>

                    {/* Webinar Card 2 */}
                    <div className="webinar-small-card" onClick={() => playWebinar('https://www.youtube.com/embed/e1h3mdZDGSI', 'APOE Status & Early Plaque Interception')}>
                      <div className="webinar-small-image">
                        <img src="/images/threat-cardio.webp" alt="Biomarker graphics" loading="lazy" />
                        <span className="webinar-duration">22 mins</span>
                      </div>
                      <div className="webinar-small-content">
                        <span className="webinar-small-tag">Cardiovascular</span>
                        <h4 className="webinar-small-title">APOE Status & Plaque Interception</h4>
                        <p className="webinar-small-desc">A lecture outlining early plaque risk interception technologies.</p>
                      </div>
                    </div>

                    {/* Webinar Card 3 */}
                    <div className="webinar-small-card" onClick={() => playWebinar('https://www.youtube.com/embed/Erstue61B3Q', 'GLP-1 Compounding and Insulin Management')}>
                      <div className="webinar-small-image">
                        <img src="/images/threat-metabolic.webp" alt="Cellular lab tests" loading="lazy" />
                        <span className="webinar-duration">15 mins</span>
                      </div>
                      <div className="webinar-small-content">
                        <span className="webinar-small-tag">Metabolic Care</span>
                        <h4 className="webinar-small-title">Listen to Your Gut: Abdominal Diagnostics</h4>
                        <p className="webinar-small-desc">Dr. Scott Levenson provides guidelines for metabolic symptom auditing.</p>
                      </div>
                    </div>

                    {/* Webinar Card 4 */}
                    <div className="webinar-small-card" onClick={() => playWebinar('https://www.youtube.com/embed/Bmtj91tNUYc', 'Active Wellness: The Coastal Longevity Factor')}>
                      <div className="webinar-small-image">
                        <img src="/images/coastal_running_classic.webp" alt="Coastal jogger model" loading="lazy" />
                        <span className="webinar-duration">25 mins</span>
                      </div>
                      <div className="webinar-small-content">
                        <span className="webinar-small-tag">Active Lifestyle</span>
                        <h4 className="webinar-small-title">Immune Health & Inflammatory Age</h4>
                        <p className="webinar-small-desc">Dr. David Furman details how systemic inflammation affects healthspan.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Articles Section */}
            {(eduFilter === 'all' || eduFilter === 'articles') && (
              <section className="edu-section" style={{ background: 'rgba(232, 197, 160, 0.08)', borderTop: '1px solid var(--divider)' }}>
                <div className="container">
                  <div className="section-header-center">
                    <span className="section-label">02 — Science Articles</span>
                    <h2 className="section-title">Clinical Research & <em>Biomarker Guides</em></h2>
                    <p className="hero-description" style={{ marginTop: 'var(--space-sm)' }}>
                      In-depth publications analyzing biomarker profiles, sleep science, and genetic variants.
                    </p>
                  </div>

                  {/* Featured Article Box */}
                  <div className="article-featured-box">
                    <div className="article-featured-image">
                      <img src="/images/nad-longevity.webp" alt="Lab diagnostics" loading="lazy" />
                    </div>
                    <div className="article-featured-content">
                      <div className="article-meta">
                        <span className="article-tag">Featured Paper</span>
                        <span className="article-read-time">9 min read</span>
                      </div>
                      <h3 className="article-featured-title">Clinical Auditing: Detecting Cardiovascular Decline Decades Prior to Symptoms</h3>
                      <p className="article-featured-desc">
                        A detailed clinical review showing how tracking ApoB, Lp(a), and heritable heart factors allows physicians to design compounded therapies that halt plaque buildup early.
                      </p>
                      <button className="btn btn-primary" onClick={() => openArticle('Cardiovascular Auditing', 'This clinical document highlights the power of early ApoB testing combined with multi-modal arterial tracking. In contrast to traditional care models which wait for arterial symptoms or adverse events, early plaque interception involves quantifying lipoprotein size and evaluating the APOE genetic baseline. Customized compounding treatments, including bio-identical hormone optimization and lipid-lowering audits, are titrated based on monthly blood assays to ensure regression or stabilization of heritable plaque.', 'https://www.linkedin.com/pulse/he-felt-healthy-good-condition-his-100-screening-3hzbc/?trackingId=tJZj7U2PQMuc%2BOgEO5UC1g%3D%3D')}>Read Document</button>
                    </div>
                  </div>

                  {/* Articles Grid */}
                  <div className="articles-grid">
                    {/* Article Card 1 */}
                    <div className="article-card" onClick={() => openArticle('APOE-4 Gene Management', 'APOE-4 is the strongest genetic risk factor for Alzheimer\'s disease. However, genetic risk is not clinical destiny. Early detection allows for the integration of proactive metabolic interventions, lipid optimization, and glymphatic brain clearance protocols. By keeping cholesterol synthesis and systemic inflammation low, APOE-4 carriers can meaningfully delay or prevent onset.', 'https://www.linkedin.com/pulse/dementia-risk-modifiable-your-control-human-longevity-inc--dr5rc/?trackingId=fDCpFlkKSWmz527gvug8Zw%3D%3D')}>
                      <span className="article-card-num">01</span>
                      <h4 className="article-card-title">APOE-4 Gene Management & Cognitive Decline</h4>
                      <p className="article-card-desc">Understanding heritable brain risks and how custom sleep and dietary interventions reduce cognitive symptoms.</p>
                      <span className="article-card-link">Read Article →</span>
                    </div>

                    {/* Article Card 2 */}
                    <div className="article-card" onClick={() => openArticle('GLP-1 Compounding Mechanics', 'Compounded GLP-1 (Semaglutide) acts as a selective receptor agonist. By stimulating insulin release and delaying gastric emptying, it intercepts metabolic dysfunction. High-end clinical monitoring ensures dosage is titrated to target cellular insulin sensitivity without compromising skeletal muscle mass.', 'https://www.linkedin.com/pulse/cancer-death-preventable-precision-early-detection-cayyc/?trackingId=lUIol2opRx2Xuq0RSzpv%2Bg%3D%3D')}>
                      <span className="article-card-num">02</span>
                      <h4 className="article-card-title">GLP-1 Compounding: The Mechanics of Insulin Care</h4>
                      <p className="article-card-desc">A deep dive into compounded Semaglutide, dosage titrations, and cellular safety protocols.</p>
                      <span className="article-card-link">Read Article →</span>
                    </div>

                    {/* Article Card 3 */}
                    <div className="article-card" onClick={() => openArticle('NAD+ Synthesis & Sirtuins', 'Nicotinamide Adenine Dinucleotide (NAD+) is crucial for cellular energy production. Sourcing compounded intracellular NAD+ injections activates sirtuins, a family of signaling proteins that play a vital role in repairing cellular DNA damage and stimulating cell longevity.', 'https://www.linkedin.com/pulse/health-new-wealth-patients-perspective-human-longevity-inc--mde5c/?trackingId=kEeJI17aRFGFCsXka8Hzfw%3D%3D')}>
                      <span className="article-card-num">03</span>
                      <h4 className="article-card-title">NAD+ Sourcing: Mitochondrial Sirtuin Activation</h4>
                      <p className="article-card-desc">How compounded intracellular NAD+ injections stimulate sirtuins to repair dna damage and boost cellular energy.</p>
                      <span className="article-card-link">Read Article →</span>
                    </div>

                    {/* Article Card 4 */}
                    <div className="article-card" onClick={() => openArticle('Cardiovascular Centenarian Assays', 'Centenarian studies reveal key lipid markers that prevent plaque. Specifically, maintaining exceptionally low levels of ApoB and low inflammatory markers throughout life correlates directly with cardiovascular longevity. Precision audits target these profiles early.', 'https://www.linkedin.com/pulse/he-felt-healthy-good-condition-his-100-screening-3hzbc/?trackingId=tJZj7U2PQMuc%2BOgEO5UC1g%3D%3D')}>
                      <span className="article-card-num">04</span>
                      <h4 className="article-card-title">Lipid Profiles: Centenarian Cardiovascular Assays</h4>
                      <p className="article-card-desc">What centenarian databases reveal about optimal ApoB targets for extreme longevity.</p>
                      <span className="article-card-link">Read Article →</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Podcasts Section */}
            {(eduFilter === 'all' || eduFilter === 'podcasts') && (
              <section className="edu-section" style={{ background: 'var(--sand)', borderTop: '1px solid var(--divider)' }}>
                <div className="container">
                  <div className="section-header-center">
                    <span className="section-label">03 — Video Podcasts</span>
                    <h2 className="section-title">The Livelong <em>Podcast Series</em></h2>
                    <p className="hero-description" style={{ marginTop: 'var(--space-sm)' }}>
                      In-depth interviews with molecular scientists, longevity physicians, and precision medicine leaders.
                    </p>
                  </div>

                  <div className="article-featured-box">
                    <div className="article-featured-image" style={{ position: 'relative', cursor: 'pointer' }} onClick={() => playWebinar('https://www.youtube.com/embed/WmzSpOKoppM', 'Dr. Wei-Wu He on Livelong Podcast')}>
                      <img src="/images/clinical-consultation.webp" alt="Dr. He interview" loading="lazy" />
                      <div className="webinar-play-overlay">
                        <span className="webinar-play-btn">▶</span>
                      </div>
                    </div>
                    <div className="article-featured-content">
                      <div className="article-meta">
                        <span className="article-tag">Livelong Podcast</span>
                        <span className="article-read-time">45 mins</span>
                      </div>
                      <h3 className="article-featured-title">Dr. Wei-Wu He: Sourcing AI-Driven Diagnostics & Intracellular Reversal</h3>
                      <p className="article-featured-desc">
                        Dr. Wei-Wu He joins the Livelong Podcast to discuss the philosophical foundation of mapping genomic risk markers early, the safety parameters of compounding peptides, and preventing disease years before symptoms manifest.
                      </p>
                      <button className="btn btn-primary" onClick={() => playWebinar('https://www.youtube.com/embed/WmzSpOKoppM', 'Dr. Wei-Wu He on Livelong Podcast')}>Watch Podcast</button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Video Player Modal */}
            {activeVideoUrl && (
              <div className="modal open" style={{ zIndex: '3000' }}>
                <div className="modal-overlay" onClick={closeWebinar}></div>
                <div className="modal-content video-modal-content">
                  <button className="modal-close" onClick={closeWebinar}>×</button>
                  <h3 className="modal-title" style={{ marginBottom: 'var(--space-md)', color: 'var(--ink)' }}>{activeVideoTitle}</h3>
                  <div className="video-aspect-wrap">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`${activeVideoUrl}${activeVideoUrl.includes('?') ? '&' : '?'}autoplay=1`} 
                      title={activeVideoTitle} 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>
            )}

            {/* Article Modal */}
            {activeArticle && (
              <div className="modal open" style={{ zIndex: '3000' }}>
                <div className="modal-overlay" onClick={closeArticle}></div>
                <div className="modal-content article-modal-content">
                  <button className="modal-close" onClick={closeArticle}>×</button>
                  <span className="section-label" style={{ marginBottom: '4px' }}>Science Publication</span>
                  <h3 className="modal-title" style={{ color: 'var(--ink)', fontSize: '1.8rem', fontFamily: 'var(--font-display)', fontStyle: 'italic', marginBottom: 'var(--space-md)' }}>{activeArticle.title}</h3>
                  <p className="presenter-label" style={{ marginBottom: 'var(--space-lg)' }}>Published by Pax Precision Medical Team</p>
                  <div className="article-body-text" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    <p>{activeArticle.content}</p>
                    <p><strong>Clinical Summary:</strong> Proactive genetic risk assessment combined with clinical-grade compounded peptide oversight forms the cornerstone of modern personalized longevity medicine. Sourcing custom compounded formulas from 503A accredited facilities prevents safety compromises and maximizes intracellular bioavailability.</p>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-lg)', flexWrap: 'wrap' }}>
                    {activeArticle.url && (
                      <a href={activeArticle.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                        Read Original on LinkedIn
                      </a>
                    )}
                    <button className="btn btn-outline" onClick={closeArticle}>Close Document</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ==================== LIFESTYLE PILLAR PAGES ==================== */}
        {activeLifestyle && (
          <div className="fade-in lifestyle-page">
            <section className="lifestyle-hero">
              <img src={activeLifestyle.image} alt={activeLifestyle.alt} className="lifestyle-hero-img" loading="eager" />
              <div className="lifestyle-hero-overlay" />
              <div className="container lifestyle-hero-content">
                <a href="#/" className="lifestyle-back-link">← Back to home</a>
                <span className="section-label lifestyle-hero-label">{activeLifestyle.eyebrow}</span>
                <h1 className="lifestyle-hero-title">{activeLifestyle.title}</h1>
                <p className="lifestyle-hero-tagline">{activeLifestyle.teaser}</p>
              </div>
            </section>

            <section className="lifestyle-content">
              <div className="container">
                <div className="lifestyle-content-grid">
                  <div className="lifestyle-prose">
                    <p className="lifestyle-lead">{activeLifestyle.summary}</p>
                    <h2 className="lifestyle-subtitle">How we integrate it</h2>
                    <ul className="lifestyle-practices">
                      {activeLifestyle.practices.map((practice) => (
                        <li key={practice}>{practice}</li>
                      ))}
                    </ul>
                  </div>
                  <aside className="lifestyle-aside">
                    <div className="lifestyle-aside-card">
                      <span className="section-label">Clinical Connection</span>
                      <p className="lifestyle-aside-text">
                        Your physician maps each lifestyle pillar to personalized peptide protocols, bloodwork cadence, and dosing schedules — so daily habits compound clinical outcomes.
                      </p>
                      <a href={activeLifestyle.relatedLink} className="btn btn-primary lifestyle-aside-btn">
                        {activeLifestyle.relatedLabel}
                      </a>
                      <button className="btn btn-outline btn-quiz-trigger lifestyle-aside-btn" onClick={openStart}>
                        Find my treatment
                      </button>
                    </div>
                  </aside>
                </div>

                <div className="lifestyle-more">
                  <div className="section-header-center" style={{ marginBottom: 'var(--space-xl)' }}>
                    <span className="section-label">The Pax Lifestyle</span>
                    <h2 className="section-title" style={{ fontSize: '2rem' }}>Explore more <em>pillars.</em></h2>
                  </div>
                  <div className="lifestyle-more-grid">
                    {LIFESTYLE_PILLARS.filter((pillar) => pillar.id !== currentTab).map((pillar) => (
                      <a key={pillar.id} href={`#/${pillar.id}`} className="lifestyle-more-card">
                        <div className="lifestyle-more-image">
                          <img src={pillar.image} alt={pillar.alt} loading="lazy" />
                        </div>
                        <div className="lifestyle-more-body">
                          <h3>{pillar.title}</h3>
                          <span className="lifestyle-more-link">Read more →</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== LEGAL PAGES ==================== */}
        {LEGAL_PAGE_IDS.includes(currentTab) && (
          <LegalPage pageId={currentTab} />
        )}

      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <BrandLogo variant="footer" />
              <p className="footer-tagline">
                {PAX_PASSPORT.product.tagline} · Miami Beach, FL
              </p>
              <div className="footer-socials">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Instagram">
                  <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="X (formerly Twitter)">
                  <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Facebook">
                  <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>

            <div className="footer-links-col">
              <span className="footer-col-title">Care</span>
              <a href="#/treatments" className="footer-link">Treatments</a>
              <a href="#/start" className="footer-link">Start treatment</a>
              <a href="#/portal" className="footer-link">Patient Center</a>
            </div>

            <div className="footer-links-col">
              <span className="footer-col-title">Company</span>
              <a href="#/vision" className="footer-link">Vision</a>
              <a href="#/threats" className="footer-link">Threats</a>
              <a href="#/advisors" className="footer-link">Advisors</a>
              <a href="#/education" className="footer-link">Education</a>
            </div>

            <div className="footer-links-col">
              <span className="footer-col-title">Legal</span>
              <a href="#/privacy" className="footer-link">Privacy</a>
              <a href="#/terms" className="footer-link">Terms</a>
              <a href="#/medical-disclaimer" className="footer-link">Medical Disclaimer</a>
            </div>
          </div>

          <div className="footer-badge-strip">
            <span className="footer-badge-item">HIPAA-compliant</span>
            <span className="footer-badge-item">503A pharmacy partners</span>
            <span className="footer-badge-item">U.S. licensed providers</span>
          </div>

          <p className="footer-disclaimer">
            Compounded medications are prepared by licensed 503A pharmacies and are not FDA-approved. Pax Longevity connects members with licensed clinicians. This is not a substitute for medical advice.
          </p>

          <div className="footer-bottom">
            <p className="footer-copy">© 2026 Pax Longevity</p>
            <div className="footer-legal-links">
              <a href="#/privacy" className="footer-legal-link">Privacy</a>
              <a href="#/terms" className="footer-legal-link">Terms</a>
              <a href="#/medical-disclaimer" className="footer-legal-link">Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>

    </>
  );
}

