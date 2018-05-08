import angular from 'angular'
import PropsExample from './propsExample'
import ServiceExample from './serviceExample'
import NestingExample from './nestingExample'

const app = angular.module('examples', [PropsExample.name, ServiceExample.name, NestingExample.name])

app.component('app', {
  template: `
    <div>
      <props-example></props-example>
      <services-example></services-example>
      <nesting-example></nesting-example>
    </div>
  `
});

angular.bootstrap(document, ['examples']);
