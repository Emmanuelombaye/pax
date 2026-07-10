import { logo } from './passport.js';

/** Shared Pax brand mark for portal + start funnel — driven by brand passport */
export function BrandMark({ size = 'md', className = '' }) {
  return (
    <div className={`pp-brand pp-brand--${size} ${className}`.trim()}>
      <picture>
        <source srcSet={logo.webp} type="image/webp" />
        <img
          src={logo.png}
          alt={logo.alt}
          className="pp-brand__img"
          width={logo.width}
          height={logo.height}
        />
      </picture>
    </div>
  );
}
