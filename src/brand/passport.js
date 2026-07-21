/**
 * PAX LONGEVITY — Brand Passport (portable product identity)
 * Single source of truth for branding, product surface, and future connect hooks.
 * Keep this file frontend-only. Swap `connect.mode` later when wiring a real backend.
 */

export const PAX_PASSPORT = {
  version: '1.0.0',
  product: {
    name: 'Pax Longevity',
    legalName: 'Pax Longevity',
    tagline: 'Prevent decline years before symptoms.',
    shortName: 'Pax',
    category: 'Longevity · Peptide Care · Patient Center',
    locale: 'en-US',
  },

  identity: {
    slug: 'pax',
    supportEmail: 'support@pax-longevity.com',
    marketingUrl: 'https://www.pax-longevity.com',
    portalPath: '#/portal',
    startPath: '#/start',
  },

  brand: {
    colors: {
      sand: '#FAF6F0',
      dune: '#EBC5A0',
      terracotta: '#C17C74',
      forest: '#2D5A3D',
      ink: '#1F1A16',
      white: '#FFFFFF',
    },
    fonts: {
      display: "'Instrument Serif', Georgia, serif",
      body: "'Work Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    logo: {
      webp: '/images/pax-logo.webp',
      png: '/images/pax-logo.png',
      width: 270,
      height: 280,
      alt: 'Pax Longevity',
    },
    voice: {
      tone: ['calm', 'clinical-confident', 'coastal', 'premium'],
      avoid: ['hype', 'clinical jargon overload', 'green medical clichés'],
    },
  },

  surfaces: {
    marketing: true,
    startFunnel: true,
    patientCenter: true,
    admin: false,
    affiliate: false,
  },

  /**
   * Connect contract — local-first today, remote-ready tomorrow.
   * mode: 'local' | 'remote'
   * When remote, set baseUrl + apiKey via env; no Peak coupling required.
   */
  connect: {
    mode: (import.meta.env.VITE_PAX_CONNECT_MODE || 'local').trim(),
    baseUrl: (import.meta.env.VITE_PAX_API_URL || '').trim(),
    brandId: (import.meta.env.VITE_PAX_BRAND_ID || '').trim(),
    notes:
      'Pax ships as a portable frontend with IndexedDB. Flip mode to remote and point baseUrl at your API when ready.',
  },

  compliance: {
    framing: 'Pax Longevity patient platform for longevity care, licensed U.S. providers, and compounding pharmacy fulfillment.',
    compounding: '503A compounded medications are not FDA-approved as finished products.',
    demoDisclaimer: 'Patient Center demo data is stored locally on this device until a production backend is connected.',
  },
};

export const brand = PAX_PASSPORT.brand;
export const colors = PAX_PASSPORT.brand.colors;
export const logo = PAX_PASSPORT.brand.logo;

export default PAX_PASSPORT;
