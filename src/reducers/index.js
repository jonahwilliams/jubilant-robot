import { RECIEVE_TODO } from '../actions';

const initalState = {
  todos: []
};

export default function counterApp(state = initalState, action) {
  switch(action.type) {
  case RECIEVE_TODO:
    return { ...state, todos: action.payload };
  default:
    return state;
  }
}
