import { ADVISOR_PILLARS, ADVISORS } from './advisorsData.js';

export default function AdvisorsPage({ openStart }) {
  const featured = ADVISORS.find((a) => a.featured) || ADVISORS[0];
  const others = ADVISORS.filter((a) => a.id !== featured.id);

  return (
    <div className="pax-advisors fade-in">
      <section className="pax-advisors__hero">
        <div className="pax-advisors__shell">
          <p className="pax-advisors__eyebrow">Medical direction</p>
          <h1 className="pax-advisors__title">
            Guided by pioneering <em>clinical minds</em>
          </h1>
          <p className="pax-advisors__sub">
            Semaglutide and Tirzepatide protocols shaped with licensed oversight — clear criteria,
            careful review, and care that stays accountable after day one.
          </p>
        </div>
      </section>

      <section className="pax-advisors__board" aria-labelledby="pax-advisors-board-title">
        <div className="pax-advisors__shell">
          <div className="pax-advisors__board-head">
            <h2 id="pax-advisors-board-title">
              Clinical <em>advisory board</em>
            </h2>
            <p>Real providers. Real standards. No template medicine.</p>
          </div>

          <div className="pax-advisors__stage">
            <article className="pax-advisor-lead">
              <div className="pax-advisor-lead__media">
                <img src={featured.img} alt={featured.name} loading="eager" decoding="async" />
                <span className="pax-advisor-lead__badge">Lead advisor</span>
              </div>
              <div className="pax-advisor-lead__copy">
                <p className="pax-advisor-lead__role">{featured.role}</p>
                <h3>
                  {featured.name},{' '}
                  <em>{featured.credentials}</em>
                </h3>
                <p className="pax-advisor-lead__bio">{featured.bio}</p>
                <ul className="pax-advisor-lead__focus">
                  {featured.focus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>

            <div className="pax-advisors__grid">
              {others.map((advisor, i) => (
                <article
                  key={advisor.id}
                  className="pax-advisor-card"
                  style={{ '--i': i }}
                >
                  <div className="pax-advisor-card__media">
                    <img src={advisor.img} alt={advisor.name} loading="lazy" decoding="async" />
                  </div>
                  <div className="pax-advisor-card__body">
                    <p className="pax-advisor-card__role">{advisor.role}</p>
                    <h3>
                      {advisor.name},{' '}
                      <em>{advisor.credentials}</em>
                    </h3>
                    <p>{advisor.bio}</p>
                    <ul>
                      {advisor.focus.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pax-advisors__pillars" aria-labelledby="pax-advisors-pillars-title">
        <div className="pax-advisors__shell">
          <div className="pax-advisors__pillars-head">
            <p className="pax-advisors__eyebrow">How oversight works</p>
            <h2 id="pax-advisors-pillars-title">
              Strict medical safety — <em>built in</em>
            </h2>
          </div>

          <ol className="pax-advisors__pillar-list">
            {ADVISOR_PILLARS.map((pillar, i) => (
              <li key={pillar.n} className="pax-advisors__pillar" style={{ '--i': i }}>
                <span className="pax-advisors__pillar-n" aria-hidden="true">
                  {pillar.n}
                </span>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </li>
            ))}
          </ol>

          <div className="pax-advisors__cta">
            <div className="pax-advisors__cta-copy">
              <h2>Ready for provider-led care?</h2>
              <p>Complete your intake. A licensed provider reviews within 24 hours.</p>
            </div>
            <div className="pax-advisors__cta-actions">
              <button type="button" className="pax-advisors__btn" onClick={openStart}>
                Start your intake
              </button>
              <a href="#/how-it-works" className="pax-advisors__btn-ghost">
                See how it works
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
