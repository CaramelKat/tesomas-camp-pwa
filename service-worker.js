const cacheName = 'Tesomas.Camp v2.0.15';
const precacheResources = [
    '/index.html',
    '/areas.html',
    '/info.html',
    '/social.html',
    '/store.html',
    '/css/main.css',
    '/css/waltographUI.ttf',
    '/images/background-dark.png',
    '/images/background-light.png',
    '/images/favicon.ico',
    '/resources/2021_TSC_Guidebook.pdf',
    '/resources/Eagle Quest Schedule 2021.pdf',
    '/resources/TSC Advnacement Schedule 2021.pdf',
    'https://kit.fontawesome.com/1b88120e53.js',
    'https://ka-f.fontawesome.com/releases/v5.15.3/css/free.min.css?token=1b88120e53',
    'https://ka-f.fontawesome.com/releases/v5.15.3/css/free-v4-shims.min.css?token=1b88120e53',
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

self.addEventListener('activate', event => {
    console.log('Activating new service worker...');

    const cacheWhitelist = [cacheName];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});