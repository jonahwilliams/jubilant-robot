import PouchDB from 'pouchdb';
import { RECIEVE_TODO } from '../actions';

const db = new PouchDB('todos', { rev_limit: 0 , adaptor: 'idb'});

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
    payload: d.rows.map(d => d.doc)
  };
};

// ::addTodoDb todo -> next -> ()
export function addTodoDB(todo) {
  return (dispatch) => {
    return db
      .put({ ...todo })
      .then(() => db.allDocs({ include_docs: true, descending: true}))
      .then(d => dispatch(dispatchTodos(d)));
  };
}

// ::addTodoDb String -> next -> ()
export function deleteTodoDB(_id) {
  return (dispatch) => {
    return db
      .get(_id)
      .then(d => db.remove(d._id, d._rev))
      .then(() => db.allDocs({ include_docs: true, descending: true}))
      .then(d => dispatch(dispatchTodos(d)));
  };
}

// ::removeTodoDB String -> next -> ()
export function completeTodoDB(_id) {
  return (dispatch) => {
    return db
      .get(_id)
      .then(d => {
        const todo = { ...d, completed: true };
        return db.put(todo);
      })
      .then(() => db.allDocs({ include_docs: true, descending: true}))
      .then(d => dispatch(dispatchTodos(d)));
  };
}

export function getAllTodoDB() {
  return (dispatch) => {
    return db
      .allDocs({ include_docs: true, descending: true })
      .then(d => dispatch(dispatchTodos(d)));
  };
}
