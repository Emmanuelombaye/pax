/**
 * PAX LONGEVITY — Brand Passport
 * Client source of truth: https://pax-longevity-flow.lovable.app/
 * Tokens: src/brand/kit.css · Docs: docs/client-brand-kit.md
 * Interim primary forest: Dark Green P+RX (#1C3F34)
 */

import { MARKS, ICONS } from './marks.js';

export const PAX_PASSPORT = {
  version: '1.3.0',
  product: {
    name: 'Pax Longevity',
    legalName: 'Pax Longevity',
    tagline: 'Live longer. Feel younger. Age intentionally.',
    shortName: 'Pax',
    category: 'Longevity · Weight Loss · Patient Center',
    locale: 'en-US',
  },

  identity: {
    slug: 'pax',
    supportEmail: 'support@paxlongevity.com',
    marketingUrl: 'https://www.pax-longevity.com',
    brandKitUrl: 'https://pax-longevity-flow.lovable.app/',
    portalPath: '#/portal',
    startPath: '#/start',
  },

  brand: {
    /** Five kit colors — nothing else. Forest is P+RX dark green for this interim pass. */
    colors: {
      sand: '#FAF6F0',
      forest: '#1C3F34',
      terracotta: '#C17C74',
      dune: '#E8C5A0',
      indigo: '#3B5266',
      oklch: {
        sand: 'oklch(0.972 0.018 78)',
        forest: 'oklch(0.32 0.065 160)',
        terracotta: 'oklch(0.642 0.108 30)',
        dune: 'oklch(0.851 0.068 65)',
        indigo: 'oklch(0.40 0.04 245)',
      },
    },
    fonts: {
      family: "'Instrument Serif', Georgia, serif",
      weights: [400],
      italicOnlyEmphasis: true,
    },
    marks: MARKS,
    icons: ICONS,
    /** Convenience default lockup */
    logo: {
      ...MARKS.horizontal,
      horizontal: MARKS.horizontal.src,
      horizontalOnDark: MARKS.horizontalOnDark?.src,
      stacked: MARKS.stacked.src,
      seal: MARKS.seal.src,
      monogram: MARKS.monogram.src,
      sun: ICONS.sun.src,
      leaf: ICONS.leaf.src,
    },
    voice: {
      tone: ['calm', 'confident', 'intentional', 'never salesy'],
      avoid: ['hype', 'optimize your health today', 'sans-serif UI fonts', 'bold type'],
    },
  },

  surfaces: {
    marketing: true,
    startFunnel: true,
    patientCenter: true,
    admin: false,
    affiliate: false,
  },

  connect: {
    mode: (import.meta.env.VITE_PAX_CONNECT_MODE || 'local').trim(),
    baseUrl: (import.meta.env.VITE_PAX_API_URL || '').trim(),
    brandId: (import.meta.env.VITE_PAX_BRAND_ID || '').trim(),
    notes:
      'Pax ships as a portable frontend with IndexedDB. Flip mode to remote and point baseUrl at your API when ready.',
  },

  compliance: {
    framing:
      'Pax Longevity patient platform for longevity care, licensed U.S. providers, and compounding pharmacy fulfillment.',
    compounding: '503A compounded medications are not FDA-approved as finished products.',
    demoDisclaimer:
      'Patient Center demo data is stored locally on this device until a production backend is connected.',
  },
};

export const brand = PAX_PASSPORT.brand;
export const colors = PAX_PASSPORT.brand.colors;
export const logo = PAX_PASSPORT.brand.logo;

/** Runtime brand-kit contract for UI + docs */
export const BRAND_KIT = {
  source: PAX_PASSPORT.identity.brandKitUrl,
  tagline: PAX_PASSPORT.product.tagline,
  colors: PAX_PASSPORT.brand.colors,
  fonts: PAX_PASSPORT.brand.fonts,
  marks: MARKS,
  icons: ICONS,
  usage: {
    canvas: 'sand',
    cards: 'dune',
    primary: 'forest',
    accent: 'terracotta',
    text: 'forest',
    buttons: { background: 'forest', text: 'sand', hoverOpacity: 0.9 },
    type: { family: 'Instrument Serif', weight: 400, emphasis: 'italic', lineHeight: 1.55 },
    logoDefault: 'horizontal',
    note: 'Indigo remains in the kit table for rare print use only — never as body text or large web surfaces. Forest is P+RX dark green (#1C3F34) for this interim pass.',
  },
};

export default PAX_PASSPORT;
