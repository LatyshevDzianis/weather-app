const CACHE_NAME = "cache-version-1";
const CACHING_DURATION = 2 * 3600;
const urlToCache = ["/", "/main.js"];
const self = this;

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  event.respondWith(
    caches.open(`${CACHE_NAME}-tiles`).then((cache) =>
      cache.match(request).then((response) => {
        if (response) {
          const expirationDate = Date.parse(
            response.headers.get("sw-cache-expires")
          );
          const now = new Date();
          if (expirationDate > now) {
            return response;
          }
        }

        return fetch(request.url).then((liveResponse) => {
          const expires = new Date();

          expires.setSeconds(expires.getSeconds() + CACHING_DURATION);

          const cachedResponseFields = {
            status: liveResponse.status,
            statusText: liveResponse.statusText,
            headers: { "SW-Cache-Expires": expires.toUTCString() },
          };
          liveResponse.headers.forEach((v, k) => {
            cachedResponseFields.headers[k] = v;
          });

          const returnedResponse = liveResponse.clone();
          return liveResponse.blob().then((body) => {
            cache.put(request, new Response(body, cachedResponseFields));
            return returnedResponse;
          });
        });
      })
    )
  );
});
