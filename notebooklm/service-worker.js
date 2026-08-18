const CACHE='gnpl-v22';
const ASSETS=[
  './','./index.html',
  './assets/styles.css','./assets/ui-polish.css','./assets/productivity.css','./assets/accessibility.css','./assets/audience-gallery.css',
  './assets/app.js','./assets/prompt-language.js','./assets/ui-polish.js','./assets/productivity.js','./assets/accessibility.js','./assets/audience-gallery.js',
  './assets/favicon.svg',
  './data/prompts.json','./data/packs/narrative-characters.json','./data/packs/nature-exploration.json','./data/packs/life-rhythm.json','./data/packs/digital-media.json','./data/packs/humanities-spirituality.json','./data/packs/emotion-life.json','./data/packs/wonder-adventure.json','./data/packs/performance-culture.json','./data/workflows.json','./manifest.webmanifest'
];

self.addEventListener('install',event=>event.waitUntil(
  caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())
));

self.addEventListener('activate',event=>event.waitUntil(
  caches.keys()
    .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
    .then(()=>self.clients.claim())
));

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin) return;

  // Network-first prevents an old cached JS/CSS bundle from making newly deployed
  // controls or preview assets look stale. Cached assets remain the offline fallback.
  event.respondWith(
    fetch(event.request)
      .then(response=>{
        if(response && response.ok){
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(event.request,copy));
        }
        return response;
      })
      .catch(()=>caches.match(event.request).then(cached=>cached||caches.match('./index.html')))
  );
});
