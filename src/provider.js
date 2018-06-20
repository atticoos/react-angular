import React from 'react'
import PropTypes from 'prop-types'
import angular from 'angular'

const InjectorContext = React.createContext(null)
const ScopeContext = React.createContext(null);

/**
 * The AngularProvider makes angular's dependency injection ($injector) available to child React components.
 *
 * @param {Object} props The component props.
 * @param {Object} props.$injector The angular $injector instance.
 * @param {Object} props.children Any child components.
 * @returns {Object} The React Provider node.
 */
export default function AngularProvider ({$injector, $scope, children}) {
  return (
    // Provide the $injector to descendants. Consumable via `withInjector`
    <InjectorContext.Provider value={$injector}>
      {// Provide the $scope to descendants. Consumable via `withScope`
      }
      <ScopeContext.Provider value={$scope}>
        {children}
      </ScopeContext.Provider>
    </InjectorContext.Provider>
  );
}

// Provides a child scope from a parent scope
class ChildScope extends React.Component {
  $childScope = this.props.$scope.$new()

  componentWillUnmount() {
    this.$childScope.$destroy()
  }

  render() {
    return this.props.children(this.$childScope);
  }
}

/**
 * A higher order function that provides the $injector as a property to a provided component.
 *
 * @param {Function} WrappedComponent A React component that needs the $injector instance.
 * @returns {Function} A higher order component providing the $injector.
 */
export function withInjector (WrappedComponent) {
  return props => (
    <InjectorContext.Consumer>
      {$injector => <WrappedComponent {...props} $injector={$injector} />}
    </InjectorContext.Consumer>
  );
}


export function withScope (WrappedComponent) {
  return props => (
    // Get the parent's scope
    <ScopeContext.Consumer>
      {$scope => (
        // Create the child's scope
        <ChildScope $scope={$scope}>
          {$childScope => (
            // Provide our child scope as parent scopes to our descendants
            <ScopeContext.Provider value={$childScope}>
              {// Provide our scope to our React component
              }
              <WrappedComponent {...props} $scope={$childScope} />
            </ScopeContext.Provider>
          )}
        </ChildScope>
      )}
    </ScopeContext.Consumer>
  );
}
