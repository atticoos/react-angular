import React from 'react';

/**
 * Provides angular's scope instance.
 */
const {Provider, Consumer} = React.createContext(null);

/**
 * Consumes the $scope.
 */
export const ScopeConsumer = Consumer;

/**
 * Provider of the $scope.
 *
 * @param {Object} props The component props
 * @param {Object} props.$scope The angular $scope instance.
 * @param {Object} props.children React children.
 */
export const ScopeProvider = ({$scope, children}) => (
  <Provider value={$scope}>
    {children}
  </Provider>
);

/**
 * Creates a child $scope of a provided $scope, and provides it to a child.
 *
 * <ChildScope $scope={$parentScope}>
 *   {$childScope => ...}
 * </ChildScope>
 */
class ChildScope extends React.Component {
  $scope = this.props.$scope.$new(true);

  componentWillUnmount() {
    this.$scope.$destroy();
  }

  render() {
    return this.props.children(this.$scope);
  }
}

/**
 * Provides a component with $scope.
 * The instance is a child of the nearest parent scope.
 *
 * @param {Component} WrappedComponent The component to receive the $scope.
 * @return {Component} The component with $scope.
 */
export function withScope (WrappedComponent) {
  return props => (
    // Get the parent scope
    <Consumer>
      {$scope => (
        // Create a child scope
        <ChildScope $scope={$scope}>
          {$childScope => (
            // Provide the child scope as a the parent scope to descendants
            <Provider value={$childScope}>
              {// Provide the child scope to the wrapped component
              }
              <WrappedComponent {...props} $scope={$childScope} />
            </Provider>
          )}
        </ChildScope>
      )}
    </Consumer>
  );
}
