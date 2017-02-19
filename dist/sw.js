self.addEventListener('install', function(event) {
  console.log('INSTALL')
  // pre cache a load of stuff:
  event.waitUntil(
    caches.open('mycache').then(function(cache) {
      return cache.addAll([
        '/dist/bundle.js',
        '/dist/app.css',
        '/dist/index.html',
        'https://cdnjs.cloudflare.com/ajax/libs/antd/2.7.2/antd.css'
      ]);
    })
  )
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      console.log('request: ', event.request.url);
      console.log('response: ', response);
      return response || fetch(event.request);
    })
  );
});