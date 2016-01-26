import React from 'react';
import ReactDOM from 'react-dom';

import TodoList from './components/Todo/';

const worker = new Worker('worker.js');

navigator.serviceWorker.register('/service.js');

// Action is  { type, payload }
const post = (action) => () => worker.postMessage(action);

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    worker.onmessage = (e) => {
      this.setState(e.data);
    };
  }
  render() {
    return (
      <TodoList {...this.state} post={post} />
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
