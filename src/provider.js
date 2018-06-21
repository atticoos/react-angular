import React from 'react'
import PropTypes from 'prop-types'
import angular from 'angular'
import {ScopeProvider} from './scopeProvider';
import {InjectorProvider} from './injectorProvider';

/**
 * Provides all descendants with access to Angular's $injector and top-level $scope.
 *
 * @param {Object} props The component props.
 * @param {Object} props.$injector The angular $injector instance.
 * @param {Object} props.$scope The root React component's $scope.
 * @param {Object} props.children Any child components.
 * @returns {Object} The React Provider node.
 */
export default function AngularProvider ({$injector, $scope, children}) {
  return (
    // Provide the $injector to descendants. Consumable via `withInjector`
    <InjectorProvider $injector={$injector}>
      {// Provide the $scope to descendants. Consumable via `withScope`
      }
      <ScopeProvider $scope={$scope}>
        {children}
      </ScopeProvider>
    </InjectorProvider>
  );
}
