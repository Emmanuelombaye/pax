import { LEGAL_LINKS, LEGAL_PAGES } from './legalContent.js';

function linkify(text) {
  const parts = String(text).split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer">
        {part}
      </a>
    ) : (
      part
    ),
  );
}

export default function LegalPage({ pageId }) {
  const page = LEGAL_PAGES[pageId];
  if (!page) return null;

  return (
    <div className="fade-in legal-page">
      <section className="legal-hero">
        <div className="container legal-hero__inner">
          <p className="legal-eyebrow">{page.eyebrow}</p>
          <h1 className="legal-title">{page.title}</h1>
          <p className="legal-updated">Last updated: {page.lastUpdated}</p>
        </div>
      </section>

      <section className="legal-body">
        <div className="container legal-layout">
          <aside className="legal-nav" aria-label="Legal pages">
            <p className="legal-nav__label">Legal</p>
            <nav>
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`legal-nav__link ${link.id === pageId ? 'is-active' : ''}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </aside>

          <article className="legal-content">
            <p className="legal-intro">{linkify(page.intro)}</p>
            {page.sections.map((section) => (
              <section key={section.heading} className="legal-section">
                <h2>{section.heading}</h2>
                {section.body.map((paragraph, idx) => (
                  <p key={`${section.heading}-${idx}`}>{linkify(paragraph)}</p>
                ))}
              </section>
            ))}
            <p className="legal-contact">
              Questions? Contact{' '}
              <a href="mailto:support@paxlongevity.com">support@paxlongevity.com</a>
              {' · '}
              <a href="tel:+16154342927">(615) 434-2927</a>
              <br />
              Pax Longevity LLC · 382 NE 191st St Num 931099, Miami, FL 33179
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
