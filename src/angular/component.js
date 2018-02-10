import angular from 'angular'
import ReactComponent from '../react';

const angularModule = angular.module('reactApp.rootComponent', ['react', 'reactApp.service']);

angularModule.value('ReactComponent', ReactComponent);

angularModule.component('rootContainer', {
  template: `
    <div>
      <div>
        <h2>This is an angular component, count: {{count}}</h2>

        <button ng-click="inc()">inc</button>
      </div>

      <react-component name="ReactComponent" />
    </div>
  `,
  controller: ['$scope', 'Counter', function ($scope, Counter) {
    Counter.increment();
    $scope.count = Counter.getCount();
    $scope.inc = () => Counter.increment();
  }]
})

export default angularModule;
