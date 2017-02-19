var CACHE_VERSION = 16;
var CURRENT_CACHES = {
  prefetch: 'prefetch-cache-v' + CACHE_VERSION
};

self.addEventListener('install', function(event) {
  // pre cache a load of stuff:
  event.waitUntil(
    caches.open(CURRENT_CACHES.prefetch)
      .then(function(cache) {
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
        '/'
      ])
      .catch(function(error){
        console.error('Error on installing');
        console.error(error);
      });
    })
  )
});


self.addEventListener('activate', function(event) {
  // Delete all caches that aren't named in CURRENT_CACHES.
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            // If this cache name isn't present in the array of "expected" cache names, then delete it.
            console.log('Deleting out of date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
      return response || fetch(event.request);
    })
    .catch(function(error){
      console.error('Error on fetching');
      console.error(error);
    })
  );
});