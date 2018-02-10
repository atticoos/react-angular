import React from 'react';
import {
  AngularProvider,
  connectAngular as inject,
  apply,
  resolve,
  compose,
  watch
} from 'angular-react';

class Todos extends React.Component {
  addItem() {
    this.props.$apply(() => {
      this.props.TodosService.add(this.input.value);
      this.input.value = '';
    })
  }
  render() {
    if (!this.props.$resolved) {
      return null;
    }

    return (
      <div>
        <input type="text" ref={input => this.input = input} />
        <button onClick={() => this.addItem()}>Add</button>

        <ul>
          {this.props.todos.map((todo, i) => (
            <li key={i}>{todo}</li>
          ))}
        </ul>
      </div>
    )
  }
}

const ConnectedTodos = compose(
  // // Angular resolver
  resolve({
    todos: ['TodosService', TodosService => TodosService.getTodos()]
  }),

  // Watch mutations
  watch('todos'),

  apply(),

  // // Angular service injector
  inject('TodosService')
)(Todos)

export default function ReactApp () {
  return (
    <AngularProvider ngApp={angular.element(document.querySelector('body'))}>
      <ConnectedTodos />
    </AngularProvider>
  )
}
