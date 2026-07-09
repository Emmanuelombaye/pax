/** Shared Pax brand mark for portal + start funnel */
export function BrandMark({ size = 'md', className = '' }) {
  return (
    <div className={`pp-brand pp-brand--${size} ${className}`.trim()}>
      <picture>
        <source srcSet="/images/pax-logo.webp" type="image/webp" />
        <img
          src="/images/pax-logo.png"
          alt="Pax Longevity"
          className="pp-brand__img"
          width="270"
          height="280"
        />
      </picture>
    </div>
  );
}
