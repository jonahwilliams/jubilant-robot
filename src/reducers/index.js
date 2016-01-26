import { ADD_TODO } from '../actions';

const initalState = { todos: [{title: 'Demo', desc: 'ABC easy as 123', date: Date.now(), completed: false}] };

export default function counterApp(state = initalState, action) {
  switch(action.type) {
  case ADD_TODO:
    return { ...state, todos: [action.payload, ...state.todos] };
  default:
    return state;
  }
}
