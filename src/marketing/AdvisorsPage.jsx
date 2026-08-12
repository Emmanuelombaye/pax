import { ADVISOR_PILLARS } from './advisorsData.js';

/** Providers page — clinical process only (no fabricated named clinicians). */
export default function AdvisorsPage({ openStart }) {
  return (
    <div className="pax-advisors fade-in">
      <section className="pax-advisors__hero">
        <div className="pax-advisors__shell">
          <p className="pax-advisors__eyebrow">Clinical care</p>
          <h1 className="pax-advisors__title">
            Licensed clinicians, <em>patient-first</em> standards
          </h1>
          <p className="pax-advisors__sub">
            Pax Longevity connects eligible adults with licensed U.S. providers who review your intake
            before any prescription decision. Completing a questionnaire does not guarantee treatment.
          </p>
        </div>
      </section>

      <section className="pax-advisors__pillars" aria-labelledby="pax-advisors-pillars-title">
        <div className="pax-advisors__shell">
          <div className="pax-advisors__pillars-head">
            <p className="pax-advisors__eyebrow">How oversight works</p>
            <h2 id="pax-advisors-pillars-title">
              Medical safety — <em>built in</em>
            </h2>
            <p>
              Clinician identities, credentials, and state licensure are confirmed inside the secure
              clinical workflow during evaluation. Named profiles will appear here as the provider
              network is published for each state and program.
            </p>
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
              <p>Complete your intake. A licensed provider reviews within 24 hours when available.</p>
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
