import { useEffect, useRef } from 'react';
import { HOW_FAQS, HOW_MEDIA, HOW_STEPS, HOW_STORIES, HOW_WHY } from './howItWorksData.js';

/**
 * Sticky step stack — Vitalwell/Yucca how-it-works pattern.
 * CSS sticky on desktop; optional opacity scrub via IntersectionObserver (no GSAP).
 */
function StickySteps() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const desktopMq = window.matchMedia('(min-width: 992px)');
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cards = () => Array.from(root.querySelectorAll('.hiw-step-card'));

    const clear = () => {
      cards().forEach((card) => {
        card.style.opacity = '';
        card.style.transform = '';
        card.style.visibility = '';
        card.style.pointerEvents = '';
      });
    };

    let raf = 0;
    const onScroll = () => {
      if (!desktopMq.matches || motionMq.matches) {
        clear();
        return;
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const steps = Array.from(root.querySelectorAll('.hiw-step'));
        steps.forEach((step, i) => {
          const card = step.querySelector('.hiw-step-card');
          const next = steps[i + 1];
          if (!card || !next) {
            if (card) {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
              card.style.visibility = 'visible';
              card.style.pointerEvents = '';
            }
            return;
          }
          const nextTop = next.getBoundingClientRect().top;
          const stickyTop = window.innerHeight * 0.23;
          const start = stickyTop + card.offsetHeight + 80;
          const end = stickyTop + card.offsetHeight * 0.5;
          const range = Math.max(1, start - end);
          const t = Math.min(1, Math.max(0, (start - nextTop) / range));
          const opacity = 1 - t;
          card.style.opacity = String(opacity);
          card.style.transform = `scale(${1 - t * 0.12})`;
          /* Keep scrub math identical; hide fully faded cards so sand boxes don’t ghost over the next step */
          card.style.visibility = opacity < 0.02 ? 'hidden' : 'visible';
          card.style.pointerEvents = opacity < 0.02 ? 'none' : '';
        });
      });
    };

    const refresh = () => {
      clear();
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', refresh);
    desktopMq.addEventListener('change', refresh);
    motionMq.addEventListener('change', refresh);
    refresh();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', refresh);
      desktopMq.removeEventListener('change', refresh);
      motionMq.removeEventListener('change', refresh);
      clear();
    };
  }, []);

  return (
    <section ref={rootRef} className="hiw-hero">
      <div className="hiw-steps-stack">
        {HOW_STEPS.map((step, i) => {
          const isLast = i === HOW_STEPS.length - 1;
          return (
            <div
              key={step.n}
              className={`hiw-step ${isLast ? 'hiw-step--last' : 'hiw-step--sticky'}`}
              style={{ zIndex: i + 1 }}
            >
              <article className="hiw-step-card">
                <div className="hiw-step-media">
                  <div className="hiw-step-media__frame">
                    <img
                      className="hiw-step-media__img"
                      src={step.image.src}
                      alt={step.image.alt}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </div>
                  {step.chips ? (
                    <div className="hiw-step-chips">
                      {step.chips.map((chip) => (
                        <span key={chip} className="hiw-step-chip">
                          {chip}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="hiw-step-copy">
                  <p className="hiw-step-label">Step {step.n}</p>
                  <h2 className="hiw-step-title">
                    {step.title} <em>{step.titleItalic}</em>
                  </h2>
                  <p className="hiw-step-body">{step.body}</p>

                  {step.callout ? (
                    <div className="hiw-step-callout">
                      <p className="hiw-step-callout__value">{step.callout.value}</p>
                      <p className="hiw-step-callout__label">{step.callout.label}</p>
                    </div>
                  ) : null}

                  {step.link ? (
                    <a href={step.link.href} className="hiw-step-link">
                      {step.link.label}
                    </a>
                  ) : null}
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function HowItWorksPage({ openStart }) {
  return (
    <div className="hiw-page fade-in">
      <section className="hiw-page-hero">
        <div className="hiw-shell">
          <h1 className="hiw-page-hero__title">
            Pax delivers a{' '}
            <span className="hiw-page-hero__accent">seamless, patient-first experience</span>
          </h1>
          <p className="hiw-page-hero__sub">
            Five clear steps from treatment choice to ongoing care.
          </p>
        </div>
      </section>

      <section className="hiw-page-body">
        <div className="hiw-shell">
          <div className="hiw-flow">
            <StickySteps />

            <section className="hiw-story" aria-labelledby="hiw-story-title">
              <div className="hiw-story__head">
                <p className="hiw-story__eyebrow">Care chapters</p>
                <h2 className="hiw-story__title" id="hiw-story-title">
                  Every treatment has a <em>story</em>
                </h2>
                <p className="hiw-story__sub">
                  Real patients. Provider-guided protocols. Clear follow-through from first dose to month six.
                </p>
              </div>

              <div className="hiw-story__stage">
                <figure className="hiw-story__lead">
                  <img
                    src={HOW_MEDIA.storyHero.src}
                    alt={HOW_MEDIA.storyHero.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="hiw-story__lead-caption">
                    <span className="hiw-story__lead-mark" aria-hidden="true">
                      “
                    </span>
                    <p>
                      Provider-directed care — dosing that follows how you respond, not a template.
                    </p>
                    <span className="hiw-story__lead-meta">Verified Pax patients</span>
                  </figcaption>
                </figure>

                <ol className="hiw-story__chapters">
                  {HOW_STORIES.map((story, i) => (
                    <li key={story.title} className="hiw-story-chapter" style={{ '--i': i }}>
                      <div className="hiw-story-chapter__rail" aria-hidden="true">
                        <span className="hiw-story-chapter__dot" />
                      </div>
                      <div className="hiw-story-chapter__portrait">
                        <img src={story.img} alt="" loading="lazy" decoding="async" />
                        <span className="hiw-story-chapter__n">{story.step}</span>
                      </div>
                      <div className="hiw-story-chapter__copy">
                        <p className="hiw-story-chapter__meta">
                          <span>{story.metric}</span>
                          <span aria-hidden="true">·</span>
                          <span>{story.timeline}</span>
                        </p>
                        <h3>{story.title}</h3>
                        <blockquote>&ldquo;{story.quote}&rdquo;</blockquote>
                        <footer>
                          <strong>{story.patient}</strong>
                          <span>Verified Patient</span>
                        </footer>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <section className="hiw-why">
              <h2 className="hiw-why__title">
                Why <em>Pax Longevity</em>?
              </h2>
              <div className="hiw-why__grid">
                {HOW_WHY.map((item) => (
                  <article key={item.title} className="hiw-why-card">
                    <div className="hiw-why-card__media">
                      <img src={item.image.src} alt={item.image.alt} loading="lazy" decoding="async" />
                    </div>
                    <div className="hiw-why-card__body">
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="hiw-why__cta-wrap">
                <a href="#/treatments/weight-loss" className="hiw-btn-primary">
                  Explore treatments
                </a>
              </div>
            </section>

            <section className="hiw-priority">
              <div className="hiw-priority__card">
                <div className="hiw-priority__media">
                  <img
                    src={HOW_MEDIA.priority.src}
                    alt={HOW_MEDIA.priority.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="hiw-priority__copy">
                  <h2>Exceptional experience is our priority</h2>
                  <ul>
                    <li>Stay in touch with your provider</li>
                    <li>Update your treatment when clinically appropriate</li>
                    <li>Track follow-up with clear accountability</li>
                  </ul>
                  <button type="button" className="hiw-btn-primary" onClick={openStart}>
                    Start your intake
                  </button>
                </div>
              </div>
            </section>

            <section className="hiw-faq">
              <p className="hiw-faq__eyebrow">We&rsquo;ve got you.</p>
              <h2 className="hiw-faq__title">You have questions, we have answers.</h2>
              <div className="hiw-faq__list">
                {HOW_FAQS.map((item) => (
                  <details key={item.q} className="hiw-faq__item">
                    <summary>
                      <span>{item.q}</span>
                      <span className="hiw-faq__icon" aria-hidden>
                        +
                      </span>
                    </summary>
                    <div className="hiw-faq__answer">
                      <p>{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            <section className="hiw-cta">
              <div className="hiw-cta__grid">
                <div className="hiw-cta__media hiw-cta__media--portal">
                  <img
                    src={HOW_MEDIA.cta.src}
                    alt={HOW_MEDIA.cta.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="hiw-cta__copy">
                  <p className="hiw-cta__eyebrow">Begin care</p>
                  <h2>Ready for provider-led care?</h2>
                  <p>Complete your intake. A licensed provider reviews within 24 hours.</p>
                  <div className="hiw-cta__actions">
                    <button type="button" className="hiw-btn-primary" onClick={openStart}>
                      Get started
                    </button>
                    <a href="#/treatments/weight-loss" className="hiw-btn-secondary">
                      View treatments
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
