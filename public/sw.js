const CACHE_NAME = 'pax-cache-v2';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/logo.webp',
  '/favicon.svg',
  '/images/hero-longevity.webp',
];

const isCacheable = (url) => {
  if (url.pathname === '/sw.js') return false;
  const sameOrigin = url.origin === self.location.origin;
  const isGoogleFont = url.origin.includes('fonts.gstatic.com') || url.origin.includes('fonts.googleapis.com');
  if (!sameOrigin && !isGoogleFont) return false;

  return (
    /\.(webp|png|jpg|jpeg|svg|ico|gif|css|js|woff2?)$/i.test(url.pathname) ||
    url.pathname.startsWith('/images/') ||
    url.pathname.startsWith('/assets/') ||
    url.pathname === '/' ||
    url.pathname === '/index.html' ||
    isGoogleFont
  );
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('Precache partial fail:', err);
      }))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  if (!isCacheable(requestUrl)) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request);

      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && (response.status === 200 || response.status === 0)) {
            cache.put(event.request, response.clone());
          }
          return response;
        })
        .catch(() => null);

      if (cached) {
        event.waitUntil(networkFetch);
        return cached;
      }

      const response = await networkFetch;
      return response || new Response('Offline', { status: 503, statusText: 'Offline' });
    })
  );
});
