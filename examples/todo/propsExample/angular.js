import template from './angular.html'

const AngularPropsExample = {
  template,
  bindings: {
    onAddTodo: '&addTodo',
    removeTodo: '&',
    todos: '<'
  },
  controller: function () {
    this.input = ''
    this.addTodo = () => {
      this.onAddTodo({todo: this.input})
      this.input = ''
    }
  }
}

export default AngularPropsExample
