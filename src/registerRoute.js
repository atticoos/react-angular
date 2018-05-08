import angular from 'angular';
import registerReactComponent from './register';

function camelCaseToDash (str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}

export default function registerReactRouteComponent(app, name, ReactRouteComponent) {
  const childName = `${name}ChildContext`;
  registerReactComponent(app, childName, ReactRouteComponent);

  app.directive(name, ['$compile', function ($compile) {
    return {
      restrict: 'E',
      link (scope, elem) {
        let childDirective = camelCaseToDash(childName);
        let childEl = angular.element(`<${childDirective} $resolve="$resolve"></${childDirective}>`);
        elem.append(childEl);
        $compile(childEl)(scope);
      }
    };
  }]);
}
