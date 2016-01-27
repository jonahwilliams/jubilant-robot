var version = 'v0.1.2::';

var fundamentals = [
  '/',
  '/index.js',
  '/worker.js',
  '/service.js',
  '/vendor/bootstrap-theme.min.css',
  '/vendor/bootstrap.css'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches
      .open(version + 'fundamentals')
      .then(function (cache) {
        cache.addAll(fundamentals);
      })
  );
});


self.addEventListener('activate', function activator (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys
        .filter(function (key) {
          return key.indexOf(version) !== 0;
        })
        .map(function (key) {
          return caches.delete(key);
        })
      );
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
