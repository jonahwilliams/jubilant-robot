import { Component } from 'react';

import { addTodo } from '../../actions';

export default class todoAdd extends Component {
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
    const value = e.target.value.trim();
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
      this.props.post(action);
    }
    this.setState({
      description: '',
      title: ''
    });
  }
  render() {
    return (
      <div id="todoButtons">
        <form>
          <input type="text"
            id="title"
            value={this.state.title}
            onChange={this.onChange}
            placeholder="Title"/>
          <input type="text"
            id="description"
            value={this.state.description}
            onChange={this.onChange}
            placeholder="Description"/>
        </form>
      </div>
    );
  }
}
