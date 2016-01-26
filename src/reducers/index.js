import { INCREASE, DECREASE } from '../actions';

const initalState = { counter: 0 };

export default function counterApp(state = initalState, action) {
  switch(action.type) {
  case INCREASE:
    return { ...state, counter: state.counter + 1 };
  case DECREASE:
    return { ...state, counter: state.counter - 1 };
  default:
    return state;
  }
}
