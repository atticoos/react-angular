import angular from 'angular'
import ReactExample from './react'
import AngularExample from './angular'
import {registerReactComponent} from 'angular-react';

const app = angular.module('examples.props', ['react'])

app.component('angularPropsExample', AngularExample)
registerReactComponent(app, 'reactPropsExample', ReactExample)


app.component('propsExample', {
  template: `
    <div style="margin: 20px; background-color: lightgray; padding: 20px;">
      <h2>React + Angular Todo List (Component Communication)</h2>

      <div style="display: flex; flex-direction: row">
        <div style="margin-right: 50px">
          <h2>Angular</h2>
          <angular-props-example
            todos="$ctrl.todos"
            add-todo="$ctrl.addTodo(todo)"
            remove-todo="$ctrl.removeTodo(i)"
          ></angular-props-example>
        </div>
        <div>
          <h2>React</h2>
          <react-props-example
            todos="$ctrl.todos"
            add-todo="$ctrl.addTodo"
            remove-todo="$ctrl.removeTodo"
          ></react-props-example>
        </div>
      </div>
    </div>
  `,
  controller: function NormalTodosController () {
    this.todos = []
    this.addTodo = todo => this.todos.push(todo)
    this.removeTodo = i => this.todos.splice(i, 1)
  }
})

export default app;
