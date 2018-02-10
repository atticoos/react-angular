import angular from 'angular'
import ReactComponent from '../react';

const angularModule = angular.module('reactApp.service', []);

angularModule.factory('Counter', function ServiceA () {
  var count = 0;

  return {
    getCount() {
      return count
    },
    increment() {
      count = count + 1;
      return count;
    },
    decrement() {
      count = count - 1;
      return count;
    }
  }
});

export default angularModule;
