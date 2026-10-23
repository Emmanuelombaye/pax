/**
 * Pax Connect Adapter — portable data boundary.
 * Storefront: VirtualClinicOS Brand Storefront (browser brand ID).
 * Patient Center: local IndexedDB until a patient API is wired.
 */
import { PAX_PASSPORT } from '../brand/passport.js';
import * as local from '../portal/storage.js';
import { beginIntake, fetchCategories, fetchProduct, fetchProducts } from './storefront.js';
import { mapCatalog } from './productMap.js';

const isRemote = () => PAX_PASSPORT.connect.mode === 'remote' && !!PAX_PASSPORT.connect.baseUrl;

async function remoteNotReady(action) {
  throw new Error(
    `Remote patient connect is not wired yet (${action}). Patient Center is local; storefront catalog uses VirtualClinicOS.`,
  );
}

export const connectMode = () => (isRemote() ? 'remote' : 'local');

export async function listStorefrontProducts() {
  const raw = await fetchProducts();
  return mapCatalog(raw);
}

export async function getStorefrontProduct(slugOrSku) {
  const raw = await fetchProduct(slugOrSku);
  return raw ? mapCatalog([raw])[0] : null;
}

export async function listStorefrontCategories() {
  return fetchCategories();
}

export function startProductIntake(productOrUrl) {
  const url = typeof productOrUrl === 'string' ? productOrUrl : productOrUrl?.intakeUrl;
  beginIntake(url);
}

export async function login(payload) {
  if (isRemote()) return remoteNotReady('login');
  return local.login(payload);
}

export async function completePurchaseSignup(payload) {
  if (isRemote()) return remoteNotReady('completePurchaseSignup');
  return local.completePurchaseSignup(payload);
}

export function logout() {
  return local.logout();
}

export function getSession() {
  return local.getSession();
}

export async function getCurrentUser() {
  if (isRemote()) return remoteNotReady('getCurrentUser');
  return local.getCurrentUser();
}

export async function getProfile(userId) {
  if (isRemote()) return remoteNotReady('getProfile');
  return local.getProfile(userId);
}

export async function saveProfile(userId, patch) {
  if (isRemote()) return remoteNotReady('saveProfile');
  return local.saveProfile(userId, patch);
}

export async function toggleChecklistItem(userId, itemId) {
  if (isRemote()) return remoteNotReady('toggleChecklistItem');
  return local.toggleChecklistItem(userId, itemId);
}

export async function sendMessage(userId, body) {
  if (isRemote()) return remoteNotReady('sendMessage');
  return local.sendMessage(userId, body);
}

export async function markMessagesRead(userId) {
  if (isRemote()) return remoteNotReady('markMessagesRead');
  return local.markMessagesRead(userId);
}

export async function addWeightEntry(userId, lbs) {
  if (isRemote()) return remoteNotReady('addWeightEntry');
  return local.addWeightEntry(userId, lbs);
}

export function getPendingOrder() {
  return local.getPendingOrder();
}

export function savePendingOrder(order) {
  return local.savePendingOrder(order);
}

export function clearPendingOrder() {
  return local.clearPendingOrder();
}

export async function dbStats() {
  if (isRemote()) return { mode: 'remote', note: 'patient API not implemented' };
  const stats = await local.dbStats();
  return {
    mode: 'local',
    storefront: PAX_PASSPORT.connect.baseUrl,
    brandId: PAX_PASSPORT.connect.brandId,
    ...stats,
  };
}

export { DEMO_CREDENTIALS, inspectAuthDb, getAuditLog } from '../portal/authDictDb.js';
