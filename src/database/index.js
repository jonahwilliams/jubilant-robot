import PouchDB from 'pouchdb';

const db = new PouchDB('todos');
const remoteDB = false;

export function addTodoDB(title, description, time, completed, id) {
  const todo = { _id: id, title, description, time, completed };
  db.put(todo)
}

export function removeTodoDB(id) {
  return;
}

export function completeTodoDB(id) {
  return;
}

export function getAllTodoDB() {
  db.allDocs({ descending: true })
}
