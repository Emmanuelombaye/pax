import { useEffect, useState, lazy, Suspense } from 'react';
import MarketingApp from './marketing/MarketingApp.jsx';
import StartFlow from './start/StartFlow.jsx';
import { ROUTE_TABS } from './marketing/data.js';

const PortalApp = lazy(() => import('./portal/PortalApp.jsx'));
const BrandCompare = lazy(() => import('./marketing/BrandCompare.jsx'));
const CheckoutSuccess = lazy(() => import('./start/CheckoutSuccess.jsx'));

function locationRoute() {
  if (typeof window === 'undefined') return '';
  const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0].replace(/\/$/, '');
  if (hash) return hash;
  return window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
}

function parseHashTab(hashRaw) {
  const hash = (hashRaw ?? (typeof window !== 'undefined' ? window.location.hash : '')).replace(/^#\/?/, '');
  const route = (hash.split('?')[0] || locationRoute()).replace(/\/$/, '');
  if (route === 'portal' || route.startsWith('portal/')) return 'portal';
  if (route === 'start' || route.startsWith('start/')) return 'start';
  if (route === 'checkout/success' || route === 'checkout-success') return 'checkout-success';
  if (route === 'brand-compare') return 'brand-compare';
  // Deep links: #/treatments/weight-loss and /treatments/weight-loss
  if (route === 'treatments' || route.startsWith('treatments/')) return 'treatments';
  // Providers / Education nav disabled — deep links fall back to home
  if (route === 'providers' || route === 'advisors' || route === 'education') return 'home';
  if (ROUTE_TABS.includes(route)) return route;
  return 'home';
}

/** Turn /treatments/weight-loss into /#/treatments/weight-loss so Vercel rewrites keep working. */
function canonicalizePathToHash() {
  if (typeof window === 'undefined') return;
  const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
  if (!path || path === 'index.html') return;
  if (window.location.hash) return;
  window.history.replaceState(null, '', `/${window.location.search}#/${path}`);
}

function SurfaceFallback() {
  return (
    <div className="pp-loading" role="status" aria-live="polite">
      <img src="/brand/pax-monogram.svg" alt="" width="48" height="58" className="pp-loading__mark" />
      <p className="pp-muted">Loading Pax…</p>
    </div>
  );
}

/**
 * Thin surface router — marketing | start funnel | Patient Center.
 */
export default function App() {
  const [currentTab, setCurrentTab] = useState(() => parseHashTab());

  useEffect(() => {
    canonicalizePathToHash();
    const onHashChange = () => {
      setCurrentTab(parseHashTab());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', onHashChange);
    onHashChange();
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('popstate', onHashChange);
    };
  }, []);

  if (currentTab === 'portal') {
    return (
      <Suspense fallback={<SurfaceFallback />}>
        <PortalApp />
      </Suspense>
    );
  }

  if (currentTab === 'checkout-success') {
    return (
      <Suspense fallback={<SurfaceFallback />}>
        <CheckoutSuccess />
      </Suspense>
    );
  }

  if (currentTab === 'start') {
    return (
      <StartFlow
        onComplete={() => {
          window.location.hash = '#/portal';
        }}
      />
    );
  }

  if (currentTab === 'brand-compare') {
    return (
      <Suspense fallback={<SurfaceFallback />}>
        <BrandCompare />
      </Suspense>
    );
  }

  return <MarketingApp currentTab={currentTab} />;
}
