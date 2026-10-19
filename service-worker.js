const CACHE_NAME = "shaikh-yousaf-official-v2";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./lion%20(1).png",
  "./background.mp3",
  "./a13e474caf0e62eeb8b82846bca5f081_1792137751535.mp4",
  "./foryoupage%20foryoupage.mp4"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE).catch(error => {
        console.log("Some files could not be cached:", error);
      });
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then(response => {
          if (
            response &&
            response.status === 200 &&
            response.type === "basic"
          ) {
            const responseClone = response.clone();

            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }

          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
