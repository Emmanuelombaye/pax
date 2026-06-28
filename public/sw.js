const CACHE_NAME = 'pax-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/logo.webp',
  '/favicon.svg',
  '/icons.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('Pre-caching skipped/failed during install:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);

  // Exclude service worker file itself from the cache
  if (requestUrl.pathname === '/sw.js') {
    return;
  }

  const isSameOrigin = requestUrl.origin === self.location.origin;
  const isGoogleFont = requestUrl.origin.includes('fonts.gstatic.com') || requestUrl.origin.includes('fonts.googleapis.com');

  if (isSameOrigin || isGoogleFont) {
    const isImage = /\.(webp|png|jpg|jpeg|svg|ico|gif)$/i.test(requestUrl.pathname) || requestUrl.pathname.includes('/images/');
    const isStatic = /\.(css|js|woff|woff2|ttf|eot)$/i.test(requestUrl.pathname);
    const isRoot = requestUrl.pathname === '/' || requestUrl.pathname === '/index.html';

    if (isImage || isStatic || isRoot || isGoogleFont) {
      event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return fetch(event.request).then((networkResponse) => {
            if (!networkResponse || (networkResponse.status !== 200 && networkResponse.status !== 0)) {
              return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });

            return networkResponse;
          }).catch(() => {
            // Fallback silently if offline and not in cache
          });
        })
      );
    }
  }
});
