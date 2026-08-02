import { LOGO_COMPARE, MARKS } from '../brand/marks.js';
import { BRAND_KIT } from '../brand/passport.js';

const VARIATIONS = [
  {
    key: 'A',
    title: 'A · Forest on Sand',
    note: 'Default — ship site-wide. P+RX dark green wordmark on Sand.',
    mark: MARKS.horizontal,
    ground: 'sand',
  },
  {
    key: 'B',
    title: 'B · Sand on Forest',
    note: 'Reverse for dark headers, footers, and forest banners.',
    mark: MARKS.horizontalOnDark,
    ground: 'forest',
  },
  {
    key: 'C',
    title: 'C · Compact stacked',
    note: 'Tighter stacked lockup for mobile drawer and square slots.',
    mark: MARKS.stackedCompact,
    ground: 'sand',
  },
];

/**
 * Internal stakeholder review — logo variations A/B/C on Sand and Forest grounds.
 * Route: #/brand-compare
 */
export default function BrandCompare() {
  return (
    <div className="brand-compare fade-in">
      <header className="brand-compare__header">
        <p className="kit-label">Pax Longevity · Interim brand review</p>
        <h1 className="brand-compare__title">
          Logo variations <em>A · B · C</em>
        </h1>
        <p className="brand-compare__lede">
          Instrument Serif lockups with Dark Green P+RX forest ({BRAND_KIT.colors.forest}).
          Variation A is live site-wide until stakeholders pick otherwise.
        </p>
        <a href="#/" className="btn btn-primary">Back to site</a>
      </header>

      <section className="brand-compare__grid" aria-label="Logo variations">
        {VARIATIONS.map((item) => (
          <article key={item.key} className="brand-compare__card">
            <div className={`brand-compare__stage brand-compare__stage--${item.ground}`}>
              <img
                src={item.mark.src}
                alt={item.mark.alt}
                width={item.mark.width}
                height={item.mark.height}
                className="brand-compare__mark"
              />
            </div>
            <h2 className="brand-compare__name">{item.title}</h2>
            <p className="brand-compare__note">{item.note}</p>
          </article>
        ))}
      </section>

      <section className="brand-compare__grounds" aria-label="Ground checks">
        <h2 className="brand-compare__subtitle">Ground checks</h2>
        <div className="brand-compare__grounds-row">
          <div className="brand-compare__stage brand-compare__stage--sand">
            {LOGO_COMPARE.filter((m) => m.src !== MARKS.horizontalOnDark.src).map((m) => (
              <img key={m.src} src={m.src} alt={m.alt} width={m.width} height={m.height} />
            ))}
          </div>
          <div className="brand-compare__stage brand-compare__stage--forest">
            <img
              src={MARKS.horizontalOnDark.src}
              alt={MARKS.horizontalOnDark.alt}
              width={MARKS.horizontalOnDark.width}
              height={MARKS.horizontalOnDark.height}
            />
          </div>
        </div>
      </section>

      <section className="brand-compare__swatches" aria-label="Color tokens">
        <h2 className="brand-compare__subtitle">Kit colors</h2>
        <ul className="brand-compare__swatch-list">
          {Object.entries({
            sand: BRAND_KIT.colors.sand,
            forest: BRAND_KIT.colors.forest,
            terracotta: BRAND_KIT.colors.terracotta,
            dune: BRAND_KIT.colors.dune,
          }).map(([name, hex]) => (
            <li key={name} className="brand-compare__swatch">
              <span className="brand-compare__swatch-chip" style={{ background: hex }} />
              <span className="brand-compare__swatch-name">{name}</span>
              <span className="brand-compare__swatch-hex">{hex}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
