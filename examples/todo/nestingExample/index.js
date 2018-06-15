import React from 'react'
import angular from 'angular'
import {registerReactComponent, $inject} from 'angular-react'
import Example from './example';
import NestedAngular from './angular'
import ReactNested from './react'

const app = angular.module('examples.nesting', ['react'])
registerReactComponent(app, 'nestingExample', Example);
registerReactComponent(app, 'reactNested', ReactNested);
app.component('angularNested', NestedAngular);

export default app;
