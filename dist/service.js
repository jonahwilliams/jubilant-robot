var version="v0.1.2::",fundamentals=["/","/index.js","/worker.js","/service.js","/vendor/bootstrap-theme.min.css","/vendor/bootstrap.css"];self.addEventListener("install",function(e){e.waitUntil(caches.open(version+"fundamentals").then(function(e){e.addAll(fundamentals)}))}),self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(e){return Promise.all(e.filter(function(e){return 0!==e.indexOf(version)}).map(function(e){return caches["delete"](e)}))}))}),self.addEventListener("fetch",function(e){e.respondWith(caches.match(e.request).then(function(n){return n||fetch(e.request)}))});