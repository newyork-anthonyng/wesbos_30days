const CACHE_NAME = "drum-kit-v1";
const URLS_TO_CACHE = [
  "/",
  "/app.js",
  "/sounds/boom.wav",
  "/sounds/clap.wav",
  "/sounds/hihat.wav",
  "/sounds/kick.wav",
  "/sounds/openhat.wav",
  "/sounds/ride.wav",
  "/sounds/snare.wav",
  "/sounds/tink.wav",
  "/sounds/tom.wav"
];

self.addEventListener("install", e => {
  console.log("%c[SW] caching files", "color: green");
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
