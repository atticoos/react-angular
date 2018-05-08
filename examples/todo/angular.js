import './setup'
import React from 'react';
import angular from 'angular'
import {registerReactComponent} from 'angular-react';
import ReactTodos from './react';

import './todos-normal.angular'
import ReactTodosNormal from './todos-normal.react'

import './todos-service.angular'
import ReactTodosService from './todos-service.react'


const app = angular.module('angularApp')

registerReactComponent(app, 'reactTodosNormal', ReactTodosNormal)
registerReactComponent(app, 'reactTodosService', ReactTodosService)

app.component('normalTodosExample', {
  template: `
    <div style="margin: 20px; background-color: lightgray; padding: 20px;">
      <h2>React + Angular Todo List (Component Communication)</h2>

      <div style="display: flex; flex-direction: row">
        <div style="margin-right: 50px">
          <h2>Angular</h2>
          <angular-todos-normal
            todos="$ctrl.todos"
            add-todo="$ctrl.addTodo(todo)"
            remove-todo="$ctrl.removeTodo(i)"
          ></angular-todos-normal>
        </div>
        <div>
          <h2>React</h2>
          <react-todos-normal
            todos="$ctrl.todos"
            add-todo="$ctrl.addTodo"
            remove-todo="$ctrl.removeTodo"
          ></react-todos-normal>
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

app.component('serviceTodosExample', {
  template: `
    <div style="margin: 20px; background-color: lightgray; padding: 20px;">
      <h2>React + Angular Todo List (Service Communication)</h2>

      <div style="display: flex; flex-direction: row">
        <div style="margin-right: 50px">
          <h2>Angular</h2>
          <angular-todos-service></angular-todos-service>
        </div>
        <div>
          <h2>React</h2>
          <react-todos-service></react-todos-service>
        </div>
      </div>
    </div>
  `,
  controller: function NormalTodosController () {
    this.todos = []
    this.addTodo = todos => this.todos.push(todo)
    this.removeTodo = i => this.todos.splice(i, 1)
  }
})

app.component('app', {
  template: `
    <div>
      <normal-todos-example></normal-todos-example>
      <service-todos-example></service-todos-example>
    </div>
  `,
  controller: ['$scope', function ($scope) {
    $scope.alert = () => alert('hit')
    $scope.sharedState = 'hello world'
    $scope.onSharedStateChanged = value => $scope.sharedState = value
  }]
});

app.factory('TodosService', function TodosService () {
  var todos = [];

  return {
    getTodos() {
      return todos;
    },
    add(item) {
      todos.push(item)
    },
    remove(index) {
      todos.splice(index, 1);
    }
  }
})

angular.bootstrap(document, ['angularApp']);
