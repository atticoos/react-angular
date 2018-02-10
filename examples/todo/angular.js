import angular from 'angular'
import 'ngreact';
import ReactTodos from './react';

const app = angular.module('reactApp', ['react']);

app.value('ReactTodos', ReactTodos);

app.component('app', {
  template: `
    <div>
      <h2>React + Angular Todo List</h2>

      <div style="display: flex; flex-direction: row;">
        <div style="margin-right: 50px;">
          <h2>Angular</h2>
          <angular-todos></angular-todos>
        </div>
        <div>
          <h2>React</h2>
          <react-component name="ReactTodos" />
        </div>
      </div>
    </div>
  `
});

app.component('angularTodos', {
  template: `
    <div>
      <input
        type="text"
        ng-model="input"
      />
      <button ng-click="addTodo()">Add</button>

      <ul>
        <li ng-repeat="todo in todos track by $index">
          {{todo}}
        </li>
      </ul>
    </div>
  `,
  controller: ['$scope', 'TodosService', function ($scope, Todos) {
    $scope.todos = Todos.getTodos()
    $scope.input = '';

    $scope.addTodo = ()  => {
      Todos.add($scope.input);
      $scope.input = '';
    };
  }]
})

app.factory('TodosService', function TodosService () {
  var todos = [];

  return {
    getTodos() {
      return todos;
    },
    add(item) {
      todos.push(item)
    },
    remove(item) {
      let i = todos.indexOf(item)
      if (i > -1) {
        todos.splice(i, 1)
      }
    }
  }
})


angular.bootstrap(document, ['reactApp']);
