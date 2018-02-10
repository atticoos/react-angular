import angular from 'angular'
import 'ngreact';
import RootComponent from './component';
import Service from './service';

angular.module('reactApp', [
  'react',
  RootComponent.name,
  Service.name
]);
angular.bootstrap(document, ['reactApp']);
