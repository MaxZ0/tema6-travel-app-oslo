const cache_NAME = 'v1OsloBS';
const cache_ASSETS = [
    './index.html',
    './style/index.css',
    './js/script.js',
    './manifest.json'
]

self.addEventListener('install', (e) => {
    console.log('service woorker installed');
    e.waitUntil(
        caches
            .open(cache_NAME)
            .then(cache => {
                console.log('SW is caching');
                cache.addAll(cache_ASSETS);
            })
            .then(() => self.skipWaiting())
            .catch(err => console.log(err))
    );

});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request).catch(() => {
            return caches.match(e.request)
        })
    )
});