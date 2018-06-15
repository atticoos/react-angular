import template from './angular.html'

const AngularServicesExample = {
  template,
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
