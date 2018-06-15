import angular from 'angular'
import ReactExample from './react'
import AngularExample from './angular'
import {registerReactComponent} from 'angular-react';
import template from './index.html'

const app = angular.module('examples.services', ['react'])

app.component('servicesExample', {template})

app.component('angularServicesExample', AngularExample)
registerReactComponent(app, 'reactServicesExample', ReactExample)

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


export default app;
