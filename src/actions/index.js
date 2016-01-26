export const ADD_TODO = 'ADD_TODO';


export function addTodo(title, description, time, completed) {
  return {
    type: ADD_TODO,
    payload: { title, description, time, completed }
  };
}
