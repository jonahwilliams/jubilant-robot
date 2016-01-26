import { Component } from 'react';

import todoItem from './todoItem';
import todoAdd from './todoAdd';

export default class todoList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // const todos = this.props.todos.map((todo, i) => {
    //   return (<li key={i}><todoItem {...todo} /></li>);
    // });

    return (
      <div>
        <h1>TodoList</h1>
        <ul className="todo-list">
        //  { todos }
        </ul>
        <todoAdd post={ this.props.post }/>
      </div>
    );
  }
}
