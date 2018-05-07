import angular from 'angular';

const app = angular.module('angularApp')

app.component('angularTodosService', {
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
          <button ng-click="removeTodo($index)">x</button>
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

    $scope.removeTodo = index => {
      Todos.remove(index);
    }
  }]
})
