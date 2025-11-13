const CACHE_NAME = "cosmic-dream-notes-v1";
const URLS_TO_CACHE = ["/", "/favicon.ico", "/manifest.json"];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Cached files 💫");
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // If the needed resources are in cache, use them. Otherwise, fetch 'em...
            return response || fetch(event.request);
        })
    );
});
