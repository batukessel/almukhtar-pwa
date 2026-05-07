const CACHE_NAME='almukhtar-v1';

const urlsToCache=[

  './',

  './index.html',

  './manifest.json',

  './icon-192.png',

  './icon-512.png'

];

// INSTALL
self.addEventListener(
  'install',
  event=>{

    self.skipWaiting();

    event.waitUntil(

      caches.open(CACHE_NAME)

        .then(cache=>{

          return cache.addAll(
            urlsToCache
          );

        })

    );

  }
);

// ACTIVATE
self.addEventListener(
  'activate',
  event=>{

    event.waitUntil(
      self.clients.claim()
    );

  }
);

// FETCH
self.addEventListener(
  'fetch',
  event=>{

    event.respondWith(

      caches.match(event.request)

        .then(response=>{

          return response ||

            fetch(event.request)

              .then(network=>{

                const clone=
                  network.clone();

                caches.open(CACHE_NAME)

                  .then(cache=>{

                    cache.put(
                      event.request,
                      clone
                    );

                  });

                return network;

              })

              .catch(()=>{

                return caches.match(
                  './index.html'
                );

              });

        })

    );

  }
);
