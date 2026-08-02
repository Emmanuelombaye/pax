import { useEffect, useState, lazy, Suspense } from 'react';
import MarketingApp from './marketing/MarketingApp.jsx';
import { ROUTE_TABS } from './marketing/data.js';

const PortalApp = lazy(() => import('./portal/PortalApp.jsx'));
const StartFlow = lazy(() => import('./start/StartFlow.jsx'));
const BrandCompare = lazy(() => import('./marketing/BrandCompare.jsx'));

function parseHashTab(hashRaw) {
  const hash = (hashRaw ?? (typeof window !== 'undefined' ? window.location.hash : '')).replace(/^#\/?/, '');
  if (hash === 'portal' || hash.startsWith('portal/')) return 'portal';
  if (hash === 'start' || hash.startsWith('start/')) return 'start';
  if (hash === 'brand-compare') return 'brand-compare';
  if (ROUTE_TABS.includes(hash)) return hash;
  return 'home';
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
    const onHashChange = () => {
      setCurrentTab(parseHashTab());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    onHashChange();
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (currentTab === 'portal') {
    return (
      <Suspense fallback={<SurfaceFallback />}>
        <PortalApp />
      </Suspense>
    );
  }

  if (currentTab === 'start') {
    return (
      <Suspense fallback={<SurfaceFallback />}>
        <StartFlow
          onComplete={() => {
            window.location.hash = '#/portal';
          }}
        />
      </Suspense>
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
