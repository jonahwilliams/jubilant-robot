import { ADD_TODO, COMPLETE_TODO, DELETE_TODO, FETCH_TODO } from '../actions';

const initalState = {
  isFetching: false,
  uid: 0,
  todos: []
};

export default function counterApp(state = initalState, action) {
  switch(action.type) {
  case ADD_TODO:
    const todo = {...action.payload, id: state.uid };
    return { ...state, uid: state.uid + 1, todos: [...state.todos, todo] };
  case COMPLETE_TODO:
    return { ...state, todos: state.todos.reduce((acc, d) => {
      if (d.id === action.payload.id) {
        d.completed = true;
      }
      return acc.concat(d);
    }, [])};
  case DELETE_TODO:
    return { ...state, todos: state.todos.filter(d => d.id !== action.payload.id)};
  case FETCH_TODO:
    return { ...state, isFetching: true };
  default:
    return state;
  }
}
