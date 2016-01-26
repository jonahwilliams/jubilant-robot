import React from 'react';
import ReactDOM from 'react-dom';

import Counter from './components/Counter';
import Button from './components/Button';
import { INCREASE, DECREASE } from './actions';

const worker = new Worker('worker.js');

navigator.serviceWorker.register('/service.js');

const post = (type, payload) => () => worker.postMessage({type, payload});

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
      <div>
        <Counter {...this.state}/>
        <Button onClick={post(INCREASE)} text="+"/>
        <Button onClick={post(DECREASE)} text="-"/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
