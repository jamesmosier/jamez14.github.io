var CACHE_NAME = 'jdm-site-cache-v1';
var urlsToCache = [
  '/',
  '/lib/jquery/dist/jquery.min.js',
  '/js/app.min.js',
  '/js/lib.min.js',
  '/css/app.min.css',
  'https://fonts.googleapis.com/css?family=Quicksand:300,400,700',
  'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
  '/favicon-16x16.png',
  '/favicon-96x96.png',
  '/favicon-32x32.png',
  '/apple-icon-57x57.png',
  '/apple-icon-60x60.png',
  '/apple-icon-72x72.png',
  '/apple-icon-76x76.png',
  '/apple-icon-114x114.png',
  '/apple-icon-120x120.png',
  '/apple-icon-144x144.png',
  '/apple-icon-152x152.png',
  '/apple-icon-180x180.png',
  '/android-icon-192x192.png',
  '/favicon.ico',
  '/manifest.json',
  '/ms-icon-144x144.png',
  'https://www.google-analytics.com/ga.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have 2 stream.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});