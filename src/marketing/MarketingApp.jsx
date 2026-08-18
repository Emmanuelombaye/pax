import { useState, useEffect, useRef } from 'react';
import { BrandLogo } from '../brand/index.js';
import { LIFESTYLE_PILLARS, THREAT_DOMAINS } from './data.js';
import { MARKETING_IMAGES } from './assets.js';
import LegalPage from './LegalPage.jsx';
import { LEGAL_LINKS, LEGAL_PAGE_IDS } from './legalContent.js';
import YuccaHome from './YuccaHome.jsx';
import TreatmentsExplore from './TreatmentsExplore.jsx';
import HowItWorksPage from './HowItWorksPage.jsx';
import { resolveTreatmentId } from '../start/startFlowData.js';

const START_TREATMENT_MAP = {
  semaglutide: 'semaglutide',
  tirzepatide: 'tirzepatide',
  glp: 'semaglutide',
  'weight-loss': 'semaglutide',
  nad: 'semaglutide',
  longevity: 'semaglutide',
  sermorelin: 'semaglutide',
  recovery: 'semaglutide',
  'muscle-recovery': 'semaglutide',
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
  const [selectedTx, setSelectedTx] = useState('semaglutide');
  const programScrollerRef = useRef(null);
  


  useEffect(() => {
    setIsNavOpen(false);
  }, [currentTab]);

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
    setIsNavOpen((open) => {
      const next = !open;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  };

  const handleFaqToggle = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const openStart = (treatmentSeed) => {
    if (!treatmentSeed) {
      window.location.hash = '#/start';
      return;
    }
    const mapped =
      resolveTreatmentId(treatmentSeed) || START_TREATMENT_MAP[treatmentSeed] || null;
    window.location.hash = mapped ? `#/start?treatment=${encodeURIComponent(mapped)}` : '#/start';
  };

  const activeLifestyle = LIFESTYLE_PILLARS.find((pillar) => pillar.id === currentTab);

  return (
    <div className="yx-shell">
      <div className="yx-promo">
        Pax Longevity offer · Semaglutide from <strong>$125/mo</strong> on the 6-month plan
        <button type="button" onClick={() => openStart('semaglutide')}>Lock in price →</button>
      </div>

      {/* Yucca order: trust marquee directly under promo, then pill nav */}
      <div className="yxr-trustbar yxr-trustbar--shell" aria-hidden="true">
        <div className="yxr-trustbar__track">
          {[0, 1].map((loop) => (
            <div key={loop} className="yxr-trustbar__group">
              <span className="yxr-trustbar__item">U.S. Licensed Pharmacies</span>
              <span className="yxr-trustbar__item">Licensed U.S. Provider Review</span>
              <span className="yxr-trustbar__item">Shipping if prescribed</span>
              <span className="yxr-trustbar__item">Pax Longevity Patient Center</span>
            </div>
          ))}
        </div>
      </div>

      {/* Header / Navigation — logo | centered menu | actions */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container yx-header-bar">
          <BrandLogo variant="header" />

          <nav className="yx-nav" aria-label="Primary">
            <div className="yx-nav__links">
              <a href="#/treatments/weight-loss" className={`yx-nav__link ${currentTab === 'treatments' ? 'active' : ''}`}>
                Treatments
              </a>
              <a
                href="#/how-it-works"
                className={`yx-nav__link ${currentTab === 'how-it-works' ? 'active' : ''}`}
              >
                How it works
              </a>
            </div>
          </nav>

          <div className="yx-nav__actions">
            <a href="#/start" className="yx-btn yx-btn--ghost">
              Log in
            </a>
            <button type="button" className="yx-btn yx-btn--primary" onClick={openStart}>
              Get started
            </button>
          </div>

          <button
            type="button"
            className={`nav-toggle ${isNavOpen ? 'active' : ''}`}
            onClick={toggleMobileNav}
            aria-label={isNavOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isNavOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu — Yucca-style drawer */}
      <div
        className={`mobile-overlay ${isNavOpen ? 'open' : ''}`}
        onClick={toggleMobileNav}
        aria-hidden={!isNavOpen}
      />
      <div className={`mobile-nav ${isNavOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="mobile-nav__top">
          <div className="mobile-nav__brand">
            <BrandLogo variant="drawer" onClick={toggleMobileNav} />
          </div>
          <button type="button" className="mobile-nav__close" onClick={toggleMobileNav} aria-label="Close menu">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <p className="mobile-nav__eyebrow">Explore</p>
        <div className="mobile-nav__links">
          <a href="#/" className={`mobile-link ${currentTab === 'home' ? 'active' : ''}`} onClick={toggleMobileNav}>
            Home
            <span className="mobile-link__chev" aria-hidden="true">
              →
            </span>
          </a>
          <a
            href="#/treatments/weight-loss"
            className={`mobile-link ${currentTab === 'treatments' ? 'active' : ''}`}
            onClick={toggleMobileNav}
          >
            Treatments
            <span className="mobile-link__chev" aria-hidden="true">
              →
            </span>
          </a>
          <a
            href="#/how-it-works"
            className={`mobile-link ${currentTab === 'how-it-works' ? 'active' : ''}`}
            onClick={toggleMobileNav}
          >
            How it works
            <span className="mobile-link__chev" aria-hidden="true">
              →
            </span>
          </a>
          <a href="#/start" className="mobile-link" onClick={toggleMobileNav}>
            Patient Center
            <span className="mobile-link__chev" aria-hidden="true">
              →
            </span>
          </a>
        </div>

        <div className="mobile-nav__footer">
          <a href="#/start" className="yx-btn yx-btn--ghost" onClick={toggleMobileNav}>
            Log in
          </a>
          <button
            type="button"
            className="yx-btn yx-btn--primary"
            onClick={() => {
              toggleMobileNav();
              openStart();
            }}
          >
            Get started
          </button>
        </div>
      </div>

      {/* DYNAMIC PAGE VIEWS */}
      <main style={{ minHeight: '60vh' }}>
        
        {/* ==================== HOME PAGE VIEW ==================== */}
        {currentTab === 'home' && (
          <YuccaHome
            openStart={openStart}
            activeFaq={activeFaq}
            onFaqToggle={handleFaqToggle}
          />
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
          <TreatmentsExplore
            selectedTx={selectedTx}
            setSelectedTx={setSelectedTx}
            openStart={openStart}
          />
        )}

        {currentTab === 'how-it-works' && (
          <HowItWorksPage openStart={openStart} />
        )}

        {/* Providers + Education pages disabled (routes redirect home) */}

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
                Pax Longevity LLC d/b/a Pax Longevity®. Licensed clinical care. Clear pricing. Qualified U.S. pharmacy fulfillment.
              </p>
            </div>

            <div className="footer-links-col">
              <span className="footer-col-title">Care</span>
              <a href="#/treatments/weight-loss" className="footer-link">Treatments</a>
              <a href="#/how-it-works" className="footer-link">How it works</a>
              <a href="#/start" className="footer-link">Start treatment</a>
              <a href="#/start" className="footer-link">Patient Center</a>
            </div>

            <div className="footer-links-col">
              <span className="footer-col-title">Company</span>
              <a href="#/vision" className="footer-link">Vision</a>
              <a href="#/threats" className="footer-link">Threats</a>
              <a href="mailto:support@paxlongevity.com" className="footer-link">support@paxlongevity.com</a>
            </div>

            <div className="footer-links-col footer-links-col--legal">
              <span className="footer-col-title">Legal</span>
              {LEGAL_LINKS.map((link) => (
                <a key={link.id} href={link.href} className="footer-link">{link.label}</a>
              ))}
            </div>
          </div>

          <div className="footer-trust">
            <div className="footer-trust__badge">
              <span className="footer-trust__icon footer-trust__icon--flag" aria-hidden="true">
                <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="footer-us-flag-clip">
                      <rect x="0" y="0" width="40" height="40" rx="7" />
                    </clipPath>
                  </defs>
                  <g clipPath="url(#footer-us-flag-clip)">
                    <rect width="40" height="40" fill="#fff" />
                    <rect y="0" width="40" height="3.08" fill="#B22234" />
                    <rect y="6.16" width="40" height="3.08" fill="#B22234" />
                    <rect y="12.32" width="40" height="3.08" fill="#B22234" />
                    <rect y="18.48" width="40" height="3.08" fill="#B22234" />
                    <rect y="24.64" width="40" height="3.08" fill="#B22234" />
                    <rect y="30.8" width="40" height="3.08" fill="#B22234" />
                    <rect y="36.96" width="40" height="3.04" fill="#B22234" />
                    <rect width="16.4" height="21.55" fill="#3C3B6E" />
                    <g fill="#fff">
                      <circle cx="2.2" cy="2.4" r="0.55" />
                      <circle cx="5.5" cy="2.4" r="0.55" />
                      <circle cx="8.8" cy="2.4" r="0.55" />
                      <circle cx="12.1" cy="2.4" r="0.55" />
                      <circle cx="15.2" cy="2.4" r="0.55" />
                      <circle cx="3.85" cy="5.15" r="0.55" />
                      <circle cx="7.15" cy="5.15" r="0.55" />
                      <circle cx="10.45" cy="5.15" r="0.55" />
                      <circle cx="13.75" cy="5.15" r="0.55" />
                      <circle cx="2.2" cy="7.9" r="0.55" />
                      <circle cx="5.5" cy="7.9" r="0.55" />
                      <circle cx="8.8" cy="7.9" r="0.55" />
                      <circle cx="12.1" cy="7.9" r="0.55" />
                      <circle cx="15.2" cy="7.9" r="0.55" />
                      <circle cx="3.85" cy="10.65" r="0.55" />
                      <circle cx="7.15" cy="10.65" r="0.55" />
                      <circle cx="10.45" cy="10.65" r="0.55" />
                      <circle cx="13.75" cy="10.65" r="0.55" />
                      <circle cx="2.2" cy="13.4" r="0.55" />
                      <circle cx="5.5" cy="13.4" r="0.55" />
                      <circle cx="8.8" cy="13.4" r="0.55" />
                      <circle cx="12.1" cy="13.4" r="0.55" />
                      <circle cx="15.2" cy="13.4" r="0.55" />
                      <circle cx="3.85" cy="16.15" r="0.55" />
                      <circle cx="7.15" cy="16.15" r="0.55" />
                      <circle cx="10.45" cy="16.15" r="0.55" />
                      <circle cx="13.75" cy="16.15" r="0.55" />
                      <circle cx="2.2" cy="18.9" r="0.55" />
                      <circle cx="5.5" cy="18.9" r="0.55" />
                      <circle cx="8.8" cy="18.9" r="0.55" />
                      <circle cx="12.1" cy="18.9" r="0.55" />
                      <circle cx="15.2" cy="18.9" r="0.55" />
                    </g>
                  </g>
                </svg>
              </span>
              <span className="footer-trust__copy">
                <span className="footer-trust__kicker">Compounded by</span>
                <span className="footer-trust__title">Licensed Pharmacies in the USA</span>
              </span>
            </div>

            <a href="#/hipaa" className="footer-trust__badge footer-trust__badge--link">
              <span className="footer-trust__icon footer-trust__icon--caduceus" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 8.5v31" stroke="#F4F1EA" strokeWidth="1.7" strokeLinecap="round" />
                  <circle cx="24" cy="7.2" r="2.15" fill="#F4F1EA" />
                  <path
                    d="M24 11.2c-7.2-.2-12.4 3.4-15.2 8.1 6.1-2.6 11.1-1.4 15.2 3.2 4.1-4.6 9.1-5.8 15.2-3.2-2.8-4.7-8-8.3-15.2-8.1Z"
                    fill="#F4F1EA"
                    fillOpacity="0.92"
                  />
                  <path
                    d="M15.2 18.4c7.6 3.6 7.8 7.2.4 10.6 7.6 3.4 7.4 7.2-.2 10.8"
                    stroke="#F4F1EA"
                    strokeWidth="2.05"
                    strokeLinecap="round"
                    opacity="0.88"
                  />
                  <path
                    d="M32.8 18.4c-7.6 3.6-7.8 7.2-.4 10.6-7.6 3.4-7.4 7.2.2 10.8"
                    stroke="#F4F1EA"
                    strokeWidth="2.05"
                    strokeLinecap="round"
                    opacity="0.62"
                  />
                  <circle cx="14.6" cy="18.1" r="1.35" fill="#F4F1EA" />
                  <circle cx="33.4" cy="18.1" r="1.35" fill="#F4F1EA" fillOpacity="0.72" />
                </svg>
              </span>
              <span className="footer-trust__copy">
                <span className="footer-trust__kicker">Data protected</span>
                <span className="footer-trust__hipaa">HIPAA</span>
                <span className="footer-trust__sub">Compliant</span>
              </span>
            </a>
          </div>

          <div className="footer-badge-strip">
            <span className="footer-badge-item">U.S.-licensed provider review</span>
            <span className="footer-badge-item">Licensed pharmacy fulfillment when prescribed</span>
            <span className="footer-badge-item">Treatment not guaranteed</span>
          </div>

          <p className="footer-disclaimer">
            Pax Longevity® is a telehealth platform that connects eligible patients with independent US-licensed providers and
            licensed pharmacy partners. Pax Longevity® is not a pharmacy and does not itself practice medicine. Prescription
            products are provided only if clinically appropriate after review by a US-licensed provider. Individual results
            may vary.
          </p>
          <p className="footer-disclaimer">
            <strong>Service availability:</strong> Services may not be available in all states. Availability may vary by
            treatment, provider licensure, pharmacy fulfillment, and patient eligibility.
          </p>
          <p className="footer-disclaimer">
            <strong>Pharmacy &amp; fulfillment:</strong> Pax Longevity® is not a pharmacy, drug manufacturer, outsourcing
            facility, or compounding facility, and does not compound, manufacture, dispense, or physically fulfill
            medications. If prescription treatment is clinically appropriate, medication may be fulfilled through a
            licensed dispensing pharmacy pursuant to a patient-specific prescription. Compounded medications are not
            FDA-approved as finished branded products. *Timing not guaranteed.
          </p>
          <p className="footer-disclaimer">
            <strong>Product imagery:</strong> Displayed product imagery is intended solely for illustrative purposes and
            is not intended to imply that Pax Longevity® compounds, manufactures, dispenses, or physically fulfills
            medications. Actual medication packaging and pharmacy labeling may differ.
          </p>

          <div className="footer-bottom">
            <p className="footer-copy">Pax Longevity LLC d/b/a Pax Longevity® · © {new Date().getFullYear()} Pax Longevity®. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

