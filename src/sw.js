self.addEventListener('install', function(event) {
  // pre cache a load of stuff:
  event.waitUntil(
    caches.open('mycache')
      .then(function(cache) {
      return cache.addAll([
        '/'
      ])
      .catch(function(error){
        console.error('Error on installing');
        console.error(error);
      });
    })
  )
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