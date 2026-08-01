import { resolveIcon } from './marks.js';

/**
 * Kit icons — sun | leaf | monogram.
 * Decorative only; use aria-hidden when no label is needed.
 */
export function BrandIcon({
  name = 'sun',
  className = '',
  label,
  size,
}) {
  const icon = resolveIcon(name);
  const style = size
    ? { width: size, height: 'auto' }
    : undefined;

  return (
    <img
      src={icon.src}
      alt={label ?? icon.alt}
      width={icon.width}
      height={icon.height}
      className={`pax-icon pax-icon--${name} ${className}`.trim()}
      style={style}
      decoding="async"
      aria-hidden={label ? undefined : true}
    />
  );
}
