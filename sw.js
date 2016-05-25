var CACHE_VERSION = 1;

var CURRENT_CACHES = {
    "offline-analytics": "offline-analytics-v" + CACHE_VERSION
};

var idbDatabase;

var IDB_VERSION = 1;

var STOP_RETRYING_AFTER = 864e5;

var STORE_NAME = "urls";

function openDatabaseAndReplayRequests() {
    var indexedDBOpenRequest = indexedDB.open("offline-analytics", IDB_VERSION);
    indexedDBOpenRequest.onerror = function(error) {
        console.error("IndexedDB error:", error);
    };
    indexedDBOpenRequest.onupgradeneeded = function() {
        this.result.createObjectStore(STORE_NAME, {
            keyPath: "url"
        });
    };
    indexedDBOpenRequest.onsuccess = function() {
        idbDatabase = this.result;
        replayAnalyticsRequests();
    };
}

function getObjectStore(storeName, mode) {
    return idbDatabase.transaction(storeName, mode).objectStore(storeName);
}

function replayAnalyticsRequests() {
    var savedRequests = [];
    getObjectStore(STORE_NAME).openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            savedRequests.push(cursor.value);
            cursor.continue();
        } else {
            console.log("About to replay %d saved Google Analytics requests...", savedRequests.length);
            savedRequests.forEach(function(savedRequest) {
                var queueTime = Date.now() - savedRequest.timestamp;
                if (queueTime > STOP_RETRYING_AFTER) {
                    getObjectStore(STORE_NAME, "readwrite").delete(savedRequest.url);
                    console.log(" Request has been queued for %d milliseconds. " + "No longer attempting to replay.", queueTime);
                } else {
                    var requestUrl = savedRequest.url + "&qt=" + queueTime;
                    console.log(" Replaying", requestUrl);
                    fetch(requestUrl).then(function(response) {
                        if (response.status < 400) {
                            getObjectStore(STORE_NAME, "readwrite").delete(savedRequest.url);
                            console.log(" Replaying succeeded.");
                        } else {
                            console.error(" Replaying failed:", response);
                        }
                    }).catch(function(error) {
                        console.error(" Replaying failed:", error);
                    });
                }
            });
        }
    };
}

openDatabaseAndReplayRequests();

self.addEventListener("activate", function(event) {
    var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
        return CURRENT_CACHES[key];
    });
    event.waitUntil(caches.keys().then(function(cacheNames) {
        return Promise.all(cacheNames.map(function(cacheName) {
            if (expectedCacheNames.indexOf(cacheName) === -1) {
                console.log("Deleting out of date cache:", cacheName);
                return caches.delete(cacheName);
            }
        }));
    }));
});

var urlsToCache = [ "/", "/lib/jquery/dist/jquery.min.js", "/js/app.min.js", "/js/lib.min.js", "/css/app.min.css", "https://fonts.googleapis.com/css?family=Quicksand:300,400,700", "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js", "/favicon-16x16.png", "/favicon-96x96.png", "/favicon-32x32.png", "/apple-icon-57x57.png", "/apple-icon-60x60.png", "/apple-icon-72x72.png", "/apple-icon-76x76.png", "/apple-icon-114x114.png", "/apple-icon-120x120.png", "/apple-icon-144x144.png", "/apple-icon-152x152.png", "/apple-icon-180x180.png", "/android-icon-192x192.png", "/favicon.ico", "/manifest.json", "/ms-icon-144x144.png" ];

self.addEventListener("install", function(event) {
    event.waitUntil(caches.open(CURRENT_CACHES["offline-analytics"]).then(function(cache) {
        console.log("Opened cache!!!");
        return cache.addAll(urlsToCache);
    }));
});

self.addEventListener("fetch", function(event) {
    console.log("Handling fetch event for", event.request.url);
    event.respondWith(caches.open(CURRENT_CACHES["offline-analytics"]).then(function(cache) {
        return cache.match(event.request).then(function(response) {
            if (response) {
                console.log(" Found response in cache:", response);
                return response;
            }
            console.log(" No response for %s found in cache. " + "About to fetch from network...", event.request.url);
            return fetch(event.request.clone()).then(function(response) {
                console.log("  Response for %s from network is: %O", event.request.url, response);
                if (response.status < 400) {
                    cache.put(event.request, response.clone());
                } else if (response.status >= 500) {
                    checkForAnalyticsRequest(event.request.url);
                }
                return response;
            }).catch(function(error) {
                checkForAnalyticsRequest(event.request.url);
                throw error;
            });
        }).catch(function(error) {
            throw error;
        });
    }));
});

function checkForAnalyticsRequest(requestUrl) {
    var url = new URL(requestUrl);
    if ((url.hostname === "www.google-analytics.com" || url.hostname === "ssl.google-analytics.com") && url.pathname === "/collect") {
        console.log("  Storing Google Analytics request in IndexedDB " + "to be replayed later.");
        saveAnalyticsRequest(requestUrl);
    }
}

function saveAnalyticsRequest(requestUrl) {
    getObjectStore(STORE_NAME, "readwrite").add({
        url: requestUrl,
        timestamp: Date.now()
    });
}