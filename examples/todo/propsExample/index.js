import angular from 'angular'
import ReactComponent from './react'
import AngularComponent from './angular'
import {registerReactComponent} from 'angular-react';
import template from './index.html'

const app = angular.module('examples.props', ['react'])

app.component('angularPropsExample', AngularComponent)
registerReactComponent(app, 'reactPropsExample', ReactComponent)


app.component('propsExample', {
  template,
  controller: function NormalTodosController () {
    this.todos = []
    this.addTodo = todo => this.todos.push(todo)
    this.removeTodo = i => this.todos.splice(i, 1)
  }
})

export default app;
