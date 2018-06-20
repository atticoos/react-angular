import React from 'react';
import angular from 'angular';
import AngularProvider from './provider';

/**
 * Registers a React component to be renderable within an angular template.
 *
 * Eg:
 * ```
 * function YourComponent ({foo}) { ... }
 *
 * registerReactComponent(
 *   angular.module('yourApp'),
 *   'yourComponent'
 *   YourComponent
 * )
 *
 * ...
 *
 * <ng-view>
 *   <your-component foo="'bar'"></your-component>
 * </ng-view>
 * ```
 * @param {Object} angularModule The angular module to register the React component within.
 * @param {string} componentName The name of the component to be used within angular.
 * @param {Function} Component The React component.
 * @returns {void}
 */
export default function registerReactComponent (angularModule, componentName, Component) {
  angularModule.directive(componentName, ['$injector', 'reactDirective', function ($injector, reactDirective) {
    // Use ngreact's `reactDirective` to handle making React available in Angular.
    return reactDirective(({$scope, ...props}) => (
      // Wrap the component within the AngularProvider
      // allowing the component to access angular's dependency injection.
      <AngularProvider $injector={$injector} $scope={$scope}>
        <Component {...props} />
      </AngularProvider>
    ));
  }]);
}
