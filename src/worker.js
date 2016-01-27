import { createStore, applyMiddleware } from 'redux';
import { ADD_TODO, COMPLETE_TODO, DELETE_TODO, SET_VISIBILITY_FILTER } from './actions';
import { addTodoDB, deleteTodoDB, completeTodoDB, getAllTodoDB } from './database';
import thunk from 'redux-thunk';
import mainReducer from './reducers';

const createThunkStore = applyMiddleware(thunk)(createStore);
let store = createThunkStore(mainReducer);


store.dispatch(getAllTodoDB());

self.onmessage = function(e) {
  switch(e.data.type) {
  case ADD_TODO:
    store.dispatch(addTodoDB(e.data.payload));
    break;
  case COMPLETE_TODO:
    store.dispatch(completeTodoDB(e.data.payload._id));
    break;
  case DELETE_TODO:
    store.dispatch(deleteTodoDB(e.data.payload._id));
    break;
  case SET_VISIBILITY_FILTER:
    store.dispatch(e.data);
    store.dispatch(getAllTodoDB());
    break;
  default:
    store.dispatch(e.data);
    break;
  }
};

store.subscribe(function() {
  self.postMessage(store.getState());
});
