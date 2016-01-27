# jubilant-robot

React/Redux Application.  Redux is implemented in a Webworker to see if we can get better performance and architecture by forcibly splitting the view (React) and the state (redux).  The ServiceWorker implements caching behavior to provide full offline functionality.

to build the application, run

```
gulp compile
```

This requires you to have gulp installed globally.  Then run `node server.js` and visit the page at least once to enable offline mode.
