import { useState, useEffect, useRef } from 'react';
import { BrandLogo, PAX_PASSPORT } from '../brand/index.js';
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
              <span className="yxr-trustbar__item">Free Expedited Shipment</span>
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
            <a href="#/portal" className="yx-btn yx-btn--ghost">
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
          <a href="#/portal" className="mobile-link" onClick={toggleMobileNav}>
            Patient Center
            <span className="mobile-link__chev" aria-hidden="true">
              →
            </span>
          </a>
        </div>

        <div className="mobile-nav__footer">
          <a href="#/portal" className="yx-btn yx-btn--ghost" onClick={toggleMobileNav}>
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
              <a href="#/treatments/weight-loss" className="footer-link">Treatments</a>
              <a href="#/how-it-works" className="footer-link">How it works</a>
              <a href="#/start" className="footer-link">Start treatment</a>
              <a href="#/portal" className="footer-link">Patient Center</a>
            </div>

            <div className="footer-links-col">
              <span className="footer-col-title">Company</span>
              <a href="#/vision" className="footer-link">Vision</a>
              <a href="#/threats" className="footer-link">Threats</a>
            </div>

            <div className="footer-links-col footer-links-col--legal">
              <span className="footer-col-title">Legal</span>
              {LEGAL_LINKS.map((link) => (
                <a key={link.id} href={link.href} className="footer-link">{link.label}</a>
              ))}
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
          </div>
        </div>
      </footer>
    </div>
  );
}

