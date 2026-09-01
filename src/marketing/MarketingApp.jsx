import { useState, useEffect, useRef } from 'react';
import { BrandLogo } from '../brand/index.js';
import { THREAT_DOMAINS } from './data.js';
import LegalPage from './LegalPage.jsx';
import { LEGAL_LINKS, LEGAL_PAGE_IDS } from './legalContent.js';
import FooterTrustBadges from './FooterTrustBadges.jsx';
import PaxHome from './PaxHome.jsx';
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

const NAV_TREATMENTS = [
  { href: '#/treatments/weight-loss', label: 'Weight loss', hint: 'Semaglutide & Tirzepatide' },
];

const NAV_LEGAL = [
  { href: '#/terms', label: 'Terms of Use' },
  { href: '#/privacy', label: 'Privacy Policy' },
  { href: '#/telehealth-consent', label: 'Telehealth Consent' },
  { href: '#/hipaa', label: 'HIPAA Notice' },
];

function NavDropdown({ id, label, open, active, onToggle, children }) {
  return (
    <div className={`yx-dd${open ? ' is-open' : ''}${active ? ' is-active' : ''}`}>
      <button
        type="button"
        className={`yx-nav__link yx-dd__trigger${active ? ' active' : ''}`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={`yx-dd-${id}`}
        onClick={onToggle}
      >
        {label}
        <span className="yx-dd__chev" aria-hidden="true">
          <svg viewBox="0 0 12 8" fill="none">
            <path d="M1.5 1.75L6 6.25L10.5 1.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div id={`yx-dd-${id}`} className="yx-dd__menu" role="menu" hidden={!open}>
        {children}
      </div>
    </div>
  );
}

export default function MarketingApp({ currentTab }) {
  // Mobile Nav State
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  // Header Scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  // FAQ Active State
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedTx, setSelectedTx] = useState('semaglutide');
  const programScrollerRef = useRef(null);
  


  useEffect(() => {
    setIsNavOpen(false);
    setOpenMenu(null);
  }, [currentTab]);

  useEffect(() => {
    const route = window.location.hash.replace(/^#\/?/, '').split('?')[0].replace(/\/$/, '');
    if (currentTab !== 'home' || route !== 'faq') return undefined;
    const node = document.getElementById('pax-faq');
    if (!node) return undefined;
    const timer = window.setTimeout(() => {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [currentTab]);

  useEffect(() => {
    if (!openMenu) return undefined;
    const onPointer = (event) => {
      if (!event.target.closest?.('.yx-dd')) setOpenMenu(null);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setOpenMenu(null);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [openMenu]);

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

  const goToFaq = (event) => {
    event?.preventDefault?.();
    setOpenMenu(null);
    if (isNavOpen) toggleMobileNav();
    if (currentTab === 'home') {
      document.getElementById('pax-faq')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.location.hash !== '#/faq') window.history.replaceState(null, '', '#/faq');
      return;
    }
    window.location.hash = '#/faq';
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
              <NavDropdown
                id="treatments"
                label="Treatments"
                open={openMenu === 'treatments'}
                active={currentTab === 'treatments'}
                onToggle={() => setOpenMenu(openMenu === 'treatments' ? null : 'treatments')}
              >
                {NAV_TREATMENTS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    className="yx-dd__item"
                    onClick={() => setOpenMenu(null)}
                  >
                    <span>{item.label}</span>
                    {item.hint ? <small>{item.hint}</small> : null}
                  </a>
                ))}
              </NavDropdown>
              <a
                href="#/how-it-works"
                className={`yx-nav__link ${currentTab === 'how-it-works' ? 'active' : ''}`}
              >
                How it works
              </a>
              <a
                href="#/faq"
                className="yx-nav__link"
                onClick={goToFaq}
              >
                FAQ
              </a>
              <NavDropdown
                id="legal"
                label="Legal"
                open={openMenu === 'legal'}
                active={LEGAL_PAGE_IDS.includes(currentTab)}
                onToggle={() => setOpenMenu(openMenu === 'legal' ? null : 'legal')}
              >
                {NAV_LEGAL.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    className="yx-dd__item"
                    onClick={() => setOpenMenu(null)}
                  >
                    {item.label}
                  </a>
                ))}
              </NavDropdown>
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
          <a href="#/faq" className="mobile-link" onClick={goToFaq}>
            FAQ
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

        <p className="mobile-nav__eyebrow">Legal</p>
        <div className="mobile-nav__links mobile-nav__links--legal">
          {NAV_LEGAL.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`mobile-link mobile-link--legal ${currentTab === item.href.replace('#/', '') ? 'active' : ''}`}
              onClick={toggleMobileNav}
            >
              {item.label}
            </a>
          ))}
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
          <PaxHome
            openStart={openStart}
            activeFaq={activeFaq}
            onFaqToggle={handleFaqToggle}
          />
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

          <FooterTrustBadges />

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
            <nav className="footer-legal-links" aria-label="Legal">
              {LEGAL_LINKS.map((link) => (
                <a key={`bottom-${link.id}`} href={link.href} className="footer-legal-link">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

