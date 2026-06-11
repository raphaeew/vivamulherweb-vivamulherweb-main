const CACHE_NAME = 'vivamulher-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './style-index.css',
  './script.js',
  './assets/img/logo1.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
