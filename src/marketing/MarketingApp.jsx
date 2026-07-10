import { useState, useEffect } from 'react';
import { BrandLogo } from '../brand/BrandLogo.jsx';
import { HOME_FAQS, LIFESTYLE_PILLARS, HERO_SLIDES } from './data.js';

export default function MarketingApp({ currentTab }) {
  // Mobile Nav State
  const [isNavOpen, setIsNavOpen] = useState(false);
  // Header Scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  // FAQ Active State
  const [activeFaq, setActiveFaq] = useState(null);
  

  // Cinematic slideshow slide index
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (currentTab !== 'home') return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentTab]);

  useEffect(() => {
    if (currentTab !== 'home') return;
    const nextIndex = (activeSlide + 1) % HERO_SLIDES.length;
    [HERO_SLIDES[activeSlide], HERO_SLIDES[nextIndex]].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [activeSlide, currentTab]);

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

  const toggleMobileNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleFaqToggle = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const openStart = () => {
    window.location.hash = '#/start';
  };

  const activeLifestyle = LIFESTYLE_PILLARS.find((pillar) => pillar.id === currentTab);

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
          <div className="fade-in">
            {/* Cinematic Background Slideshow Hero (HLI Style) */}
            <section className="cinematic-hero">
              <div className="slideshow-container">
                {HERO_SLIDES.map((imgUrl, index) => {
                  const nextIndex = (activeSlide + 1) % HERO_SLIDES.length;
                  const shouldLoad = index === activeSlide || index === nextIndex;
                  return (
                  <div 
                    key={imgUrl}
                    className={`slide-item ${index === activeSlide ? 'active' : ''}`}
                    style={shouldLoad ? { backgroundImage: `url(${imgUrl})` } : undefined}
                  />
                );})}
                <div className="slideshow-overlay" />
              </div>

              <div className="cinematic-content">
                <h1 className="cinematic-title">Prevent decline <em>years before</em> symptoms.</h1>
                <p className="cinematic-subtitle">
                  Euro-summer warmth meets coastal longevity — compounded peptides, licensed U.S. providers, and overnight delivery to your door.
                </p>
                <div className="hero-actions-centered">
                  <button className="btn btn-primary btn-quiz-trigger" onClick={openStart}>Find my treatment</button>
                  <a href="#/threats" className="btn btn-outline-white">Explore Diagnostics</a>
                </div>
              </div>

              {/* Navigation indicators */}
              <div className="slideshow-nav">
                {HERO_SLIDES.map((_, idx) => (
                  <button 
                    key={idx}
                    type="button"
                    className={`slideshow-indicator ${idx === activeSlide ? 'active' : ''}`}
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </section>

            {/* Stats Strip */}
            <section className="stats-strip">
              <div className="container">
                <div className="stats-grid">
                  <div className="stats-item">
                    <div className="stats-num">30+</div>
                    <div className="stats-label">Diagnostics In One Visit</div>
                  </div>
                  <div className="stats-item">
                    <div className="stats-num">1 in 5</div>
                    <div className="stats-label">Adults Carry Undetected Risks</div>
                  </div>
                  <div className="stats-item">
                    <div className="stats-num">10,000+</div>
                    <div className="stats-label">Intakes Reviewed Safely</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Personal Guidance — boxed feature cards */}
            <section className="guidance-section">
              <div className="container">
                <div className="guidance-grid">
                  <div className="guidance-card pastel-box">
                    <span className="guidance-label">Personalized Care</span>
                    <h3 className="guidance-title">See personal guidance</h3>
                    <p className="guidance-text">
                      Every patient receives a tailored longevity plan built around your goals, biomarkers, and clinical history — not a one-size-fits-all protocol.
                    </p>
                  </div>
                  <div className="guidance-card pastel-box">
                    <span className="guidance-label">Clinical Oversight</span>
                    <h3 className="guidance-title">Provider consultation</h3>
                    <p className="guidance-text">
                      A licensed U.S. practitioner reviews your online health intake within 24 hours and guides your treatment path from first assessment through delivery.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works" id="how-it-works">
              <div className="container">
                <div className="section-header-center">
                  <span className="section-label">Care Pathway</span>
                  <h2 className="section-title">How <em>it works.</em></h2>
                </div>
                
                <div className="steps-grid">
                  <div className="step-card pastel-box">
                    <span className="step-num">01</span>
                    <h3 className="step-title">Online Health Intake</h3>
                    <p className="step-text">Complete a 5-minute health assessment questionnaire detailing your biological goals and clinical history.</p>
                  </div>
                  <div className="step-card pastel-box">
                    <span className="step-num">02</span>
                    <h3 className="step-title">Provider Consultation</h3>
                    <p className="step-text">A licensed clinical provider reviews your data within 24 hours to construct a safe, personalized prescription plan.</p>
                  </div>
                  <div className="step-card pastel-box">
                    <span className="step-num">03</span>
                    <h3 className="step-title">Cold-Chain Delivery</h3>
                    <p className="step-text">Our compounding pharmacies verify and overnight ship your treatment in temperature-controlled packaging, directly to your door.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Sourcing & Eligibility — Emanuela flow: after How It Works */}
            <section className="eligibility" id="eligibility">
              <div className="container">
                <div className="eligibility-grid">
                  <div className="eligibility-image">
                    <img src="/images/clinical-consultation.webp" alt="Pax clinical consultation" loading="lazy" />
                  </div>
                  <div className="eligibility-content">
                    <span className="section-label">Safe & Transparent Care</span>
                    <h2 className="section-title">Are you <em>eligible?</em></h2>
                    <p className="hero-description" style={{ marginTop: 'var(--space-sm)' }}>Longevity treatments require professional medical assessment. Pax connects you with qualified U.S. providers and accredited 503A compounding pharmacies — HIPAA-secure intake and a branded Patient Center.</p>
                    
                    <div className="eligibility-list">
                      <div className="eligibility-item pastel-box">
                        <div className="eligibility-icon">✓</div>
                        <div className="eligibility-text">
                          <h4>Accredited Compounding Pharmacies</h4>
                          <p>All prescription formulas are compounded in FDA-licensed 503A outsourcing facilities using premium quality ingredients.</p>
                        </div>
                      </div>
                      <div className="eligibility-item pastel-box">
                        <div className="eligibility-icon">✓</div>
                        <div className="eligibility-text">
                          <h4>Licensed U.S. Practitioners Only</h4>
                          <p>Intake audits and medical consults are handled strictly by board-certified physicians or nurse practitioners licensed in your home state.</p>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-primary btn-quiz-trigger eligibility-cta" onClick={openStart}>Find my treatment</button>
                  </div>
                </div>
              </div>
            </section>

            {/* Lead Physician */}
            <section className="sab-section doctor-section">
              <div className="container">
                <div className="section-header-center">
                  <span className="section-label">Medical Direction</span>
                  <h2 className="section-title">Your care, led by a <em>licensed physician.</em></h2>
                  <p className="hero-description" style={{ marginTop: 'var(--space-sm)' }}>
                    Clinical protocols, dosage ranges, and safety audits are overseen by our Medical Director — real human oversight, not a chatbot.
                  </p>
                </div>

                <div className="featured-doctor pastel-box">
                  <div className="featured-doctor-photo">
                    <img src="/images/clinical-consultation.webp" alt="Dr. Elena Vance, Medical Director" loading="lazy" />
                  </div>
                  <div className="featured-doctor-content">
                    <p className="featured-doctor-name">Dr. Elena Vance</p>
                    <p className="featured-doctor-role">Medical Director</p>
                    <p className="featured-doctor-bio">
                      Board-certified physician leading patient intake reviews, prescription protocols, and personalized treatment plans for every Pax Longevity member.
                    </p>
                    <a href="#/advisors" className="featured-doctor-link">Meet our clinical advisory board →</a>
                  </div>
                </div>

                <div className="step-card pastel-box doctor-safety-card">
                  <h3 className="step-title">Medical safety & oversight</h3>
                  <p className="step-text" style={{ marginTop: 'var(--space-sm)' }}>
                    Every dose is prescribed and monitored by licensed practitioners. If risks appear in your intake or labs, your provider adjusts your plan immediately.
                  </p>
                </div>
              </div>
            </section>

            {/* Treatment preview — extends home scroll without changing hero */}
            <section className="home-treatments-preview">
              <div className="container">
                <div className="section-header-center">
                  <span className="section-label">Clinical Protocols</span>
                  <h2 className="section-title">Explore our <em>treatments.</em></h2>
                  <p className="hero-description" style={{ marginTop: 'var(--space-sm)' }}>
                    Physician-guided compounded therapies, cold-chain shipped overnight to your door.
                  </p>
                </div>
                <div className="home-treatments-grid">
                  <a href="#/treatments" className="home-treatment-card">
                    <div className="home-treatment-image">
                      <img src="/images/glp1-treatment.webp" alt="Compounded GLP-1 weight management" loading="lazy" />
                    </div>
                    <div className="home-treatment-body">
                      <h3>Compounded GLP-1</h3>
                      <p>Semaglutide & Tirzepatide for metabolic reset and sustainable weight management.</p>
                    </div>
                  </a>
                  <a href="#/treatments" className="home-treatment-card">
                    <div className="home-treatment-image">
                      <img src="/images/nad-treatment.webp" alt="NAD+ cellular longevity" loading="lazy" />
                    </div>
                    <div className="home-treatment-body">
                      <h3>Compounded NAD+</h3>
                      <p>Cellular energy restoration, mitochondrial support, and cognitive clarity.</p>
                    </div>
                  </a>
                  <a href="#/treatments" className="home-treatment-card">
                    <div className="home-treatment-image">
                      <img src="/images/sermorelin-treatment.webp" alt="Sermorelin vitality recovery" loading="lazy" />
                    </div>
                    <div className="home-treatment-body">
                      <h3>Compounded Sermorelin</h3>
                      <p>Recovery, sleep quality, and natural growth hormone stimulation.</p>
                    </div>
                  </a>
                </div>
              </div>
            </section>

            {/* CSS infinite scrolling Marquee Ticker */}
            <section className="ticker-section">
              <div className="ticker-wrap">
                <div className="ticker-track">
                  <span className="ticker-item">Compounded Semaglutide</span>
                  <span className="ticker-item">NAD+ Cellular Coenzymes</span>
                  <span className="ticker-item">Sermorelin Peptides</span>
                  <span className="ticker-item">Mitochondrial Optimization</span>
                  <span className="ticker-item">ApoB Lipid Targets</span>
                  <span className="ticker-item">DNA Methylation</span>
                  <span className="ticker-item">Insulin Resistance Control</span>
                  <span className="ticker-item">Bio-identical Hormone Pathways</span>
                  {/* Duplicate for infinite effect */}
                  <span className="ticker-item">Compounded Semaglutide</span>
                  <span className="ticker-item">NAD+ Cellular Coenzymes</span>
                  <span className="ticker-item">Sermorelin Peptides</span>
                  <span className="ticker-item">Mitochondrial Optimization</span>
                  <span className="ticker-item">ApoB Lipid Targets</span>
                  <span className="ticker-item">DNA Methylation</span>
                  <span className="ticker-item">Insulin Resistance Control</span>
                  <span className="ticker-item">Bio-identical Hormone Pathways</span>
                </div>
              </div>
            </section>

            {/* Supplemental lifestyle gallery — linked pillar pages */}
            <section className="home-gallery-section">
              <div className="container">
                <div className="section-header-center">
                  <span className="section-label">The Pax Lifestyle</span>
                  <h2 className="section-title">Longevity you can <em>feel.</em></h2>
                  <p className="hero-description" style={{ marginTop: 'var(--space-sm)' }}>
                    Italian summer meets Miami vitality — movement, nourishment, and coastal energy woven into every protocol.
                  </p>
                </div>
                <div className="lifestyle-gallery-grid">
                  {LIFESTYLE_PILLARS.map((pillar, index) => (
                    <a key={pillar.id} href={`#/${pillar.id}`} className="lifestyle-gallery-card">
                      <div className="lifestyle-gallery-image">
                        <img src={pillar.image} alt={pillar.alt} loading="lazy" />
                        <div className="lifestyle-gallery-overlay">
                          <span className="lifestyle-gallery-num">{String(index + 1).padStart(2, '0')}</span>
                          <h3 className="lifestyle-gallery-title">{pillar.title}</h3>
                          <p className="lifestyle-gallery-teaser">{pillar.teaser}</p>
                          <span className="lifestyle-gallery-cta">Explore <span aria-hidden="true">→</span></span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* Full-width lifestyle band */}
            <section className="home-cinematic-band">
              <div
                className="home-cinematic-band-bg"
                style={{ backgroundImage: 'url(/images/home-scroll-banner.webp)' }}
                role="img"
                aria-label="Miami sunset coastal longevity lifestyle"
              />
              <div className="home-cinematic-band-overlay" />
              <div className="container home-cinematic-band-content">
                <span className="section-label" style={{ color: 'rgba(250,246,240,0.85)' }}>Coastal Vitality</span>
                <h2 className="home-cinematic-band-title">Your forever summer <em>starts here.</em></h2>
                <p className="home-cinematic-band-text">
                  Italian summer meets Miami vitality. Personalized Pax protocols built for the life you want to live.
                </p>
                <button className="btn btn-primary btn-quiz-trigger" onClick={openStart}>Find my treatment</button>
              </div>
            </section>

            {/* FAQ Section — Emanuela flow: after core conversion path */}
            <section className="faq" id="faq">
              <div className="container">
                <div className="section-header-center">
                  <span className="section-label">Answering Your Questions</span>
                  <h2 className="section-title">Frequently <em>asked.</em></h2>
                  <p className="faq-intro">Quick answers — tap any question to expand.</p>
                </div>
                
                <div className="faq-list">
                  {HOME_FAQS.map((faq, idx) => (
                    <div key={faq.q} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
                      <button className="faq-question" onClick={() => handleFaqToggle(idx)} aria-expanded={activeFaq === idx}>
                        <span className="faq-question-text">{faq.q}</span>
                        <span className="faq-icon" aria-hidden="true">▼</span>
                      </button>
                      <div className="faq-answer">
                        <div className="faq-answer-inner">
                          <p className="faq-answer-lead">{faq.lead}</p>
                          <ul className="faq-answer-points">
                            {faq.points.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                <div className="section-header-center">
                  <span className="section-label">Drivers of Biological Decline</span>
                  <h2 className="section-title">The four main domains <em>of aging.</em></h2>
                  <p className="hero-description" style={{ marginTop: 'var(--space-sm)' }}>
                    Four core areas of decline—responsible for the vast majority of age-related systemic loss—analyzed and addressed early.
                  </p>
                </div>
                
                <div className="threats-grid">
                  {/* Threat 1 */}
                  <div className="threat-card">
                    <div className="threat-image-wrap shape-hexagon">
                      <img src="/images/threat-cardio.webp" alt="Cardiovascular Optimization" loading="lazy" />
                    </div>
                    <span className="threat-num">01</span>
                    <h3 className="threat-title">Cardiovascular Health</h3>
                    <p className="threat-text">Evaluating Lp(a), ApoB, cholesterol panels, and heritable cardiovascular traits to reduce arterial decay and vessel stiffness.</p>
                  </div>
                  {/* Threat 2 */}
                  <div className="threat-card">
                    <div className="threat-image-wrap shape-teardrop">
                      <img src="/images/threat-metabolic.webp" alt="Metabolic Integrity" loading="lazy" />
                    </div>
                    <span className="threat-num">02</span>
                    <h3 className="threat-title">Metabolic Integrity</h3>
                    <p className="threat-text">Targeting insulin resistance, glucose regulation, fatty liver patterns, and visceral fat storage to reset cellular energy balances.</p>
                  </div>
                  {/* Threat 3 */}
                  <div className="threat-card">
                    <div className="threat-image-wrap shape-blob">
                      <img src="/images/threat-neuro.webp" alt="Neurodegenerative Markers" loading="lazy" />
                    </div>
                    <span className="threat-num">03</span>
                    <h3 className="threat-title">Neurodegenerative Markers</h3>
                    <p className="threat-text">Sequencing cognitive risk genes like APOE, cataloging sleep architecture, and optimizing cellular oxygenation to support mental clarity.</p>
                  </div>
                  {/* Threat 4 */}
                  <div className="threat-card">
                    <div className="threat-image-wrap shape-shield">
                      <img src="/images/threat-cancer.webp" alt="Oncological Interception" loading="lazy" />
                    </div>
                    <span className="threat-num">04</span>
                    <h3 className="threat-title">Oncological Interception</h3>
                    <p className="threat-text">Analyzing genetic cancer predispositions (e.g. BRCA1 & BRCA2) and leveraging biomarkers for early phase multi-organ screening guidance.</p>
                  </div>
                </div>

                {/* Additional Clinical Markers table */}
                <div style={{ marginTop: 'var(--space-3xl)' }}>
                  <h3 className="section-title" style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>What We Audit & Monitor</h3>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--sand)', borderRadius: 'var(--radius-lg)' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--divider)', textAlign: 'left' }}>
                          <th style={{ padding: 'var(--space-md)' }}>Decline Domain</th>
                          <th style={{ padding: 'var(--space-md)' }}>Key Indicators Analyzed</th>
                          <th style={{ padding: 'var(--space-md)' }}>Primary Clinical Intervention</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: '1px solid var(--divider)' }}>
                          <td style={{ padding: 'var(--space-md)', fontWeight: '600' }}>Cardiovascular</td>
                          <td style={{ padding: 'var(--space-md)' }}>ApoB, Lipoprotein(a), High-sensitivity CRP</td>
                          <td style={{ padding: 'var(--space-md)' }}>Lipid panel optimizations & hormone balance</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--divider)' }}>
                          <td style={{ padding: 'var(--space-md)', fontWeight: '600' }}>Metabolic</td>
                          <td style={{ padding: 'var(--space-md)' }}>HbA1c, Fasting Insulin, Visceral Fat Ratio</td>
                          <td style={{ padding: 'var(--space-md)' }}>Compounded GLP-1 (Semaglutide) & NAD+ Support</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--divider)' }}>
                          <td style={{ padding: 'var(--space-md)', fontWeight: '600' }}>Neurodegenerative</td>
                          <td style={{ padding: 'var(--space-md)' }}>APOE genotyping, sleep quality metrics</td>
                          <td style={{ padding: 'var(--space-md)' }}>Sermorelin recovery cycles & sleep sync</td>
                        </tr>
                        <tr>
                          <td style={{ padding: 'var(--space-md)', fontWeight: '600' }}>Oncological</td>
                          <td style={{ padding: 'var(--space-md)' }}>Hereditary cancer paneling, cell-free DNA</td>
                          <td style={{ padding: 'var(--space-md)' }}>Biomarker early detection guidance</td>
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
                
                <div className="treatments-grid">
                  {/* Semaglutide/Tirzepatide Weight Loss */}
                  <div className="treatment-card">
                    <div className="treatment-image">
                      <img src="/images/glp1-treatment.webp" alt="Semaglutide Weight Management" loading="lazy" />
                      <span className="treatment-badge">Weight Loss</span>
                    </div>
                    <div className="treatment-body">
                      <h3 className="treatment-title">Compounded GLP-1</h3>
                      <p className="treatment-desc">Advanced Semaglutide & Tirzepatide prescriptions designed to reset metabolic baseline, control appetite, and achieve long-term weight reduction.</p>
                      <div className="treatment-details">
                        <div className="detail-row">
                          <span>Frequency</span>
                          <strong>Once Weekly Subcutaneous</strong>
                        </div>
                        <div className="detail-row">
                          <span>Shipping</span>
                          <strong>Overnight Delivery (Included)</strong>
                        </div>
                        <div className="detail-row price">
                          <span>From</span>
                          <strong>$249/mo <span>All-inclusive</span></strong>
                        </div>
                      </div>
                      <button className="btn btn-primary btn-quiz-trigger" onClick={openStart}>Find my treatment</button>
                    </div>
                  </div>

                  {/* NAD+ Cellular Energy */}
                  <div className="treatment-card">
                    <div className="treatment-image">
                      <img src="/images/nad-treatment.webp" alt="NAD+ Longevity Peptides" loading="lazy" />
                      <span className="treatment-badge">Cellular Health</span>
                    </div>
                    <div className="treatment-body">
                      <h3 className="treatment-title">Compounded NAD+</h3>
                      <p className="treatment-desc">Direct cellular restoration coenzyme. Promotes active mitochondrial rejuvenation, cellular repair, mental clarity, and metabolic function.</p>
                      <div className="treatment-details">
                        <div className="detail-row">
                          <span>Frequency</span>
                          <strong>Twice Weekly Injection</strong>
                        </div>
                        <div className="detail-row">
                          <span>Shipping</span>
                          <strong>Overnight Delivery (Included)</strong>
                        </div>
                        <div className="detail-row price">
                          <span>From</span>
                          <strong>$149/mo <span>All-inclusive</span></strong>
                        </div>
                      </div>
                      <button className="btn btn-primary btn-quiz-trigger" onClick={openStart}>Find my treatment</button>
                    </div>
                  </div>

                  {/* Sermorelin Recovery */}
                  <div className="treatment-card">
                    <div className="treatment-image">
                      <img src="/images/sermorelin-treatment.webp" alt="Sermorelin Recovery Treatment" loading="lazy" />
                      <span className="treatment-badge">Vitality</span>
                    </div>
                    <div className="treatment-body">
                      <h3 className="treatment-title">Compounded Sermorelin</h3>
                      <p className="treatment-desc">Secretagogue therapy to naturally stimulate growth hormone release, accelerating muscle recovery, strengthening sleep quality, and restoring youthful energy levels.</p>
                      <div className="treatment-details">
                        <div className="detail-row">
                          <span>Frequency</span>
                          <strong>Daily Evening Injection</strong>
                        </div>
                        <div className="detail-row">
                          <span>Shipping</span>
                          <strong>Overnight Delivery (Included)</strong>
                        </div>
                        <div className="detail-row price">
                          <span>From</span>
                          <strong>$189/mo <span>All-inclusive</span></strong>
                        </div>
                      </div>
                      <button className="btn btn-primary btn-quiz-trigger" onClick={openStart}>Find my treatment</button>
                    </div>
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

      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          
          <div className="footer-grid">
            
            {/* Column 1: Brand Info & Socials */}
            <div className="footer-brand">
              <BrandLogo variant="footer" />
              <p className="footer-tagline">
                Proactive Longevity & Preventative Health. Miami Beach, Florida.
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

            {/* Column 2: Longevity Care */}
            <div className="footer-links-col">
              <span className="footer-col-title">Longevity Care</span>
              <a href="#/treatments" className="footer-link">Weight Management</a>
              <a href="#/treatments" className="footer-link">Cellular Energy</a>
              <a href="#/treatments" className="footer-link">Vitality & Recovery</a>
              <a href="#/treatments" className="footer-link">Compounded GLP-1</a>
            </div>

            {/* Column 3: The System */}
            <div className="footer-links-col">
              <span className="footer-col-title">The System</span>
              <a href="#/vision" className="footer-link">Our Vision</a>
              <a href="#/threats" className="footer-link">The Four Threats</a>
              <a href="#/advisors" className="footer-link">Advisors & SAB</a>
              <a href="#/education" className="footer-link">Education & Science</a>
            </div>

            {/* Column 4: Member Hub */}
            <div className="footer-links-col">
              <span className="footer-col-title">Member Hub</span>
              <a href="#/start" className="footer-link">Start treatment</a>
              <a href="#/portal" className="footer-link">Patient Center</a>
              <a href="#/" className="footer-link">FAQ Support</a>
              <a href="#/" className="footer-link">Member Terms</a>
            </div>

          </div>

          {/* Badges strip */}
          <div className="footer-badge-strip">
            <div className="footer-badge-item">
              <span>✓</span> HIPAA-Compliant Security
            </div>
            <div className="footer-badge-item">
              <span>✓</span> FDA-Licensed 503A Sourcing
            </div>
            <div className="footer-badge-item">
              <span>✓</span> U.S. Licensed Clinical Providers
            </div>
          </div>

          {/* Disclaimer */}
          <p className="footer-disclaimer">
            Disclaimer: Compounded medications are customized by licensed compounding pharmacies under federal Section 503A guidelines and are not individually reviewed or approved by the FDA. Sourcing claims represent pharmacy compounding standards under Section 503A. Pax Longevity is a branded patient platform linking members with licensed medical practitioners and compounding pharmacies. The clinical information provided is not a substitute for professional medical advice. Always consult your provider before starting any therapeutic peptide regimen.
          </p>
          
          {/* Bottom links */}
          <div className="footer-bottom">
            <p className="footer-copy">© 2026 Pax Longevity. All rights reserved.</p>
            <div className="footer-legal-links">
              <a href="#/" className="footer-legal-link">Privacy Policy</a>
              <a href="#/" className="footer-legal-link">Terms of Service</a>
              <a href="#/" className="footer-legal-link">Care Consent</a>
            </div>
          </div>

        </div>
      </footer>

    </>
  );
}

