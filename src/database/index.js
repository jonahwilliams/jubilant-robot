import PouchDB from 'pouchdb';
import Find from 'pouchdb-find';
import { RECIEVE_TODO, VISIBILITY_FILTERS } from '../actions';

PouchDB.plugin(Find);
const db = new PouchDB('todos', { rev_limit: 0 , adaptor: 'idb'});

// Initialize indexes
db.createIndex({
  index: {
    fields: ['completed']
  }
});

/* type todo = {
 *   _id: String,
 *   _rev: String,
 *   title: String,
 *   description: String,
 *   completed: Boolean,
 *   time: Number
 */

const dispatchTodos = d => {
  return {
    type: RECIEVE_TODO,
    payload: d
  };
};

const setFilterQuery = (filter) => {
  switch(filter) {
  case VISIBILITY_FILTERS.ALL:
    return db
      .allDocs({ include_docs: true, descending: true})
      .then(d => d.rows.map(x => x.doc).slice(1));
  case VISIBILITY_FILTERS.COMPLETED:
    return db
      .find({ selector: { completed: {$eq: true} }})
      .then(d => d.docs);
  case VISIBILITY_FILTERS.INCOMPLETE:
    return db
      .find({ selector: { completed: {$eq: false} }})
      .then(d => d.docs);
  }
};

// ::addTodoDb todo -> next -> ()
export function addTodoDB(todo) {
  return (dispatch, getState) => {
    const filter = getState().visibilityFilter;
    return db
      .put({ ...todo })
      .then(() => setFilterQuery(filter))
      .then(d => dispatch(dispatchTodos(d)));
  };
}

// ::addTodoDb String -> next -> ()
export function deleteTodoDB(_id) {
  return (dispatch, getState) => {
    const filter = getState().visibilityFilter;
    return db
      .get(_id)
      .then(d => db.remove(d._id, d._rev))
      .then(() => setFilterQuery(filter))
      .then(d => dispatch(dispatchTodos(d)));
  };
}

// ::removeTodoDB String -> next -> ()
export function completeTodoDB(_id) {
  return (dispatch, getState) => {
    const filter = getState().visibilityFilter;
    return db
      .get(_id)
      .then(d => {
        const todo = { ...d, completed: true };
        return db.put(todo);
      })
      .then(() => setFilterQuery(filter))
      .then(d => dispatch(dispatchTodos(d)));
  };
}

export function getAllTodoDB() {
  return (dispatch, getState) => {
    const filter = getState().visibilityFilter;
    return setFilterQuery(filter)
      .then(d => dispatch(dispatchTodos(d)));
  };
}
