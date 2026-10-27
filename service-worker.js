const CACHE_NAME = "shaikh-yousaf-official-v2026-02";

const CORE_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./lion%20(1).png",
  "./yousaf-8.jpg",
  "./yousaf-walid.jpg",
  "./mudassir-5.jpg",
  "./ustad-7.jpg"
];

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME).then(cache => {

      return Promise.all(
        CORE_FILES.map(file =>
          cache.add(file).catch(() => null)
        )
      );

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

  if(event.request.method !== "GET"){
    return;
  }

  event.respondWith(

    fetch(event.request)
      .then(response => {

        if(response && response.ok){

          const copy = response.clone();

          caches.open(CACHE_NAME).then(cache => {

            cache.put(event.request, copy);

          });

        }

        return response;

      })

      .catch(() => {

        return caches.match(event.request);

      })

  );

});
