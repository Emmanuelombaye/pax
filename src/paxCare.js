/**
 * Pax portable routes — independent of Peak Health.
 * Start funnel + Patient Center live entirely inside this SPA.
 */
import { PAX_PASSPORT } from './brand/passport.js';

export function paxStartUrl() {
  return PAX_PASSPORT.identity.startPath;
}

export function paxPortalUrl() {
  return PAX_PASSPORT.identity.portalPath;
}

export function startPaxEnrollment() {
  window.location.hash = paxStartUrl().replace(/^#/, '#');
  if (!window.location.hash.includes('start')) {
    window.location.hash = '#/start';
  }
}

export function openPaxPortal() {
  window.location.hash = '#/portal';
}
