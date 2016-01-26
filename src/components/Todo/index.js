import React, { Component } from 'react';
import { addTodo, deleteTodo, completeTodo } from '../../actions';

function TodoItem(props) {
  const done = props.completed ? 'Done' : 'Not Done';
  return (
    <div className='todoItem'>
      <h3>{ props.title }</h3>
      <p>{ props.desc }</p>
      <p>{ done }</p>
      <p>{ new Date(props.time).toLocaleString() }</p>
      <input type="button" className="btn btn-default" onClick={props.post(completeTodo(props.id))} value="Complete"/>
      <input type="button" className="btn btn-default" onClick={props.post(deleteTodo(props.id))} value="Delete" />
    </div>
  );
}


class TodoAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      title: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    this.setState({[key]: value});
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.state.title && this.state.description) {
      const action = addTodo(
        this.state.title,
        this.state.description,
        Date.now(),
        false
      );
      this.props.post(action)();
    }
    this.setState({
      description: '',
      title: ''
    });
  }
  render() {
    return (
      <div id="todoButtons" className="col-md-4 col-offset-4">
        <form onSubmit={this.onSubmit} className="form-group">
          <input type="text"
            id="title"
            className="form-control"
            value={this.state.title}
            onChange={this.onChange}
            placeholder="Title"/>
          <input type="text"
            id="description"
            className="form-control"
            value={this.state.description}
            onChange={this.onChange}
            placeholder="Description"/>
          <input className="btn btn-default" type="submit" />
        </form>
      </div>
    );
  }
}

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.makeTodos = this.makeTodos.bind(this);
  }
  makeTodos(todos = []) {
    return todos.map(todo => {
      return (<li key={todo.id}><TodoItem {...todo} post={this.props.post}/></li>);
    });
  }
  render() {

    return (
      <div className="container col-md-10 col-offset-1">
        <h1>TodoList</h1>
        <ul className="todo-list">
          { this.makeTodos(this.props.todos) }
        </ul>
        <TodoAdd post={ this.props.post }/>
      </div>
    );
  }
}
