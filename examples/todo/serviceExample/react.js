import React from 'react';
import angular from 'angular';
import {
  AngularProvider,
  inject as $inject,
  apply as $withApply,
  resolve as $resolve,
  compose
} from 'angular-react';

const connect = compose(
  $inject('TodosService'),
  $resolve({
    todos: $resolve.watch(['TodosService', TodosService => TodosService.getTodos()])
  }),
  $withApply({
    addTodo: ['TodosService', TodosService => todo => TodosService.add(todo)]
  })
)

class Todos extends React.Component {
  addTodo() {
    this.props.addTodo(this.input.value)
    this.input.value = ''
  }

  removeTodo(i) {
    this.props.$apply(() => this.props.TodosService.remove(i));
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
