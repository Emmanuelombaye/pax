/**
 * VirtualClinicOS Brand Storefront client (browser-safe).
 * Auth: brand ID via query/header — never put API keys in the frontend.
 * Docs: https://portal.virtualclinicos.com/api-docs#storefront-auth
 */
import { PAX_PASSPORT } from './passport.js';

const DEFAULT_BASE = 'https://portal.virtualclinicos.com';

function config() {
  const baseUrl = (PAX_PASSPORT.connect.baseUrl || DEFAULT_BASE).replace(/\/$/, '');
  const brandId = PAX_PASSPORT.connect.brandId;
  if (!brandId) {
    throw new Error('Missing VITE_PAX_BRAND_ID — set Pax brand ID in env or passport defaults.');
  }
  return { baseUrl, brandId };
}

async function commerceGet(path) {
  const { baseUrl, brandId } = config();
  const url = new URL(`${baseUrl}${path}`);
  url.searchParams.set('brandId', brandId);

  const res = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
      'X-Brand-Id': brandId,
    },
  });

  let body = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  if (!res.ok) {
    const msg = body?.error || body?.message || `Storefront request failed (${res.status})`;
    throw new Error(msg);
  }

  return body;
}

let productsCache = null;
let productsInflight = null;

export async function fetchProducts({ force = false } = {}) {
  if (!force && productsCache) return productsCache;
  if (!force && productsInflight) return productsInflight;

  productsInflight = commerceGet('/api/commerce/v1/products')
    .then((data) => {
      const list = Array.isArray(data?.products) ? data.products : [];
      productsCache = list;
      return list;
    })
    .finally(() => {
      productsInflight = null;
    });

  return productsInflight;
}

export async function fetchProduct(slugOrSku) {
  const data = await commerceGet(`/api/commerce/v1/products/${encodeURIComponent(slugOrSku)}`);
  return data?.product || null;
}

export async function fetchCategories() {
  const data = await commerceGet('/api/commerce/v1/categories');
  return Array.isArray(data?.categories) ? data.categories : [];
}

export function beginIntake(intakeUrl) {
  if (!intakeUrl) {
    throw new Error(
      'This product has no intake URL yet. Contact your VirtualClinicOS rep to finish intake domain setup.',
    );
  }
  window.location.assign(intakeUrl);
}
