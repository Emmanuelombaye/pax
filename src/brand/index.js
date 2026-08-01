/**
 * Brand module barrel — import from '../brand' or './brand'.
 * Data adapter stays at ./connect.js (not re-exported here on purpose).
 */

export {
  PAX_PASSPORT,
  BRAND_KIT,
  brand,
  colors,
  logo,
  default as default,
} from './passport.js';

export { MARKS, ICONS, resolveMark, resolveIcon } from './marks.js';
export { BrandLogo } from './BrandLogo.jsx';
export { BrandMark } from './BrandMark.jsx';
export { BrandIcon } from './BrandIcon.jsx';
