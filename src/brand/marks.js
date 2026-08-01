/**
 * Pax brand marks — paths from client handoff
 * https://pax-longevity-flow.lovable.app/
 */

export const MARKS = {
  horizontal: {
    src: '/brand/pax-horizontal.svg',
    width: 200,
    height: 112,
    alt: 'Pax Longevity',
    minWidthPx: 120,
  },
  stacked: {
    src: '/brand/pax-stacked.svg',
    width: 160,
    height: 160,
    alt: 'Pax Longevity',
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
