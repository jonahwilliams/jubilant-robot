export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const FETCH_TODO = 'FETCH_TODO';
export const RECIEVE_TODO = 'RECIEVE_TODO';

export function addTodo(title, description, time, completed) {
  return {
    type: ADD_TODO,
    payload: { title, description, time, completed }
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: { id }
  };
}

export function completeTodo(id) {
  return {
    type: COMPLETE_TODO,
    payload: { id }
  };
}

export function fetchTodo() {
  return {
    type: FETCH_TODO
  };
}

export function recieveTodo(response) {
  return {
    type: RECIEVE_TODO,
    payload: response.json()
  };
}
