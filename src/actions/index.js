export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const RECIEVE_TODO = 'RECIEVE_TODO';
export const INVALIDATE_TODO = 'INVALIDATE_TODO';

// Filters
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const VISIBILITY_FILTERS = {
  ALL: 'ALL',
  COMPLETED: 'COMPLETED',
  INCOMPLETE: 'INCOMPLETE'
};

export function setVisibilityFilter(filter = VISIBILITY_FILTERS.ALL) {
  return {
    type: 'SET_VISIBILITY_FILTER',
    payload: { filter }
  };
}

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
