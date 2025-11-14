/**
 * Service Worker for Pawthenticate PWA
 * 
 * This service worker provides:
 * - Offline functionality
 * - Static asset caching
 * - Runtime caching for API requests
 * - Background sync (future enhancement)
 */

const CACHE_NAME = 'pawthenticate-v1.0.0';
const RUNTIME_CACHE = 'pawthenticate-runtime-v1.0.0';

// Static assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/dashboard',
  '/create',
  '/account',
  '/offline.html', // We'll create this fallback page
  '/svg/pawthenticate-icon-only.svg',
  '/svg/pawthenticate-logo-complete.svg',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS.map(url => new Request(url, {
          cache: 'reload'
        })));
      })
      .catch((error) => {
        console.error('[Service Worker] Failed to cache static assets:', error);
      })
  );
  
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Delete old caches
              return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
            })
            .map((cacheName) => {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
  );
  
  // Take control of all pages immediately
  return self.clients.claim();
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }
  
  // Skip Supabase API requests (always need fresh data)
  if (url.hostname.includes('supabase')) {
    return;
  }
  
  // Cache-first strategy for static assets
  if (isStaticAsset(url.pathname)) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(request)
            .then((response) => {
              // Cache the new response
              if (response.status === 200) {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(request, responseToCache);
                  });
              }
              return response;
            });
        })
        .catch(() => {
          // Return offline page for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        })
    );
    return;
  }
  
  // Network-first strategy for pages (with runtime cache)
  if (isPageRequest(url.pathname)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache the page for offline access
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE)
              .then((cache) => {
                cache.put(request, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          // Fall back to cached version
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Final fallback to offline page
              return caches.match('/offline.html');
            });
        })
    );
    return;
  }
});

// Helper: Check if request is for a static asset
function isStaticAsset(pathname) {
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp', '.woff', '.woff2', '.ttf', '.eot', '.ico'];
  return staticExtensions.some(ext => pathname.endsWith(ext));
}

// Helper: Check if request is for a page
function isPageRequest(pathname) {
  // Pages don't have file extensions or are HTML files
  return !pathname.includes('.') || pathname.endsWith('.html');
}

// Message event - for communication with the app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    const urlsToCache = event.data.payload;
    event.waitUntil(
      caches.open(RUNTIME_CACHE)
        .then((cache) => cache.addAll(urlsToCache))
    );
  }
});

// Background sync event (for future use - offline form submissions)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-pet-data') {
    event.waitUntil(syncPetData());
  }
});

// Placeholder for background sync
async function syncPetData() {
  // This would sync offline changes when connection is restored
  console.log('[Service Worker] Background sync triggered');
  // Implementation would go here
}

// Push notification event (for future use)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from Pawthenticate',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    tag: 'pawthenticate-notification',
    requireInteraction: false,
  };
  
  event.waitUntil(
    self.registration.showNotification('Pawthenticate', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

console.log('[Service Worker] Loaded successfully');

