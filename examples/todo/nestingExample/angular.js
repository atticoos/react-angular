import template from './angular.html'

const AngularNested = {
  template,
  bindings: {
    level: '<',
    max: '<',
    count: '<',
    callback: '='
  },
  controller: function () {}
}

export default AngularNested
