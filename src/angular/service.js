import angular from 'angular'
import ReactComponent from '../react';

const angularModule = angular.module('reactApp.service', []);

angularModule.factory('Counter', function ServiceA () {
  return {
    count: 0,
    getCount() {
      return this.count
    },
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    }
  }
});

export default angularModule;
