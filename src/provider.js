import React from 'react'
import PropTypes from 'prop-types'
import angular from 'angular'

const {Provider, Consumer} = React.createContext(null)

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
    <Provider value={{$injector, $scope}}>
      {children}
    </Provider>
  );
}

/**
 * A higher order function that provides the $injector as a property to a provided component.
 *
 * @param {Function} WrappedComponent A React component that needs the $injector instance.
 * @returns {Function} A higher order component providing the $injector.
 */
export function withInjector (WrappedComponent) {
  return props => (
    <Consumer>
      {({$injector}) => <WrappedComponent {...props} $injector={$injector} />}
    </Consumer>
  );
}

export function withScope (WrappedComponent) {
  return props => (
    <Consumer>
      {({$scope}) => <WrappedComponent {...props} $scope={$scope} />}
    </Consumer>
  )
}
