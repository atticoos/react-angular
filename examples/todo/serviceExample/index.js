import angular from 'angular'
import ReactExample from './react'
import AngularExample from './angular'
import {registerReactComponent} from 'angular-react';

const app = angular.module('examples.services', ['react'])

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

app.component('servicesExample', {
  template: `
    <div style="margin: 20px; background-color: lightgray; padding: 20px;">
      <h2>React + Angular Todo List (Service Communication)</h2>

      <div style="display: flex; flex-direction: row">
        <div style="margin-right: 50px">
          <h2>Angular</h2>
          <angular-services-example></angular-services-example>
        </div>
        <div>
          <h2>React</h2>
          <react-services-example></react-services-example>
        </div>
      </div>
    </div>
  `
})

export default app;
