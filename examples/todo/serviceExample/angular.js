const AngularServicesExample = {
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
          <button ng-click="$ctrl.removeTodo($index)">x</button>
        </li>
      </ul>
    </div>
  `,
  controller: ['TodosService', function (Todos) {
    this.addTodo = ()  => {
      Todos.add(this.input);
      this.input = '';
    };

    this.removeTodo = index => {
      Todos.remove(index);
    }

    this.$onInit = () => {
      this.todos = Todos.getTodos()
      this.input = ''
    }
  }]
}

export default AngularServicesExample;
