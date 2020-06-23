const cacheName = 'cache-v1';
const precacheResources = [
    '/',
    'index.html',
    '/resources/web/viewer.html',
    '/resources/web/viewer.css',
    '/resources/build/pdf.js',
    '/resources/web/viewer.js',
    '/resources/build/pdf.worker.js',
    '/resources/web/2020_TSC_Guidebook_COVID.pdf',
    'styles/main.css',
    'https://kit.fontawesome.com/1b88120e53.js',
    'https://kit-free.fontawesome.com/releases/latest/css/free-v4-shims.min.css',
    'https://kit-free.fontawesome.com/releases/latest/css/free-v4-font-face.min.css',
    'https://kit-free.fontawesome.com/releases/latest/css/free.min.css',
    'https://kit-free.fontawesome.com/releases/latest/webfonts/free-fa-solid-900.woff2',
    'https://kit-free.fontawesome.com/releases/latest/webfonts/free-fa-regular-400.woff2'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
});
