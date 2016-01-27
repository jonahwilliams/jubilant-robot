export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const RECIEVE_TODO = 'RECIEVE_TODO';

export function addTodo(title, description, time, completed, _id) {
  return {
    type: ADD_TODO,
    payload: { _id, title, description, time, completed }
  };
}

export function deleteTodo(_id) {
  return {
    type: DELETE_TODO,
    payload: { _id }
  };
}

export function completeTodo(_id) {
  return {
    type: COMPLETE_TODO,
    payload: { _id }
  };
}
