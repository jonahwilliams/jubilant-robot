import { RECIEVE_TODO, SET_VISIBILITY_FILTER, VISIBILITY_FILTERS } from '../actions';

const initalState = {
  todos: [],
  visibilityFilter: VISIBILITY_FILTERS.ALL
};

export default function counterApp(state = initalState, action) {
  switch(action.type) {
  case SET_VISIBILITY_FILTER:
    return { ...state, visibilityFilter: action.payload.filter };
  case RECIEVE_TODO:
    return { ...state, todos: action.payload };
  default:
    return state;
  }
}
