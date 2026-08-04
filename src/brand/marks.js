/**
 * Pax brand marks — paths from client handoff
 * https://pax-longevity-flow.lovable.app/
 * Variations A/B/C for interim P+RX forest review
 */

export const MARKS = {
  /** A — Forest on Sand (default, ship site-wide) */
  horizontal: {
    src: '/brand/pax-horizontal.svg?v=2',
    width: 260,
    height: 60,
    alt: 'Pax Longevity',
    minWidthPx: 140,
    label: 'A · Forest on Sand',
  },
  /** B — Sand on Forest (dark surfaces) */
  horizontalOnDark: {
    src: '/brand/pax-horizontal-on-dark.svg?v=2',
    width: 260,
    height: 60,
    alt: 'Pax Longevity',
    minWidthPx: 140,
    label: 'B · Sand on Forest',
  },
  stacked: {
    src: '/brand/pax-stacked.svg?v=2',
    width: 160,
    height: 170,
    alt: 'Pax Longevity',
    label: 'Stacked',
  },
  /** C — Compact stacked for drawer / square */
  stackedCompact: {
    src: '/brand/pax-stacked-compact.svg?v=2',
    width: 140,
    height: 140,
    alt: 'Pax Longevity',
    label: 'C · Compact stacked',
  },
  seal: {
    src: '/brand/pax-seal.svg',
    width: 160,
    height: 160,
    alt: 'Pax Longevity seal',
  },
  monogram: {
    src: '/brand/pax-monogram.svg',
    width: 64,
    height: 76,
    alt: 'Pax',
  },
};

export const LOGO_COMPARE = [
  MARKS.horizontal,
  MARKS.horizontalOnDark,
  MARKS.stackedCompact,
];

export const ICONS = {
  sun: { src: '/brand/pax-sun.svg', width: 80, height: 40, alt: '' },
  leaf: { src: '/brand/pax-leaf.svg', width: 48, height: 48, alt: '' },
  monogram: { src: '/brand/pax-monogram.svg', width: 40, height: 48, alt: '' },
};

export function resolveMark(mark = 'horizontal') {
  return MARKS[mark] || MARKS.horizontal;
}

export function resolveIcon(name = 'sun') {
  return ICONS[name] || ICONS.sun;
}
