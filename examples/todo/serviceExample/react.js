import React from 'react';
import angular from 'angular';
import {
  $inject,
  $resolve,
  compose
} from 'angular-react';

const connect = compose(
  $inject('TodosService'),
  $resolve({
    todos: $resolve.watch(['TodosService', TodosService => TodosService.getTodos()])
  })
)

class Todos extends React.Component {
  addTodo() {
    this.props.TodosService.add(this.input.value)
    this.input.value = ''
  }

  removeTodo(i) {
    this.props.TodosService.remove(i)
  }

  render() {
    return (
      <div>
        <input type="text" ref={input => this.input = input} />
        <button onClick={() => this.addTodo()}>Add</button>

        <ul>
          {this.props.todos.map((todo, i) => (
            <li key={i}>
              {todo}
              <button onClick={() => this.removeTodo(i)}>x</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default connect(Todos);
