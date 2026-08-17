const STEPS = [
  {
    n: '1',
    title: 'Complete your intake form',
    body: 'Answer a short medical questionnaire so our providers can determine if treatment is right for you.',
    image: '/images/pax-hiw-step-1.webp?v=lite1',
    alt: 'Tablet intake form — tell us about yourself',
  },
  {
    n: '2',
    title: 'Provider review',
    body: 'After verifying your identity, a licensed U.S. provider reviews your intake within 24 hours to determine if treatment is appropriate for you.',
    image: '/images/pax-hiw-step-2.webp?v=lite1',
    alt: 'Licensed clinician reviewing your intake on a laptop',
  },
  {
    n: '3',
    title: 'Start treatment',
    body: 'If approved, your prescription is filled by a licensed U.S. pharmacy and delivered to your door with 2-day shipping.',
    image: '/images/pax-hiw-step-3.webp?v=lite1',
    alt: 'Temperature-controlled medication delivery at your door',
  },
];

/** Home how-it-works — Hims-like floating cards, Pax brand tokens */
export default function YuccaHomeHiw() {
  return (
    <section id="how-it-works" className="goal-hiw-section pax-hiw">
      <div className="goal-hiw-container pax-hiw__container">
        <div className="goal-hiw-heading pax-hiw__heading">
          <p className="goal-hiw-eyebrow pax-hiw__eyebrow">How it works</p>
          <h2>
            From onboarding through treatment, we&rsquo;ll be supporting and guiding you{' '}
            <em>every step of the way</em>.
          </h2>
        </div>

        <div className="goal-hiw-grid pax-hiw__grid" role="list">
          {STEPS.map((step) => (
            <article key={step.n} className="goal-hiw-card pax-hiw__card" role="listitem">
              <div className="pax-hiw__copy">
                <span className="goal-hiw-tag pax-hiw__step" aria-label={`Step ${step.n}`}>
                  {step.n}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
              <div className="goal-hiw-media pax-hiw__media">
                <img src={step.image} alt={step.alt} loading="lazy" decoding="async" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
