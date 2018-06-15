import React from 'react';

export default class ReactPropsExample extends React.Component {
  render() {
    return (
      <div>
        <input
          ref={input => this.input = input}
          type="text"
        />

        <button
          onClick={() => {
            this.props.addTodo(this.input.value)
            this.input.value = '';
          }}
        >
          Add
        </button>

        <ul>
          {this.props.todos.map((todo, i) => (
            <li key={i}>
              {todo}
              <button onClick={() => this.props.removeTodo(i)}>x</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
