

const CACHE_NAME = "yousaf-site-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).catch(async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;

      if (event.request.mode === "navigate") {
        return new Response(
          "Internet connection available nahi hai. Dobara online hon.",
          { headers: { "Content-Type": "text/plain; charset=utf-8" } }
        );
      }
      return new Response("", { status: 503 });
    })
  );
});
