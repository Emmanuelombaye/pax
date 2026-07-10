import { logo } from './passport.js';

/** Marketing header/footer brand mark — driven by brand passport */
export function BrandLogo({ variant = 'header', onClick }) {
  const isHeader = variant === 'header';

  return (
    <a
      href="#/"
      className={`brand-logo brand-logo--${variant}`}
      aria-label="Pax Longevity home"
      onClick={onClick}
    >
      <picture className="brand-logo__picture">
        <source srcSet={logo.webp} type="image/webp" />
        <img
          src={logo.png}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className="brand-logo__img"
          loading={isHeader ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={isHeader ? 'high' : 'auto'}
        />
      </picture>
    </a>
  );
}
