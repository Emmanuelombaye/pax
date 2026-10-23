import { useEffect, useState } from 'react';
import { listStorefrontProducts } from './connect.js';
import { fallbackProducts } from './productMap.js';

/**
 * Loads live VCO catalog; falls back to known Pax products if the network fails.
 */
export function useStorefrontProducts() {
  const [state, setState] = useState({
    status: 'loading',
    products: [],
    source: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const products = await listStorefrontProducts();
        if (cancelled) return;
        setState({
          status: 'ready',
          products,
          source: 'live',
          error: null,
        });
      } catch (err) {
        if (cancelled) return;
        setState({
          status: 'ready',
          products: fallbackProducts(),
          source: 'fallback',
          error: err?.message || 'Could not reach storefront',
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
