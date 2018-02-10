import angular from 'angular'
import ReactComponent from '../react';

const angularModule = angular.module('reactApp.service', []);

angularModule.factory('Counter', function CountService () {
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

angularModule.factory('MutableCollection', function MutableCollectionService () {
  var collection = [];

  return {
    getCollection() {
      return collection;
    },
    add(item) {
      collection.push(item)
    },
    remove(item) {
      let i = collection.indexOf(item)
      if (i > -1) {
        collection.splice(i, 1)
      }
    }
  }
})

export default angularModule;
