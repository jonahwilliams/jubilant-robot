import { createStore } from 'redux';
import mainReducer from './reducers';

let store = createStore(mainReducer);

self.postMessage(store.getState());

self.onmessage = function(e) {
  store.dispatch(e.data);
};

const salf = self;
store.subscribe(function() {
  salf.postMessage(store.getState());
});
