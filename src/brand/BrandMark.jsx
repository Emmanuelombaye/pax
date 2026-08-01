import { resolveMark } from './marks.js';

/**
 * Portal + start funnel brand mark.
 * mark: horizontal | stacked | seal | monogram
 * size: sm | md | lg | hero
 */
export function BrandMark({
  size = 'md',
  mark = 'horizontal',
  className = '',
}) {
  const asset = resolveMark(mark);

  return (
    <div className={`pp-brand pp-brand--${size} ${className}`.trim()}>
      <img
        src={asset.src}
        alt={asset.alt}
        className="pp-brand__img"
        width={asset.width}
        height={asset.height}
        decoding="async"
      />
    </div>
  );
}
