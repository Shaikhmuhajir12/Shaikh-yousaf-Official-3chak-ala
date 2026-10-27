const CACHE_NAME="shaikh-yousaf-official-v2026-1";
const CORE=["./","./index.html","./manifest.json","./lion%20(1).png","./yousaf-8.jpg","./yousaf-walid.jpg","./mudassir-5.jpg","./ustad-7.jpg","./background.mp3"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(CORE).catch(()=>{})));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 e.respondWith(caches.match(e.request).then(cached=>{
  const network=fetch(e.request).then(r=>{if(r&&r.ok)caches.open(CACHE_NAME).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>cached);
  return cached||network;
 }));
});
