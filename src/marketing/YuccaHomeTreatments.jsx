import { useState } from 'react';

const IMG = '/images/yucca-clone';

const TREATMENTS = [
  {
    id: 'semaglutide',
    label: 'Semaglutide',
    tone: 'var(--forest)',
    toneSoft: 'color-mix(in oklch, var(--forest) 18%, transparent)',
    badge: 'Most Popular',
    badgeTone: 'var(--terracotta)',
    badgeSoft: 'color-mix(in oklch, var(--terracotta) 18%, transparent)',
    title: 'Personalized Semaglutide',
    resultStat: '20%',
    description:
      'A weekly GLP-1 injection designed to support weight management by helping regulate appetite and reduce hunger signals.',
    detail: 'GLP-1 (Semaglutide) · Steady, gradual results.',
    price: '$125',
    period: '/mo',
    priceNote: 'lowest price ever · 6 month plan',
    enrolled: '1000+ Patients enrolled in last 7 days',
    rating: '4.7/5',
    reviews: '1000+ Reviews',
    vials: [`${IMG}/personalized-semaglutide-glp-1-injection-vial-yucca-health.avif`],
    cutoutPair: `${IMG}/pax-glp1-couple-cutout.avif`,
    startTx: 'semaglutide',
    learnHref: '#/treatments/weight-loss',
  },
  {
    id: 'tirzepatide',
    label: 'Tirzepatide',
    tone: 'var(--terracotta)',
    toneSoft: 'color-mix(in oklch, var(--terracotta) 18%, transparent)',
    badge: 'Dual Pathway',
    badgeTone: 'var(--terracotta)',
    badgeSoft: 'color-mix(in oklch, var(--terracotta) 16%, transparent)',
    title: 'Personalized Tirzepatide',
    resultStat: '20%',
    description:
      'A weekly dual-action GLP-1 + GIP injection for stronger appetite regulation and more pronounced weight-loss support.',
    detail: 'GLP-1 + GIP (Tirzepatide) · Faster dual-action support.',
    price: '$225',
    period: '/mo',
    priceNote: 'lowest price ever · 6 month plan',
    enrolled: '1000+ Patients enrolled in last 7 days',
    rating: '4.7/5',
    reviews: '1000+ Reviews',
    vials: [`${IMG}/personalized-tirzepatide-glp-1-injection-vial-yucca-health.avif`],
    cutoutPair: `${IMG}/pax-glp1-couple-cutout.avif`,
    startTx: 'tirzepatide',
    learnHref: '#/treatments/weight-loss',
  },
];

/** Personalized treatments — Semaglutide & Tirzepatide only */
export default function YuccaHomeTreatments({ openStart }) {
  const [activeId, setActiveId] = useState(TREATMENTS[0].id);
  const active = TREATMENTS.find((t) => t.id === activeId) ?? TREATMENTS[0];

  return (
    <section className="goal-treatments-section" data-active-tone={active.id}>
      <div className="goal-treatments-container">
        <div className="goal-treatments-heading">
          <h2>
            <em>Personalized treatments</em> to help achieve your goals
          </h2>
          <p>Choose Semaglutide or Tirzepatide to build your plan.</p>
        </div>

        <div className="goal-tablist-wrap">
          <div className="goal-tablist" role="tablist" aria-label="Choose a treatment">
            {TREATMENTS.map((treatment) => {
              const selected = treatment.id === activeId;
              return (
                <button
                  key={treatment.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={selected ? 'is-active' : undefined}
                  style={
                    selected
                      ? { backgroundColor: treatment.toneSoft, borderColor: 'var(--forest)' }
                      : undefined
                  }
                  onClick={() => setActiveId(treatment.id)}
                >
                  {treatment.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="goal-treatments-pane" key={active.id}>
          <div className="goal-cutouts" aria-hidden="true">
            <div className="goal-cutouts-stat">↓{active.resultStat}</div>
            <img className="goal-cutouts-pair" src={active.cutoutPair} alt="" loading="lazy" />
          </div>

          <div className="goal-product-card">
            <div className="goal-product-tags">
              <div className="goal-product-tags-left">
                <span
                  className="goal-product-tag"
                  style={{ backgroundColor: active.toneSoft, borderColor: active.tone }}
                >
                  {active.label}
                </span>
                <span
                  className="goal-product-tag"
                  style={{
                    backgroundColor: active.badgeSoft,
                    borderColor: active.badgeTone,
                    color: 'var(--forest)',
                  }}
                >
                  {active.badge}
                </span>
              </div>
              <div className="goal-product-rating">
                <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
                  <path
                    fill="var(--forest)"
                    d="M12 2l3 7 7 .6-5.4 4.6 1.8 7-7.4-4.4-7.4 4.4 1.8-7L1 9.6 8 9z"
                  />
                </svg>
                {active.rating} · {active.reviews}
              </div>
            </div>

            <div className="goal-product-top">
              <div className="goal-product-vial">
                {active.vials.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    loading="eager"
                    className={i === 0 ? 'goal-vial goal-vial--front' : 'goal-vial goal-vial--back'}
                  />
                ))}
              </div>
              <div className="goal-product-meta">
                <div className="goal-product-enrolled">{active.enrolled}</div>
                <div
                  className="goal-product-price"
                  style={{
                    background: `linear-gradient(145deg, ${active.tone} 0%, ${active.toneSoft} 100%)`,
                  }}
                >
                  FROM {active.price}
                  <span>{active.period}</span>
                </div>
                <p className="goal-product-price-note">{active.priceNote}</p>
              </div>
            </div>

            <h3 className="goal-product-title">{active.title}</h3>
            <p className="goal-product-desc">{active.description}</p>
            <p className="goal-product-detail">{active.detail}</p>

            <div className="goal-product-ctas">
              <button
                type="button"
                className="goal-product-cta goal-product-cta--primary"
                onClick={() => openStart(active.startTx)}
              >
                See if I qualify
              </button>
              <a href={active.learnHref} className="goal-product-cta goal-product-cta--ghost">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
