//for it to cach all in the site but it dont work dont knwo why.

const cache_NAME = 'v1_OsloBS_site_all';

self.addEventListener('install', (e) => {
    console.log('service worker installed');
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request)
        .then(res => {
            const responseClone = res.clone();
            catches.open(cache_NAME)
            .then(cache => {
                cache.put(e.request, responseClone)
            });
            return res;
        }).catch(error => {
            caches.match(e.request).then(res => {
                return res;
            })
        })
    ) 
});