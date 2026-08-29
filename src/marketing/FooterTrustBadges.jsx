const FLAG_SRC = '/brand/badge-usa-flag.svg?v=1';
const PROVIDER_SRC = '/brand/badge-licensed-provider.svg?v=1';
const CADUCEUS_SRC = '/brand/badge-hipaa-caduceus.svg?v=1';

export default function FooterTrustBadges() {
  return (
    <div className="footer-trust" role="group" aria-label="Pharmacy compounding, licensed provider review, and data protection">
      <a href="#/shipping" className="footer-trust__badge">
        <span className="footer-trust__icon footer-trust__icon--flag">
          <img src={FLAG_SRC} alt="" width="38" height="26" decoding="async" />
        </span>
        <span className="footer-trust__copy">
          <span className="footer-trust__kicker">Compounded by</span>
          <span className="footer-trust__title">Licensed Pharmacies in the USA</span>
        </span>
      </a>

      <a href="#/providernetwork" className="footer-trust__badge">
        <span className="footer-trust__icon footer-trust__icon--provider">
          <img src={PROVIDER_SRC} alt="" width="48" height="48" decoding="async" />
        </span>
        <span className="footer-trust__copy">
          <span className="footer-trust__kicker">Reviewed by</span>
          <span className="footer-trust__title">Licensed U.S. Providers</span>
        </span>
      </a>

      <a href="#/hipaa" className="footer-trust__badge">
        <span className="footer-trust__icon footer-trust__icon--caduceus">
          <img src={CADUCEUS_SRC} alt="" width="48" height="48" decoding="async" />
        </span>
        <span className="footer-trust__copy">
          <span className="footer-trust__kicker">Data protected</span>
          <span className="footer-trust__title footer-trust__title--hipaa">HIPAA</span>
          <span className="footer-trust__sub">Compliant</span>
        </span>
      </a>
    </div>
  );
}
