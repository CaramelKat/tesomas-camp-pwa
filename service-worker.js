const cacheName = 'Tesomas.Camp v1.0.17';
const precacheResources = [
    '/',
    'index.html',
    '/resources/web/2020_TSC_Guidebook_COVID.pdf',
    '/resources/web/FAQs_Camp_2020.pdf',
    '/resources/web/Camp_Medical_Screening_Checklist.pdf',
    '/areaEvents.html',
    '/resources/web/Aqua_Circle.pdf',
    '/resources/web/Black_Circle.pdf',
    '/resources/web/Blue_Circle.pdf',
    '/resources/web/Green_Circle.pdf',
    '/resources/web/Orange_Circle.pdf',
    '/resources/web/Pink_Circle.pdf',
    '/resources/web/Purple_Circle.pdf',
    '/resources/web/Red_Circle.pdf',
    '/styles/main.css',
    '/images/waldo_banner.png',
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