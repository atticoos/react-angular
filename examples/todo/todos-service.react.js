import React from 'react';
import angular from 'angular';
import {
  AngularProvider,
  connectAngular as inject,
  apply as withApply,
  resolve,
  compose,
  watch,
  // register
} from 'angular-react';

class Todos extends React.Component {
  addItem() {
    this.props.addTodo(this.input.value)
    this.input.value = ''
  }

  removeItem(i) {
    this.props.$apply(() => this.props.TodosService.remove(i));
  }

  render() {
    return (
      <div>
        <input type="text" ref={input => this.input = input} />
        <button onClick={() => this.addItem()}>Add</button>

        <ul>
          {this.props.todos.map((todo, i) => (
            <li key={i}>
              {todo}
              <button onClick={() => this.removeItem(i)}>x</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const ConnectedTodos = compose(
  // Angular resolver
  resolve({
    todos: ['TodosService', TodosService => TodosService.getTodos()]
  }),

  // Watch mutations
  watch('todos'),

  // Functions bound to digest cycle ($scope.$apply(..))
  withApply({
    addTodo: ['TodosService', TodosService => todo => TodosService.add(todo)]
  }),

  // // Angular service injector
  inject('TodosService')
)(Todos)

export default ConnectedTodos;
