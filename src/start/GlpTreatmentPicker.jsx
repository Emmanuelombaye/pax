import {
  GLP_PRODUCT,
  GLP_TREATMENTS,
  TREATMENT_INCLUDES,
} from './startFlowData.js';
import { MARKETING_IMAGES } from '../marketing/assets.js';

/**
 * Yucca-geometry GLP product block with Pax brand imagery and copy.
 * Semaglutide / Tirzepatide only.
 */
export default function GlpTreatmentPicker({
  selectedId,
  onSelect,
  onCta,
  ctaLabel = 'See if I qualify',
  showCta = true,
  className = '',
}) {
  const selected = GLP_TREATMENTS.find((t) => t.id === selectedId) || GLP_TREATMENTS[0];
  const productImage = GLP_PRODUCT.image || MARKETING_IMAGES.cards.glpPen;

  return (
    <article className={`glp-pick ${className}`.trim()}>
      <div className="glp-pick__media">
        <img
          src={productImage}
          alt=""
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = MARKETING_IMAGES.cards.glpPenFallback || '/images/cards/glp-pen.png';
          }}
        />
        <div className="glp-pick__media-badges" aria-hidden="true">
          {GLP_PRODUCT.badges.map((b) => (
            <span key={b} className="glp-pick__chip">{b}</span>
          ))}
        </div>
      </div>

      <div className="glp-pick__body">
        <h2 className="glp-pick__title">{GLP_PRODUCT.title}</h2>
        <p className="glp-pick__blurb">{GLP_PRODUCT.blurb}</p>

        <div className="glp-pick__options" role="radiogroup" aria-label="Choose medication">
          {GLP_TREATMENTS.map((t) => {
            const active = selected.id === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={active}
                className={`glp-pick__option ${active ? 'is-active' : ''}`}
                onClick={() => onSelect?.(t.id)}
              >
                <span className="glp-pick__option-radio" aria-hidden="true" />
                <span className="glp-pick__option-copy">
                  <strong>{t.pathway}</strong>
                  <span>{t.tagline}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="glp-pick__includes">
          <p className="glp-pick__includes-label">All plans include</p>
          <ul>
            {TREATMENT_INCLUDES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="glp-pick__fine">{GLP_PRODUCT.finePrint}</p>
        </div>

        <div className="glp-pick__footer">
          <div className="glp-pick__price">
            <span className="glp-pick__price-label">Starting as low as</span>
            <p className="glp-pick__price-value">
              <strong>${selected.priceFrom}</strong>
              <span>/mo</span>
            </p>
          </div>
          {showCta && (
            <button type="button" className="glp-pick__cta" onClick={() => onCta?.(selected.id)}>
              {ctaLabel}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
