import React, { Component } from 'react';
import { addTodo, deleteTodo, completeTodo, setVisibilityFilter, VISIBILITY_FILTERS } from '../../actions';

function TodoItem(props) {
  const done = props.completed ? 'Done' : 'Not Done';
  return (
    <div className="card">
        <h3 className="card-header">{ props.title }</h3>
    <div className="card-block">
      <h4 className="card-title">{ props.description }</h4>
      <p className="card-text">{ done }</p>
      <input type="button"
        className="btn btn-primary"
        onClick={props.post(completeTodo(props._id))}
        value="Complete"/>
      <input type="button"
        className="btn btn-default"
        onClick={props.post(deleteTodo(props._id))}
        value="Delete"/>
    </div>
    <div className="card-footer text-muted">
      { 'created at ' + new Date(props.time).toLocaleString() }
    </div>
  </div>
  );
}

class TodoFilter extends Component {
  constructor(props) {
    super(props);
    this.state = { filter: VISIBILITY_FILTERS.ALL };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    const filter = e.target.value;
    this.setState({ filter });
    this.props.post(setVisibilityFilter(filter))();
  }
  render() {
    return (
      <select value={this.state.filter} onChange={this.onChange}>
        <option value={VISIBILITY_FILTERS.ALL}>Show All</option>
        <option value={VISIBILITY_FILTERS.COMPLETED}>Show Completed</option>
        <option value={VISIBILITY_FILTERS.INCOMPLETE}>Show Incomplete</option>
      </select>
    );
  }
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
        false,
        Date.now().toString()
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
      <div id="todoButtons">
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
      return (<TodoItem {...todo} post={this.props.post} key={todo._id}/>);
    });
  }
  render() {

    return (
      <div className="container">
        <h1>TodoList</h1>
        <ul>
          { this.makeTodos(this.props.todos) }
        </ul>
        <br/>
        <TodoAdd post={ this.props.post }/>
        <TodoFilter post={ this.props.post }/>
      </div>
    );
  }
}
