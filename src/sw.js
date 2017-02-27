importScripts('./cachepolyfill.js');

var CACHE_VERSION = 90;
var CURRENT_CACHES = {
  prefetch: `prefetch-cache-v${ CACHE_VERSION }`
};

self.addEventListener('install', (event) => {
  // pre cache a load of stuff:
  event.waitUntil(
    self.skipWaiting()
    .then(() => {
      caches.open(CURRENT_CACHES.prefetch)
        .then((cache) => {
          return cache.addAll([
            '/android-chrome-192x192.png',
            '/android-chrome-512x512.png',
            '/apple-touch-icon.png',
            '/browserconfig.xml',
            '/favicon-16x16.png',
            '/favicon-32x32.png',
            '/favicon.ico',
            '/favicon.png',
            '/mstile-150x150.png',
            '/safari-pinned-tab.svg',
            '/bundle.js',
            '/index.html',
            'sw.js',
            'cachepolyfill.js',
            '/',
            'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/css/bootstrap-grid.min.css'
          ])
        .then(() => {
          console.log('Caches added'); // eslint-disable-line
        })
        .catch((error) => {
          console.error('Error on installing'); // eslint-disable-line
          console.error(error); // eslint-disable-line
        });
        });
    })
  );
});


self.addEventListener('activate', (event) => {
  // Delete all caches that aren't named in CURRENT_CACHES.
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map((key) => {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
    self.clients.claim()
      .then(() => {
        caches.keys().then((cacheNames) => {
          return Promise.all(
            cacheNames.forEach((cacheName) => {
              if (expectedCacheNames.indexOf(cacheName) === -1) {
                // If this cache name isn't present in the array of "expected" cache names, then delete it.
                return caches.delete(cacheName);
              }
            })
          );
        });
      })
  );
});


self.addEventListener('fetch', (event) => {

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (event.request.url.indexOf('facebook') > -1) {
          return fetch(event.request);
        }
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
    .catch((error) => {
      console.error('Error on fetching'); // eslint-disable-line
      console.error(error); // eslint-disable-line
    })
  );
});
