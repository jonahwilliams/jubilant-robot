# jubilant-robot

React/Redux Application.  Redux is implemented in a Webworker to see if we can get better performance and architecture by forcibly splitting the view (React) and the state (redux).  While not implemented yet, the ServiceWorker will eventually implement caching behavior to both provide offline functionality and enable further separation of concerns from state management. i.e. Redux will not worry about the source of the data.

to build the application, run

```
gulp compile
```

This requires you to have gulp installed globally.  Then run `node server.js` and visit the page at least once to enable offline mode.
