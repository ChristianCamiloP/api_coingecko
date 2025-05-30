
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("v1").then(cache =>
      cache.addAll([
        "/",
        "/index.html",
        "/src/main.jsx",
        "/src/App.css",
        "/manifest.json"
      ])
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
