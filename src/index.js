import React from 'react';
import ReactDOM from 'react-dom';

import todoList from './components/Todo/todoList';

const worker = new Worker('worker.js');

//navigator.serviceWorker.register('/service.js');

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
      <todoList {...this.state} post={post} />
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
