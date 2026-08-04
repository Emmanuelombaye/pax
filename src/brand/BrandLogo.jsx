import { resolveMark } from './marks.js';

/**
 * Marketing brand lockup (header / drawer / footer).
 * mark: horizontal | horizontalOnDark | stacked | stackedCompact | seal | monogram
 * Default A = horizontal (Forest on Sand). Drawer uses compact stacked (C).
 */
export function BrandLogo({
  variant = 'header',
  mark,
  onClick,
  className = '',
}) {
  const resolvedMark =
    mark ||
    (variant === 'drawer'
      ? 'stackedCompact'
      : variant === 'footer'
        ? 'horizontalOnDark'
        : 'horizontal');
  const asset = resolveMark(resolvedMark);
  const isHeader = variant === 'header';

  return (
    <a
      href="#/"
      className={`brand-logo brand-logo--${variant} ${className}`.trim()}
      aria-label="Pax Longevity home"
      onClick={onClick}
    >
      <img
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        className="brand-logo__img"
        loading={isHeader ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={isHeader ? 'high' : 'auto'}
      />
    </a>
  );
}
