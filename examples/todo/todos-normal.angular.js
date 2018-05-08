import './angular';

const app = angular.module('angularApp')
app.component('angularTodosNormal', {
  bindings: {
    onAddTodo: '&addTodo',
    removeTodo: '&',
    todos: '<'
  },
  template: `
    <div>
      <input
        type="text"
        ng-model="$ctrl.input"
      />
      <button ng-click="$ctrl.addTodo()">Add</button>

      <ul>
        <li ng-repeat="todo in $ctrl.todos track by $index">
          {{todo}}
          <button ng-click="$ctrl.removeTodo({i: $index})">x</button>
        </li>
      </ul>
    </div>
  `,
  controller: function () {
    this.input = ''
    this.addTodo = () => {
      this.onAddTodo({todo: this.input})
      this.input = ''
    }
  }
})
