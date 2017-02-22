importScripts('./cachepolyfill.js');

var CACHE_VERSION = 80;
var CURRENT_CACHES = {
  prefetch: `prefetch-cache-v${ CACHE_VERSION }`
};

self.addEventListener('install', (event) => {
  console.log('Service Worker Install...');
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
            '/app.css',
            '/bundle.js',
            '/index.html',
            'sw.js',
            'cachepolyfill.js',
            '/',
          /** Dev Mode */
          // '/dist/android-chrome-192x192.png',
          // '/dist/android-chrome-512x512.png',
          // '/dist/apple-touch-icon.png',
          // '/dist/browserconfig.xml',
          // '/dist/favicon-16x16.png',
          // '/dist/favicon-32x32.png',
          // '/dist/favicon.ico',
          // '/dist/favicon.png',
          // '/dist/mstile-150x150.png',
          // '/dist/safari-pinned-tab.svg',
          // '/dist/app.css',
          // '/dist/bundle.js',
          // '/dist/index.html',
          // '/dist/sw.js',
          // '/dist/cachepolyfill.js',
          // '/dist/'
          ])
        .then(() => {
          console.log('Caches added');
        })
        .catch((error) => {
          console.error('Error on installing');
          console.error(error);
        });
        });
    })
  );
});


self.addEventListener('activate', (event) => {
  console.log('Service Worker Activate...');
  // Delete all caches that aren't named in CURRENT_CACHES.
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map((key) => {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
    self.clients.claim()
      .then(() => {
        caches.keys().then((cacheNames) => {
          return Promise.all(
            cacheNames.map((cacheName) => {
              console.log('Cache name: ', cacheName);
              if (expectedCacheNames.indexOf(cacheName) === -1) {
                // If this cache name isn't present in the array of "expected" cache names, then delete it.
                console.log('Deleting out of date cache:', cacheName);
                return caches.delete(cacheName);
              }
            })
          );
        });
      })
  );
});


self.addEventListener('fetch', (event) => {
  console.log('Service Worker Fetch...');

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (event.request.url.indexOf('facebook') > -1) {
          return fetch(event.request);
        }
        if (response) {
          console.log('Serve from cache', response);
          return response;
        }
        return fetch(event.request);
      })
    .catch((error) => {
      console.error('Error on fetching');
      console.error(error);
    })
  );
});
