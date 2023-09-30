const staticGaleriaPWA = "dev-galeriaPWA-site-v1";

const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/app.js",
    "/images/nuggets.jpeg",
    "/images/papas.jpeg",
    "/images/chicharron.jpeg"
];

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticGaleriaPWA)
            .then(cache => {
                cache.addAll(assets);
            })
    );
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(response => {
            return response || fetch(fetchEvent.request);
        })
    );
});
