import angular from 'angular'
import ReactComponent from '../react';

const angularModule = angular.module('reactApp.rootComponent', ['react', 'reactApp.service']);

angularModule.value('ReactComponent', ReactComponent);

angularModule.component('rootContainer', {
  template: `
    <div>
      <div>
        <h2>This is an angular component, count: {{count}}</h2>
        Collection: {{collection}}
        <br/>

        <button ng-click="add()">add</button>
      </div>

      <react-component name="ReactComponent" />
    </div>
  `,
  controller: ['$scope', 'Counter', 'MutableCollection', function ($scope, Counter, MutableCollection) {
    Counter.increment();
    $scope.collection = MutableCollection.getCollection();
    $scope.count = Counter.getCount();
    // $scope.inc = () => Counter.increment();
    $scope.add = () => MutableCollection.add(Math.random())
  }]
})

export default angularModule;
