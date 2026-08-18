function UsaFlagIcon() {
  return (
    <span className="brand-footer-trust__flag" aria-hidden="true">
      <svg viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="32" fill="#bf0a30" />
        <rect y="2.46" width="48" height="2.46" fill="#fff" />
        <rect y="7.38" width="48" height="2.46" fill="#fff" />
        <rect y="12.31" width="48" height="2.46" fill="#fff" />
        <rect y="17.23" width="48" height="2.46" fill="#fff" />
        <rect y="22.15" width="48" height="2.46" fill="#fff" />
        <rect y="27.08" width="48" height="2.46" fill="#fff" />
        <rect width="19.2" height="17.23" fill="#002868" />
        {[
          [3.2, 2.8],
          [7.2, 2.8],
          [11.2, 2.8],
          [15.2, 2.8],
          [5.2, 5.6],
          [9.2, 5.6],
          [13.2, 5.6],
          [3.2, 8.4],
          [7.2, 8.4],
          [11.2, 8.4],
          [15.2, 8.4],
          [5.2, 11.2],
          [9.2, 11.2],
          [13.2, 11.2],
          [3.2, 14],
          [7.2, 14],
          [11.2, 14],
          [15.2, 14],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="0.7" fill="#fff" />
        ))}
      </svg>
    </span>
  );
}

function CaduceusIcon() {
  return (
    <span className="brand-footer-trust__caduceus" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6v36" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path
          d="M24 11c-7.5-1.8-13 2.2-14.5 8.2 2.2 1.6 6.4.4 9.2-2.4 3.4-3.4 7.2-4.2 11.3-1.2 3.4 2.5 5.2 7.2 2.4 11.2-2.6 3.7-7.6 4.4-11.6 1.8-3.6-2.4-5.4-6.8-3.2-10.6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M24 11c7.5-1.8 13 2.2 14.5 8.2-2.2 1.6-6.4.4-9.2-2.4-3.4-3.4-7.2-4.2-11.3-1.2-3.4 2.5-5.2 7.2-2.4 11.2 2.6 3.7 7.6 4.4 11.6 1.8 3.6-2.4 5.4-6.8 3.2-10.6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path d="M16 10c-5 1.2-8.5 4.8-8.8 9.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M32 10c5 1.2 8.5 4.8 8.8 9.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="6" r="1.6" fill="currentColor" />
      </svg>
    </span>
  );
}

const TRUST_BADGE_CSS = `
.brand-footer-trust {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.75rem 2.75rem;
  margin: 1.75rem 0 0;
  padding-top: 1.35rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}
.brand-footer-trust--light {
  border-top-color: rgba(10, 31, 61, 0.12);
}
.brand-footer-trust__item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  color: inherit;
  text-decoration: none;
}
.brand-footer-trust__flag {
  display: block;
  width: 42px;
  height: 28px;
  flex: none;
  overflow: hidden;
  border-radius: 6px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.22);
}
.brand-footer-trust--light .brand-footer-trust__flag,
.brand-footer-trust__item--light .brand-footer-trust__flag {
  box-shadow: 0 0 0 1px rgba(10, 31, 61, 0.18);
}
.brand-footer-trust__flag svg {
  display: block;
  width: 100%;
  height: 100%;
}
.brand-footer-trust__caduceus {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex: none;
  color: rgba(255, 255, 255, 0.92);
}
.brand-footer-trust--light .brand-footer-trust__caduceus,
.brand-footer-trust__item--light .brand-footer-trust__caduceus {
  color: #0a1f3d;
}
.brand-footer-trust__caduceus svg {
  width: 36px;
  height: 36px;
}
.brand-footer-trust__copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.brand-footer-trust__kicker {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}
.brand-footer-trust--light .brand-footer-trust__kicker,
.brand-footer-trust__item--light .brand-footer-trust__kicker {
  color: rgba(10, 31, 61, 0.5);
}
.brand-footer-trust__title {
  font-size: 14px;
  font-weight: 650;
  line-height: 1.2;
  color: #fff;
}
.brand-footer-trust--light .brand-footer-trust__title,
.brand-footer-trust__item--light .brand-footer-trust__title {
  color: #0a1f3d;
}
.brand-footer-trust__sub {
  display: block;
  font-weight: 500;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.88);
}
.brand-footer-trust--light .brand-footer-trust__sub,
.brand-footer-trust__item--light .brand-footer-trust__sub {
  color: rgba(10, 31, 61, 0.72);
}
.brand-footer-trust__item--link:hover .brand-footer-trust__title {
  text-decoration: underline;
  text-underline-offset: 3px;
}
@media (max-width: 640px) {
  .brand-footer-trust {
    margin-top: 1.5rem;
    gap: 1.15rem 1.5rem;
  }
  .brand-footer-trust__title {
    font-size: 13px;
  }
}
`;

function TrustItems({ hipaaHref, tone }) {
  const itemClass = `brand-footer-trust__item${tone === 'light' ? ' brand-footer-trust__item--light' : ''}`;
  const hipaaBody = (
    <>
      <CaduceusIcon />
      <span className="brand-footer-trust__copy">
        <span className="brand-footer-trust__kicker">Data protected</span>
        <span className="brand-footer-trust__title">
          HIPAA <span className="brand-footer-trust__sub">Compliant</span>
        </span>
      </span>
    </>
  );

  return (
    <>
      <div className={itemClass}>
        <UsaFlagIcon />
        <span className="brand-footer-trust__copy">
          <span className="brand-footer-trust__kicker">Compounded by</span>
          <span className="brand-footer-trust__title">Licensed Pharmacies in the USA</span>
        </span>
      </div>
      {hipaaHref ? (
        <a href={hipaaHref} className={`${itemClass} brand-footer-trust__item--link`}>
          {hipaaBody}
        </a>
      ) : (
        <div className={itemClass}>{hipaaBody}</div>
      )}
    </>
  );
}

/** Unique footer compliance marks: US-compounded pharmacies + HIPAA. */
export function FooterTrustBadges({
  hipaaHref,
  tone = 'dark',
  layout = 'row',
}) {
  const items = <TrustItems hipaaHref={hipaaHref} tone={tone} />;

  return (
    <>
      <style>{TRUST_BADGE_CSS}</style>
      {layout === 'items' ? (
        items
      ) : (
        <div className={`brand-footer-trust brand-footer-trust--${tone}`} aria-label="Compliance">
          {items}
        </div>
      )}
    </>
  );
}
